module.exports = {
  entry: {
    main: __dirname + '/index.js'
  },

  output: {
    filename: 'index.js',
    path: __dirname + '/actual-output'
  },

  module: {
    loaders: [
      {
        test: /browserconfig.xml$/,
        loader: 'file?name=browserconfig.xml!../../../index.js'
      },
      {
        test: /.gif$/,
        loader: 'file?name=[name].[ext]'
      }
    ]
  }
};
