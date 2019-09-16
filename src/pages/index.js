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
  Button,
} from "react-bootstrap"

import { useAccordionToggle } from "react-bootstrap/AccordionToggle"

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
    <Row style={{ backgroundColor: varStyles.light }}>
      <Col md={6} className="d-sm-none d-md-block">
        <div
          className="image "
          style={{ maxWidth: "100%", height: "100%", display: "flex" }}
        >
          {/* <GImage
            fluid={data.file.childImageSharp.fluid}
            objectFit="cover"
            objectPosition="50% 50%"
            alt=""
          /> */}
          <img
            src={`${data.file.childImageSharp.fluid.src}`}
            alt=""
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              flex: 1,
            }}
          />
        </div>
      </Col>
      <Col sm={12} md={6}>
        <h2 style={{ textAlign: "center" }}>
          <span style={{}}>Bullet Points</span>
        </h2>
        <div className="accordian">
          <Accordion defaultActiveKey="0" style={{ paddingBottom: "5px" }}>
            <Card style={{ border: "none", background: "none" }}>
              <Accordion.Toggle
                as={Card.Header}
                style={{
                  margin: "10px",
                  border: "1px solid rgba(0,0,0,.125)",
                  borderRadius: "50px",
                  backgroundColor: "white",
                }}
                eventKey="0"
              >
                <i class="fas fa-minus"></i>{" "}
                <span style={{ color: "blue", fontWeight: "bold" }}>
                  Click me!
                </span>
              </Accordion.Toggle>
              <Accordion.Collapse eventKey="0">
                <Card.Body
                  style={{
                    marginLeft: "30px",
                    borderLeft: `1px solid ${varStyles.dark}`,
                  }}
                >
                  Hello! I'm the body
                </Card.Body>
              </Accordion.Collapse>
            </Card>
            <Card style={{ border: "none", background: "none" }}>
              <Accordion.Toggle
                as={Card.Header}
                eventKey="1"
                style={{
                  margin: "10px",
                  border: "1px solid rgba(0,0,0,.125)",
                  borderRadius: "50px",
                  backgroundColor: "white",
                }}
              >
                <i class="fas fa-minus"></i>{" "}
                <span style={{ color: "blue", fontWeight: "bold" }}>
                  Click me!
                </span>
              </Accordion.Toggle>
              <Accordion.Collapse eventKey="1">
                <Card.Body
                  style={{
                    marginLeft: "30px",
                    borderLeft: `1px solid ${varStyles.dark}`,
                  }}
                >
                  Hello! I'm another body
                </Card.Body>
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
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
  }
`

export default IndexPage
