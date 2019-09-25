import PropTypes from "prop-types"
import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import GImg from "gatsby-image"
import { Nav, Navbar as BSNavbar, Carousel } from "react-bootstrap"

import styled from "styled-components"
import FlakeTheme from "./styles/FlakeTheme"

import CarouselWidget from "./CarouselWidget"

import { slugify } from "../utils/text-helpers"

const StyledActions = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 80%;
  margin: 0 auto;
  font-size: 1rem;

  .contact-info,
  .social-medias {
    ul {
      display: flex;
      margin: 0 5px;
    }

    li {
      margin: 0 10px;
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
    <BSNavbar bg="light" expand="lg">
      <BSNavbar.Brand href="#home">Company Name</BSNavbar.Brand>
      <BSNavbar.Toggle aria-controls="basic-navbar-nav" />
      <BSNavbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          {props.pages.sections.map((section, i) => (
            <Nav.Link href={`#${slugify(section.title)}`}>
              {section.title.toUpperCase()}
            </Nav.Link>
          ))}
        </Nav>
      </BSNavbar.Collapse>
    </BSNavbar>
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
              carousel {
                image {
                  childImageSharp {
                    fluid(maxWidth: 1900) {
                      ...GatsbyImageSharpFluid_withWebp
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  `)

  console.log()

  return (
    <header id="home" style={{}}>
      <Actions social_info={data.social_info.edges[0].node.frontmatter} />
      <Navbar pages={data.pages.edges[0].node.frontmatter} />
      {/* <CarouselWidget themeColor={FlakeTheme.primary} /> */}
      <Carousel>
        {data.pages.edges[0].node.frontmatter.carousel.map(image => {
          console.log(image)
          return (
            <Carousel.Item>
              <div
                style={{
                  height: "700px",
                  display: "flex",
                }}
              >
                <GImg
                  fluid={image.image.childImageSharp.fluid}
                  style={{ flex: 1 }}
                  imgStyle={{
                    objectFit: "cover"
                  }}
                />
                <Carousel.Caption>
                  <h3>First slide label</h3>
                  <p>
                    Nulla vitae elit libero, a pharetra augue mollis interdum.
                  </p>
                </Carousel.Caption>
              </div>
            </Carousel.Item>
          )
        })}
      </Carousel>
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
