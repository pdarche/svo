import React from "react";
import ReactGA from "react-ga";
import ReactModal from "react-modal";
import { ANALYTICS_TRACKING_ID } from "../config";
import { styles } from "../styles/status";

export default class Status extends React.Component {
  constructor(props) {
    super(props);
    this.state = { info: false };
    if (process.browser) {
      ReactGA.initialize(ANALYTICS_TRACKING_ID);
    }
  }

  openModal = () => {
    ReactGA.event({
      category: "User",
      action: "Opened the help instructions"
    });
    this.props.onInstructionEvent("instructions.opened");
    this.setState({ info: true });
  }

  handleRequestClose = () => {
    ReactGA.event({
      category: "User",
      action: "Closed the help instructions"
    });
    this.props.onInstructionEvent("instructions.closed");
    this.setState({ info: false });
  }

  generateModal() {
    return (
      <div>
        <p>
          Below, you see a slider. You can change the slider to adjust the
          amount of money you and the other person will receive.
        </p>
        <p>
          The numbers at the ends of the slider show the range of possible
          distributions for you and the other person.
        </p>
        <p>
          Once you have moved the slider to the distribution you most prefer
          press the Submit button.
        </p>
      </div>
    )
  }

  render() {
    let modalContent = this.generateModal()

    return (
      <div className="status-container">
        <style jsx>
          {styles}
        </style>
        <ReactModal
          isOpen={this.state.info}
          onRequestClose={this.handleRequestClose}
          contentLabel={"Modal"}
          style={{ content: content, overlay: overlay }}
          >
          {modalContent}
        </ReactModal>

        <div className="heading">
          <h1>
            Task {this.props.n} of 15
          </h1>
          <span onClick={this.openModal}>
            instructions
          </span>
        </div>
      </div>
    );
  }
}

const overlay = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center"
  // backgroundColor: 'rgba(255,255,255,.9)'
};

const content = {
  position: "",
  width: "450px",
  height: "250px",
  font: "18px sans-serif"
};

