const path = require('path');

module.exports = {
    mode: 'development',
    entry: './src/login.js',
    devServer: {
        static: {
            directory: path.join(__dirname, 'src'),
        },
        proxy: [
            {
            context: ['/api'],
            target: 'http://localhost:8080',
            changeOrigin: true,
            pathRewrite: { '^/api': '' }
            }
        ],
        historyApiFallback: {
            rewrites: [
              { from: /.*/, to: '/login.html' },
            ],
          },
        port: 3030,
        open: false,
    },
  };