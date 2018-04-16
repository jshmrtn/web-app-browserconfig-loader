const path = require("path");
const rootPath = path.resolve(__dirname, ".");

module.exports = {
  context: rootPath,

  entry: {
    main: path.join(__dirname, 'index.js')
  },

  output: {
    filename: 'index.js',
    path: path.join(__dirname, 'actual-output')
  },

  module: {
    rules: [
      {
        test: /browserconfig\.xml$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "browserconfig.xml",
            },
          },
          {
            loader: path.resolve(__dirname, "../../../index.js"),
          },
        ],
      },
    ]
  }
};
