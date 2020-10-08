const HtmlPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')

module.exports = {
  entry: `${__dirname}/src/index.tsx`,
  output: {
    path: `${__dirname}/dist`
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true
            }
          }
        ],
        include: /\.module\.css$/
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
        exclude: /\.module\.css$/
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  plugins: [new HtmlPlugin({ template: 'src/index.html' }), new CopyPlugin({ patterns: [{ from: 'src/static' }] })],
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.css'],
    modules: ['src', 'node_modules']
  },
  devServer: {
    stats: 'errors-only'
  },
  devtool: 'inline-source-map'
}
