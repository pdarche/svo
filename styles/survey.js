import css from 'styled-jsx/css'

export const styles = css`
  .survey-page-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 90vh;
  }

  .survey-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    padding: 10px;
    margin: 0px auto;
  }

  .button {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
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

  .survey-container .labels {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin: 10px 0px
    width: 500px;
  }
`
