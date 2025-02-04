<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container-fluid">
      <router-link class="navbar-brand" to="/user/cart">用戶端範例</router-link>
    </div>
  </nav>
  <div class="container-fluid mt-3 position-relative">
    <ToastMessages></ToastMessages>
    <router-view />
  </div>
</template>

<script>
import emitter from '@/methods/emitter';
import ToastMessages from '@/components/ToastMessages.vue';

export default {
  components: {
    ToastMessages,
  },
  /** ***********  ✨ Codeium Command ⭐  ************  */
  /**
   * Provides the global emitter for child components to use.
   * @returns {{emitter: *}}
   */
  /** ****  518a45d3-7b16-4f3b-8bcb-42e38f7bcd86  ****** */
  provide() {
    return {
      emitter,
    };
  },
  created() {},
};
</script>
