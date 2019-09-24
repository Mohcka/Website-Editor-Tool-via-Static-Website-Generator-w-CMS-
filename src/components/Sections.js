import React from "react"
import { Link, graphql, useStaticQuery } from "gatsby"
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
import FlakeTheme, { Title } from "../components/styles/FlakeTheme"

import { slugify } from "../utils/text-helpers"

const AboutSection = props => {
  return (
    <div style={{ margin: "10px" }} id={`${slugify(props.section.title)}`}>
      <Container>
        <Title>
          <span>{props.section.title}</span>
        </Title>
        <Row>
          <Col xl={6} lg={12}>
            <div
              className="image-container"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
                padding: "0 50px",
              }}
            >
              <GImg
                fluid={props.section.image.childImageSharp.fluid}
                style={{ flex: 1 }}
                imgStyle={{ objectFit: "contain" }}
              />
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

const StyledParagraph = styled.div``

const ParagraphSection = props => (
  <div
    className="paragrpah-section"
    id={`${slugify(props.section.title)}`}
    style={props.style}
  >
    <Title>
      <span>{props.section.title}</span>
    </Title>
    <div className="paragraph">
      <span>{props.section.paragraph}</span>
    </div>
  </div>
)

const StyledAccordionToggle = styled.div`
  margin: 10px;
  border: 1px solid rgba(0, 0, 0, 0.125);
  border-radius: 50px;
  background-color: white;
  padding: 10px;
`
const StyledAccordionCollapse = styled.div`
  margin-left: 30px;
  padding: 15px;
  border-left: 1px solid ${props => props.theme.dark};
`

const AccordianSection = props => (
  <>
    <Row style={{ backgroundColor: FlakeTheme.light }}>
      <Col md={6} className="d-none d-md-block">
        <div
          className="image "
          style={{ maxWidth: "100%", height: "100%", display: "flex" }}
        >
          <GImg
            fluid={props.section.accordion_image.childImageSharp.fluid}
            style={{ flex: 1 }}
          />
        </div>
      </Col>
      <Col sm={12} md={6}>
        <Title>
          <span>Bullet Points</span>
        </Title>
        <div className="accordian">
          <Accordion defaultActiveKey="0" style={{ paddingBottom: "5px" }}>
            {props.section.collapsibles.map((collapsible, i) => (
              <Card style={{ border: "none", background: "none" }}>
                <Accordion.Toggle as={StyledAccordionToggle} eventKey={`${i}`}>
                  <i class="fas fa-minus"></i>{" "}
                  <span
                    style={{ color: FlakeTheme.primary, fontWeight: "bold" }}
                  >
                    {collapsible.header}
                  </span>
                </Accordion.Toggle>
                <Accordion.Collapse eventKey={`${i}`}>
                  <StyledAccordionCollapse>
                    {collapsible.body}
                  </StyledAccordionCollapse>
                </Accordion.Collapse>
              </Card>
            ))}
          </Accordion>
        </div>
      </Col>
    </Row>
  </>
)

const sectionBackground = ind => ({
  background: ind % 2 == 1 ? FlakeTheme.light : "inherit",
})

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
                    fluid(maxWidth: 400) {
                      ...GatsbyImageSharpFluid_withWebp
                    }
                  }
                }
                collapsibles {
                  header
                  body
                }
                accordion_image {
                  childImageSharp {
                    fluid(maxWidth: 400) {
                      ...GatsbyImageSharpFluid_withWebp
                    }
                  }
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

  return (
    <div className="sections">
      {data.allMarkdownRemark.edges[0].node.frontmatter.sections.map(
        (section, i) => {
          console.log(`Section ${i} is:`)
          console.log(section)

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

          if (section.type === "accordion")
            return <AccordianSection section={section}></AccordianSection>
          else return <React.Fragment key={i}>?</React.Fragment>
        }
      )}
    </div>
  )
}
