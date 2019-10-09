import styled, { createGlobalStyle } from "styled-components"
import Color from "color"

let dark = "#222",
  light = "#F7F7F7",
  primary = "#0264D7"

const breakPoints = {
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1140,
}

const device = {
  mobileSM: `(min-width: ${breakPoints.sm}px)`,
  mobileMD: `(min-width: ${breakPoints.md}px)`,
  desktopLG: `(min-width: ${breakPoints.lg}px)`,
  desktopXL: `(min-width: ${breakPoints.xl}px)`,
}

export default {
  dark: dark,
  light: light,
  primary: primary,
  darkBackground: {
    backgroundColor: dark,
    color: "white",
  },
  titleWrapperStyle: {
    textAlign: "center",
    fontWeight: "bold",
    padding: "40px 0",
  },
  titleStyle: {
    padding: "0 10px",
    color: dark,
  },
}
//TODO: Find a way to seperate boostrap overrides into it's own string literal

export const GlobalStyle = createGlobalStyle`
body{
  @import url('https://fonts.googleapis.com/css?family=Montserrat&display=swap');
  
    font-family: 'Montserrat', arial, helvetica, arial-black
        sans-serif;
}

* {
    margin: 0;
    padding: 0;
}

ul{
    margin: 0;
}

li{
    list-style: none;
    margin: 0;
}

// Override bootstrap styles
.btn.btn-primary {
    background: ${props => props.theme.primary};
    border-color: ${props => props.theme.primary}
    border-radius: 25px;

    &:hover{
      background: ${props =>
        Color(props.theme.primary)
          .darken(0.2)
          .hex()}
      border-color: ${props =>
        Color(props.theme.primary)
          .darken(0.2)
          .hex()}
    }
  }
//
@media only screen and (max-width: ${breakPoints.sm}px) {
  html {
    font-size: 100%;
  }
}
`

const Title = styled.h2`
  text-align: center;
  font-weight: bold;
  padding-bottom: 40px;
  color: ${props => props.theme.primary};

  span {
    padding: 0 10px;
  }
`

export { Title, breakPoints, device }
