import React from "react";
import Link from "next/link";
import { styles } from "../styles/nav";

export default class Nav extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <style jsx>
          {styles}
        </style>
        <div className="nav-container">
          <Link prefetch href="/">
            <a>Home</a>
          </Link>
          <Link prefetch href="/survey">
            <a>Survey</a>
          </Link>
          <Link prefetch href="/about">
            <a>About / Privacy</a>
          </Link>
        </div>
      </div>
    );
  }
}
