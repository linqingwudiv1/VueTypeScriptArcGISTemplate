<template>
  <div class="TestDataTable">
    <h3>嘻嘻嘻</h3>
    <el-button type="primary" v-on:click="OnClick">HTTP请求展示</el-button>
    <hr/>
    <img/>

    <el-dialog title="接口查询" v-bind:visible.sync="bDialog_visiable" width="40%">
      <el-row v-bind:gutter="10">
        <el-col v-bind:span="20">
          <el-input v-model="requrl"></el-input>
        </el-col>
        <el-col v-bind:span="4">
          <el-button type="primary" style="width: 100%" v-on:click="OnClick_ReqData">
            接口请求
          </el-button>
        </el-col>
      </el-row>
      <el-row style="padding-top: 24px">
        <el-input type="textarea"
                  :rows="10" v-model="resdata">

        </el-input>
      </el-row>
    </el-dialog>

    <div id="echart" style="width: 100%;height: 360px;"></div>
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
<style lang="stylus">
.TestDataTable
  h3
    background-image :url('/logo.png');
</style>
