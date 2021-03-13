<template>
  <div id="mapPosition">
    <div class="hearder">
      <span>
        <svg-icon icon-class="goBack" class="goBack" @click.native="toFather" />
      </span>
      <span>
        <svg-icon icon-class="search" class="searchmap" />
        <van-field v-model="values.search" @input.native="mapSearch" />
      </span>
      <span @click="toFather">确定</span>
    </div>
    <div class="searchWrap" v-show="judeg.searchWrap">
      <div
        class="searchContent"
        v-for="(content,index) in contents"
        :key="content.id"
        @click="SH(content,index)"
      >
        <p>
          <b>{{content.name}}</b>
        </p>
        <p>{{content.address.length > 35 ? content.address.slice(0,35) + '...': content.address}}</p>
      </div>
    </div>
    <!-- 地图 -->
    <div class="amap-page-container" id="mapDiv">
      <el-amap
        vid="amapDemo"
        ref="maprefs"
        :plugin="plugin"
        :zoom="zoom"
        :amap-manager="amapManager"
        :events="events"
        :rotation="0"
        :resizeEnable="true"
      ></el-amap>
    </div>
  </div>
</template>

<script>
import VueAMap from "vue-amap";
let amapManager = new VueAMap.AMapManager();
import { wgs84togcj02 } from "@/utils/coordinateSystem.js";
import hearder from "@/components/hearder";
export default {
  name: "mapPosition",
  components: {
    hearder
  },
  data() {
    let self = this;
    return {
      values: {
        search: ""
      },
      judeg: {
        searchWrap: false
      },
      marker: null,
      la:121.59996,
      contents: [],
      cen: null,
      zoom: 16,
      plugin: [
        {
          pName: "ToolBar",
          position: "RB",
          events: {}
        }
      ],
      amapManager,
      events: {
        // o 为地图组件实例
        init(o) {
          self.cen = JSON.parse(localStorage.getItem('position'))
          console.log(JSON.parse(localStorage.getItem('position')))
          let map = amapManager.getMap();
          map.setCenter([self.cen.position.lng,self.cen.position.lat])
          console.log(map.getCenter(),'1111')
          console.log("初始化", o);
        },
        moveend: () => {},
        zoomchange: () => {},
        click(e) {
          console.log("点击了", e);
          this.center = [e.lnglat.lng, e.lnglat.lat];
          //点击选择新地址为中心点
          let map = amapManager.getMap();
          console.log(this.marker, "map123");
          if (this.marker) {
            map.remove(this.marker);
          }
          if (map.marker) {
            console.log(1234);
            map.remove(map.marker);
          }
          map.setCenter([e.lnglat.lng, e.lnglat.lat]);
          this.marker = new AMap.Marker({
            position: this.center,
            offset: new AMap.Pixel(-13, -30),
            // 设置是否.可以拖拽
            draggable: false,
            cursor: "move",
            // 设置拖拽效果
            raiseOnDrag: true
          });
          // this.marker.setMap(map);
          map.add(this.marker);
          console.log(this.marker, "marker");
          var geocoder = new AMap.Geocoder({
            radius: 1000 //范围，默认：500
          });
          let lnglat = [e.lnglat.lng, e.lnglat.lat];
          geocoder.getAddress(lnglat, function(status, result) {
            if (status === "complete" && result.regeocode) {
              console.log(result.regeocode.formattedAddress); //打印地址
              self.values.search = result.regeocode.formattedAddress;
            }
          });
        }
        // end: (e) => {
        //   console.log('end');
        // }
      }
    };
  },
  methods: {
    // 向父组件传参数
    toFather() {
      let map = amapManager.getMap();
      console.log(map.getCenter());
      let arr;
      // if (this.marker != null) {
      //   arr = this.marker.getPosition();
      // }
      // console.log(arr)
      arr = map.getCenter();
      this.$emit("sendMap", false, arr);
    },
    //   定位
    // getPosition() {
    //   let map = this.amapManager.getMap();
    //   const self = this;
    //   //定位
    //   map.plugin("AMap.Geolocation", function() {
    //     var geolocation = new AMap.Geolocation({
    //       enableHighAccuracy: true, //是否使用高精度定位，默认:true
    //       timeout: 10000, //超过10秒后停止定位，默认：无穷大
    //       maximumAge: 0, //定位结果缓存0毫秒，默认：0
    //       convert: true, //自动偏移坐标，偏移后的坐标为高德坐标，默认：true
    //       showButton: true, //显示定位按钮，默认：true
    //       buttonPosition: "LB", //定位按钮停靠位置，默认：'LB'，左下角
    //       buttonOffset: new AMap.Pixel(10, 20), //定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
    //       showMarker: true, //定位成功后在定位到的位置显示点标记，默认：true
    //       showCircle: true, //定位成功后用圆圈表示定位精度范围，默认：true
    //       panToLocation: true, //定位成功后将定位到的位置作为地图中心点，默认：true
    //       zoomToAccuracy: true,
    //       noGeoLocation: 0, //禁止使用浏览器定位
    //       noIpLocate: 0 //禁止使用ID定位
    //     });
    //     map.addControl(geolocation);
    //     geolocation.getCurrentPosition();
    //     AMap.event.addListener(geolocation, "complete", onComplete); //返回定位信息
    //     AMap.event.addListener(geolocation, "error", onError); //返回定位出错信息
    //     //定位成功回调
    //     function onComplete(data) {
    //       console.log(data.position.lat,data.position.lng)
    //       self.values.search = data.formattedAddress;
    //       // self.setMaker();//添加maker
    //       if (map.marker) {
    //         map.remove(map.marker); //请除maker
    //       }
    //       if (this.marker) {
    //         map.remove(this.marker);
    //       }
    //       map.marker.setPosition(map.getCenter());
    //     }
    //     //定位失败回调
    //     function onError(data) {
    //       console.log("定位失败错误：", data); // 定位出错
    //       self.$toast("定位失败，请核对是否给予权限，稍后刷新再试");
    //       self.setMaker(); //添加maker
    //     }
    //   });
    // },
    // 搜索
    mapSearch() {
      const that = this;
      var keywords = this.values.search;
      let map = this.amapManager.getMap();
      map.plugin("AMap.PlaceSearch", function() {
        var autoOptions = {
          city: "湖北省",
          citylimit: true,
          outPutDirAuto: true
        };
        var placeSearch = new AMap.PlaceSearch(autoOptions);
        placeSearch.search(keywords, function(status, result) {
          // 搜索成功时，result即是对应的匹配数据
          if (result.info == "OK") {
            that.contents = result.poiList.pois;
            that.judeg.searchWrap = true;
            keywords.length >= 1 ? null : (that.judeg.searchWrap = false);
          }
        });
      });
    },
    // 搜索地图
    SH(c, i) {
      console.log(c, i);
      let map = this.amapManager.getMap();
      console.log(this.marker, "map");
      if (map.marker) {
        map.remove(map.marker); //请除maker
      }

      if (this.marker) {
        map.remove(this.marker);
      }
      this.values.search = c.name;
      this.judeg.searchWrap = false;
      map.setCenter([c.location.lng, c.location.lat]);
      this.setMaker(); //跳转后重新给maker
    },
    // 点标记
    setMaker() {
      let map = this.amapManager.getMap();
      map.marker = new AMap.Marker({
        position: map.getCenter(),
        offset: new AMap.Pixel(-13, -30),
        // 设置是否可以拖拽
        draggable: false,
        cursor: "move",
        // 设置拖拽效果
        raiseOnDrag: true
      });
      // this.marker.setMap(map);
      map.add(map.marker);
    }
  },
  created() {
    // setTimeout(() => {
    //   this.getPosition();
    // }, 500);
    console.log(666)
    // self.cen = [Number(localStorage.getItem('lat')),Number(localStorage.getItem('lng'))]
    console.log(map.getCenter())
  }
};
</script>
<style rel="stylesheet/css">
.searchmap {
  z-index: 99;
  position: absolute;
  left: 7px;
  top: 7px;
  font-size: 15px;
}
.van-field__control {
  display: inline-block;
  padding-left: 25px;
}
</style>
<style scoped>
#mapPosition {
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
}
#mapDiv {
  width: 100%;
  height: calc(100vh - 50px);
}
.hearder {
  width: 100%;
  height: 50px;
  background-image: linear-gradient(to right, #1c88e0, rgb(9, 71, 158));
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
  color: #ffffff;
}
.hearder span:nth-of-type(2) {
  position: relative;
}
.van-cell {
  width: 250px;
  height: 30px;
  padding: 5px;
}
.searchWrap {
  z-index: 999 !important;
  background-color: #fff;
  padding: 5px 15px;
  height: 100vh;
}
.searchContent {
  border-bottom: 1px solid #ccc;
}
.searchContent p {
  margin: 2px 0;
}
.searchContent:nth-of-type(2) {
  font-size: 12px;
}
</style>