/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import Helmet from "react-helmet"

import Head from "./Head"
import Header from "./Header"
import "bootstrap/dist/css/bootstrap.min.css"
import "@fortawesome/fontawesome-free/css/all.min.css"
import { ThemeProvider } from "styled-components"
import FlakeTheme, {GlobalStyle} from "./styles/FlakeTheme"

const Layout = ({ children }) => {
  // const data = useStaticQuery(graphql`
  //   query SiteTitleQuery {
  //     site {
  //       siteMetadata {
  //         title
  //       }
  //     }
  //   }
  // `)

  const data = useStaticQuery(graphql`
    {
      site {
        siteMetadata {
          title
        }
      }
      allMarkdownRemark(
        filter: { frontmatter: { title: { eq: "Settings" } } }
      ) {
        edges {
          node {
            frontmatter {
              css
              js
              primary_color
            }
          }
        }
      }
    }
  `)

  FlakeTheme.primary = data.allMarkdownRemark.edges[0].node.frontmatter.primary_color

  return (
    <ThemeProvider theme={FlakeTheme}>
      <div>
        <GlobalStyle />
        <Head />
        <Header siteTitle={data.site.siteMetadata.title} />
        <div style={{}}>
          <main>{children}</main>
          <footer>© {new Date().getFullYear()}</footer>
        </div>
        <Helmet>
          <style>
            {`${data.allMarkdownRemark.edges[0].node.frontmatter.css}`}
          </style>
          <script>
            {`${data.allMarkdownRemark.edges[0].node.frontmatter.js}`}
          </script>
        </Helmet>
      </div>
    </ThemeProvider>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
