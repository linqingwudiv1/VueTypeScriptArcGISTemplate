<template>
    <div id="PanolensDiv">
          <div class="credit"><a href="https://github.com/pchen66/panolens.js">Panolens.js</a> infospot example. Images from Google Streetview API</div>
    
    <div id="desc-container" style="display:none">
      <iframe src="https://www.youtube.com/embed/D7icsuamx5E"></iframe>
      <div class="title">China's Forgotten War</div>
      <div class="text">WWII came to the small town of Tai’erzhuang in central China – and it was never the same again. The town was strategically placed, on the north-south transport railway corridor and the ancient Grand Canal, and so was a focus of the Japanese Imperial army as it advanced. Li Jing Shan was only a child when his family fled the fighting. They returned to find their home, and most of the town, in ruins.</div>
    </div>
    </div>
</template>

<script lang="ts" src="./index.ts">
</script>
    <style>


      a:link, a:visited{
        color: #bdc3c7;
      }

      .credit{
        position: absolute;
        text-align: center;
        width: 100%;
        padding: 20px 0;
        color: #fff;
      }

      #desc-container {
        max-width: 500px;
        max-height: 500px;
        min-width: 200px;
        min-height: 250px;
        background: #fff;
        color: #000;
        border-radius: 3px;
        overflow: auto;
        -webkit-overflow-scrolling: touch;
      }

      #desc-container > iframe {
        border: none;
        width:100%;
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
