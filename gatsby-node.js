const { fmImagesToRelative } = require('gatsby-remark-relative-images')

const webpack = require("webpack")

exports.onCreateNode = ({ node }) => {
  fmImagesToRelative(node);
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