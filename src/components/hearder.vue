<template>
  <div id="hearder">
    <slot name="left"></slot>
    <slot name="center"></slot>
    <slot name="right">&emsp;</slot>
  </div>
</template>
<script>
export default {
  name: 'hearder'
}
</script>
<style scoped>
#hearder {
  width: 100%;
  height: 50px;
  background-image: linear-gradient(to right, #1c88e0, rgb(9, 71, 158));
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
  color: #ffffff;
}
</style>