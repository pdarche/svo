import css from 'styled-jsx/css'

export const styles = css`
  .container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 90vh;
  }
  
  h1 {
    width: 500px;
    font: 35px sans-serif;
    font-weight: bold;
    margin-bottom: 5px;
  }

  .description {
    margin: 5px 0px 25px 0px;
    width: 500px;
  }

  p {
    font: 16px sans-serif;
  }

  .button {
    width: 200px;
    height: 50px;
    font: 14px sans-serif;
    color: white;
    background-color: #3b5998;
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    border-radius: 10px;
  }
  
  .button a {
    padding: 30px;
    font: 14px sans-serif;
    color: white;
    margin: 0px auto;
    text-decoration: none;
  }
  
  .button a:hover {
    cursor: pointer;
  }
`

