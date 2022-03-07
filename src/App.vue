<template>
    <router-view />
</template>

<script>


export default {
  data() {
    return {
    }
  },
  mounted() {
    // 关闭浏览器执行退出接口--
    // onUnload方法是在关闭窗口之后执行
    // onbeforeUnload方法是在关闭窗口之前执行
    window.addEventListener('beforeunload', e => this.beforeunloadHandler(e))
    window.addEventListener('unload', e => this.unloadHandler(e))
  },
  destroyed() {
    // 关闭浏览器执行退出接口
    window.removeEventListener('beforeunload', e => this.beforeunloadHandler(e))
    window.removeEventListener('unload', e => this.unloadHandler(e))
  },
  methods: {
    // 关闭窗口之前执行
    async beforeunloadHandler(e) {
      this.beforeUnloadTime = new Date().getTime()
    },
    // 关闭窗口之后执行
    unloadHandler() {
      this.gapTime = new Date().getTime() - this.beforeUnloadTime
      if (this.gapTime <= 5) { //判断是窗口关闭还是刷新，小于5代表关闭，否则就是刷新。
        console.log('关闭了浏览器')
        localStorage.removeItem("SD_TOKEN");
        // 退出登录接口
        window.close()
      }
    },
  }

};
</script>

<style>
@import "./assets/css/main.css";
@import "./assets/css/color-dark.css";
</style>
