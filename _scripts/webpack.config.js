const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const HtmlWebpackPlugin = require('html-webpack-plugin');
const SitemapWebpackPlugin = require('sitemap-webpack-plugin').default;
const CopyPlugin = require('copy-webpack-plugin');
const ReplaceInFileWebpackPlugin = require('replace-in-file-webpack-plugin');
const CreateFileWebpack = require('create-file-webpack');
const uuid = require('uuid/v4');

const kegelPatterns = require(`${__dirname}/../frontend/config/patterns/kegel`);
const brunswickPatterns = require(`${__dirname}/../frontend/config/patterns/brunswick`);

const projectRoot = path.join(__dirname, '../');
const buildDirectory = path.join(projectRoot, 'frontend');
const distDirectory = path.join(projectRoot, 'build');

const ENV = process.env.NODE_ENV || 'development';

/**
 * Define application paths
 */
const paths = [
    {
        path: '/',
        priority: '1.0',
        changeFreq: 'daily'
    }
];

/**
 * Combine patterns
 */
const patterns = [].concat(kegelPatterns, brunswickPatterns);

/**
 * Map patterns to paths
 */
patterns.map((pattern) => {
    paths.push({
        path: `/pattern/${pattern.id}`,
        priority: '0.8',
        changeFreq: 'monthly'
    });
});

/**
 * Export webpack config
 *
 * @param env
 */
module.exports = (env) => {
    const webpackSettings = {
        performance: {
            hints: false
        },
        devServer: {
            host: '0.0.0.0',
            port: 3001,
            index: 'index.html',
            historyApiFallback: true
        },
        entry: {
            main: [
                path.join(buildDirectory, 'index.js'),
                path.join(buildDirectory, 'scss/style.scss')
            ]
        },
        output: {
            path: distDirectory,
            filename: 'dist/[name].[hash:6].js',
            publicPath: '/'
        },
        module: {
            rules: [
                {
                    enforce: "pre",
                    test: /\.js$/,
                    exclude: /node_modules/,
                    loader: 'eslint-loader',
                    options: {
                        failOnError: true,
                        failOnWarning: false
                    }
                },
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                        query: {
                            presets: [
                                require.resolve('@babel/preset-env'),
                                require.resolve('@babel/preset-react')
                            ],
                            plugins: [
                                [require.resolve('@babel/plugin-transform-react-jsx'), {pragma: 'h'}]
                            ]
                        }
                    }
                },
                {
                    test: /\.scss$/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        'css-loader?url=false',
                        'sass-loader'
                    ]
                }
            ]
        },
        plugins: [
            // new BundleAnalyzerPlugin(),
            new CopyPlugin([
                {from: 'public/kill-switch.txt'},
                {from: 'public/manifest.json'},
                {from: 'public/robots.txt'},
                {from: 'public/sw.js'},
                {from: 'public/docs/patterns/kegel/*.*', to: 'docs/patterns/kegel/', flatten: true},
                {from: 'public/docs/patterns/brunswick/*.*', to: 'docs/patterns/brunswick/', flatten: true},
                {from: 'public/fonts/*.*', to: 'fonts/', flatten: true},
                {from: 'public/images/*.*', to: 'images/', flatten: true},
                {from: 'public/images/icon/*.*', to: 'images/icon/', flatten: true},
                {from: 'public/images/provider/*.*', to: 'images/provider/', flatten: true},
                {from: 'public/images/patterns/kegel/*.*', to: 'images/patterns/kegel/', flatten: true},
                {from: 'public/images/patterns/brunswick/*.*', to: 'images/patterns/brunswick/', flatten: true},
                {from: 'public/images/patterns/kegel/small/*.*', to: 'images/patterns/kegel/small/', flatten: true},
                {from: 'public/images/patterns/brunswick/small/*.*', to: 'images/patterns/brunswick/small/', flatten: true}
            ]),
            new HtmlWebpackPlugin({
                template: 'public/index.html',
                inject: false
            }),
            new MiniCssExtractPlugin({
                filename: 'dist/[name].[hash:6].css'
            }),
            new SitemapWebpackPlugin('https://oilpattern.com', paths, {
                skipGzip: true
            })
        ]
    };

    if(ENV === "production") {
        webpackSettings.plugins.push(
            new ReplaceInFileWebpackPlugin([
                {
                    dir: 'build',
                    test: /\.js$/,
                    rules: [{
                        search: /__SW_VERSION__/g,
                        replace: `oilpattern.com_${uuid()}`
                    }]
                }
            ]),
            new CreateFileWebpack({
                path: distDirectory,
                fileName: 'kill-switch.txt',
                content: env ? env.SW_KILL : 'false'
            })
        );
    }

    if (ENV === "production") {
        webpackSettings.optimization = {
            minimizer: [
                new UglifyJsPlugin({
                    sourceMap: false,
                    uglifyOptions: {
                        warnings: false,
                        output: {
                            comments: false,
                            beautify: false
                        },
                        compress: {
                            drop_console: true
                        }
                    }
                })
            ]
        };
    }

    return webpackSettings;
};
