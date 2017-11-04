import React from "react";
import PouchDB from "pouchdb-browser";
//import ReactGA from 'react-ga'
import Nav from "../components/Nav";
import Results from "../components/Results";
//import { ANALYTICS_TRACKING_ID } from '../config'
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
    // Analytics
    const page = window.location.pathname;

    // Get some info from local storage
    let sessionId = window.localStorage.getItem("sessionId");
    let browser = JSON.parse(window.localStorage.getItem("browser"));
    let ip = window.localStorage.getItem("ip");

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
        return this.localDB.put(doc);
      })
      .catch(err => console.log(err));

    // Sync the results and then destroy the data
    //this.localDB.sync(this.remoteDB).on('complete', () => {
    this.db.destroy()
    //  ReactGA.event({
    //    category: 'User',
    //    action: 'Synched data'
    //  });
    //})
  }

  render() {
    return (
      <div>
        <style jsx>
          {styles}
        </style>
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
