import React from "react"

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
      {/* TODO: Footer */}
    </Layout>
  )
}

export default IndexPage
