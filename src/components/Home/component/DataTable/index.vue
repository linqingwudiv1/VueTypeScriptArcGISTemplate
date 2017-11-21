<template>
  <div class="TestDataTable">
    <h3>嘻嘻嘻</h3>
    <el-button type="primary" v-on:click="OnClick">请求测试</el-button>
    <hr/>

    <div id="echart" style="background: red;width: 100%;height: 360px;"></div>

    <el-table
      v-bind:data="tableData"
      style="width: 100%">
      <el-table-column
        prop="date"
        label="日期"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="address"
        label="地址">
      </el-table-column>
    </el-table>
  </div>
</template>
<script lang="ts" src="./index.ts">
</script>
<style>
</style>
