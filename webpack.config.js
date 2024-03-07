const path = require('path');

module.exports = {
  entry: ['./src/index.js', './src/css/menu_styles.css', './src/css/index_styles.css', './src/css/cart_styles.css',
          './src/css/about-us_styles.css', './src/css/styles.css'],
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/,
        type: 'asset/resource',
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
      {
        test: /\.png$/,
        use: [{ loader: 'file-loader'}]
      },
      {
        test: /\.html$/,
        use: [
          { loader: 'file-loader' },
          { loader: 'extract-loader' },
          { loader: 'ref-loader' },
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
    ],
  },
};