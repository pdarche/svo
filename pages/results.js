import React from "react";
import PouchDB from "pouchdb-browser";
//import ReactGA from 'react-ga'
import Meta from "../components/Meta";
import Nav from "../components/Nav";
import Results from "../components/Results";
import { ANALYTICS_TRACKING_ID, FIREBASE_URL } from '../config'
import { styles } from "../styles/results";


export default class ResultsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      svo: 0,
      type: "(computing)",
      sessionId: null
    };
    if (process.browser) {
      this.db = new PouchDB("response");
    }
  }

  componentDidMount() {
    let sessionId = window.localStorage.getItem("sessionId");
    let browser = JSON.parse(window.localStorage.getItem("browser"));
    let ip = window.localStorage.getItem("ip");

    if (!sessionId) {
      let res = confirm("Sorry, you must take the survey before reviewing results")
      window.location = "/survey"
    }

    // Get the SVO score and update the local db
    this.db
      .get(sessionId)
      .then(doc => {
        this.setState({
          svo: Math.round(doc.svo),
          type: doc.type,
          sessionId: sessionId
        });
        doc.browser = browser;
        doc.ip = ip;
        return this.db.put(doc);
      })
      .then((res) => {
        return this.db.get(sessionId)
      })
      .then(doc => {
        // Sync the results and then destroy the data
        return fetch(FIREBASE_URL, {
          method: 'POST',
          body: JSON.stringify(doc)
        })
      })
      .then((res) => {
        this.db.destroy()
        window.localStorage.removeItem("sessionId")
        //this.setState({synced: true})
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
