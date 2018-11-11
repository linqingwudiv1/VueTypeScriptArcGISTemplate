<template>
  <div id="TestIndex">
    <el-tabs v-model="tabName" type="card">
      <el-tab-pane label="主页" name="0">
        <div class="PathDescription">
                  <h3>资源路径区别：</h3>
                  <h3 style="font-family:customfont;">自定义字体同理.如:a b c d e f g H I J K L N M</h3>
        <img src="../../../assets/logo.png" title="按层回推">
        <img src="@/assets/google.png" title="使用别名">
        <img src="../../.././assets/baidu.png">
          </div>

      </el-tab-pane>
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
      <el-tab-pane label="ThreeJS" name="7">
        <iframe src="https://threejs.org/">
        </iframe>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script lang="ts" src="./home.ts"></script>
<style lang="stylus" rel="stylesheet/stylus">
  @font-face
  {
    font-family: customfont;
    src:url('../../../assets/fonts/test.otf')
  }
  #TestIndex
    .el-tab-pane
      height:calc(100vh - 120px);
      iframe
        width: calc(100% - 10px);
        height:calc(100% - 10px);
        margin :2px;
    .PathDescription
      font
</style>
