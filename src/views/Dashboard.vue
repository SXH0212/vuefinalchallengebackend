<template>
  <Navbar></Navbar>
  <div class="container-fluid mt-3 position-relative">
    <ToastMessages></ToastMessages>
    <router-view />
  </div>
</template>
<script>
import emitter from '@/methods/emitter';

import ToastMessages from '@/components/ToastMessages.vue';
import Navbar from '@/components/Navbar.vue';

export default {
  components: {
    Navbar,
    ToastMessages,
  },
  provide() {
    return {
      emitter,
    };
  },
  inject: ['httpMessageState'],
  created() {
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
    // console.log(token);
    this.$http.defaults.headers.common.Authorization = token;
    const api = `${process.env.VUE_APP_API}api/user/check`;
    this.isLoading = true;
    this.$http.post(api, this.user).then((res) => {
      this.isLoading = false;
      console.log('api/user/check', res);
      this.httpMessageState(res, '登入');
      if (!res.data.success) {
        this.$router.push('/login');
      }
    });
  },
};
</script>
