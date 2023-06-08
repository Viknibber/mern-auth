const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './client/index.js',
    output: { path: path.join(__dirname, 'dist'), filename: 'bundle.js' },

    devServer: {
        port: '3000',
        static: { directory: path.join(__dirname, 'dist') },
        proxy: { '/api': 'http://localhost:5000' },
        open: true,
        hot: true,
        liveReload: true,
        historyApiFallback: true,
    },

    plugins: [new HtmlWebpackPlugin({ template: './client/public/index.html' })],

    module: {
        rules: [
            {
                test: /.js$/,
                exclude: /node_modules/,
                use: { loader: 'babel-loader', options: { presets: ['@babel/preset-env', '@babel/preset-react'] } },
            },
            {
                test: /\.css$/,
                exclude: /node_modules/,
                use: [{ loader: 'style-loader' }, { loader: 'css-loader' }],
            },
        ],
    },
};
