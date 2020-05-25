import React from "react";
import PouchDB from "pouchdb-browser";
import hat from "hat";
import _ from "lodash";
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
  centerPoint,
  classifySVO,
  computeSVO,
  computeSecondaryType
} from "../utils";
import { styles } from "../styles/surveyComponent";


function createAnswer(state) {
  const submitTime = new Date();
  return {
    _id: hat(),
    sessionId: state.sessionId,
    self: state.date[0],
    other: state.data[1],
    startedAt: state.startTime,
    submittedAt: submitTime,
    responseTime: submitTime - state.startTime,
    ranges: state.ranges
  }
}

function createEvent(category, type) {
  return {
    _id: hat(),
    occuredAt: new Date(),
    category: category,
    type: type,
    properties: properties
  }
}



export default class Survey extends React.Component {
  constructor(props) {
    super(props);

    if (process.browser) {
      this.db = new PouchDB("response");
    }

    this.events = new Array();
    this.state = {
      saving: false,
      question: 0,
      ranges: QUESTIONS[0],
      data: [85, 50],
      reset: false,
      selfTotal: 0,
      otherTotal: 0
    };
  }

  componentDidMount() {
    let demoSurvey = window.localStorage.getItem("demoSurvey");
    demoSurvey = JSON.parse(demoSurvey);
    this.createSession(demoSurvey);
  }

  createSession(demoSurvey) {
    let id = hat();
    window.localStorage.setItem("sessionId", id);

    this.db.put({
      _id: id,
      demoSurvey: demoSurvey,
      answers: new Array(),
      startedAt: new Date(),
      events: new Array()
    });

    // Set the start time for the first question
    this.setState({
      sessionId: id,
      startTime: new Date()
    });
  }

  saveAnswer() {
    let answer = createAnswer(this.state);
    return this.db
      .get(this.state.sessionId)
      .then(doc => {
        doc.answers.push(answer);
        return this.db.put(doc);
      })
      .catch(err => console.log(err));
  }

  saveSVO() {
    let selfTotal = this.state.selfTotal + this.state.data[0];
    let otherTotal = this.state.otherTotal + this.state.data[1];
    let svo = computeSVO(selfTotal, otherTotal);
    let type = classifySVO(svo);

    return this.db
      .get(this.state.sessionId)
      .then(doc => {
        doc.completedAt = new Date();
        doc.svo = svo;
        doc.type = type;
        doc.selfTotal = selfTotal;
        doc.otherTotal = otherTotal;
        doc.events = this.events;
        return this.db.put(doc);
      })
      .then(res => {
        return { svo, type };
      })
      .catch(err => console.log(err));
  }

  saveSecondaryType() {
    return this.db
      .get(this.state.sessionId)
      .then(doc => {
        let answers = doc.answers.slice(6);
        doc.secondaryMeasures = computeSecondaryType(answers);
        return this.db.put(doc);
      })
      .catch(e => console.log(e));
  }

  onSlide = val => {
    const event_ = createEvent("survey", "slider.moved", {
      selfStart: this.state.data[0],
      self: val[0],
      otherStart: this.state.data[1],
      other: val[1]
    });

    this.events.push(event_);
    this.setState({ data: val, reset: false });
  };

  onInstructionEvent = type => {
    const event_ = createEvent("survey", type, { question: this.state.question });
    this.events.push(event_);
  }

  handleClick = ev => {
    ev.preventDefault();
    this.saveAnswer().then(doc => {
      this.nextAction();
    });
  }

  nextAction = () => {
    let nextQuestion = this.state.question + 1;
    if (nextQuestion == 6) {
      this.saveSVO().then(doc => {
        if (doc.type !== "prosocial") {
          window.location = "/results";
        }
      });
    }

    if (nextQuestion != 15 && !this.state.saving) {
      let ranges = QUESTIONS[nextQuestion];
      this.setState({
        startTime: new Date(),
        question: nextQuestion,
        ranges: ranges,
        data: centerPoint(ranges),
        reset: true,
        selfTotal: this.state.selfTotal + this.state.data[0],
        otherTotal: this.state.otherTotal + this.state.data[1]
      });
    } else {
      this.saveSecondaryType()
        .then(doc => {
          window.location = "/results";
        })
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
