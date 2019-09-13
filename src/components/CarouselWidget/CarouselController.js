import React, { Component } from "react"
import PropTypes from "prop-types"

import ImageTransition from "./ImageTransition"
import TextTransition from "./TextTransition"

import { mod } from "../../utils/math-helpers"

import "./CarouselController.scss"
import { timingSafeEqual } from "crypto"

class Carouselcontroller extends Component {
  sliderInterval = null // interval that will dispatch a call to go to the next slide for every interval
  // set default duration
  images = []
  headers = []

  /**
   * @prop {Number} index     To be used as an index for the array of slides to determine
   *                          the current slide
   * @prop {Array} images     Array of images to be used for the slideshow
   * @prop {Number} delay  The delay in ms before transitioning to a new slide
   */
  constructor(props) {
    super(props)
    // Init data
    this.initSlideProps()

    // set states
    this.state = {
      index: 0,
      images: this.images,
      headers: this.headers,
      delay: 5000,
    }

    // bind funcs
    this.createSlideInterval = this.creatSlideInterval.bind(this)
    this.gotoSlide = this.gotoSlide.bind(this)
  }

  componentDidMount() {
    // start interval
    this.creatSlideInterval()
  }

  componentWillUnmount() {
    clearInterval(this.sliderInterval)
  }

  creatSlideInterval() {
    this.sliderInterval = setInterval(() => {
      // change state s
      this.setState(prevS => ({
        index: mod(prevS.index + 1, this.state.images.length),
      }))
    }, this.state.delay)
  }

  /* Goes to the specified slide given an index */
  gotoSlide(selectedIndex) {
    if (this.state.index !== selectedIndex) {
      // reset the timer
      clearInterval(this.sliderInterval)
      this.creatSlideInterval()

      // set slider to selected index
      this.setState({ index: selectedIndex })
    }
  }

  // Initiate the slide properties
  initSlideProps() {
    // Init slider properties
    if (this.props.slides) {
      this.props.slides.map(slide => {
        this.images.push(slide.image)
        this.headers.push({
          header: slide.header,
          subheader: slide.subheader,
        })
      })
      console.log(this.headers)

      this.setState({
        images: this.images,
        headers: this.headers,
      })
    }
  }

  render() {
    return (
      <div className="slider-controller-container">
        <ImageTransition
          index={this.state.index}
          images={this.state.images}
        />

        <TextTransition index={this.state.index} headers={this.state.headers} />

        <div className="selectors">
          {this.state.images.map((img, i) => (
            <div
              key={i}
              className={`carousel-selector ${
                i == this.state.index ? "selector-active" : ""
              }`}
              onClick={e => this.gotoSlide(i)}
            />
          ))}
        </div>
      </div>
    )
  }
}

Carouselcontroller.propTypes = {
  /**
   * To be used as an index for the array of slides to determine
   * the current slide */
  index: PropTypes.number,
  /**
   * the amount seconds (given in milliseconds)
   * that each interval will take place */
  duration: PropTypes.number,
  /**
   * Array of slides that will contain an image url,
   * header text and subheader text for each slide */
  slides: PropTypes.arrayOf(
    PropTypes.shape({
      image: PropTypes.string.isRequired,
      header: PropTypes.string.isRequired,
      subheader: PropTypes.string.isRequired,
    })
  ).isRequired,
}

export default Carouselcontroller
