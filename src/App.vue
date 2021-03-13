<template>
  <div id="app">
    <router-view v-if="isRouterAlive" />
  </div>
</template>
<script>
export default {
  name: 'App',
  provide() {
    return {
      reload: this.reload
    }
  },
  components: {
  },
  data() {
    return {
      isRouterAlive: true
    }
  },
  methods: {
    reload() {
      this.isRouterAlive = false
      this.$nextTick(() => {
        this.isRouterAlive = true
      })
    }
  },

}
</script>
<style>
* {
  padding: 0;
  margin: 0;
  font-size: 14px;
  box-sizing: border-box;
}
li {
  list-style: none;
}
a {
  text-decoration: none;
}
html,
body {
  width: 100%;
  height: 100vh;
}
i {
  font-style: normal;
}
</style>
