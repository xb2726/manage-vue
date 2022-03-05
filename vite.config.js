import vue from '@vitejs/plugin-vue'

export default {
  base: './',
  plugins: [vue()],
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
  }
}