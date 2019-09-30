import { graphql, useStaticQuery } from "gatsby"

import styled from "styled-components"

let dark = "#222",
  light = "#F7F7F7",
  primary = "#0264D7"

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

export const Title = styled.h2`
  text-align: center;
  font-weight: bold;
  padding-bottom: 40px;
  color: ${props => props.theme.primary};

  span {
    padding: 0 10px;
  }
`
