/* eslint-disable @typescript-eslint/no-var-requires */
const { EnvironmentPlugin } = require('webpack');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const CircularDependencyPlugin = require('circular-dependency-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const path = require('path');
/* eslint-enable @typescript-eslint/no-var-requires */

const ISDEV = process.env.NODE_ENV !== 'production';
const PORT = process.env.CLIENT_PORT || 9000;
const CWD = process.cwd();

const BABEL_BASE_PRESETS = [
  [
    require.resolve('@babel/preset-env'),
    {
      modules: false,
      useBuiltIns: 'usage',
      corejs: { version: 3 },
    },
  ],
];

const BABEL_BASE_PLUGINS = [
  require.resolve('@babel/plugin-proposal-class-properties'),
  require.resolve('@babel/plugin-proposal-object-rest-spread'),
];

const BABEL_TYPESCRIPT_PRESETS = BABEL_BASE_PRESETS.concat(
  require.resolve('@babel/preset-typescript'),
);

const BABEL_TYPESCRIPT_PLUGINS = BABEL_BASE_PLUGINS.concat(
  require.resolve('babel-plugin-const-enum'),
);

module.exports = {
  entry: [
    require.resolve('raf/polyfill'),
    path.resolve(CWD, 'src', 'index.ts'),
  ],

  output: {
    publicPath: path.resolve(CWD, '/'),
    path: path.resolve(CWD, 'dist'),
    filename: ISDEV ? 'bundle.js' : 'bundle.[hash].js',
  },

  ...(ISDEV && { devtool: 'eval-source-map' }),

  resolve: {
    modules: ['node_modules'],
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
    alias: {
      '^': path.resolve(CWD, 'src'),
      '^images': path.resolve(CWD, 'static', 'images'),
    },
  },

  devServer: {
    static: CWD,
    compress: true,
    port: PORT,
    historyApiFallback: true,
    hot: true,
    liveReload: false,
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: require.resolve('babel-loader'),
            options: {
              babelrc: false,
              presets: BABEL_BASE_PRESETS,
              plugins: BABEL_BASE_PLUGINS,
            },
          },
        ],
      },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: require.resolve('babel-loader'),
            options: {
              babelrc: false,
              presets: BABEL_TYPESCRIPT_PRESETS,
              plugins: BABEL_TYPESCRIPT_PLUGINS,
            },
          },
        ],
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          ISDEV ? require.resolve('style-loader') : MiniCssExtractPlugin.loader,
          require.resolve('css-loader'),
          require.resolve('postcss-loader'),
          require.resolve('sass-loader'),
        ],
        exclude: /(node_modules)/,
      },
      {
        test: /\.(png|jpg|gif)$/i,
        use: [
          {
            loader: require.resolve('file-loader'),
            options: {
              limit: 8192,
            },
          },
        ],
      },
      {
        test: /\.(woff|woff2|eot|ttf|svg)$/,
        use: {
          loader: require.resolve('url-loader'),
          options: { limit: 100000 },
        },
      },
    ],
  },

  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin(), new CssMinimizerPlugin()],
  },

  plugins: [
    new ForkTsCheckerWebpackPlugin(),

    new EnvironmentPlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      'process.env.DEBUG': JSON.stringify(process.env.DEBUG),
    }),

    new CircularDependencyPlugin({
      exclude: /node_modules/,
      failOnError: true,
      cwd: CWD,
    }),

    new HtmlWebpackPlugin({
      template: path.resolve(CWD, 'index.html'),
      favicon: path.join(__dirname, 'static', 'favicons', 'favicon.ico'),
    }),

    new MiniCssExtractPlugin({
      filename: ISDEV ? 'bundle.css' : 'bundle.[hash].css',
    }),
  ].concat(
    ISDEV
      ? []
      : [
        new CompressionPlugin({
          filename: '[path].gz[query]',
          algorithm: 'gzip',
          test: /\.js$|\.css$|\.html$/,
          threshold: 8192,
          minRatio: 0,
        }),
      ],
  ),
};
