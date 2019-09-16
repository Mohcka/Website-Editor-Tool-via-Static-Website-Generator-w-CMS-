import React, { Component } from "react"
import PropTypes from "prop-types"
import anime from "animejs"

import "./TextTransition.scss"

class TextTransition extends Component {
  animations = {
    flipIn: {
      rotateX: [90, 0],
    },
    fadeUp: {
      opacity: [0, 1],
      translateY: [100, 0],
      easing: "easeOutSine",
    },
    fadeLeft: {
      opacity: [0, 1],
      translateX: [100, 0],
      easing: "easeOutSine",
    },
  }

  constructor(props) {
    super(props)
    this.state = {
      header: "Header",
      subheader: "Subheader",
    }

    this.goto = this.goto.bind(this)
  }

  componentDidMount() {
    // assign initial header props to state if present
    if (this.props.headers.length !== 0) {
      this.setState({
        header: this.props.headers[this.props.index].header,
        subheader: this.props.headers[this.props.index].subheader,
      })
    }
  }

  componentDidUpdate(prevProps, prevState) {
    // Transition to new text once index has changed
    if (this.props.index !== prevProps.index)
      this.goto(this.props.index, prevProps.index)
  }

  goto(ind, prevInd) {
    anime({
      targets: ".text-wrapper span",
      ...this.animations.fadeLeft,
      delay: (el, i) => 1000 + 500 * i,
    })

    // assign initial header props to state if present
    if (this.props.headers) {
      this.setState({
        header: this.props.headers[this.props.index].header,
        subheader: this.props.headers[this.props.index].subheader,
      })
    }
  }

  render() {
    return (
      <div className="text-slide-1-container">
        <div className="text-wrapper">
          <span className="textslide-title" style={{ fontWeight: "bold" }}>
            {this.state.header}
          </span>

          <span className="textslide-subtitle">{this.state.subheader}</span>
        </div>
      </div>
    )
  }
}

TextTransition.propTypes = {
  // The current index from the collection of text to reveal for the slideshow
  index: PropTypes.number.isRequired,
}

export default TextTransition
