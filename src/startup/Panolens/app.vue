<template>
  <div id="myapp">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'myapp'
}
</script>

<style lang="stylus">
#myapp
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100%;
  height:100%;
  body
    margin: 0px !important;
</style>
