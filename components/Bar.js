import React from "react";
import * as d3 from "d3";
import { styles } from "../styles/bar";

export default class Bar extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this._create();
  }

  componentDidUpdate(ev) {
    let bars = d3.selectAll(".bar");
    let dims = this._dims(this.props);
    let x = this._scales(dims);
    this._update(bars, x, this.props);
  }

  _createLabel(slider, x, y, text) {
    let ul = slider
      .append("text")
      .attr("class", "label")
      .attr("x", x)
      .attr("y", y)
      .text(text);
  }

  _create() {
    let svg = d3.select(".comparison-chart");
    let dims = this._dims(this.props);
    let x = this._scales(dims);

    let barContainer = svg
      .append("g")
      .attr("class", "bar-container")
      .attr(
        "transform",
        "translate(" + dims.margin.left + "," + dims.height / 5.5 + ")"
      );

    let bars = barContainer
      .selectAll(".bar")
      .data(this.props.data)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("height", 20)
      .attr("y", function(d, i) {
        return 45 * i;
      })

    let scale = barContainer
      .insert("g", ".bar-container:first-child")
      .attr("class", "scale")
      .attr("transform", "translate(0, 32)");

    scale
      .append("line")
      .attr("class", "scale-line")
      .attr("x1", 7)
      .attr("x2", x(92))
      .attr("y", 2.5);

    scale.append("text").attr("class", "label").attr("x", 0).text(0);
    scale.append("text").attr("class", "label").attr("x", x(100)).text(100);

    this._update(bars, x, this.props);
  }

  _update(bars, x, props) {
    bars.data(props.data);
    bars.attr("width", function(d) {
      return x(d);
    });
  }

  _scales(dims) {
    let x = d3.scaleLinear().domain([0, 100]).range([0, dims.width]);

    return x;
  }

  _dims(props) {
    let margin = { right: 25, left: 25 },
      width = props.width - margin.left - margin.right,
      height = props.height,
      offset = 50;

    return { margin, width, height, offset };
  }

  render() {
    return (
      <div className="bar-container2">
        <style global jsx>
          {styles}
        </style>
        <svg
          className="comparison-chart"
          width={this.props.width}
          height={this.props.height}
        />
      </div>
    );
  }
}
