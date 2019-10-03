import PropTypes from "prop-types"
import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import GImg from "gatsby-image"
import { Nav, Navbar as BSNavbar, Carousel } from "react-bootstrap"

import styled from "styled-components"
import Color from "color"
import FlakeTheme, {breakPoints} from "./styles/FlakeTheme"

// import CarouselWidget from "./CarouselWidget"

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

  @media only screen and (max-width: ${breakPoints.md}px) {
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

  span {
    color: ${props => props.theme.light};
    border-radius: 5px;
    padding: 0 3px;
    transition: color 0.2s, background-color 0.2s;

    &:hover {
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
              <i className="fas fa-map-marker-alt"></i>{" "}
              {props.social_info.contact_info.address}
            </div>
          </li>
          <li>
            <div className="phone">
              <i className="fas fa-phone"></i>{" "}
              {props.social_info.contact_info.phone}
            </div>
          </li>
          <li>
            <div className="email">
              <i className="fas fa-envelope"></i>{" "}
              {props.social_info.contact_info.email}
            </div>
          </li>
        </ul>
      </div>
      <div className="social-medias">
        <ul>
          {Object.keys(props.social_info.social_media).map(s => {
            let sm = props.social_info.social_media
            if (sm[s].url)
              return (
                <li>
                  <SocialMediasStyledWrapper className={`${s.type}-icon icon`}>
                    <a
                      href={`${s.url}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span
                        dangerouslySetInnerHTML={{ __html: sm[s].icon }}
                      ></span>
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

Actions.propTypes = {
  social_info: PropTypes.shape({
    contact_info: PropTypes.shape({
      address: PropTypes.string,
      phone: PropTypes.string,
      email: PropTypes.string,
    }),
    social_media: PropTypes.arrayOf(
      PropTypes.shape({
        icon: PropTypes.string,
        url: PropTypes.string,
      })
    ),
  }),
}

const Navbar = props => (
  <>
    <BSNavbar bg="light" expand="lg">
      <BSNavbar.Brand
        href="#home"
        style={{
          fontWeight: "bold",
          fontSize: "1.7em",
          color: FlakeTheme.primary,
        }}
      >
        Placeholder
      </BSNavbar.Brand>
      <BSNavbar.Toggle aria-controls="basic-navbar-nav" />
      <BSNavbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          {props.pages.sections.map((section, i) => (
            <Nav.Link key={i} href={`#${slugify(section.title)}`}>
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

const CarouselStyledWrapper = styled.div`
  .image-wrapper {
    position: relative;
    &::before {
      content: "";
      position: absolute;
      height: 100%;
      width: 100%;
      opacity: 0.3;
      top: 0;
      left: 0;
      background-color: ${props =>
        Color(props.theme.primary)
          .darken(0.5)
          .hex()};
      z-index: 1;
    }
  }

  .carousel-indicators li {
    background-color: ${props => props.theme.primary};
  }
`

const Header = () => {
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
                facebook {
                  icon
                  url
                }
                google_plus {
                  icon
                  url
                }
                github {
                  icon
                  url
                }
                instagram {
                  icon
                  url
                }
                twitter {
                  icon
                  url
                }
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
                title
                subtitle
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

  console.log(
    Object.keys(data.social_info.edges[0].node.frontmatter.social_media)
  )
  return (
    <header id="home">
      <Actions social_info={data.social_info.edges[0].node.frontmatter} />
      <Navbar pages={data.pages.edges[0].node.frontmatter} />
      {/* <CarouselWidget themeColor={FlakeTheme.primary} /> */}
      <CarouselStyledWrapper>
        <Carousel>
          {data.pages.edges[0].node.frontmatter.carousel.map((slide, i) => {
            return (
              <Carousel.Item key={i}>
                <div
                  style={{
                    height: "700px",
                  }}
                >
                  <div
                    className="image-wrapper"
                    style={{ height: "100%", width: "100%", display: "flex" }}
                  >
                    <GImg
                      fluid={slide.image.childImageSharp.fluid}
                      style={{ flex: 1 }}
                      imgStyle={{
                        objectFit: "cover",
                      }}
                    />
                  </div>
                  <Carousel.Caption>
                    <h3 style={{ fontSize: "2rem" }}>{slide.title}</h3>
                    <p style={{ fontSize: "1.5rem" }}>{slide.subtitle}</p>
                  </Carousel.Caption>
                </div>
              </Carousel.Item>
            )
          })}
        </Carousel>
      </CarouselStyledWrapper>
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
