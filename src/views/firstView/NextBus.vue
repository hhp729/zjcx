<template>
  <div class="NextBus">
    <div class="hearder">
      <span>实时公交</span>
      <!-- 图片广告 -->
    </div>
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
    <div class="NextBusMain">
      <img
        :src="advertising"
        alt
      />
      <!-- 第一板块 -->

      <!-- 搜索 -->
      <div class="search">
        <div class="inpWrap">
          <svg-icon
            icon-class="searchwhite"
            className='searchwhite'
          />
          <input
            type="text"
            v-model="searchInpVal"
            placeholder="搜索公交路线、站点"
          />
        </div>
      </div>
      <!-- 线路 -->
      <div class="circuitWrap">
        <div
          class="circuit"
          v-for="(busRouter,index) in filterNameBus"
          :key="index"
          @click="toRouter(busRouter.id, busRouter.judge?routerDir = 0:routerDir = 1, busRouter.judge?busRouter.up.near_station.name:busRouter.down.near_station.name, busRouter.judge?busRouter.down.near_station.name:busRouter.up.near_station.name)"
          v-show="busRouter.name !== '顶班车'"
        >
          <!-- -->
          <a
            href="javascript:;"
            @click.stop="inverting(busRouter.judge,index)"
          >
            <svg-icon
              icon-class="reversing"
              className='reversing'
            />
            <p>换向</p>
          </a>
          <!-- 收藏 -->
          <div
            class="triangle"
            v-for="item in collect"
            :key="item.id"
            v-show="item == busRouter.id"
          >
            <van-icon
              name="star"
              color="#fff"
            />
          </div>
          <!--  -->
          <a href="javascript:;">
            <p>
              <i>{{busRouter.name}}</i> 路
            </p>
            <!-- transition -->
            <p ref="transition_staions">
              开往&emsp13;
              <i>{{busRouter.judge ? busRouter.up.end : busRouter.down.end}}</i>&emsp13;方向
            </p>
            <p>
              <i>{{busRouter.judge? busRouter.up.near_station.name :busRouter.down.near_station.name}}</i> &emsp13;|&emsp13;约
              <i>{{busRouter.judge?busRouter.up.near_station.distance:busRouter.down.near_station.distance}}</i> 米
            </p>
          </a>
          <a href="javascript:;" class="position">
            <p v-if="busRouter.judge">
              <i
                v-if="busRouter.up.near_station.near_bus_stations > 0"
                class="Iactive"
              >
                {{busRouter.up.near_station.near_bus_stations}}
                <i>站</i>
                <svg-icon
                  icon-class="signWifi"
                  className='signWifi'
                />
              </i>
              <i
              style="color:#555;font-size:12px;"
                v-else-if="busRouter.up.near_station.near_bus_stations < 0"
                class="Oactive"
              >首站未发车</i>
              <i
              style="color:#555;font-size:12px;"
                v-else-if="busRouter.up.near_station.near_bus_stations == 0"
                class="Oactive"
              >即将到站</i>
              <!-- <i :class="[busRouter.up.near_station.near_bus_stations > 0 ?  'Iactive' :'Oactive']">{{busRouter.up.near_station.near_bus_stations > 0 ? busRouter.up.near_station.near_bus_stations:'首站未发车'}}</i>站 -->
            </p>
            <!-- v-else-if="!busRouter.judge" -->
            <p v-else-if="!busRouter.judge">
              <i
                v-if="busRouter.down.near_station.near_bus_stations > 0"
                class="Iactive"
              >
                {{busRouter.down.near_station.near_bus_stations}}
                <i>站</i>
              </i>
              <i
                v-else-if="busRouter.down.near_station.near_bus_stations < 0"
                class="Oactive"
              >首站未发车</i>
              <i
                v-else-if="busRouter.down.near_station.near_bus_stations == 0"
                class="Oactive"
              >即将到站</i>
            </p>
          </a>
        </div>
      </div>
      <!-- 地图为了获取定位 -->
      <div
        class="amap-page-container"
        id="mapDiv"
      >
        <div>
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
          ></el-amap>
        </div>
      </div>
    </div>
    </van-pull-refresh>
    <!-- NextBus -->
    <PublicFooter
      :type="'1'"
      v-show="showFooter"
    ></PublicFooter>
  </div>
</template>
<script>
import PublicFooter from "../../components/PublicFooter"; //引入通用底部组件
import axios from "axios";
import { getNearbybusline } from '@/api/Nearbybusline.js';
import { Toast } from 'vant';
import VueAMap from "vue-amap";
let amapManager = new VueAMap.AMapManager();

