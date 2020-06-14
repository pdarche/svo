import _ from 'lodash'
import hat from "hat";
import { shuffleQuestions, centerPoint } from "./utils";
import {
  PRIMARY_QUESTIONS,
  SECONDARY_QUESTIONS,
  RANDOMIZE_QUESTIONS,
  INCLUDE_SECONDARY
} from "../config";

/**
 * Actions object for saving svo information
 *
 */

function Actions(window) {
  let primary, secondary;
  if (RANDOMIZE_QUESTIONS) {
    [ primary, secondary ] = shuffleQuestions();
  } else {
    primary = PRIMARY_QUESTIONS;
    secondary = SECONDARY_QUESTIONS;
  }

  this.question = 0;
  this.primary = primary;
  this.secondary = secondary;
  this.window = window
}

Actions.prototype.getQuestion = function(question) {
  return question < 6
    ? this.primary[question]
    : this.secondary[question - 6]
}

Actions.prototype.nextAction = function() {
  this.question = this.question + 1;
  return this.nextState();
}

Actions.prototype.nextState = function() {
  if (this.question == 6) {
    return 'save_svo'
  } else if (this.question != 15) {
    return 'increment_question'
  } else {
    return 'save_secondary_type'
  }
}

Actions.prototype.incrementQuestion = function(component, state) {
  const ranges = this.getQuestion(this.question);

  component.setState({
    startedAt: new Date(),
    question: this.question,
    ranges: ranges,
    data: centerPoint(ranges),
    reset: true,
    selfTotal: state.selfTotal + state.data[0],
    otherTotal: state.otherTotal + state.data[1]
  });

}

Actions.prototype.saveSVO = function(db, state, events, component) {
  db.saveSVO(state, events)
    .then(doc => {
      if (doc.type !== "prosocial" || !INCLUDE_SECONDARY) {
        window.location = "/results";
      } else {
        this.incrementQuestion(component, state);
      }
    })
    .catch(e => console.log(e));
}

Actions.prototype.saveSecondaryMeasures = function(db, state) {
  db.saveSecondaryType(state)
    .then(doc => { window.location = "/results";})
    .catch(e => console.log(e));
}

export { Actions }
