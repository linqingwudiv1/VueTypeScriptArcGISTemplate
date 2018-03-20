<template>
  <div class="TestTypeTest">
    <el-row>
      <el-col style="background: #545c64;height: 64px;" v-bind:span="24">
        <h2 style="color: white;text-align: left;">&nbsp;&nbsp;&nbsp;Vue2.x+Element-UI 2.x+TypeScript2.x+EChart3.x+ArcGIS Example</h2>
      </el-col>
    </el-row>
    <div class="TestMain">
      <el-row>
        <el-col :span="5">
          <navmenu v-bind:navdata="navdata"></navmenu>
        </el-col>
        <el-col :span="19">
          <router-view style="width: 100%;height: calc(100% - 15px);"></router-view>
        </el-col>
      </el-row>
    </div>

  </div>
</template>

<script lang="ts" src="./index.ts">
</script>
<style>
  .TestTypeTest {
  }
  .TestMain {
    height:calc(100vh - 80px);
    text-align: left;
  }

  .TestMain .el-row {
    height: 100%;
  }
  .TestMain .el-col {
    height: 100%;
  }
</style>
