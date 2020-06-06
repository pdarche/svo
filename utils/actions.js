import _ from 'lodash'
import hat from "hat";
import { shuffleQuestions, centerPoint } from "./utils";

/**
 * Actions object for saving svo information
 *
 */

function Actions(window) {
  let [ primary, secondary ] = shuffleQuestions();
  this.question = 0;
  this.primary = primary;
  this.secondary = secondary;
  this.window = window
}

Actions.prototype.nextQuestion = function() {
  return this.question < 6
    ? this.primary.pop()
    : this.secondary.pop()
}

Actions.prototype.nextAction = function(db, state, events, component) {
  this.question = this.question + 1;

  if (this.question == 6) {
    db.saveSVO(state, events)
      .then(doc => {
        if (doc.type !== "prosocial") {
          window.location = "/results";
        }
      });
  }

  if (this.question != 15 && !state.saving) {
    const ranges = this.nextQuestion();
    // TODO: this should be in a callback
    component.setState({
      startedAt: new Date(),
      question: this.question,
      ranges: ranges,
      data: centerPoint(ranges),
      reset: true,
      selfTotal: state.selfTotal + state.data[0],
      otherTotal: state.otherTotal + state.data[1]
    });
  } else {
    // If they've completed the secondary questions
    // redirect to the results page
    db.saveSecondaryType(state)
      .then(doc => { window.location = "/results";})
      .catch(e => console.log(e));
  }
}

export { Actions }
