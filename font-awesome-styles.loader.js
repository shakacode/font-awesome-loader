var styles = [
    'mixins',

    'core',
    'larger',
    'fixed-width',
    'list',
    'bordered-pulled',
    'animated',
    'rotated-flipped',
    'stacked',
    'icons',
    'screen-reader'
];

module.exports = function (content) {
    this.cacheable(true);
    var config = this.exec(content, this.resourcePath);
    var start =
        "@import          \"~@fortawesome/fontawesome-free/scss/_variables.scss\";\n"
        + "$fa-font-path: \"~@fortawesome/fontawesome-free/webfonts\";\n"
        + "@import          \"~@fortawesome/fontawesome-free/scss/solid.scss\";\n"
        + "@import          \"./font-awesome.config.scss\";\n";
    console.log(start);
    source = start + styles.filter(function (style) {
        return config.styles[style];
    }).map(function (style) {
        return "@import \"~@fortawesome/fontawesome-free/scss/_" + style + ".scss\";";
    }).join("\n");
    return source;
};
