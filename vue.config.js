// 경로: 루트 디렉토리/vue.config.js
const path = require('path');

module.exports = {
  lintOnSave: false,
  // devServer: {
  //   proxy: {
  //     '/': {
  //       //URL /services/api.js API_PROXY_PREFIX 값을 일관되게 유지하십시오.
  //       target: process.env.VUE_APP_API_BASE_URL,
  //       changeOrigin: true,
  //       pathRewrite: {
  //         '^/': '',
  //       },
  //     },
  //   },
  // },
  configureWebpack: {
    resolve: {
      alias: {
        '@': path.join(__dirname, 'src/'),
      },
    },
  },
};
