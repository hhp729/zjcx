<template>
  <div class="add">
    <!--  -->
    <div class="menu">
      <svg-icon
        icon-class="goBack"
        className='goBack'
        @click.native="goback()"
      />
      <span
        v-for="cars in car"
        :key="cars.id"
      >{{cars.name}}路</span>
      <svg-icon
        icon-class="flush"
        className='flush'
        @click.native="updata()"
      />

    </div>
    <!--  -->
    <div class="nav">
      <a href="javascript:;">
        <span
          class="start"
          v-for="(result,index) in carList"
          :key="index"
        >{{result.start}}</span>
        <svg-icon
          icon-class="rightAR"
          className='rightAR'
          style="margin:0 10px"
        />
        <span
          v-for="result in carList"
          :key="result.id"
        >{{result.endted}}</span>
        <p
          v-for="item in car"
          style="color:#999"
          :key="item.id"
        >首&emsp13;{{item.first}}&emsp13;末&emsp13;{{item.end}}&emsp;·&emsp;票价{{item.price}}</p>
      </a>
      <!-- 反转 -->

    </div>
    <!-- 地图 -->
    <div
      class="amap-page-container"
      id="mapDiv"
    >
      <el-amap
        vid="amapDemo"
        :center="center"
        ref="maprefs"
        :plugin="plugin"
        :zoom="zoom"
        :amap-manager="amapManager"
        :events="events"
        :rotation="0"
        :resizeEnable="true"
      >
        <!-- 绘公交线路 -->
        <el-amap-bezier-curve
          v-for="line in bezierCurveArr"
          :key="line.id"
          :events="line.events"
          :path="line.path"
          :stroke-color="line.strokeColor"
          :stroke-style="line.strokeStyle"
          :stroke-opacity="line.strokeOpacity"
          :showDir="true"
        ></el-amap-bezier-curve>
        <!-- 绘制站点 -->
        <el-amap-marker
          v-for="(marker, index) in markers"
          :key="marker.id"
          :position="marker.position"
          :vid="index"
        >
          <div style="background-color: #3367e9;width: 22px;height: 22px;border: 2px solid #e6e6e6;position: relative;left: 0px;top: 18px;border-radius: 50%;color: white;display: flex;align-items: center;justify-content: center;font-size: 10px;">
            <span @click="showStationInfo(marker)">{{marker.content}}</span>
          </div>
        </el-amap-marker>
        <!-- 站点信息 -->
        <el-amap-info-window
          :position="currentWindow.position"
          :content="currentWindow.content"
          :visible="currentWindow.visible"
          :isCustom="true"
          :closeWhenClickMap="true"
          :autoMove="true"
          :events="currentWindow.events"
        ></el-amap-info-window>
        <!-- 车辆 -->
        <el-amap-marker
          v-for="busMarker in busMarkers"
          :key="busMarker.id"
          :position="busMarker.position"
          :content="busMarker.content"
          :events="busMarker.events"
          :angle="busMarker.angle"
          z-index="9999"
        ></el-amap-marker>
        <!-- 车辆信息 -->
        <el-amap-info-window
          :position="busWindow.position"
          :content="busWindow.content"
          :visible="busWindow.visible"
          :isCustom="true"
          :closeWhenClickMap="true"
          :autoMove="true"
          :events="busWindow.events"
        ></el-amap-info-window>
      </el-amap>
    </div>
  </div>
</template>

<script>

import VueAMap from 'vue-amap'
let amapManager = new VueAMap.AMapManager();
import { wgs84togcj02 } from '@/utils/coordinateSystem.js';
import { getlinedetail, getLineRealtimeStatus } from '@/api/Nearbybusline.js';

