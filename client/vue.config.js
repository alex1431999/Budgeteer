const path = require('path');

module.exports = {
  transpileDependencies: [
    'vuetify',
  ],
  configureWebpack: {
    resolve: {
      alias: {
        '@types': path.resolve(__dirname, '/../types/')
      },
      extensions: ['.ts']
    },
    devServer: {
      proxy: {
        '/api': {
          target: process.env.VUE_APP_API_URL,
          pathRewrite: { '^/api': '' },
        }
      },
    }
  }
};
