import React from "react";
import Meta from "../components/Meta";
import Nav from "../components/Nav";
import Survey from "../components/Survey";
import { styles } from "../styles/about";
import { LEAD_RESEARCHER, LEAD_RESEARCHER_EMAIL } from "../config";

export default class SurveyPage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <style jsx>
          {styles}
        </style>
        <Meta />
        <div className="about-container">
          <Nav />
          <div className="content">
            <div className="text">
              <h2>About the Project</h2>
              <p>
                This application part of research project on social value
                orientation. { LEAD_RESEARCHER } is the primary
                researcher. Please reach out to him with any questions or
                feedback <a href={ LEAD_RESEARCHER_EMAIL }>here</a>.
              </p>
              <h2>Data Privacy</h2>
              <p>
                The data associated with this survey is anonymous.
                Only the research team will see information
                associated with application. Most data is stored on your
                computer and only communicated once over a secure connection.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
