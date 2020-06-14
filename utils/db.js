import _ from 'lodash'
import hat from "hat";
import PouchDB from "pouchdb-browser";
import { FIREBASE_URL } from "../config";
import {
  computeSVO,
  classifySVO,
  computeSecondaryType,
  isConsistent
} from "./utils";

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
  // when the slider measure survey is started. TODO: change this.
  const preSurvey = JSON.parse(this.window.localStorage.getItem('preSurvey'));
  const browser = JSON.parse(this.window.localStorage.getItem("browser"));
  const ip = this.window.localStorage.getItem("ip");
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
  const consistent = isConsistent(svo);

  return this.getResponse(state.sessionId)
    .then(doc => {
      doc.completedAt = new Date();
      doc.svo = svo;
      doc.type = type;
      doc.isConsistent = consistent;
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
}

export { Database }
