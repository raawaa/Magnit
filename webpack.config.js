const path = require('path');

module.exports = {
    entry: {
        background: './src/background.js',
        javbook: './src/javbook.js',
        options: './src/options.js'
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'build')
    },
    module:
        {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /(node_modules|bower_components)/,
                    loader: 'babel-loader'
                }
            ]
        }
}