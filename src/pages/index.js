import React from "react"
import { Link, graphql } from "gatsby"
import GImage from "gatsby-image/withIEPolyfill"

import {
  Container,
  Row,
  Col,
  Image as BSImage,
  Card,
  Accordion,
} from "react-bootstrap"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"

import ContactForm from "../components/ContactForm"
import varStyles from "../components/styles/variables"

import { slugify } from "../utils/text-helpers"

const AboutSection = props => {
  return (
    <div
      className="about-section"
      id={`${slugify(props.section.title)}`}
      style={{ marginTop: "10px", ...props.style }}
    >
      <Container>
        <h2 style={varStyles.titleWrapperStyle}>
          <span style={varStyles.titleStyle}>{props.section.title}</span>
        </h2>
        <Row>
          <Col xl={6} lg={12}>
            <div
              className="image-container"
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                margin: "0 auto",
                height: "100%",
                maxWidth: "500px",
              }}
            >
              {/* <img
                src={`${props.section.image}`}
                alt=""
                style={{ alignSelf: "center" }}
              /> */}

              <BSImage src={`${props.section.image}`} fluid />
            </div>
          </Col>
          <Col xl={6} lg={12}>
            <div
              className="description"
              dangerouslySetInnerHTML={{ __html: props.section.description }}
            ></div>
            <div className="paragraph">{props.section.paragraph}</div>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

const ParagraphSection = props => (
  <div
    className="paragrpah-section"
    id={`${slugify(props.section.title)}`}
    style={props.style}
  >
    <h2 style={varStyles.titleWrapperStyle}>
      <span style={varStyles.titleStyle}>{props.section.title}</span>
    </h2>
    <div className="paragraph">
      <span>{props.section.paragraph}</span>
    </div>
  </div>
)

const AccordianSection = ({ data }) => (
  <>
    <Row>
      <Col xs={12} lg={6}>
        <div className="image">
          <GImage
            fluid={data.file.childImageSharp.fluid}
            objectFit="cover"
            objectPosition="50% 50%"
            alt=""
          />
        </div>
      </Col>
      <Col xs={12} lg={6}>
        <div className="accordian">
          <Accordion defaultActiveKey="0">
            <Card>
              <Accordion.Toggle as={Card.Header} eventKey="0">
                Click me!
              </Accordion.Toggle>
              <Accordion.Collapse eventKey="0">
                <Card.Body>Hello! I'm the body</Card.Body>
              </Accordion.Collapse>
            </Card>
            <Card>
              <Accordion.Toggle as={Card.Header} eventKey="1">
                Click me!
              </Accordion.Toggle>
              <Accordion.Collapse eventKey="1">
                <Card.Body>Hello! I'm another body</Card.Body>
              </Accordion.Collapse>
            </Card>
          </Accordion>
        </div>
      </Col>
    </Row>
  </>
)

const sectionBackground = ind => ({
  background: ind % 2 == 1 ? varStyles.light : "inherit",
})
const Sections = ({ data }) => (
  <div className="sections">
    {data.allMarkdownRemark.edges.map(edge =>
      edge.node.frontmatter.sections.map((section, i) => {
        if (section.type === "about")
          return (
            <React.Fragment key={i}>
              <AboutSection section={section} style={sectionBackground(i)} />
            </React.Fragment>
          )

        if (section.type === "paragraph")
          return (
            <React.Fragment key={i}>
              <ParagraphSection
                section={section}
                style={sectionBackground(i)}
              />
            </React.Fragment>
          )
        else return <React.Fragment key={i}>?</React.Fragment>
      })
    )}
  </div>
)

const IndexPage = ({ data }) => (
  <Layout>
    <SEO title="Home" />
    <Sections data={data} />
    <AccordianSection data={data} />
    <ContactForm />
  </Layout>
)

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
            sections {
              description
              image
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
          srcSetWebp
        }
      }
    }
  }
`

export default IndexPage
