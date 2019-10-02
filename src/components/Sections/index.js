import React from "react"

import { graphql, useStaticQuery } from "gatsby"
import GImg from "gatsby-image"

import Loadable from "react-loadable"
import styled from "styled-components"
import { Title } from "../../components/styles/FlakeTheme"

// import Testimonials from './Testimonials'
import AboutSection from "./About"
import AccordianSection from "./Accordion"
import Promotions from "./Promotions"
import ContactForm from "../ContactForm"

import { slugify } from "../../utils/text-helpers"

//* Load Gallery
const Gallery = Loadable({
  loader: () => import("./MasonryGallery"),
  loading: () => <div>Loading...</div>,
})

//* Load Testimonials
const Testimonials = Loadable({
  loader: () => import("./Testimonials"),
  loading: () => <div>Loading...</div>,
})

const SectionsStyledWrapper = styled.div`
  & > section {
    margin: 0;
    padding: 70px 0;
    &:nth-child(2n) {
      background-color: ${props => props.theme.light};
    }

    &.dark-bg {
      background: ${props => props.theme.dark};
      color: ${props => props.theme.light};
    }
  }
`

export default () => {
  let data = useStaticQuery(graphql`
    {
      allMarkdownRemark(
        filter: { frontmatter: { title: { eq: "Landing Page" } } }
      ) {
        edges {
          node {
            id
            frontmatter {
              title
              fimage {
                childImageSharp {
                  id
                }
              }
              sections {
                title
                type
                description
                paragraph
                image {
                  childImageSharp {
                    fluid(maxWidth: 1200) {
                      ...GatsbyImageSharpFluid_withWebp
                    }
                  }
                }
                gallery {
                  image {
                    childImageSharp {
                      fluid(maxWidth: 1200) {
                        ...GatsbyImageSharpFluid_withWebp
                      }
                    }
                  }
                }
                collapsibles {
                  header
                  body
                }
                accordion_image {
                  childImageSharp {
                    fluid(maxWidth: 1200) {
                      ...GatsbyImageSharpFluid_withWebp
                    }
                  }
                }

                testimonials {
                  author
                  testimonial
                }
                promotions {
                  title
                  description
                }
              }
            }
          }
        }
      }

      file(relativePath: { eq: "opengraph.jpeg" }) {
        childImageSharp {
          id
          fluid {
            ...GatsbyImageSharpFluid_withWebp
          }
        }
      }
    }
  `)

  let { sections } = data.allMarkdownRemark.edges[0].node.frontmatter

  return (
    <SectionsStyledWrapper className="sections">
      {sections.map((section, i) => {
        console.log(`Section ${i} is:`)
        console.log(section)

        if (section.type === "about") {
          let aboutImage = (
            <GImg
              fluid={section.image.childImageSharp.fluid}
              style={{ flex: 1, maxHeight: "400px" }}
              imgStyle={{ objectFit: "contain" }}
            />
          )
          return (
            <React.Fragment key={i}>
              <AboutSection
                title={section.title}
                image={aboutImage}
                description={section.description}
              />
            </React.Fragment>
          )
        }

        if (section.type === "accordion") {
          let accordionImage = (
            <GImg fluid={section.accordion_image.childImageSharp.fluid} />
          )

          return (
            <AccordianSection
              title={section.title}
              collapsibles={section.collapsibles}
              image={accordionImage}
            />
          )
        }

        if (section.type === "gallery")
          return (
            <section id={slugify(section.title)}>
              <Title>{section.title}</Title>
              <Gallery
                gallery_imgs={section.gallery.map((gallery_item, i) => (
                  <GImg
                    key={i}
                    fluid={gallery_item.image.childImageSharp.fluid}
                    imgStyle={{ objectFit: "contain" }}
                    style={{ maxHeight: "100%", maxWidth: "100%" }}
                  />
                ))}
              />
            </section>
          )

        if (section.type === "testimonials")
          return (
            <section id={slugify(section.title)} className="dark-bg">
              <Testimonials testimonials={section.testimonials} />
            </section>
          )

        if (section.type === "promotions")
          return (
            <section id={slugify(section.title)} className="dark-bg">
              <Promotions promotions={section.promotions} />
            </section>
          )
        else return <React.Fragment key={i}>?</React.Fragment>
      })}
      <section id="contact-form" style={{ background: "none" }}>
        <ContactForm />
      </section>
    </SectionsStyledWrapper>
  )
}
