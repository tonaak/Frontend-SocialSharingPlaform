const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    createProxyMiddleware({
      target: 'https://troke-app.herokuapp.com',
      changeOrigin: false,
    })
  );
};