module.exports = {
  transpileDependencies: [
    'vuetify',
  ],
  configureWebpack: {
    devServer: {
      allowedHosts: ['all'],
      proxy: {
        '/api': {
          target: process.env.VUE_APP_API_URL,
          pathRewrite: { '^/api': '' },
        }
      },
    }
  }
};
