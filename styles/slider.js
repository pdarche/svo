import css from 'styled-jsx/css'

export const styles = css.global`
  .slider-container2 {
    display: flex;
    justify-content: center;
    margin: 20px 0px;
  }

  .ticks, .label {
    font: 16px sans-serif;
    text-anchor: middle
  }

  .track, .track-inset, .track-overlay {
    stroke-linecap: round
  }

  .track {
    stroke: #000;
    stroke-opacity: 0.3;
    strokeWidth: 5px
  }

  .track-overlay {
    pointer-events: stroke;
    strokeWidth: 20px
  }

  .handle {
    fill: #fff;
    stroke: #000;
    stroke-opacity: 0.5;
    stroke-width: 1.25px;
    cursor: grab;
  }

  .handle:active {
    cursor: grabbing
  }
`
