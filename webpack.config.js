const path = require('path');

module.exports = {
    entry: {
        background: './src/background.js',
        javbook: './src/javbook.js'
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'build')
    }
}