import React from "react";
import Head from "next/head";
import ReactModal from "react-modal";
import Meta from "../components/Meta";
import Nav from "../components/Nav";
import Survey from "../components/Survey";
import { ANALYTICS_TRACKING_ID, SURVEY_ACTIVE, SURVEY_JSON } from "../config";
import { styles } from '../styles/survey';


let SurveyForm;
if (process.browser) {
  SurveyForm = require("survey-react/survey.react.min");
  SurveyForm.Survey.cssType = "bootstrap";
}

export default class SurveyPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      survey: SURVEY_ACTIVE,
      demoComplete: false,
      acknowledged: false,
      loadSurvey: false
    };

    if (process.browser) {
      this.model = new SurveyForm.Model(SURVEY_JSON);
    }
  }

  componentDidMount() {
    this.setState({ loadSurvey: true });
  }

  handleRequestClose = ev => {
    // Disallow closing by clicking off
  };

  handleAcknowledgement = ev => {
    this.setState({ acknowledged: true });
  };

  handleDemoSurveyCompletion = survey => {
    window.localStorage.setItem("demoSurvey", JSON.stringify(survey.data));
    this.setState({ demoComplete: true });
  };

  generateSurvey() {
    return this.state.acknowledged ? <Survey /> : null;
  }

  generateDemoSurvey() {
    return this.state.loadSurvey
      ? <SurveyForm.Survey
          model={this.model}
          css={{ navigationButton: "btn btn-sm" }}
          onComplete={this.handleDemoSurveyCompletion}
        /> : null;
  }

  generateIntro() {
    return (
      <div className="survey-container">
      <style jsx>{ styles }</style>
        <h3>Ok! Let's measure your SVO</h3>
        <p>
          The following tasks involve allocating a payoff between you and
          another person. You can think of the other person as someone you might
          encounter randomly on the street. The person isn't especially well-off
          or especially needy and there's nothing otherwise special about the
          circumstances.
        </p>
        <p>
          Your task is to adjust the slider below to the allocation between you
          and the other person that you most prefer.
        </p>
        <p>
          The numbers at the slider handle represent the current allocation. The
          numbers at the end represent the range of possible allocations. Once
          you've adjusted the slider to your preferred allocation press the
          Submit button.
        </p>
        <div className="btn btn-primary" onClick={this.handleAcknowledgement}>Got it!</div>
      </div>
    );
  }

  render() {
    let survey = this.generateSurvey();
    let modal = !this.state.demoComplete && this.state.survey
      ? this.generateDemoSurvey() : !this.state.acknowledged 
      ? this.generateIntro() : null;

    return (
      <div>
        <Meta />
        <div className="survey-page-container">
        <style jsx>{ styles }</style>
          <Nav />
          <ReactModal
            isOpen={!this.state.acknowledged}
            onRequestClose={this.handleRequestClose}
            contentLabel={"Modal"}
            style={{ content: content, overlay: overlay }}
          >
            {modal}
          </ReactModal>
          <div className="survey-contain">
            {survey}
          </div>
        </div>
      </div>
    );
  }
}

const content = {
  position: "",
  width: "450px",
  height: "500px",
  font: "18px sans-serif"
};

const overlay = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center"
};
