const webpack = require('webpack');
const _ = require('lodash');
const path = require('path');
const fs = require('fs');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const HappyPack = require('happypack');

module.exports = {
  entry: [
    'babel-polyfill',
    'whatwg-fetch',
    'react',
    'react-dom',
    './demo/src/index.tsx'
  ],

  mode: 'production',

  output: {
    filename: 'demo.js',
    path: path.resolve(__dirname, 'dist/demo')
  },

  resolve: {
    extensions: ['.ts', '.tsx', '.css', '.js']
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
      VIDEX_VERSION: JSON.stringify(require('./package.json').version),
      DEMO_URL: {
        FILE:
          "'https://ubcvidexmediastorage.blob.core.windows.net/asset-8b9a85f9-2a7b-4bd5-ab27-f5223d49b644/bbb1bc32-3d34-4aaf-a2a5-e084a3362962_aud_SpReco.vtt?sv=2015-07-08&sr=c&si=7626445f-7c73-4fe9-889b-cb2ed1ba70ee&sig=aXF97AyHF3YYGxrrGDYNkGjsYKRmUPSA4f4mzTM46bk%3D&st=2018-06-11T18%3A35%3A47Z&se=2019-06-11T18%3A35%3A47Z'",
        STREAMING:
          "'https://ubcvidexmedia.streaming.mediaservices.windows.net/aa343bd3-4f68-46e2-9e26-6838d17ae9b6/bbb1bc32-3d34-4aaf-a2a5-e084a336.ism/manifest(format=m3u8-aapl)'",
        SPRITE:
          "'https://ubcvidexmediastorage.blob.core.windows.net/asset-a65fdbf5-f04b-431b-b8ea-04f807d8d2fe/bbb1bc32-3d34-4aaf-a2a5-e084a3362962.png?sv=2015-07-08&sr=c&si=e985c0b7-8bb3-4343-9ae1-380f176032b5&sig=JQHfzUE1msoqrPohSJw%2BdfrRvo%2B2DW8nSQhGNZ6Olng%3D&st=2018-06-11T18%3A35%3A54Z&se=2019-06-11T18%3A35%3A54Z'"
      }
    }),
    new ForkTsCheckerWebpackPlugin({
      tsconfig: path.resolve(__dirname, 'demo/tsconfig.json'),
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
            configFile: path.resolve(__dirname, 'demo/tsconfig.json'),
            transpileOnly: true,
            happyPackMode: true
          }
        }
      ]
    }),
    new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /en/)
  ]
};
