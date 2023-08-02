const path = require('path');
const FileManagerPlugin = require('filemanager-webpack-plugin');

module.exports = {
    devtool: 'source-map',
    entry: './index.tsx', // Change this to the entry file of your TypeScript code
    output: {
        path: path.resolve(__dirname, 'build', 'static'),
        filename: 'bundle.js',
    },
    module: {
        rules: [{
                test: /\.(ts|tsx)$/, // TypeScript files
                exclude: /node_modules/,
                use: {
                    loader: 'ts-loader',
                },
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            "@babel/preset-env", ["@babel/preset-react", { "runtime": "automatic" }]
                        ],
                    },
                },
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
        ],
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx'], // Add TypeScript extensions
    },
    plugins: [
        new FileManagerPlugin({
            events: {
                onEnd: {
                    copy: [{
                        source: path.resolve(__dirname, 'build', 'static', 'bundle.js'),
                        destination: path.resolve(__dirname, '..', 'server', 'static', 'bundle.js'),
                    }, ],
                }
            },
            runTasksInSeries: false,
        }),
    ],
};