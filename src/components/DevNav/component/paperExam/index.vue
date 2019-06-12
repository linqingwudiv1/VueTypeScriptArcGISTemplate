<template>
  <div>
    <div id="PaperJSDiv">
      <canvas id="paperCanvas"></canvas>
    </div>
  </div>
</template>

<script lang="ts" src="./index.ts">
</script>
<style>

</style>
<style lang="stylus">
#PaperJSDiv 
  width: calc(100% - 10px);
  height: calc(100% - 10px);
  background: lightgray;
  margin: 5px;
  #paperCanvas
    width:100%;
    height:100%;
    background :rgb(38,38,38);
</style>
