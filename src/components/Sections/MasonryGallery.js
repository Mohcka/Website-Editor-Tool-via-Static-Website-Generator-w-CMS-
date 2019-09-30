import React, { Component, useEffect, useState } from "react"
import { usePrevious } from "../../utils/react-helpers"
import PropTypes from "prop-types"

import styled from "styled-components"
import Color from "color"
import { Title, breakPoints } from "../styles/FlakeTheme"
import Macy from "macy"

const StyledImageModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  overflow-y: hidden;
  background: ${props =>
    Color(props.theme.dark)
      .alpha(0.9)
      .hsl()
      .toString()};
  z-index: 99;

  .image-modal-background {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
  }

  .modal-image-container {
    position: relative;
    width: 80%;
    height: 80%;
    background: ${props => props.theme.light};
    border-radius: 5px;
    padding: 10px;

    .close-btn {
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      position: absolute;
      width: 23px;
      height: 23px;
      top: -10px;
      right: -10px;
      color: ${props => props.theme.light};
      background: ${props => props.theme.dark};
      border-radius: 25px;
    }
  }
`

class ImageModal extends Component {
  state = { visible: false }

  closeModal = e => {
    this.props.updateModal()
    this.setState({ visible: false })
  }

  render() {
    return (
      <StyledImageModalWrapper
        className="modal-background"
        style={{ display: this.props.visible ? "block" : "none" }}
      >
        <div
          className="image-modal-background"
          onClick={e => {
            if (e.target === e.currentTarget) {
              this.closeModal(e)
            }
          }}
        >
          <div className="modal-image-container">
            {this.props.image}
            <div className="close-btn" onClick={this.closeModal}>
              <i class="fas fa-times-circle"></i>
            </div>
          </div>
        </div>
      </StyledImageModalWrapper>
    )
  }
}

const StyledGalleryWrapper = styled.div`
  .gallery-image {
    position: relative;

    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      width: 100%;
      background: ${props => props.theme.dark};
      opacity: 0;
      z-index: 2;

      transition: opacity 0.2s ease-out;
    }

    img {
      transition: transform 0.2s ease-out, opacity 500ms ease 0s !important;
    }
    &:hover {
      img {
        transform: scale(1.1);
      }

      &::before {
        opacity: 0.5;
      }
    }
  }
`

const Gallery = props => {
  const [modalImage, setModalImage] = useState([])
  const [modalVisible, setModalVisible] = useState(false)
  // Breakpoint rules for macy, the value stands for the number of columns 
  // that whill hold each image
  const breakAtRules = {}
  breakAtRules[breakPoints.lg] = 2
  breakAtRules[breakPoints.sm] = 1

  useEffect(() => {
    Macy({
      container: "#masonry-gallery",
      breakAt: {
        ...breakAtRules,
      },
    })
  })

  // Fire this in ImageModal so the prop refreshes,
  // and the same image can be clicked again if need be
  const updateModal = () => {
    setModalImage([])
    setModalVisible(false)
  }

  return (
    <StyledGalleryWrapper>
      <div id="masonry-gallery">
        {props.gallery_imgs.map((image, i) => (
          <div
            key={i}
            style={{ cursor: "pointer" }}
            className="gallery-image"
            onClick={e => {
              setModalImage(image)
              setModalVisible(true)
            }}
          >
            {image}
          </div>
        ))}
        <ImageModal
          image={modalImage}
          updateModal={updateModal}
          visible={modalVisible}
        />
      </div>
    </StyledGalleryWrapper>
  )
}

Gallery.propTypes = {
  // The img elements for the gallery
  gallery_imgs: PropTypes.arrayOf(PropTypes.element).isRequired,
}

export default Gallery
