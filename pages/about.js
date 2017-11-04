import React from "react";
import Nav from "../components/Nav";
import Survey from "../components/Survey";
import { styles } from "../styles/about";

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
        <div className="about-container">
          <Nav />
          <div className="content">
            <div className="text">
              <h2>About the Project</h2>
              <p>
                This application part of research project on social value
                orientation. The goal is to better understand what explains the
                variation orientations. Peter Darche is the primary 
                researcher. Please reach out to him with any questions or
                feedback <a href="mailto:pdarche@gmail.com">here</a>.
              </p>
              <h2>Data Privacy</h2>
              <p>
                The data associated with this survey is anonymous and will not
                be shared with anyone. Only the research team will see anything
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
