const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
    transpileDependencies: true,
    lintOnSave: false,
    publicPath: process.env.NODE_ENV === 'production'
        ? '/Shop/'
        : '/',
    devServer: {
        proxy: {
            "/api": {
                target: "http://gmall-h5-api.atguigu.cn/",
            }
        }
    }
})
