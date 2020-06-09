import React from "react";
import PouchDB from "pouchdb-browser";
import Status from "./Status";
import Slider from "./Slider";
import Bar from "./Bar";
import Label from "./Label";
import { createEvent, centerPoint } from "../utils/utils";
import { Actions } from "../utils/actions";
import { Database } from "../utils/db";
import { styles } from "../styles/surveyComponent";


export default class Survey extends React.Component {
  constructor(props) {
    super(props);

    if (process.browser) {
      this.db = new Database(window);
      this.actions = new Actions(window);
    }

    let firstQuestion = this.actions.getQuestion(0);

    this.events = [];
    this.state = {
      saving: false,
      reset: false,
      question: 0,
      ranges: firstQuestion,
      data: centerPoint(firstQuestion), // TODO: rename
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
    const event_ = createEvent("survey", type, {
      question: this.state.question
    });
    this.events.push(event_);
  }

  handleClick = ev => {
    ev.preventDefault();
    this.db
      .saveAnswer(this.state)
      .then(doc => {
        switch (this.actions.nextAction()) {
          case 'increment_question':
            this.actions.incrementQuestion(this, this.state);
            break
          case 'save_svo':
            this.actions.saveSVO(this.db, this.state, this.events, this);
            break
          case 'save_secondary_type':
            this.actions.saveSecondaryMeasures(this.db, this.state);
            break
          default:
            console.log("Sorry, something went wrong");
        }
      });
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
