import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"
import { Container, Row, Col } from "react-bootstrap"

import _ from "lodash"

const StyledPromotionsWrapper = styled.div`
//   background: ${props => props.theme.dark};
//   padding: 100px 0;
//   color: ${props => props.theme.light};
`

const Promotions = props => {
  return (
    <StyledPromotionsWrapper>
      <Container>
        {/* Split the promotions into subgroups of n for each row */}
        {_.chunk(props.promotions, 3).map((promotionSet, i) => (
          <React.Fragment key={i}>
            <Row>
              {promotionSet.map((promotion, i) => (
                <React.Fragment key={i}>
                  <Col xs={12} lg={4}>
                    <div>
                      <h4>{promotion.title}</h4>
                      <p>{promotion.description}</p>
                    </div>
                  </Col>
                </React.Fragment>
              ))}
            </Row>
          </React.Fragment>
        ))}
      </Container>
    </StyledPromotionsWrapper>
  )
}

Promotions.propTypes = {
  promotions: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      description: PropTypes.string,
    })
  ).isRequired,
}

export default Promotions
