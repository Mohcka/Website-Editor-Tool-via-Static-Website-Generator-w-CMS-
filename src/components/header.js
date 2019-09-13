import { html, render } from "lit-html"

import PropTypes from "prop-types"
import React, { useEffect } from "react"
import { Link } from "gatsby"
import { useStaticQuery, graphql } from "gatsby"
import Helmet from "react-helmet"

import "./Header.scss"
import styleVars from "./styles/variables"

import CarouselWidget from "./CarouselWidget"

import { slugify } from "../utils/text-helpers"

console.log(styleVars.dark)
const Actions = props => {
  return (
    <div style={styleVars.darkBackground}>
      <div
        className="actions"
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          maxWidth: "1000px",
          margin: "0 auto",
        }}
      >
        <div className="contact-info">
          <ul>
            <li>
              <div className="address">
                <i class="fas fa-map-marker-alt"></i> 123 Test St
              </div>
            </li>
            <li>
              <div className="phone">
                <i class="fas fa-phone"></i> +1 800 888 8888
              </div>
            </li>
            <li>
              <div className="email">
                <i class="fas fa-envelope"></i> test@email.com
              </div>
            </li>
          </ul>
        </div>
        <div className="social-medias">
          <ul>
            <li>
              <div className="fb-icon icon">
                <i class="fab fa-facebook-square"></i>
              </div>
            </li>
            <li>
              <div className="fb-icon icon">
                <i class="fab fa-google-plus"></i>
              </div>
            </li>
            <li>
              <div className="fb-icon icon">
                <i class="fab fa-instagram"></i>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

const Navbar = props => {
  const data = useStaticQuery(graphql`
    {
      allMarkdownRemark {
        edges {
          node {
            frontmatter {
              sections {
                title
              }
            }
          }
        }
      }
    }
  `)

  const sections = data.allMarkdownRemark.edges[0].node.frontmatter.sections

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light">
        <a href="#home" className="navbar-brand" style={{ fontSize: "2rem" }}>
          Company Name
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarContent"
          aria-controls="navbarContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarContent">
          <ul
            className="navbar-nav ml-auto"
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <li className="nav-item">
              <a href="#home" className="nav-link">
                HOME
              </a>
            </li>
            {sections.map((section, i) => (
              <li key={i} className="nav-item">
                <a href={`#${slugify(section.title)}`} className="nav-link">
                  {section.title.toUpperCase()}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </>
  )
}

const Header = ({ siteTitle }) => {
  return (
    <header id="home" style={{}}>
      {/* <div
        style={{
          margin: `0 auto`,
          maxWidth: 960,
          padding: `1.45rem 1.0875rem`,
        }}
      >
        <h1 style={{ margin: 0 }}>
          <Link
            to="/"
            style={{
              color: `white`,
              textDecoration: `none`,
            }}
          >
            {siteTitle}
          </Link>
        </h1>
        
      </div> */}
      <Actions />
      <Navbar />
      <CarouselWidget />
    </header>
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
