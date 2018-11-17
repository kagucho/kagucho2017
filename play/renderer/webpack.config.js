/*
  Copyright (C) 2017 Kagucho <kagucho.net@gmail.com>

  This program is free software: you can redistribute it and/or modify
  it under the terms of the GNU Affero General Public License as
  published by the Free Software Foundation, either version 3 of the
  License, or (at your option) any later version.

  This program is distributed in the hope that it will be useful,
  but WITHOUT ANY WARRANTY; without even the implied warranty of
  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
  GNU Affero General Public License for more details.

  You should have received a copy of the GNU Affero General Public License
  along with this program.  If not, see <https://www.gnu.org/licenses/>.
*/

const commonWebpackConfig = require('../common.webpack.config');
const cssnano = require('cssnano');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

module.exports = (env, argv) => {
  const config = Object.assign({
    entry: '.',
    output: {
      filename: '[name].js',
      path: path.join(__dirname, '../../output/kagucho2018/play/renderer'),
    },
    target: 'electron-renderer',
    plugins: [new MiniCssExtractPlugin('[name].css')],
  }, commonWebpackConfig(env, argv));

  config.module.rules.push({
    test: /\.css$/,
    use: [
      MiniCssExtractPlugin.loader,
      {
        loader: 'css-loader',
        options: {importLoaders: 1},
      },
      {
        loader: 'postcss-loader',
        options: {
          plugins: argv.mode == 'production' ? [cssnano()] : [],
        },
      },
    ],
  });

  return config;
};
