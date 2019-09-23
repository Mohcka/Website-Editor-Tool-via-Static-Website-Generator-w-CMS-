const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)
const { fmImagesToRelative } = require('gatsby-remark-relative-images')

const webpack = require("webpack")

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

//   const page = path.resolve("./src/index.js");
}

exports.onCreateNode = ({ node, getNode }) => {
  fmImagesToRelative(node);

  if(node.internal.type === `MarkdownRemark`) {
    
  }
}

// fix for build using bootstrap
exports.onCreateWebpackConfig = ({ actions, stage, loaders }) => {
  const config = {
    plugins: [
      new webpack.ProvidePlugin({
        jQuery: "jquery",
        $: "jquery",
        jquery: "jquery",
      }),
    ],
  }
  if (stage === "build-html") {
    config.module = {
      rules: [
        {
          test: require.resolve("bootstrap"),
          use: loaders.null(),
        },
        {
          test: require.resolve("jquery"),
          use: loaders.null(),
        },
      ],
    }
  }
  actions.setWebpackConfig(config)
}