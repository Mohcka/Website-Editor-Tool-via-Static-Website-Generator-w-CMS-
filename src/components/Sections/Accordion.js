import React from "react"
import PropTypes from "prop-types"
import {
  Container,
  Row,
  Col,
  Card,
  Accordion as BSAccordion,
} from "react-bootstrap"
import styled from "styled-components"
import FlakeTheme, { Title } from "../styles/FlakeTheme"
import { slugify } from "../../utils/text-helpers"

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
    padding: 0 15px;
    border-left: 1px solid ${props => props.theme.dark};
  }
`

const Accordion = props => {
  return (
    <StyledAccordionWrapper id={`${slugify("ah")}`}>
      <Container fluid>
        <Row style={{ backgroundColor: FlakeTheme.light }}>
          <Col lg={6} className="d-none d-lg-block">
            <div
              className="image "
              style={{ maxWidth: "100%", height: "100%", display: "flex" }}
            >
              {props.image}
            </div>
          </Col>
          <Col xs={12} lg={6}>
            <Title style={{ textAlign: "left", paddingTop: "20px" }}>
              <span>{props.title}</span>
            </Title>
            <div className="accordian">
              <BSAccordion defaultActiveKey="0" className="accordion">
                {props.collapsibles.map((collapsible, i) => (
                  <Card key={i} style={{ border: "none", background: "none" }}>
                    <BSAccordion.Toggle
                      className="accordion-toggle"
                      eventKey={`${i}`}
                    >
                      <i className="fas fa-minus"></i>{" "}
                      <span>{collapsible.header}</span>
                    </BSAccordion.Toggle>
                    <BSAccordion.Collapse
                      className="accordion-collapse"
                      eventKey={`${i}`}
                    >
                      <div>{collapsible.body}</div>
                    </BSAccordion.Collapse>
                  </Card>
                ))}
              </BSAccordion>
            </div>
          </Col>
        </Row>
      </Container>
    </StyledAccordionWrapper>
  )
}

Accordion.propTypes = {
  title: PropTypes.string.isRequired,
  // image displayed beside the accordion
  image: PropTypes.element,
  // The array of accordions headers and body text
  collapsibles: PropTypes.arrayOf(
    PropTypes.shape({
      header: PropTypes.string,
      body: PropTypes.string,
    })
  ).isRequired,
}

export default Accordion
