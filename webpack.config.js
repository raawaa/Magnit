const path = require('path');

module.exports = {
    entry: {
        background: './src/background.js',
        options: './src/options.js',
        content: './src/content.js'
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            }
        ]
    }
}