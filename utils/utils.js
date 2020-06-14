import _ from 'lodash'
import hat from "hat";
import {
  EQUALITY_POINTS,
  JOINT_GAIN_POINTS,
  OTHER_GAIN,
  OWN_GAIN,
  MAX_DISTANCES,
  PRIMARY_QUESTIONS,
  SECONDARY_QUESTIONS
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


function computeSVO(selfTotal, otherTotal, denominator=6) {
  const selfAvg = (selfTotal / denominator) - 50
  const otherAvg = (otherTotal / denominator) - 50
  const ratio = otherAvg / selfAvg
  const svo = Math.atan(ratio) * (180 / Math.PI)
  // Round to the nearest 2 decimal places
  const roundedSVO = Number(svo).toFixed(2)
  return roundedSVO
}


function isConsistent(svo) {
  let consistent = false;

  switch (classifySVO(svo)) {
    case 'prosocial':
      if (svo >= 37.09 && svo <= 52.91) {
        consistent = true
      }
      break
    case 'individualistic':
      if (svo >= -7.82 && svo <= 7.82) {
        consistent = true
      }
      break
    case 'altruistic':
      if (svo >= 61.39) {
        consistent = true
      }
      break
    case 'competitive':
      if (svo <= -16.26) {
        consistent = true
      }
      break
  }
  return consistent
}


function computeSecondaryType(answers) {
  let secondaryMeasures = answers.map((answer) => {
    const ix = answer.ranges.question - 6 // adjust question #'s to match indices
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
  isConsistent,
  computeSVO,
  computeSecondaryType
}

