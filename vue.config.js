process.env.VUE_APP_VERSION = require('./package.json').version
const webpack = require('webpack');
const {defineConfig} = require('@vue/cli-service')

module.exports = defineConfig({
    configureWebpack: {
        plugins: [
            new webpack.DefinePlugin({
                __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: 'false',
            })
        ],
    },
    transpileDependencies: true,
    lintOnSave: false
});