import React from "react";
import Link from "next/link";
import PouchDB from "pouchdb-browser";
import Nav from "../components/Nav";
import { styles } from "../styles/index";

export default class IndexPage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <style jsx>
          {styles}
        </style>
        <Nav />
        <div className="container">
          <h1>What's your Social Value Orientation?</h1>
          <div className="description">
            <p>
              We all relate to people a little differently. Some like to put
              others before themselves. Some enjoy coming out on top in
              competition. And others fall somewhere in between. The&nbsp;
              <strong>
                <a
                  target="_blank"
                  href="https://en.wikipedia.org/wiki/Social_value_orientations"
                >
                  social value orientation
                </a>
              </strong>
              &nbsp;is a measure of where we fall on this scale from competitive to
              altruistic.
            </p>
            <p>
              The next page contains the tasks that make up the SVO. Your job is
              to move each of the sliders to the allocation between you and some
              other person that you most prefer. There are no right or wrong
              answers, this is all about personal preferences.
            </p>
            <p>
              Ready to find out your SVO? Click the button below to take the
              survey!
            </p>
          </div>
          <div className="button">
            <Link prefetch href="/survey">
              <a>Go to the survey!</a>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}
