import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"

import Sections from "../components/Sections"

import ContactForm from "../components/ContactForm"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <Sections />
    <ContactForm />
  </Layout>
)

export default IndexPage
