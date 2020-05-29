import _ from 'lodash'
import hat from "hat";
import PouchDB from "pouchdb-browser";
import {
  EQUALITY_POINTS,
  JOINT_GAIN_POINTS,
  OTHER_GAIN,
  OWN_GAIN,
  MAX_DISTANCES,
  PRIMARY_QUESTIONS,
  SECONDARY_QUESTIONS,
  FIREBASE_URL
} from './config';


function centerPoint(ranges){
  let a = [ranges.min1, ranges.max1];
  let b = [ranges.min2, ranges.max2];
  return [_.sum(a) / 2, _.sum(b) / 2]
}

function classifySVO(svo) {
  if (svo > 22.45 && svo <= 57.15) {
    return 'prosocial'
  } else if (svo > -12.04 && svo <= 22.45) {
    return 'individualistic'
  } else if (svo > 57.15) {
    return 'altruistic'
  } else if (svo <= -12.04) {
    return 'competitive'
  }
}


function computeSVO(selfTotal, otherTotal) {
  let selfAvg = (selfTotal / 6) - 50
  let otherAvg = (otherTotal / 6) - 50
  let ratio = otherAvg / selfAvg
  let svo = Math.atan(ratio) * 180 / Math.PI
  return svo
}


function computeSecondaryType(answers) {
  let secondaryMeasures = answers.map((answer, ix) => {
    let dia = Math.abs(answer.self - EQUALITY_POINTS[ix]) / MAX_DISTANCES[ix]
    let djg = JOINT_GAIN_POINTS[ix]
      ? Math.abs(answer.self - JOINT_GAIN_POINTS[ix]) / MAX_DISTANCES[ix]
      : 0
    let dal = Math.abs(answer.self - OTHER_GAIN[ix]) / MAX_DISTANCES[ix]
    let dic = Math.abs(answer.self - OWN_GAIN[ix]) / MAX_DISTANCES[ix]
    return [dia, djg, dal, dic]
  })
  let transposed = _.unzip(secondaryMeasures)
  let [dia, djg, dal, dic] = transposed.map(a => _.sum(a) / 9)
  let ia;
  if (dia <= dal && dia <= dic && djg <= dal && djg <= dic) {
    ia = dia / (dia + djg)
  } else {
    ia = "does not fit criteria"
  }

  return {ia, dia, djg, dal, dic}
}


/**
 * shuffles the questions
 *
 */
function shuffleQuestions() {
  const primary = _.shuffle(PRIMARY_QUESTIONS).reverse();
  const secondary = _.shuffle(SECONDARY_QUESTIONS).reverse();

  return [ primary, secondary ]
}


function getQuestion(questionNumber, primary, secondary) {
  return questionNumber < 6
    ? primary.pop()
    : secondary.pop()
}



/**
 * Helper function for creating tracked events
 */

function createEvent(category, type, properties) {
  return {
    _id: hat(),
    occuredAt: new Date(),
    category: category,
    type: type,
    properties: properties
  }
}



/**
 * Database object for saving svo information
 *
 */

function Database(window) {
  this.db = new PouchDB('response')
  this.window = window
}


Database.prototype.createSession = function() {
  // We use local storage here because the pouchdb is only initialized
  // when the slider measure survey is started. TODO: fix this.
  const preSurvey = JSON.parse(this.window.localStorage.getItem('preSurvey'));
  const browser = JSON.parse(window.localStorage.getItem("browser"));
  const ip = window.localStorage.getItem("ip");
  const _id = hat();

  this.window.localStorage.setItem('sessionId', _id);
  this.sessionId = _id;

  this.db.put({
    _id,
    startedAt: new Date(),
    preSurvey,
    answers: [],
    events: [],
    browser,
    ip
  });

  return _id
}


Database.prototype.getResponse = function(sessionId) {
  return this.db
    .get(sessionId)
    .catch(err => console.log(err));
}


Database.prototype.createAnswer = function(state) {
  const submittedAt = new Date();
  return {
    _id: hat(),
    sessionId: state.sessionId,
    self: state.data[0],
    other: state.data[1],
    startedAt: state.startedAt,
    submittedAt: submittedAt,
    responseTime: submittedAt - state.startedAt,
    ranges: state.ranges
  }
}


Database.prototype.saveAnswer = function(state) {
  const answer = this.createAnswer(state);
  return this.getResponse(state.sessionId)
    .then(doc => {
      doc.answers.push(answer);
      return this.db.put(doc);
    })
    .catch(err => console.log(err));
}


Database.prototype.saveSVO = function(state, events) {
  const selfTotal = state.selfTotal + state.data[0];
  const otherTotal = state.otherTotal + state.data[1];
  const svo = computeSVO(selfTotal, otherTotal);
  const type = classifySVO(svo);

  return this.getResponse(state.sessionId)
    .then(doc => {
      doc.completedAt = new Date();
      doc.svo = svo;
      doc.type = type;
      doc.selfTotal = selfTotal;
      doc.otherTotal = otherTotal;
      doc.events = events;
      return this.db.put(doc);
    })
    .then(res => {
      return { svo, type };
    })
    .catch(err => console.log(err));
}

Database.prototype.saveSecondaryType = function(state) {
  return this.getResponse(state.sessionId)
    .then(doc => {
      const answers = doc.answers.slice(6);
      doc.secondaryMeasures = computeSecondaryType(answers);
      return this.db.put(doc);
    })
    .catch(e => console.log(e));
}

Database.prototype.update = function(doc) {
  return this.db.put(doc)
}

Database.prototype.sync = function(sessionId) {
  return this.getResponse(sessionId)
    .then(doc => {
      return fetch(FIREBASE_URL, {
        method: 'POST',
        body: JSON.stringify(doc)
      })
    })
    .catch(err => console.log(err));
}

Database.prototype.destroy = function(window) {
  this.db.destroy();
  window.localStorage.removeItem("sessionId")
  window.localStorage.removeItem("preSurvey")
  //this.setState({ synced: true })
}

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



export {
  Database,
  Actions,
  createEvent,
  shuffleQuestions,
  getQuestion,
  centerPoint,
  classifySVO,
  computeSVO,
  computeSecondaryType
}

