import React, { useEffect } from "react"
import CarouselController from "./CarouselController"

// Dummy slides for demonstration purposes
const dummySlides = [
  {
    image:
      "https://images.unsplash.com/photo-1560306247-e251d8429306?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1334&q=80",
    header: "Irure Aute",
    subheader: "Culpa adipisicing do aliqua",
  },
  {
    image:
      "https://images.unsplash.com/photo-1560305527-51dc8ad5a8f8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1425&q=80",
    header: "Irure Ex",
    subheader: "Dolor ad eu reprehenderit",
  },
  {
    image:
      "https://images.unsplash.com/photo-1560306796-3238e049ff45?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
    header: "Et Nulla",
    subheader: "Aliqua labore sint eiusmod",
  },
]

const CarouselWidget = props => (
  <div style={{ height: "500px", width: "100%", backgroundColor: "blue" }}>
    <CarouselController
      slides={props.slides ? props.slides : dummySlides}
      themeColor={props.themeColor}
    />
  </div>
)

export default CarouselWidget
