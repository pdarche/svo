import _ from 'lodash'
import hat from "hat";
import {
  EQUALITY_POINTS,
  JOINT_GAIN_POINTS,
  OTHER_GAIN,
  OWN_GAIN,
  MAX_DISTANCES,
  PRIMARY_QUESTIONS,
  SECONDARY_QUESTIONS,
  FIREBASE_URL
} from '../config';


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


export {
  createEvent,
  shuffleQuestions,
  centerPoint,
  classifySVO,
  computeSVO,
  computeSecondaryType
}

