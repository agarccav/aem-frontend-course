const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const SOURCE_ROOT = __dirname + '/src/main/webpack';

module.exports = env => {

    const writeToDisk = true;

    return merge(common, {
        mode: 'development',
        performance: {
            hints: 'warning',
            maxAssetSize: 1048576,
            maxEntrypointSize: 1048576
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: path.resolve(__dirname, SOURCE_ROOT + '/static/index.html')
            })
        ],
        devServer: {
            static: [path.resolve(__dirname, '/dist')],
            proxy: [
                {
                    context: ['/etc.clientlibs/mysite/clientlibs/clientlib-site.*.min.js'],
                    target: 'http://127.0.0.1:8080',
                    secure: false,
                    pathRewrite: { '^/etc.clientlibs/mysite/clientlibs/clientlib-site.*.min.js': '/clientlib-site/site.js' },
                },            
                {
                    context: ['/etc.clientlibs/mysite/clientlibs/clientlib-site.*.min.css'],
                    secure: false,
                    target: 'http://127.0.0.1:8080',
                    pathRewrite: { '^/etc.clientlibs/mysite/clientlibs/clientlib-site.*.min.css': '/clientlib-site/site.css' },
                },
                {
                    context: ['/content', '/etc.clientlibs'],
                    target: 'http://localhost:4502',
                }
            ],
            client: {
                overlay: {
                    errors: true,
                    warnings: false,
                },
            },
            watchFiles: ['src/**/*'],
            hot: false,
            devMiddleware: {
                writeToDisk: writeToDisk
            }
        }
    });
}
