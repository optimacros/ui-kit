import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ReactRefreshPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import { fileURLToPath } from 'url';
// import { exec } from 'node:child_process';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
    entry: './main.tsx',
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
    },
    context: path.resolve(__dirname, './src'),
    mode: 'development',
    devServer: {
        port: 5173,
        hot: true, // enable HMR on the server
        historyApiFallback: true, // fixes error 404-ish errors when using react router :see this SO question: https://stackoverflow.com/questions/43209666/react-router-v4-cannot-get-url
    },
    devtool: 'cheap-module-source-map',
    module: {
        rules: [
            {
                test: /\.(jpe?g|png|gif|svg|woff|eot|woff2|ttf)$/i,
                type: 'asset/resource',
            },
            {
                test: [/\.jsx?$/, /\.tsx?$/, /\.js?$/, /\.cjs?$/, /\.ts?$/, /\.cts?$/],
                use: ['babel-loader'],
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
        ],
    },
    plugins: [new HtmlWebpackPlugin({ template: 'index.webpack.html' }), new ReactRefreshPlugin()],
};
