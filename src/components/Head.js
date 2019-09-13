import React from 'react';
import { graphql, useStaticQuery } from "gatsby"
import Helmet from "react-helmet"

const Head = props => {
    return (
      <Helmet>
        <script src="https://kit.fontawesome.com/2126372f97.js"></script>
      </Helmet>
    )
}

export default Head;