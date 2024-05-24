const path = require('path');

module.exports = {
    mode: 'development',
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
        port: 3030,
        open: false,
    },
  };