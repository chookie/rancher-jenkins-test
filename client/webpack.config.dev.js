import webpack from 'webpack';
import autoprefixer from 'autoprefixer';
import path from 'path';
import config from 'config';
import fs from 'fs';

const GLOBALS = {
  'process.env.NODE_ENV': JSON.stringify('development'),
  'process.env.WEBPACK': true
};

// Merge config and integrate it into the build
// https://github.com/lorenwest/node-config/wiki/Webpack-Usage
const build = path.resolve(__dirname, 'build');
if (!fs.existsSync(build)) {
  fs.mkdirSync(build);
}
fs.writeFileSync(path.resolve(__dirname, `${build}/client.json`), JSON.stringify(config));

export default {
  resolve: {
    extensions: ['', '.js', '.jsx', '.json'],
    alias: {
      // shttps://github.com/lorenwest/node-config/wiki/Webpack-Usage
      config: path.resolve(__dirname, 'build/client.json')
    }
  },
  debug: true,
  quiet: false,
  devtool: 'source-map', // more info:https://webpack.github.io/docs/build-performance.html#sourcemaps and https://webpack.github.io/docs/configuration.html#devtool
  noInfo: true, // set to false to see a list of every file being bundled.
  entry: [
    'bootstrap-loader',
    'webpack-hot-middleware/client?reload=true', // Reloads the page if hot module reloading fails.
    path.resolve(__dirname, 'src/index.js') // Defining path seems necessary for this to work consistently on Windows machines.
  ],
  target: 'web', // necessary per https://webpack.github.io/docs/testing.html#compile-and-test
  output: {
    path: path.resolve(__dirname, './public/dist/'), // Note: Physical files are only output by the production build task `npm run build`.
    publicPath: '/dist',
    filename: 'bundle.js'
  },

  sassLoader: {
    includePaths: [path.resolve(__dirname, './node_modules')]
  },
  plugins: [
    new webpack.DefinePlugin(GLOBALS),
    new webpack.PrefetchPlugin('react'),
    new webpack.PrefetchPlugin('react-router'),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.ProvidePlugin({
      jQuery: 'jquery',
      $: 'jquery',
      jquery: 'jquery'
    })
  ],
  module: {
    loaders: [
      { test: /\.js$|.jsx$/, exclude: /node_modules/, loaders: ['react-hot', 'babel'] },
      { test: /\.eot(\?v=\d+.\d+.\d+)?$/, loader: 'file' },
      { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url?limit=10000&mimetype=application/font-woff" },
      { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/octet-stream' },
      { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=image/svg+xml' },
      { test: /\.(jpe?g|png|gif|ico)$/i, loader: 'file?name=[name].[ext]' },
      { test: /(\.css|\.scss)$/, loaders: ['style', 'css?sourceMap', 'postcss', 'sass?sourceMap'] },
      { test: /\.json$/, loader: "json" }
    ]
  },
  postcss: () => [autoprefixer]
};
