import css from 'styled-jsx/css';

export const styles = css`
  .container {
    display: flex;
    justify-content: center;
    margin: 0px 0px;
  }

  .ticks, .label {
    font: 16px sans-serif;
    text-anchor: middle
  }

  .tick line {
    opacity: .1;
    stroke-dasharray: "3,3"
  }

  .track, .track-inset, .track-overlay {
    stroke-linecap: round
  };

  .track {
    stroke: #000;
    stroke-opacity: 0.3;
    stroke-width: 5px;
  }

  .track-overlay {
    pointer-events: stroke;
    stroke-width: 20px;
    cursor: grab;
  }

  .handle {
    fill: #fff;
    stroke: #000;
    stroke-opacity: 0.5;
    stroke-width: 1.25px;
  }

  .track-overlay:active: {
    cursor: grabbing
  }
`
