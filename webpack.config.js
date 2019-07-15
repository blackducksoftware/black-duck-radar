const webpack = require('webpack');
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const distDir = path.resolve(__dirname, 'dist');
const srcDir = path.resolve(__dirname, 'src');
const jsDir = path.resolve(srcDir, 'js');

module.exports = (env = {}) => {
    const isProdBuild = Boolean(env.prod);
    const isAjaxDebugBuild = Boolean(env['debug-ajax']);
    const isReduxDebugBuild = Boolean(env['debug-redux']);

    const plugins = [
        new CleanWebpackPlugin(['dist']),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': isProdBuild ? JSON.stringify('production') : JSON.stringify('development')
            },
            DEBUG_AJAX: isAjaxDebugBuild,
            DEBUG_REDUX: isReduxDebugBuild
        }),
        new CopyWebpackPlugin([
            {
                from: 'src/img/*',
                to: 'img',
                flatten: true
            },
            {
                from: 'manifest.json',
                to: 'manifest.json'
            },
            {
                from: 'src/html/options.html',
                to: 'options.html'
            },
            {
                from: 'src/html/login.html',
                to: 'login.html'
            },
            {
                from: 'src/css/login.css',
                to: 'login.css'
            },
            {
                from: 'src/css/logo.css',
                to: 'logo.css'
            }
        ])
    ];

    if (isProdBuild) {
        const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
        plugins.push(
            new UglifyJSPlugin()
        );
    }

    return {
        devtool: isProdBuild ? undefined : '#inline-source-map',
        entry: {
            app: path.resolve(jsDir, 'app', 'index.jsx'),
            background: path.resolve(jsDir, 'background', 'index.js'),
            unload: path.resolve(jsDir, 'scripts', 'unload.js'),
            login: path.resolve(jsDir, 'scripts', 'login.js'),
            options: path.resolve(jsDir, 'scripts', 'options.js')
        },
        output: {
            path: distDir,
            filename: '[name].min.js'
        },
        resolve: {
            extensions: ['.json', '.js', '.jsx', '.css'],
            modules: [
                srcDir,
                jsDir,
                'node_modules'
            ]
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    loader: 'babel-loader',
                    exclude: /node_modules/
                },
                {
                    test: /\.jsx$/,
                    loader: 'babel-loader',
                    exclude: /node_modules/
                },
                {
                    test: /\.css$/,
                    use: [
                        {
                            loader: 'style-loader',
                            options: {
                                insertInto: '#BD_RADAR_HEADER'
                            }
                        },
                        {
                            loader: 'css-loader',
                            options: {
                                modules: true,
                                importLoaders: 1,
                                localIdentName: '[name]__[local]___[hash:base64:5]'
                            }
                        }
                    ]
                }
            ]
        },
        plugins
    };
}
;
