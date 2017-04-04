[![npm version](https://badge.fury.io/js/font-awesome-loader.svg)](https://badge.fury.io/js/font-awesome-loader)

font-awesome-loader
====================
Font awesome configuration and loading package for webpack, using font-awesome (Sass).

See example usage at [shakacode/bootstrap-loader](https://github.com/shakacode/bootstrap-loader) in the [examples](https://github.com/shakacode/bootstrap-loader/tree/master/examples).

Usage
-----

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

### Complete Font-Awesome

To use the complete font-awesome package including all styles with the default settings:

``` javascript
require("font-awesome-loader");
```

The `require` statement should be present in your application code(Entry file or any other file required in entry file) and not in webpack.config.js.

### Custom configuration

You can configurate font-awesome-webpack with two configuration files:

* `font-awesome.config.js`
* `font-awesome.config.scss`

Add both files *next to each other* in your project. Then:

``` javascript
require("font-awesome-loader!./path/to/font-awesome.config.js");
```

Or add it to your `webpack.config.js`:

``` javascript
module.exports = {
  ...
  module: [{
      test: /font-awesome\.config\.js/,
      use: [
        { loader: "style-loader" },
        { loader: "font-awesome-loader" }
      ]
  }]
  ...
};
```

#### `font-awesome.config.js`

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

#### `font-awesome.config.scss`

Imported after Font-Awesome's default variables, but before anything else.

You may customize Font-Awesome here.

Example:

```scss
$fa-inverse: #eee;
$fa-border-color: #ddd;
```

### extract-text-webpack-plugin

Configure style loader in `webpack.config.js`.

Example:

``` javascript
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  module: [{
      test: /\.s?css/,
      use: ExtractTextPlugin.extract('style-loader', 'css-loader!sass-loader')
  }]
};
```

Install `extract-text-webpack-plugin` before using this configuration.
[Here is an example](https://github.com/pksjce/font-awesome-test) of setting up `extract-text-webpack-plugin` with `font-awesome-loader`


## Credits

- Based on font-awesome-webpack (gowravshekar)
