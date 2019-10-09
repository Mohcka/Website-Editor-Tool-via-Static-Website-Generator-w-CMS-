import React from "react"
import Loadable from "react-loadable"

import Layout from "../components/layout"
import SEO from "../components/seo"

const Sections = Loadable({
  loader: () => import("../components/Sections"),
  loading: () => <div>Loading...</div>,
})

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <Sections />
  </Layout>
)

export default IndexPage
