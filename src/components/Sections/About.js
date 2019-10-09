import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"
import { Title, breakPoints } from "../styles"
import { Container, Row, Col } from "react-bootstrap"
import { slugify } from "../../utils/text-helpers"

const StyledAboutWrapper = styled.div`
  .image-container {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    padding: 0 50px;
    margin-bottom: 50px;
  }

  @media (max-width: ${breakPoints.lg}px) {
    .image-container {
      padding: 0;
    }
  }
`

const About = props => (
  <section id={`${slugify(props.title)}`}>
    <StyledAboutWrapper>
      <Container>
        <Title>
          <span>{props.title}</span>
        </Title>
        <Row>
          <Col xl={6} lg={12}>
            <div className="image-container">{props.image}</div>
          </Col>
          <Col xl={6} lg={12}>
            <div
              className="description"
              dangerouslySetInnerHTML={{
                __html: props.description,
              }}
            ></div>
          </Col>
        </Row>
      </Container>
    </StyledAboutWrapper>
  </section>
)

About.propTypes = {
  title: PropTypes.string.isRequired,
  image: PropTypes.element,
  description: PropTypes.string.isRequired,
}

export default About
