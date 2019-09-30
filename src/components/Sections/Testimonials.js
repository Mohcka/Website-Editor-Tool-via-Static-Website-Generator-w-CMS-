import React, { Component } from "react"
import anime from "animejs"
import { tns } from "tiny-slider/src/tiny-slider"
import "tiny-slider/dist/tiny-slider.css"
import styled, {Title} from "styled-components"

import { mod } from "../../utils/math-helpers"

const StyledTestimonialWrapper = styled.div`
    position: relative;
    background: ${props => props.theme.dark}
    color: ${props => props.theme.light}
    text-align: center;
    padding: 50px 0;

    .testimonial-slides-wrapper{
        width: 80%;
        margin: 0 auto;
    }

    .testimonial{
        
    }

    .testimonial-body{
        font-size: 1.4em;
    }

    .testimonial-author{
        font-weight: bold;
    }
`

const StyledNavControlWrapper = styled.div`
  .left,
  .right {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
    font-size: 1.4em;
  }

  .left {
    left: 5%;
  }

  .right {
    right: 5%;
  }
`

const dummyData = [
  {
    testimonial: `Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.`,
    author: "John Smith",
  },
  {
    testimonial: `Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.`,
    author: "John Smith",
  },
  {
    testimonial: `Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.`,
    author: "John Smith",
  },
]

const Testimonial = props => (
  <div className="testimonial">
    <div className="testimonial-body">
      <p>"{props.testimonial}"</p>
    </div>
    <div className="testimonial-author">
      <span>{props.author}</span>
    </div>
  </div>
)

class Testimonials extends Component {
  slider = null

  state = { current: dummyData[0], ind: 0 }

  componentDidMount() {
    this.slider = tns({
      container: ".testimonial-slides",
      controls: false,
      nav: false
    })
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.ind !== this.state.ind) this.transition(this.state.ind)
  }
  // Transitions to another testimonial of a given index
  transition = ind => {}

  render() {
    return (
      <StyledTestimonialWrapper>
        <div className="testimonial-slides-wrapper">
          <div className="testimonial-slides">
            {dummyData.map((data, i) => (
              <div key={i}>
                <Testimonial
                  testimonial={data.testimonial}
                  author={data.author}
                />
              </div>
            ))}
          </div>
        </div>
        <StyledNavControlWrapper>
          <div className="left" onClick={e => this.slider.goTo("prev")}>
            <i class="fas fa-chevron-left"></i>
          </div>
          <div className="right" onClick={e => this.slider.goTo("next")}>
            <i class="fas fa-chevron-right"></i>
          </div>
        </StyledNavControlWrapper>
      </StyledTestimonialWrapper>
    )
  }
}

export default Testimonials
