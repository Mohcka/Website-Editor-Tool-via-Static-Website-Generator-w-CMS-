import styled from "styled-components"

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