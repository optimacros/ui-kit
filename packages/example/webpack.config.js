import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ReactRefreshPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import { fileURLToPath } from 'url';
// import { exec } from 'node:child_process';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const outputConfig = {
    destPath: './dist',
};

export default {
    entry: './main.tsx',
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
    },
    context: path.resolve(__dirname, './src'),
    mode: 'development',
    devServer: {
        hot: true, // enable HMR on the server
        historyApiFallback: true, // fixes error 404-ish errors when using react router :see this SO question: https://stackoverflow.com/questions/43209666/react-router-v4-cannot-get-url
    },
    devtool: 'cheap-module-source-map',
    module: {
        rules: [
            {
                test: [/\.jsx?$/, /\.tsx?$/],
                use: ['babel-loader'],
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                type: 'asset/resource',
            },
        ],
    },
    plugins: [new HtmlWebpackPlugin({ template: 'index.webpack.html' }), new ReactRefreshPlugin()],
};
