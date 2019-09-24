import PropTypes from "prop-types"
import React, { useEffect } from "react"
import { Link } from "gatsby"
import { useStaticQuery, graphql } from "gatsby"
import Helmet from "react-helmet"

import styled from "styled-components"
import FlakeTheme from "./styles/FlakeTheme"
// import "./Header.scss"

import CarouselWidget from "./CarouselWidget"

import { slugify } from "../utils/text-helpers"

const StyledActions = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 80%;
  margin: 0 auto;
  font-size: 1.2rem;

  .contact-info,
  .social-medias {
    ul {
      display: flex;
      margin: 0 5px;
    }

    li {
      margin: 0 5px;
    }
  }

  @media only screen and (max-width: 600px) {
    flex-direction: column;

    .contact-info ul {
      display: flex;
      flex-direction: column;

      li {
        margin: 3px 0;
      }
    }

    .social-medias ul {
      display: flex;
      justify-content: center;
      font-size: 1.2rem;
      li {
        margin: 0 10px;
      }
    }
  }
`

const SocialMediasStyledWrapper = styled.div`
  cursor: pointer;

  span{
    color: ${props => props.theme.light}
    border-radius: 5px;
    padding: 0 3px;
    transition: color .2s, background-color .2s;

    &:hover{
    color: ${props => props.theme.dark};
    background-color: ${props => props.theme.light};
    }
  }
`

const Actions = props => (
  <div style={FlakeTheme.darkBackground}>
    <StyledActions className="actions">
      {/* Contacts List */}
      <div className="contact-info">
        <ul>
          <li>
            <div className="address">
              <i class="fas fa-map-marker-alt"></i>{" "}
              {props.social_info.contact_info.address}
            </div>
          </li>
          <li>
            <div className="phone">
              <i class="fas fa-phone"></i>{" "}
              {props.social_info.contact_info.phone}
            </div>
          </li>
          <li>
            <div className="email">
              <i class="fas fa-envelope"></i>{" "}
              {props.social_info.contact_info.email}
            </div>
          </li>
        </ul>
      </div>
      <div className="social-medias">
        <ul>
          {props.social_info.social_media.map(s => {
            if (s.url)
              return (
                <li>
                  <SocialMediasStyledWrapper className={`${s.type}-icon icon`}>
                    <a href={`${s.url}`} rel="noreferrer" target="_blank">
                      <span dangerouslySetInnerHTML={{ __html: s.icon }}></span>
                    </a>
                  </SocialMediasStyledWrapper>
                </li>
              )
          })}
        </ul>
      </div>
    </StyledActions>
  </div>
)

const Navbar = props => (
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
          {props.pages.sections.map((section, i) => (
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

Navbar.propTypes = {
  pages: PropTypes.object.isRequired,
}

const Header = ({ siteTitle }) => {
  const data = useStaticQuery(graphql`
    {
      social_info: allMarkdownRemark(
        filter: { frontmatter: { title: { eq: "Settings" } } }
      ) {
        edges {
          node {
            frontmatter {
              contact_info {
                address
                email
                phone
              }
              social_media {
                url
                type
                icon
              }
            }
          }
        }
      }

      pages: allMarkdownRemark(
        filter: { frontmatter: { title: { eq: "Landing Page" } } }
      ) {
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

  return (
    <header id="home" style={{}}>
      <Actions social_info={data.social_info.edges[0].node.frontmatter} />
      <Navbar pages={data.pages.edges[0].node.frontmatter} />
      <CarouselWidget themeColor={FlakeTheme.primary} />
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
