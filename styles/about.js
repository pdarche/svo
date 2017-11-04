import css from 'styled-jsx/css';

export const styles = css`
  .about-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 90vh;
  }
  
  .about-container .content {
     display: flex;
     flex-direction: column;
     justify-content: center;
     align-items: center;
     width: 960px;
     height: 500px;
   }
   
  .about-container .text {
     width: 500px;
     font: 16px sans-serif;
   }
`