export default {
  inject: ['reload'],
  name: "NextBus",
  components: {
    PublicFooter
  },
  data() {
    const that = this;
    return {
      selected: "1",
      // advertising: require("../../assets/003.jpg"),
      advertising:"",
      searchInpVal: "",
      busRouters: [],
      busRouterUps: [],
      judge: true,
      isPosition: false,
      showTransition: true,
      clientHeight: document.documentElement.clientHeight,
      showFooter: true,
      routerDir: null,
      collect: [],
      // 地图定位
      zoom: 12,
      center: [105.371438, 30.817690833333337],
      amapManager,
      events: {
        // o 为地图组件实例
        init(map) {
          // let mapDiv = document.getElementById("mapDiv");
        }
      },
      plugin: [
        {
          pName: "ToolBar",
          events: {}
        }
      ],
      //
      lng: null,
      lat: null,
      isLoading: false,
    };
  },
  methods: {
    // 跳转取线路详情页面
    toRouter(id, dir, name, reversalName) {
      this.$router.push({
        path: `/BusRouterDetail/${id}/${dir}/${name}/${reversalName}`,
        params: {
          id,
          dir,
          name,
          reversalName
        }
      });
    },
    //下拉刷新
    onRefresh() {
      setTimeout(() => {
        Toast('刷新成功');
        this.reload();
        this.isLoading = false;
      }, 1000);
    },
    // 点击切换正反向路线终点站，以及最近的站点
    inverting(judge, index) {
      this.busRouters[index].judge = !judge;
      this.showTransition = !this.showTransition;

      // this.$refs.transition_staions[index].className = 'animate_route';//动画效果
      this.showTransition
        ? (this.$refs.transition_staions[index].className = "animate_route")
        : (this.$refs.transition_staions[index].className = "animate_PD");
    },
    // 吸顶效果
    handleScroll() {
      var scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      // console.log(scrollTop, '--');
      if (scrollTop > 50) {
        this.isPosition = true;
      } else {
        this.isPosition = false;
      }
    },
    // Nearbybusline
    // 获取最近线路
    getNearbyBusRouter(data) {
      this.busRouters = [];
      getNearbybusline(data).then(res => {
        console.log("公交线路信息new", res);
        this.$indicator.close();//关闭loading
        if (res.status === 200) {
          this.busRouters = res.data.map((p, index) => {
            return {
              down: p.down,
              id: p.id,
              name: p.name,
              up: p.up,
              judge: true,
              PO: []
            };
          });

        } else {
          this.$toast('加载失败')
        }
      });
      this.getCollect();
    },
    getPosition() {
      //
      let map = this.amapManager.getMap();
      // console.log('map---', map);
      const self = this;
      map.plugin("AMap.Geolocation", function () {
        var geolocation = new AMap.Geolocation({
          enableHighAccuracy: true, //是否使用高精度定位，默认:true
          timeout: 5000, //超过10秒后停止定位，默认：无穷大
          maximumAge: 50000, //定位结果缓存0毫秒，默认：0
          convert: true, //自动偏移坐标，偏移后的坐标为高德坐标，默认：true
          showButton: true, //显示定位按钮，默认：true
          buttonPosition: "LB", //定位按钮停靠位置，默认：'LB'，左下角
          buttonOffset: new AMap.Pixel(10, 20), //定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
          showMarker: true, //定位成功后在定位到的位置显示点标记，默认：true
          showCircle: true, //定位成功后用圆圈表示定位精度范围，默认：true
          panToLocation: false, //定位成功后将定位到的位置作为地图中心点，默认：true
          zoomToAccuracy: false, //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
          noGeoLocation: 0,          //禁止使用浏览器定位 
          noIpLocate: 0 //禁止使用ID定位 
        });
        map.addControl(geolocation);
        geolocation.getCurrentPosition();
        AMap.event.addListener(geolocation, "complete", onComplete); //返回定位信息
        AMap.event.addListener(geolocation, "error", onError); //返回定位出错信息

        //定位成功回调
        function onComplete(data) {
          console.log("定位成功信息：", data); // data是具体的定位信息
          // geolocation.options.zoomToAccuracy = true; //更改为true页面已经更新完毕所以不会执行，当点击按钮时，会索引至定位处
          self.lng = data.position.lng;
          self.lat = data.position.lat;
          let dataP = {
            x: self.lng,
            y: self.lat
          }
          self.getNearbyBusRouter(dataP)
        }

        //定位失败回调
        function onError(data) {
          console.log("定位失败错误：", data); // 定位出错
        }
      });
    },
    //获取json
     get_image() {
      axios.get('buspicture1588846595117.json').then(res => {
        this.advertising = res.data.content.url;
      })

    },
    // getStatic() {
    //   let url = `https://api.myjson.com/bins/12f68c`;
    //   axios.get(url).then(res => {
    //     this.advertising = res.data.data[0].advertising;
    //   });
    // },
    //吸顶效果
    webScroll() {
      let hearder = document.getElementsByClassName("hearder")[0];
      window.onscroll = function () {
        var scrollTop =
          document.documentElement.scrollTop || document.body.scrollTop;
        if (scrollTop > 150) {
          hearder.style.position = "fixed";
          hearder.style.left = "0";
          hearder.style.top = "0";
          hearder.style.zIndex = '99';
        } else {
          hearder.style.position = "static"; //默认值  无特殊定位
        }
      };
    },
    // 查看收藏
    getCollect() {
      let history = localStorage.getItem("collect");
      this.collect = JSON.parse(history)
    },
  },
  computed: {
    filterNameBus: function () {
      var that = this;
      return that.busRouters.filter(p => {
        return (
          p.name.match(that.searchInpVal) ||
          p.up.start.match(that.searchInpVal) ||
          p.up.end.match(that.searchInpVal) ||
          p.up.near_station.name.match(that.searchInpVal) ||
          p.down.start.match(that.searchInpVal) ||
          p.down.end.match(that.searchInpVal) ||
          p.down.near_station.name.match(that.searchInpVal)
        );
      });
    }
  },
  created() {
    this.$indicator.open('玩命加载中...');//打开loading
  },
  mounted() {
    this.webScroll(); //吸顶效果
    window.addEventListener("scroll", this.handleScroll);
    // 获取查询一条线路上的实时车辆位置等状态信息
    let data = {
      x: 105.36601066589357,
      y: 30.901046352477493
    }
    this.getNearbyBusRouter(data); //默认给一次城市中心经纬度
    setTimeout(() => {
      this.getPosition(); //由于地图是异步加载
    }, 500);

    // 解决安卓手机键盘弹出影响固定定位
    window.onresize = () => {
      if (document.documentElement.clientHeight < this.clientHeight) {
        this.showFooter = false;
      } else {
        this.showFooter = true;
      }
    };

    //this.getStatic(); //引入本地JSON
    this.get_image();
  },
  beforeUpdate() {
    // console.log('beforeUpdate')
  },
  update() {
    // console.log('update')
  },
  destroyed() {
    window.removeEventListener("scroll", this.handleScroll);
  }
};
</script>
<style rel='stylesheet/css' >
.searchwhite {
  font-size: 16px;
  margin: 0 10px;
}
.mint-tab-item-label {
  font-size: 16px;
}
.signWifi {
  font-size: 30px;
  position: absolute;
  right: -10px;
  top: -10px;
}
</style>

