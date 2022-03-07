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
      localStorage.removeItem("SD_TOKEN");
      await this.clearLogin() // 退出登录接口
      window.close()
    },
    // 关闭窗口之后执行--暂时用不到
    unloadHandler() {
    },
    // 退出登录接口
    clearLogin() {
      alert(process.env.VUE_APP_BASE_API + '/manage/login/logout')
      var xhttp = new XMLHttpRequest()
      xhttp.onreadystatechange = function() {
        if (xhttp.readyState === 4 && xhttp.status === 200) {
          console.log(xhttp.responseText)
        }
      }
      xhttp.open('GET', process.env.VUE_APP_BASE_API + '/manage/login/logout', true)
      alert(process.env.VUE_APP_BASE_API + '/manage/login/logout')
      xhttp.send()
    }
  }

};
</script>

<style>
@import "./assets/css/main.css";
@import "./assets/css/color-dark.css";
</style>
