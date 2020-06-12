import css from 'styled-jsx/css'

export const styles = css.global`
  .bar-container2 {
    border: 1px solid #ccc;
    margin: 0px 20px 0px 0px;
    border-sizing: border-box;
    width: 220px;
    height: 100px;
  }

  .bar-container2 .scale {
    height: 10px
  }

  .bar-container2 .scale-line {
    stroke: #000;
    stroke-opacity: 0.2;
    stroke-width: 2px;
  }

  .bar-container2 .bar {
    fill: #4A6FA5
  }

  .bar-container2 .label {
    font: 10px sans-serif;
    alignment-baseline: central
  }
`
