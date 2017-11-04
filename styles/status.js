import css from 'styled-jsx/css'

export const styles = css`
  .status-container {
    width: 500px;
  }

  .status-container p {
    width: 500px
  }

  .heading {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    width: 500px;
  }

  .heading h1 {
    font: 30px sans-serif;
    font-weight: bold;
    margin: 10px 0px;
  }

  .heading span {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 30px;
    font-size: 18px;
    color: #aaa;
    margin: 20px 0px;
  }

  .heading span:hover {
    cursor: pointer;
    color: #333
  }
`

