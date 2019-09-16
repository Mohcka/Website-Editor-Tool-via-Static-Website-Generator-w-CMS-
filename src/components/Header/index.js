import PropTypes from "prop-types"
import React, { useEffect } from "react"
import { Link } from "gatsby"
import { useStaticQuery, graphql } from "gatsby"
import Helmet from "react-helmet"

import "./Header.scss"

import CarouselWidget from "../CarouselWidget"
import Actions from "./Actions"
import Navbar from "./Navbar"




const Header = ({ siteTitle }) => {
  return (
    <header id="home" style={{}}>
      <Actions />
      <Navbar />
      <CarouselWidget />
    </header>
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