<style scoped>
* {
  user-select: none;
}
i {
  font-style: normal;
}

.hearder {
  width: 100%;
  height: 50px;
  background-image: linear-gradient(to right, #1c88e0, rgb(9, 71, 158));
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
}
.hearder span {
  font-size: 15px;
}

/* img */
.NextBusMain {
  width: 100%;
}
.NextBusMain img {
  width: 100%;
  height: 100px;
}
/* 第一版 */

.search {
  width: 100%;
  padding: 6px;
}
.inpWrap {
  width: 100%;
  background-color: rgb(226, 226, 226);
  border-radius: 6px;
}
.search .inpWrap input {
  width: 80%;
  height: 36px;
  border: 0;
  outline: none;
  background-color: rgb(226, 226, 226);
  padding: 4px;
}
.icon-suosou {
  color: #ccc;
  margin: 0 10px;
}
/* 线路 */
.circuitWrap {
  width: 100%;
  background-color: rgb(247, 247, 247);
  padding: 0 4px;
}
.circuit {
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 10px 20px;
  background-color: #fff;
  margin: 10px 0;
  position: relative;
}
.circuit:nth-last-child(1) {
  margin-bottom: 70px;
}

.circuit a {
  color: #555;
}
.circuit a:nth-of-type(1) .reversing {
  font-size: 16px;
  margin-left: 5px;
}

.circuit a:nth-of-type(1) {
  width: 15%;
  margin-top: 10px;
  color: rgb(69, 88, 165);
}
.circuit a:nth-of-type(2) {
  width: 60%;
  display: flex;
  flex-direction: column;
}
.circuit a:nth-of-type(2) p i {
  font-weight: 600;
}
.circuit a:nth-of-type(3) {
  width: 25%;
  /* margin-top: 12px; */
  color: rgb(69, 88, 165);
  display: flex;
  justify-content: center;
  align-items: center;
}
.circuit a:nth-of-type(3) p {
  display: flex;
  justify-content: center;
  align-items: center;
}
.Iactive {
  font-size: 20px;
}
.Oactive {
  font-size: 14px;
}

/* 第二板块 */
.undefiendWrap {
  width: 100%;
  text-align: center;
}
/* ... */
.positionActive {
  width: 100%;
  height: 50px;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
}
/* transition */
.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
/* transition */
@keyframes fadeRoute {
  from {
    opacity: 0;
    margin-left: 20px;
  }
  to {
    opacity: 1;
    margin-left: 0;
  }
}
@keyframes PI {
  from {
    opacity: 0;
    margin-left: 20px;
  }
  to {
    opacity: 1;
    margin-left: 0;
  }
}
.animate_route {
  animation-duration: 1s;
  animation-fill-mode: both;
  animation-name: fadeRoute;
}
.animate_PD {
  animation-duration: 1s;
  animation-fill-mode: both;
  animation-name: PI;
}
.triangle {
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 0 30px 30px 0;
  border-color: transparent #ffb700 transparent transparent;
  position: relative;
  position: absolute;
  right: 0px;
  top: 0;
}
.van-icon-star {
  position: absolute;
  right: -26px;
  top: 2px;
}
.position {
  position: relative;
}
</style>