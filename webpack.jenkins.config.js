const webpack = require('webpack');
const _ = require('lodash');
const path = require('path');
const config = require('config');
const fs = require('fs');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const HappyPack = require('happypack');

if (!fs.existsSync(path.resolve(__dirname, 'config/dist/'))) {
  fs.mkdirSync(path.resolve(__dirname, 'config/dist/'));
}
fs.writeFileSync(
  path.resolve(__dirname, 'config/dist/client.json'),
  JSON.stringify(_.pick(config, ['CLIENT']))
);

module.exports = {
  entry: [
    'babel-polyfill',
    'whatwg-fetch',
    'react',
    'react-dom',
    './client/src/index.tsx'
  ],

  mode: 'production',

  output: {
    filename: 'app.js',
    path: path.resolve(__dirname, 'dist/client')
  },

  resolve: {
    extensions: ['.ts', '.tsx', '.css', '.js'],
    alias: {
      config: path.resolve(__dirname, 'config/dist/client.json'),
      'videx/api': path.resolve(__dirname, 'videx/api'),
      'videx/client/logger': path.resolve(
        __dirname,
        'client/src/system/logger'
      ),
      'videx/client/core/transcript': path.resolve(
        __dirname,
        'client/src/core/transcript'
      ),
      'videx/client/core/version': path.resolve(
        __dirname,
        'client/src/core/version'
      ),
      'videx/client/core/color': path.resolve(
        __dirname,
        'client/src/core/color'
      )
    }
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'happypack/loader?id=ts'
          }
        ]
      },

      {
        test: /\.scss$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader'
          },
          {
            loader: 'sass-loader'
          }
        ]
      },

      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      },
      VIDEX_VERSION: JSON.stringify(require('./package.json').version)
    }),
    new ForkTsCheckerWebpackPlugin({
      tsconfig: path.resolve(__dirname, 'client/tsconfig.json'),
      checkSyntacticErrors: true,
      ignoreDiagnostics: [2344]
    }),
    new HappyPack({
      id: 'ts',
      loaders: [
        {
          loader: 'babel-loader',
          options: {
            presets: [
              [
                'env',
                {
                  useBuiltIns: true,
                  modules: false,
                  targets: {
                    browsers: ['last 2 versions']
                  }
                }
              ],
              'react'
            ],
            plugins: [
              ['recharts'],
              ['lodash', { id: ['lodash', 'semantic-ui-react', 'recompose'] }],
              ['import', { libraryName: 'antd', style: 'css' }]
            ]
          }
        },
        {
          path: 'ts-loader',
          query: {
            configFile: path.resolve(__dirname, 'client/tsconfig.json'),
            transpileOnly: true,
            happyPackMode: true
          }
        }
      ]
    }),
    new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /en/)
  ]
};
