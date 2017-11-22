<template>
  <div class="TestHomeNavMenu">
    <el-menu
      v-bind:router="true"
      setyle="height:100%"
      default-active="/index"
      class="el-menu-vertical-demo"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">
      <el-menu-item index="/index">
        <i class="el-icon-menu"></i>
        <span slot="title">主页</span>
      </el-menu-item>
      <el-menu-item index="/gismapexam">
        <i class="el-icon-menu"></i>
        <span slot="title">GIS地图</span>
      </el-menu-item>
      <el-menu-item index="/DataTable">
        <i class="el-icon-setting"></i>
        <span slot="title">表格与EChart</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>
<script lang="ts" src="./index.ts"></script>
<style>
  .TestHomeNavMenu {
    width: 100%;
    height: calc(100%);
    background: #545c64;
  }
</style>
