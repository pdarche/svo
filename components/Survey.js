import React from "react";
import PouchDB from "pouchdb-browser";
import Status from "./Status";
import Slider from "./Slider";
import Bar from "./Bar";
import Label from "./Label";
import {
  EQUALITY_POINTS,
  JOINT_GAIN_POINTS,
  OTHER_GAIN,
  OWN_GAIN,
  MAX_DISTANCES,
  QUESTIONS
} from "../config";

import {
  Database,
  createEvent,
  centerPoint,
  shuffleQuestions,
  getQuestion
} from "../utils";
import { styles } from "../styles/surveyComponent";


export default class Survey extends React.Component {
  constructor(props) {
    super(props);

    if (process.browser) {
      this.db = new Database(window);
    }

   let [ primary, secondary ] = shuffleQuestions();
   let firstQuestion = primary[0];

    this.events = [];
    this.state = {
      saving: false,
      primaryQuestions: primary,
      secondaryQuestions: secondary,
      question: 0,
      ranges: firstQuestion,
      data: centerPoint(firstQuestion), // TODO: rename
      reset: false,
      selfTotal: 0,
      otherTotal: 0
    };
  }

  componentDidMount() {
    const sessionId = this.db.createSession();
    const startedAt = new Date();
    this.setState({ sessionId, startedAt });
  }

  onSlide = value => {
    const event_ = createEvent("survey", "slider.moved", {
      selfStart: this.state.data[0],
      self: value[0],
      otherStart: this.state.data[1],
      other: value[1]
    });

    this.events.push(event_);
    this.setState({ data: value, reset: false });
  }

  onInstructionEvent = type => {
    const event_ = createEvent("survey", type, { question: this.state.question });
    this.events.push(event_);
  }

  handleClick = ev => {
    ev.preventDefault();
    this.db
      .saveAnswer(this.state)
      .then(doc => { this.nextAction(); });
  }

  nextAction = () => {
    const nextQuestion = this.state.question + 1;
    // If the user has completed the first questions in the survey
    // compute the svo and redirect if they aren't prosocial
    if (nextQuestion == 6) {
      this.db
        .saveSVO(this.state, this.events)
        .then(doc => {
          if (doc.type !== "prosocial") {
            window.location = "/results";
          }
        });
    }

    // If they are prosocial, move to the secondary questions
    if (nextQuestion != 15 && !this.state.saving) {
      const ranges = getQuestion(
        this.state.question,
        this.state.primaryQuestions,
        this.state.secondaryQuestions
      );

      this.setState({
        startedAt: new Date(),
        question: nextQuestion,
        ranges: ranges,
        data: centerPoint(ranges),
        reset: true,
        selfTotal: this.state.selfTotal + this.state.data[0],
        otherTotal: this.state.otherTotal + this.state.data[1]
      });
    } else {
    // If they've completed the secondary questions
    // redirect to the results page
      this.db
        .saveSecondaryType(this.state)
        .then(doc => { window.location = "/results";})
        .catch(e => console.log(e));
    }
  }

  render() {
    return (
      <div>
        <div className="survey-component-container">
          <style jsx>
            {styles}
          </style>
          <Status
            n={this.state.question + 1}
            onInstructionEvent={this.onInstructionEvent}
          />
          <div className="labels">
            <Label data={this.state.data} />
            <Bar width={200} height={96} data={this.state.data} />
          </div>
          <Slider
            width={500}
            height={100}
            data={this.state.data}
            scales={this.state.ranges}
            reset={this.state.reset}
            handleSlide={this.onSlide}
          />
          <button className="btn btn-primary" onClick={this.handleClick}>Submit</button>
        </div>
      </div>
    );
  }
}
