const path = require('path');

module.exports = {
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader"
          }
        },
        {
          test: /\.css$/,
          include: path.resolve('node_modules'),
          use: [
            {
              loader: 'style-loader',
            }, {
              loader: 'css-loader',
            }
          ]
        },
        { test: /\.(png|woff|woff2|eot|ttf|svg)$/, use: {loader: 'url-loader?limit=100000' }}

      ]
    }
}

