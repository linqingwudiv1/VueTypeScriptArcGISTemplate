import Vue from 'vue'
import Component from 'vue-class-component'
import esriLoader from 'esri-loader'
@Component({
})
export default class TestGISMapExamComponent extends Vue {
  mounted() {

    esriLoader.loadModules(['esri/views/MapView', 'esri/WebMap'])
      .then(([MapView, WebMap]) => {
        // then we load a web map from an id
        var webmap = new WebMap({
          portalItem: { // autocasts as new PortalItem()
            id: 'f2e9b762544945f390ca4ac3671cfa72'
          }
        });
        // and we show that map in a container w/ id #viewDiv
        var view = new MapView({
          map: webmap,
          container: 'TestviewDiv'
        });
      }).catch(err => {
      // handle any errors
      console.error(err);
    });
  }
}
