import React, { useEffect, useState } from "react"

import { Link, graphql, useStaticQuery } from "gatsby"
import GImg from "gatsby-image"
// import GImgIE

import { Container, Row, Col, Card, Accordion } from "react-bootstrap"
import Macy from "macy"

import styled from "styled-components"
import FlakeTheme, { Title } from "../../components/styles/FlakeTheme"

import { slugify } from "../../utils/text-helpers"

const AboutSection = props => {
  return (
    <section style={{ padding: "10px" }} id={`${slugify(props.section.title)}`}>
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
                marginBottom: "50px",
              }}
            >
              <GImg
                fluid={props.section.image.childImageSharp.fluid}
                style={{ flex: 1, maxHeight: "400px" }}
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
    </section>
  )
}

const Paragraph = props => (
  <section id={`${slugify(props.section.title)}`}>
    <Container>
      <Title>
        <span>{props.section.title}</span>
      </Title>
      <p style={{ textAlign: "center" }}>
        <span>{props.section.paragraph}</span>
      </p>
    </Container>
  </section>
)

const StyledAccordionWrapper = styled.div`
  .accordion {
    padding-bottom: 5px;
  }

  .accordion-toggle {
    cursor: pointer;
    user-select: none;
    margin: 10px;
    border: 1px solid rgba(0, 0, 0, 0.125);
    border-radius: 50px;
    background-color: white;
    padding: 10px;
    text-align: left;

    span {
      color: ${props => props.theme.primary};
      font-weight: bold;
    }
  }

  .accordion-collapse {
    margin-left: 30px;
    padding: 15px;
    border-left: 1px solid ${props => props.theme.dark};
  }
`

const AccordianSection = props => (
  <StyledAccordionWrapper id={`${slugify(props.section.title)}`}>
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
        <Title style={{ textAlign: "left" }}>
          <span>{props.section.title}</span>
        </Title>
        <div className="accordian">
          <Accordion defaultActiveKey="0" className="accordion">
            {props.section.collapsibles.map((collapsible, i) => (
              <Card style={{ border: "none", background: "none" }}>
                <Accordion.Toggle
                  className="accordion-toggle"
                  eventKey={`${i}`}
                >
                  <i class="fas fa-minus"></i> <span>{collapsible.header}</span>
                </Accordion.Toggle>
                <Accordion.Collapse
                  className="accordion-collapse"
                  eventKey={`${i}`}
                >
                  <>{collapsible.body}</>
                </Accordion.Collapse>
              </Card>
            ))}
          </Accordion>
        </div>
      </Col>
    </Row>
  </StyledAccordionWrapper>
)

const Gallery = props => {
  let imgs = []
  // for (let i = 0; i < 3; i++) {
  //   let width = 200 + Math.floor(Math.random() * 200)
  //   let height = 200 + Math.floor(Math.random() * 200)
  //   imgs.push(
      // <div key={i} style={{ width: width, height: height, display: "flex" }}>
      //   <GImg
      //     src={`https://images.unsplash.com/photo-1569493086584-33e0b36f3145?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60`}
      //     style={{ objectFit: "cover", width: "100%", height: "100%", flex: 1 }}
      //   />
      // </div>
  //   )
  // }

  console.log(props.images);
  
  const [images, setImages] = useState(
    props.images.map((imgurl, i) => (
      <div key={i} style={{ display: "flex" }}>
        <GImg
          fluid={imgurl}
          style={{ objectFit: "cover", width: "100%", height: "100%", flex: 1 }}
        />
      </div>
    ))
  )

  useEffect(() => {
    Macy({
      container: "#masonry-gallery",
    })
  })

  return (
    <Container>
      <Title>Gallery</Title>
      <div id="masonry-gallery">{images}</div>
    </Container>
  )
}

const sectionBackground = ind => ({
  background: ind % 2 == 1 ? FlakeTheme.light : "inherit",
})

const SectionsStyledWrapper = styled.div`
  & > section {
    margin: 0;
    &:nth-child(2n) {
      background-color: ${props => props.theme.light};
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
                    fluid(maxWidth: 400) {
                      ...GatsbyImageSharpFluid_withWebp
                    }
                  }
                }
                images {
                  image {
                    childImageSharp {
                      fluid(maxWidth: 400) {
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
                    fluid(maxWidth: 600) {
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

  let { sections } = data.allMarkdownRemark.edges[0].node.frontmatter

  return (
    <SectionsStyledWrapper className="sections">
      {sections.map((section, i) => {
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
              <Paragraph section={section} style={sectionBackground(i)} />
            </React.Fragment>
          )

        if (section.type === "accordion")
          return <AccordianSection section={section}></AccordianSection>

        // if (section.type === "gallery")
        //   return <Gallery images={section.images.map(image => image.image.childImageSharp.fluid)}/>
        else return <React.Fragment key={i}>?</React.Fragment>
      })}
      {/* <Gallery /> */}
    </SectionsStyledWrapper>
  )
}
