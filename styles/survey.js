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
    margin-top: 5px;
    width: 140px;
    height: 30px;
    //border: 1px solid #333;
    border-radius: 5px;
  }

  .button:hover {
    background-color: white;
    color: #333;
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
