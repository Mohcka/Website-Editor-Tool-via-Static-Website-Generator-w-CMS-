import { graphql, useStaticQuery } from "gatsby"
let dark = "#222",
  light = "#F7F7F7",
  primary = "#0064D7"
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
  },
  titleStyle: {
    padding: "0 10px",
    color: primary,
    borderBottom: `3px solid ${primary}`,
  },
}
