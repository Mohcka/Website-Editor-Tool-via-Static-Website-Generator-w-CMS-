import React from "react"
import { Link, graphql } from "gatsby"
import GImg from "gatsby-image"
// import GImgIE

import {
  Container,
  Row,
  Col,
  Image as BSImage,
  Card,
  Accordion,
  Button,
} from "react-bootstrap"

import styled from "styled-components"
import FlakeTheme from "../components/styles/FlakeTheme"
import varStyles, { Title } from "../components/styles/FlakeTheme"

import { useAccordionToggle } from "react-bootstrap/AccordionToggle"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"

import Sections, {AccordianSection} from "../components/Sections"

import ContactForm from "../components/ContactForm"


const IndexPage = ({ data }) => {
  console.log(data)

  return (
    <Layout>
      <SEO title="Home" />
      <Sections data={data} />
      <AccordianSection data={data} />
      <ContactForm />
    </Layout>
  )
}

export const query = graphql`
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
              description
              image {
                childImageSharp {
                  fluid(maxWidth: 400) {
                    ...GatsbyImageSharpFluid_withWebp_noBase64
                  }
                }
              }
              title
              type
              paragraph
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
`

export default IndexPage