export default {
  inject: ['reload'],
  data() {
    return {
      zoom: 13,
      center: [111.76053, 30.42594],
      amapManager,
      events: {// o 为地图组件实例
        init(o) {
          console.log('初始化' + o);
        },
        click(e) {
          console.log('点击了', e);
        },
        end: (e) => {
          console.log('end');
        }
      },
      bezierCurveArr: [],
      markers: [],
      car: [],
      siteList: [],
      carList: [],
      name: "",
      path: [],
      set: [],
      markers: [],
      infoWindows: [],
      currentWindow: {
        visible: false,
        position: [100, 20],
        content: '',
        events: {}
      },
      busWindow: {
        visible: false,
        position: [100, 20],
        content: '',
        offset: [0, -50],
        events: {}
      },
      busMarkers: [],
      plugin: [
        {
          pName: 'ToolBar',
          position: 'RB',
          events: {}
        }
      ],
      busImg: require('../../assets/map/fs.png'),
      mapHPosition: [],
      about: true,
      dir: 0,
      setTimer: null
    };
  },
  created() {
    
  },
  methods: {
    // 返回上一页
    goback() {
      this.$router.go(-1);
    },

    // 刷新
    updata() {
      this.reload();
    },
    // 换向
    reversal() {
      this.about = !this.about
      this.about ? this.dir = 0 : this.dir = 1;
      console.log(this.dir);
      // this.getInfo();//获取线路信息
      // this.getBusPosition();//获取车辆位置
    },
    // 绘线
    mapSetBezierCurve(arr) {
      let self = this;
      self.bezierCurveArr = [];
      for (let i = 0; i < arr.length; i++) {
        let bezierCurve = {
          path: arr,
          strokeDasharray: [5, 5],
          strokeColor: '#3366FF',//线条颜色
          strokeOpacity: 0.9, //线透明度
          strokeWeight: 3, //线宽
          strokeStyle: "solid", //线样式
          showDir: true,
          events: {
            init(o) {//初始化marker
              let infoDic = {
                site: i,
              };
              o.infoDic = infoDic;
            },
          },
          editable: false,
        }
        this.bezierCurveArr.push(bezierCurve);
      }
    },

    // 撒点
    showStationInfo(marker) {
      this.currentWindow.visible = false
      this.$nextTick(() => {
        this.currentWindow = this.infoWindows[marker.index]
        this.currentWindow.visible = true
      })
    },
    // 定位高德默认采用的是高精度定位
    getPosition() {
      let map = this.amapManager.getMap();
      const self = this;
      //定位
      map.plugin('AMap.Geolocation', function () {
        var geolocation = new AMap.Geolocation({
          enableHighAccuracy: true,//是否使用高精度定位，默认:true
          timeout: 5000,          //超过10秒后停止定位，默认：无穷大
          maximumAge: 0,           //定位结果缓存0毫秒，默认：0
          convert: true,           //自动偏移坐标，偏移后的坐标为高德坐标，默认：true
          showButton: true,        //显示定位按钮，默认：true
          buttonPosition: 'LB',    //定位按钮停靠位置，默认：'LB'，左下角
          buttonOffset: new AMap.Pixel(10, 20),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
          showMarker: true,        //定位成功后在定位到的位置显示点标记，默认：true
          showCircle: true,        //定位成功后用圆圈表示定位精度范围，默认：true
          panToLocation: false,     //定位成功后将定位到的位置作为地图中心点，默认：true
          noGeoLocation: 0,          //禁止使用浏览器定位 
          noIpLocate: 0//禁止使用ID定位 
        });
        map.addControl(geolocation);
        geolocation.getCurrentPosition();
        AMap.event.addListener(geolocation, 'complete', onComplete);//返回定位信息
        AMap.event.addListener(geolocation, 'error', onError);      //返回定位出错信息
        //定位成功回调
        function onComplete(data) {
          console.log('定位成功信息：', data)// data是具体的定位信息
          geolocation.options.zoomToAccuracy = true;//更改为true页面
          // 处理浏览器定位不准备
          // if (data.location_type !== "ip") {
          //   let PIN = wgs84togcj02(data.position.getLng(), data.position.getLat())
          //   var marker = new AMap.Marker({
          //     position: new AMap.LngLat(PIN[0], PIN[1]),   // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
          //   });
          //   map.add(marker);
          //   if (geolocation.options.zoomToAccuracy) {
          //     map.setZoomAndCenter(14);
          //   }
          //   geolocation.options.showMarker = false;
          // } else {
          //   geolocation.options.showMarker = true;
          // }
          // geolocation.options.zoomToAccuracy = true;//更改为true页面
        }
        //定位失败回调
        function onError(data) {
          console.log('定位失败错误：', data)// 定位出错
          self.$toast('定位失败，请核对是否给予权限，稍后刷新再试')
        }
      })
    },
    // 公交车位置
    getBusPosition() {
      var self = this;
      let data = {
        id: this.$route.params.id,
        dir: this.$route.params.dir
      }
      getLineRealtimeStatus(data).then(res => {
        console.log('new公交车位置信息', res.data)
        // 车辆
        const newBus = res.data.map((b, index) => {
          var zbx = wgs84togcj02(b.x, b.y)
          return {
            id: b.id,
            index: b.index,
            name: b.name,
            position: zbx,
            content: `<img style="width:0.7rem;" src="${this.busImg}" alt="">`,
            angle: b.angle,//车辆方向旋转角度
            events: {
              click(e) {
                self.busWindow.visible = false;
                self.$nextTick(() => {
                  self.busWindow.position = zbx;
                  self.busWindow.content = `<div style="width: text-align: center;200px;background-color: rgba(255, 255, 255, 0.9);color: rgb(51,103,233);padding: 15px;position: relative;">车辆信息：${b.name.substring(b.name.length - 8)}<div style="position: absolute;left: calc(50% - 5px);bottom: -5px;background-color: rgba(255, 255, 255, 0.9);width: 10px;height: 10px;transform: rotate(45deg);"></div></div>`
                  self.busWindow.visible = true;
                });
              }

            }
          }

        });

        this.$nextTick(() => {
          this.busMarkers = newBus;
        });

      })
    },
    // //请求车辆信息/站点信息/线路信息/定位信息 
    getInfo() {
      let data = {
        id: this.$route.params.id,
        dir: this.$route.params.dir
      }
      getlinedetail(data).then(res => {
        var self = this;
        console.log("new公交线路站点信息", res.data);

        // 其它坐标系转换高德地图
        var PathStes = res.data.route.coordinates;
        for (let i = 0; i < PathStes.length; i++) {
          let wgs = wgs84togcj02(PathStes[i][0], PathStes[i][1])
          self.path.push(wgs)
        }
        // 中心点
        var positionLength = Math.round(res.data.route.coordinates.length / 2);
        self.center = res.data.route.coordinates[positionLength];
        self.mapSetBezierCurve(self.path);//绘线
        self.set = res.data.stations;

        const markers = self.set.map((d, index) => {
          var zbx = wgs84togcj02(d.x, d.y)
          return {
            id: d.id,
            index: index,
            name: d.name,
            position: zbx,
            content: index + 1
          }
        })

        self.markers = markers;
        self.infoWindows = markers.map((marker, index) => {
          return {
            position: marker.position,
            content: `<div style="width: 150px;text-align: center;background-color: rgba(255, 255, 255, 0.9);color: rgb(51,103,233);padding: 15px;position: relative;">${marker.name}<div style="position: absolute;left: calc(50% - 5px);bottom: -5px;background-color: rgba(255, 255, 255, 0.9);width: 10px;height: 10px;transform: rotate(45deg);"></div></div>`,
            events: {},
            visible: true
          }
        });

        // 处理标题渲染
        self.car.push({
          end: res.data.end,
          first: res.data.first,
          price: res.data.price,
          id: res.data.id,
          name: res.data.name
        });

        self.siteList = res.data.stations;
        for (let i = 0; i < self.siteList.length; i++) {
          if (i == 0) {
            self.carList.push({
              start: self.siteList[i].name,
              id: self.siteList[i].id
            });
          }
          if (i == self.siteList.length - 1) {
            self.carList.push({
              endted: self.siteList[i].name,
              id: self.siteList[i].id
            });
          }
        }

      });
    },
    // 调用wx获取位置


  },

  mounted() {
    this.dir = this.$route.params.dir;

    this.getInfo();//请求车辆信息/站点信息/线路信息/定位信息 
    this.getBusPosition();//获取公交车位置 
    // this.bus.$emit('loading', false);//取消loading效果

    setTimeout(() => {
      this.getPosition();//定位异步
    }, 1000);

    this.setTimer = setInterval(this.getBusPosition, 5000);//间隔十秒请求一次，以重新获取公交车位置信息
  },

  beforeDestroy() {
    clearInterval(this.setTimer);//请除定时器
    this.setTimer = null;
  },
  created() {
    // this.bus.$emit('loading', true);//先行加载loading效果
  }

};
</script>

