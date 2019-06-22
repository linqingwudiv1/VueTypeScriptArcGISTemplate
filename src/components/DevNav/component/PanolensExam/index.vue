<template>
<div id="PanolensDiv">

    <div class="credit">疏散通道720° VR全景展示Demo</div>
    <div id="progress"></div>

    <div class="credit-footer">
        <el-button type="text" v-on:click="gotofocus">定位疏散点</el-button>
    </div>

        <div class="credit-footer" style="bottom : 55px;">
        <el-button type="text" v-on:click="openDialog">疏散平面图</el-button>
    </div>

  <el-dialog title="平面图"  :visible.sync="dialogVisible"  width="95%" custom-class="panelDialog">
          <el-card :body-style="{ padding: '0px' }">
                <img src="../../../../../static/img/q.jpg" class="image" style="width:100%">
                <div style="padding: 14px;">

                </div>
              </el-card>
  </el-dialog>

</div>
</template>

<script lang="ts" src="./index.ts">
</script>
    
<style>
#progress {
    width: 0;
    height: 5px;
    position: fixed;
    top: 0;
    background: #5c91b4;
    -webkit-transition: opacity 0.5s ease;
    transition: opacity 0.5s ease;
}

#progress.finish {
    opacity: 0;
}


.panelDialog
{
  background: rgba(31,31,31,0.9);

}

.panelDialog .el-dialog__title
{
  color: white;
}
.credit {
    position: absolute;
    text-align: center;
    width: 100%;
    padding: 20px 0;
    background: rgba(40,40,40, 0.3);;
    color: white;

}

.credit-footer {
    position: absolute;
    text-align: center;
    width: 6rem;
    padding: 5px 0;
    background: rgba(40,40,40, 0.9);
    color: white;
    bottom: 0;
    margin: 1rem;
    right: 0;
    box-shadow: rgba(48, 49, 51, 0.58) 2px 2px 2px 0px;
}

.title {
    font-size: 1.5em;
    text-align: center;
    padding: 5px;
}

.text {
    padding: 0 20px 20px 20px;
}
</style>
<style lang="stylus">
</style>
