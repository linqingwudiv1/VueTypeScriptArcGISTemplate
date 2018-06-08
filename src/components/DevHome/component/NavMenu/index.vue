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
      <template v-for="itemdata in navdata">
        <el-menu-item v-bind:key="itemdata.key" v-bind:index="itemdata.routeurl">
          <i class="el-icon-menu"></i>
          <span slot="title">{{itemdata.title}}</span>
        </el-menu-item>
      </template>
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
