<!--
 * @Author: your name
 * @Date: 2021-02-17 21:17:11
 * @LastEditTime: 2021-02-17 21:28:39
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \generator-vue\generators\app\HelloWorld.vue
-->
<template>
  <p>{{ greeting }} World!</p>
</template>

<script>
module.exports = {
  data: function() {
    return {
      greeting: "Hello"
    };
  }
};
</script>

<style scoped>
p {
  font-size: 2em;
  text-align: center;
}
</style>