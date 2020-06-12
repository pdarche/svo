import css from 'styled-jsx/css'

export const styles = css.global`
  .label-container {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;

    padding: 0px 20px;
    margin: 0px 20px 0px 0px;
    border: 1px solid #ccc;

    height: 100px;
    width: 225px;
  }

  .recipient {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  };

  .recipient-label, .recipient-amount {
    font: 18px sans-serif;
    margin: 0px;
  }
`
