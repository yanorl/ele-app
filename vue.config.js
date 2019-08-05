module.exports = {
  devServer: {
    open: true,
    host: '0.0.0.0',//0.0.0.0即可, 然后重启服务，这样localhost、127.0.0.1、本地IP均能正常访问
    port: 8080,
    https: false,
    hotOnly: false,
    proxy: {
      // 配置跨域
      '/api': {
        target: 'https://ele-interface.herokuapp.com/api/',
        ws: true,
        changOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    },
    before: app => {}
  }
};
