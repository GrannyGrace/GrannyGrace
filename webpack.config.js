const isDev = process.env.NODE_ENV === 'development'

module.exports = {
  mode: isDev ? 'development' : 'production',
  entry: [
    '@babel/polyfill', // enables async-await
    './client/index.js'
  ],
  output: {
    // __dirrname = current directory - images were getting dumped in the root after build. Added '/public', so that images will now appear in public folder after build
    path: __dirname,
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  devtool: 'source-map',
  watchOptions: {
    ignored: /node_modules/
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      // added for handling CSS files
      // while bundling
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
      // added for handling image files
      // while bundling
      // {
      //   test: /\.(png|svg|jpg|gif)$/,
      //   use: ['file-loader']
      // }
    ]
  }
}
