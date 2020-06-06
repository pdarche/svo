import React from "react";
import PouchDB from "pouchdb-browser";
//import ReactGA from 'react-ga'
import Meta from "../components/Meta";
import Nav from "../components/Nav";
import Results from "../components/Results";
import { ANALYTICS_TRACKING_ID, FIREBASE_URL } from '../config'
import { styles } from "../styles/results";
import { Database } from "../utils/db";


export default class ResultsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      svo: 0,
      type: "(computing)",
      sessionId: null
    };

    if (process.browser) {
      this.db = new Database(window);
    }
  }

  componentDidMount() {
    const sessionId = window.localStorage.getItem("sessionId");

    if (!sessionId) {
      confirm("Sorry, you must take the survey before reviewing results")
      window.location = "/survey"
    }

    // Get the SVO score to show the user
    let doc = this.db.getResponse(sessionId)
      .then(doc => {
        this.setState({
          svo: Math.round(doc.svo),
          type: doc.type,
          sessionId: sessionId
        });
      })
      .then(res => {
        return this.db.sync(sessionId);
      })
      .then(res => {
        return this.db.destroy(window);
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div>
        <style jsx>
          {styles}
        </style>
        <Meta />
        <Nav />
        <div className="results">
          <div className="content">
            <h1>
              Your SVO is: {this.state.svo}&deg;
            </h1>
            <p>
              That means you're <strong>{this.state.type}</strong>
            </p>
            <div className="results-container">
              <Results width={400} height={400} svo={this.state.svo} />
            </div>
            <div className="survey-info">
              <p>
                Survey Id: {this.state.sessionId}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

