const { defineConfig } = require('@vue/cli-service')
module.exports = {
  transpileDependencies: true,
  devServer: {
    proxy: "http://localhost",
    port: 3000
  }
}
