<template>
  <div id="TestIndex">
    <el-tabs v-model="tabName" type="card" @tab-click="handleClick">
      <el-tab-pane label="Vue" name="1">
        <iframe src="https://cn.vuejs.org/index.html">
        </iframe>
      </el-tab-pane>
      <el-tab-pane label="TypeScript" name="2">
        <iframe src="http://www.typescriptlang.org/index.html">
        </iframe>
      </el-tab-pane>
      <el-tab-pane label="ElementUI" name="3">
        <iframe src="http://element.eleme.io/#/zh-CN">
        </iframe>
      </el-tab-pane>
      <el-tab-pane label="EChart" name="4">
        <iframe src="http://echarts.baidu.com/">
        </iframe>
      </el-tab-pane>

      <el-tab-pane label="Momentjs" name="5">
        <iframe src="http://momentjs.com/">
        </iframe>
      </el-tab-pane>
      <el-tab-pane label="Stylus" name="6">
        <iframe src="http://stylus-lang.com/">
        </iframe>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script lang="ts" src="./index.ts"></script>
<style lang="stylus" rel="stylesheet/stylus">
  #TestIndex
    .el-tab-pane
      height:calc(100vh - 120px);
      iframe
        width: calc(100% - 10px);
        height:calc(100% - 10px);
        margin :2px;
</style>
