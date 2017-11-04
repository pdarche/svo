import css from 'styled-jsx/css';

export const styles = css`
  .results {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 90vh;
  }
  
  .results h1 {
    width: 500px;
    font: 30px sans-serif;
    font-weight: bold;
    margin-bottom: 5px;
    text-align: center;
  }
  
  .results .description {
    margin: 5px 0px 25px 0px;
    width: 500px;
  }
  
  .results-container p {
    font: 16px sans-serif;
  }
  
  .results-container div {
    margin: 0px;
  }
  
  .content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 960px;
    height: 500px;
  }
  
  .survey-info {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin: 10px 0px;
    width: 500px;
  }
  
  .survey-info p {
    font-size: 10;
    color: #333
  }
`
