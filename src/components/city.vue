<template>
  <div id="position">
    {{values.IsName}}
    <div
      class="amap-page-container"
      id="mapDiv"
    >
      <el-amap
        vid="amapDemo"
        :center="values.center"
        ref="maprefs"
        :plugin="values.plugin"
        :zoom="values.zoom"
        :amap-manager="amapManager"
        :rotation="0"
        :resizeEnable="true"
      />
    </div>
  </div>
</template>

<script>
import VueAMap from 'vue-amap'
let amapManager = new VueAMap.AMapManager();
import adcode from '@/utils/adcode';
export default {
  name: 'position',
  components: {},
  data() {
    return {
      values: {
        center: [105.371438, 30.817690833333337],
        plugin: [],
        zoom: 12,
        IsName: ''
      },
      amapManager
    }
  },
  methods: {
    getCity() {
      let map = this.amapManager.getMap();
      // console.log(map.getAdcode());
      var code = map.getAdcode();
      console.log(code, 'code');
      for (let i = 0; i < adcode.length; i++) {
        for (let j = 0; j < adcode[i].city.length; j++) {
          // console.log(adcode[i].city[j].adcode.slice(0, 3), adcode[i].city[j], code.slice(0, 3));
          if (adcode[i].city[j].adcode.slice(0, 3) == code.slice(0, 3)) {
            let surname = adcode[i].provice;
            console.log(surname);
            this.values.IsName = surname
          }
        }
      }
    }
  },
  mounted() {
    setTimeout(() => {
      this.getCity();
    }, 1000);
  }
}
</script>
<style scoped>
#position {
  position: absolute;
  right: 20px;
  top: 0;
}
</style>