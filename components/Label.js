import React from "react";
import { styles } from "../styles/label";

export default class Label extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <style jsx>
          {styles}
        </style>
        <div className="label-container">
          <div className="recipient">
            <p className="recipient-label">You Receive</p>
            <p className="recipient-amount">
              {Math.round(this.props.data[0])}
            </p>
          </div>
          <div className="recipient">
            <p className="recipient-label">Other receives</p>
            <p className="recipient-amount">
              {Math.round(this.props.data[1])}
            </p>
          </div>
        </div>
      </div>
    );
  }
}
