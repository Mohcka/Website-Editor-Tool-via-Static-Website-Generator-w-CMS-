import React from "react"
import PropTypes from "prop-types"

import _ from "lodash"

import styled from "styled-components"
import { Container, Row, Col } from "react-bootstrap"


const StyledPromotionsWrapper = styled.div`
  
`

const Promotions = props => {
  return (
    <StyledPromotionsWrapper>
      <Container>
        {/* Split the promotions into subgroups of n for each row */}
        <Row>
          {_.chunk(props.promotions.promotion_list, 3).map((promotionSet, i) => (
            <React.Fragment key={i}>
              {promotionSet.map((promotion, i) => (
                <React.Fragment key={i}>
                  <Col xs={12} md={6} lg={4}>
                    <div>
                      <h4>{promotion.title}</h4>
                      <p>{promotion.description}</p>
                    </div>
                  </Col>
                </React.Fragment>
              ))}
            </React.Fragment>
          ))}
        </Row>
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
