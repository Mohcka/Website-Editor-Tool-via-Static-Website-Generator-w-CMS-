import React, { useEffect } from "react"
import Loadable from "react-loadable"
import PropTypes from "prop-types"

import styled from "styled-components"
import { Title } from "../styles/FlakeTheme"
import Macy from "macy"

const ImageModal = props => {
  const triggerPopout = "ok"

  return (
    <div className="modal-background">
    </div>
  )
}

const Gallery = props => {
  useEffect(() => {
    Macy({
      container: "#masonry-gallery",
    })
  })

  return (
    <>
      <Title>Gallery</Title>
      <div id="masonry-gallery">
        {props.gallery_imgs.map((image, i) => (
          <div key={i} style={{ cursor: "pointer" }} data-gallery-image onClick={e => console.log(e.target)}>
            {image}
          </div>
        ))}
      </div>
    </>
  )
}

Gallery.propTypes = {
  // The img elements for the gallery
  gallery_imgs: PropTypes.arrayOf(PropTypes.element).isRequired,
}

export default Gallery
