import css from 'styled-jsx/css'

export const styles = css`
  .nav-container {
    position: absolute;
    top: 0px;
    left: 0;
    width: 100%;
    padding: 0px;
    height: 40px;
    display: flex;
    flex-direction: row;
    align-items: center;
    font: 12px sans-serif;
  }

  .nav-container a:first-child {
    margin-left: 40px;
  }

  .nav-container a {
    margin: 0px 5px;
    text-decoration: none;
    color: rgba(0;0;0;.4)
  }

  a:hover {
    color: rgb(0;0;0)
  }
`
