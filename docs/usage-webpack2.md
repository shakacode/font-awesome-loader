# Setup for Webpack 2

To properly load font-awesome fonts, you need to install font-awesome as dependencies

``` console
npm install --save font-awesome
or
yarn add font-awesome
```

Then add rules in Webpack configuration file to process it. Example:

``` javascript
module.exports = {
  ...
  module: {
    rules: [
      // the url-loader uses DataUrls.
      // the file-loader emits files.
      {
        test: /\.woff2?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        // Limiting the size of the woff fonts breaks font-awesome ONLY for the extract text plugin
        // loader: "url?limit=10000"
        use: "url-loader"
      },
      {
        test: /\.(ttf|eot|svg)(\?[\s\S]+)?$/,
        use: 'file-loader'
      },
    ]
  }
  ...
};
```

Font awesome font urls are of the format `[dot][extension]?=[version-number]`, for example `.woff?v=4.2.0`

The Regex for font types are adjusted to support these formats. Regex also support urls ending with .woff, .ttf, .eot and .svg (Used by Bootstrap).

## Complete Font-Awesome

To use the complete font-awesome package including all styles with the default settings:

``` javascript
import 'font-awesome/scss/font-awesome.scss';
```

That code should be present in your application code(Entry file or any other file required in entry file) or add in an entry Webpack configuration file

``` javascript
module.exports = {
  entry: [
    "font-awesome/scss/font-awesome.scss",
    "entry-file.js"
  ]
};
```

## Custom configuration

You can configurate font-awesome build result with two configuration files:

* `font-awesome.config.js`
* `font-awesome.config.scss`

Add both files *next to each other* in your project. Then:

### `font-awesome.config.js`

Example:

``` javascript
module.exports = {
  styles: {
    "mixins": true,

    "core": true,
    "icons": true,

    "larger": true,
    "path": true,
  }
};
```

Import it in application entry point. Example:

``` javascript
import 'font-awesome/scss/font-awesome.scss';
import 'path/to/font-awesome.config';
```

And then add this rule in Webpack configuration to build font-awesome source

``` javascript
module.exports = {
  module: {
    rules: [
      ...
      // parse config to build font-awesome source
      {
        test: /font-awesome\.config\.js/,
        use: [
          { loader: 'style-loader' },
          { loader: 'font-awesome-loader' },
        ],
      }
      ...
    ]
  }
};
```

### `font-awesome.config.scss`

Imported after Font-Awesome's default variables, but before anything else.

You may customize Font-Awesome here.

Example:

```scss
$fa-inverse: #eee;
$fa-border-color: #ddd;
```

### extract-text-webpack-plugin

Install `extract-text-webpack-plugin` then add the plugin to extract css file. Example:

``` javascript
module.exports = {
  module: {
    rules: [
      {
        test: /\.s?css/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [ 'css-loader', 'sass-loader' ]
        })
      }
    ],
  },

  plugins: [
    new ExtractTextPlugin({
      filename: '[name]-[chunkhash].css', allChunks: true,
    }),
  ]
};
```

