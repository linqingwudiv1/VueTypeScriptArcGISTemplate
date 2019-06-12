<template>
  <div>
    <div id="PaperJSDiv">
      <canvas id="paperCanvas"></canvas>

      <div class="floatbtngroup">
        <el-row>
          <el-col v-bind:span="24">
            <el-button size="mini" v-on:click="ZoomIn">
              加
            </el-button>
          </el-col>
        </el-row>

        <el-row style="padding-top:3px;">
          <el-col v-bind:span="24">
            <el-button size="mini" v-on:click="ZoomOut">
              减
            </el-button>
          </el-col>
        </el-row>
      </div>

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
    background : rgb(38, 38, 38);
  .floatbtngroup
    position : absolute ;
    top : 60px;
    background :rgba(200,200,200,0.5);
    padding: 3px;
    margin-left: 10px;
</style>
