<template>
    <div id="PanolensDiv">
      <canvas id="panolensCanvas" data-paper-resize="true" resize="true"></canvas>
    </div>
</template>

<script lang="ts" src="./index.ts">
</script>
<style>

</style>
<style lang="stylus">
#PanolensDiv 
  width: calc(100% - 10px);
  height: calc(100% - 10px);
  background: lightgray;
  margin: 5px;
  #panolensCanvas
    width:100%;
    height:100%;
    background : rgb(38, 38, 38);
  .floatbtngroup
    position : absolute ;
    top : 10px;
    background :rgba(200,200,200,0.5);
    padding: 3px;
    margin-left: 10px;
</style>
