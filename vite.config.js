import vue from '@vitejs/plugin-vue'
import viteCompression from 'vite-plugin-compression'

export default {
  base: './',
  plugins: [vue(),
    // gzip压缩 生产环境生成 .gz 文件
    viteCompression({
      verbose: true,
      disable: false,
      threshold: 10240,
      algorithm: 'gzip',
      ext: '.gz',
    }),],
  optimizeDeps: {
    include: ['schart.js']
  },
  server: {
    cors: true,
    open: true,
    proxy: {
      '/cms': {
        target: 'http://127.0.0.1:9090/',   //代理接口
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/cms/, '')
      }
    }
  },
  // 生产环境打包配置
  //去除 console debugger
  build: {
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
  },
}