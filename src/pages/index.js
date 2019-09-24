import React from "react"
import { Link, graphql } from "gatsby"
import GImg from "gatsby-image"
// import GImgIE

import {
  Container,
  Row,
  Col,
  Image as BSImage,
  Card,
  Accordion,
  Button,
} from "react-bootstrap"

import styled from "styled-components"
import FlakeTheme from "../components/styles/FlakeTheme"
import varStyles, { Title } from "../components/styles/FlakeTheme"

import { useAccordionToggle } from "react-bootstrap/AccordionToggle"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"

import Sections from "../components/Sections"

import ContactForm from "../components/ContactForm"


const IndexPage = () => {

  return (
    <Layout>
      <SEO title="Home" />
      <Sections />
      <ContactForm />
    </Layout>
  )
}

export default IndexPage
