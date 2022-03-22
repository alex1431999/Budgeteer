const path = require('path');

module.exports = {
  transpileDependencies: [
    'vuetify',
  ],
  configureWebpack: {
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
