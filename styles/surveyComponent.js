import css from 'styled-jsx/css'

export const styles = css`
  .survey-component-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    width: 960px;
    height: 500px;
    padding: 10px;
    margin: 0px auto;
  }

 .button {
    border: 1px solid #333;
    width: 140px;
    height: 30px;
    background-color: white;
    border-radius: 5px;
  }

  .button:hover {
    background-color: #ccc;
    cursor: pointer
  }

  .survey-component-container .labels {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin: 10px 0px
    width: 500px;
  }
`