<style lang="scss" scoped>
.add {
  width: 100%;
  height: 100vh;

  #mapDiv {
    width: 100%;
    height: calc(100vh - 50px);
  }

  .amap-icon img {
    width: 20px;
    height: 20px;
    background-color: red;
    border-radius: 50%;
  }
  .amap-marker-label .info {
    width: 100px;
    height: 100px;
    border: 1px solid #ccc;
  }
  .sr-only {
    display: none;
  }
  .menu {
    width: 100%;
    height: 50px;
    background-image: linear-gradient(to right, #1c88e0, rgb(9, 71, 158));
    line-height: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px;
    span {
      color: white;
    }
    .flush {
      font-size: 19px;
    }
  }
  .nav {
    width: 100%;
    padding: 5px 20px;
    top: 1.1rem;
    z-index: 999;
    background: #fff;
    font-size: 14px;
    display: flex;
    justify-content: space-between;
    position: fixed;
    left: 0;
    top: 50px;
    p {
      margin-top: 1%;
    }
    a {
      color: #555;
    }
    a:nth-of-type(2) {
      width: 20%;
      text-align: center;
      line-height: 46px;
    }
    .iconHX {
      margin: 0 5px;
    }
    span {
      vertical-align: middle;
    }
    .icon-jiang {
      display: inline-block;
      margin: 0 5%;
      vertical-align: super;
    }
  }
  .amap-demo {
    height: 20rem;
  }
  .reversalDir {
    font-size: 12px;
  }
}
</style>
