# Setup for Webpack 1

To properly load font-awesome fonts, you need to configure loaders in your `webpack.config.js`. Example:

``` javascript
module.exports = {
  module: {
    loaders: [
      // the url-loader uses DataUrls.
      // the file-loader emits files.
      {
        test: /\.woff2?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        // Limiting the size of the woff fonts breaks font-awesome ONLY for the extract text plugin
        // loader: "url?limit=10000"
        loader: "url"
      },
      {
        test: /\.(ttf|eot|svg)(\?[\s\S]+)?$/,
        loader: 'file'
      },
    ]
  }
};
```

Font awesome font urls are of the format `[dot][extension]?=[version-number]`, for example `.woff?v=4.2.0`

The Regex for font types are adjusted to support these formats. Regex also support urls ending with .woff, .ttf, .eot and .svg (Used by Bootstrap).

## Complete Font-Awesome

To use the complete font-awesome package including all styles with the default settings:

``` javascript
import "font-awesome-loader";
```

The `require` statement should be present in your application code(Entry file or any other file required in entry file) and not in webpack.config.js.

## Custom configuration

You can configurate font-awesome-webpack with two configuration files:

* `font-awesome.config.js`
* `font-awesome.config.scss`

Add both files *next to each other* in your project. Then:

``` javascript
import "font-awesome-loader!./path/to/font-awesome.config.js";
```

Or simple add it as entry point to your `webpack.config.js`:

``` javascript
module.exports = {
  entry: [
    "font-awesome-loader!./path/to/font-awesome.config.js",
    "entry-file.js"
  ]
};
```

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

### `font-awesome.config.scss`

Imported after Font-Awesome's default variables, but before anything else.

You may customize Font-Awesome here.

Example:

```scss
$fa-inverse: #eee;
$fa-border-color: #ddd;
```

### extract-text-webpack-plugin

Configure style loader in `font-awesome.config.js`.

Example:

``` javascript
module.exports = {
  styleLoader: require('extract-text-webpack-plugin').extract('style-loader', 'css-loader!sass-loader'),
  styles: {
    ...
  }
};
```

Install `extract-text-webpack-plugin` before using this configuration.
