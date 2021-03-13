<template>
  <div class="BusList">
    <div class="hearder">
      <svg-icon
        icon-class="goBack"
        className='goBack'
        @click.native="Return(-1)"
      />
      <span>{{busRouteInfo.name}}<i>路</i></span>
      <span></span>
    </div>
    <!-- 站点部分 -->
    <div class="stations">
      <p>{{destined}}</p>
      <p><span>{{start}}</span>
        <svg-icon
          icon-class="rightAR"
          className='rightAR'
        /> <span>{{end}}</span> </p>
    </div>
    <!-- 车辆列表 -->
    <div class="buslistMain">
      <p v-if="counts.length == 1">
        <span></span>
        <span>{{counts[0]}}</span>
        <span>车辆编号：</span>
        <span>{{A[0].slice(4,13)}}</span>
      </p>
      <p v-else-if="counts.length < 1">
        <span></span>
        <span>等待发车</span>
        <span></span>
        <span></span>
      </p>
      <p
        v-else-if="counts.length > 1"
        v-for="(count,index) in counts"
        :key="index"
      >
        <span></span>
        <span>剩余{{count}}站</span>
        <span>车辆编号</span>
        <span>{{A[index]}}</span>
      </p>
    </div>
  </div>
</template>
<script>
import { myRequire } from '@/utils/index.js';//引入axios
import { getlinedetail, getLineRealtimeStatus } from '@/api/Nearbybusline.js';

export default {
  name: 'BusList',
  components: {
  },
  data() {
    return {
      busRouteInfo: {},
      stations: [],
      start: '',
      end: '',
      destined: '',
      counts: [],
      A: []
    }
  },
  methods: {
    Return(G) {
      this.$router.go(G)
    },
    // 当前线路信息
    getlinedetailFN(data) {
      getlinedetail(data).then((res) => {

        // })
        // myRequire(get, url, sendData, res => {
        console.log('当前路的线路信息', res.data);
        console.log('当前站点信息', this.stations);
        this.busRouteInfo = res.data;
        this.stations = res.data.stations;
        this.start = this.stations[0].name;
        this.end = this.stations[this.stations.length - 1].name;
        this.destined = this.stations[this.$route.params.index - 1].name;
        console.log(this.stations[this.$route.params.index - 1].name, 'this.stations');
        console.log('当前站点index', this.$route.params.index);
      })
    },
    // 当前Bus信息
    getBusFN(data) {
      this.counts = [];
      this.busIndex = [];
      this.bus_lonlat = [];
      this.A = [];
      getLineRealtimeStatus(data).then((res) => {

        // })
        // myRequire(get, url, sendData, res => {
        console.log('当前线路有多少辆车', res.data);
        for (let i = 0; i < res.data.length; i++) {
          // console.log('车辆经纬度', res.data[i].x, res.data[i].y);

          console.log('当前车辆的index', res.data[i].index);

          if (this.$route.params.index > res.data[i].index) {
            console.log('小于当前站点的汽车index', res.data[i].index);
            let PT = (this.$route.params.index - 1) - res.data[i].index;
            if (PT > 0) {
              this.counts.push(PT);
            }
            this.A.push(res.data[i].name)
          }
        }
        console.log('this.A', this.A);
        console.log('counts', this.counts);
      })
    },
  },
  mounted() {
    console.log(this.$route.params);
    let data = {
      id: this.$route.params.id,
      dir: this.$route.params.dir
    }
    this.getlinedetailFN(data);// 获取当前线路所有信息
    this.getBusFN(data);// 获取当前线路有多少辆车
  }
}
</script>
<style scoped>
.BusList {
  width: 100%;
  height: 100vh;
  background-color: rgb(247, 247, 247);
}
.hearder {
  width: 100%;
  height: 50px;
  background-image: linear-gradient(to right, #1c88e0, rgb(9, 71, 158));
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
  color: #fff;
}

/* stations */
.stations {
  width: 100%;
  /* height: 50px; */
  background-color: #fff;
  padding: 5px 15px;
  margin-bottom: 10px;
}
.stations p {
  margin-top: 4px;
}
.stations p:nth-of-type(2) span {
  margin: 0 10px;
}
.stations p:nth-of-type(2) span:nth-of-type(1) {
  margin-left: 0;
}
/* 车辆列表 */
.buslistMain {
  width: 100%;
}
.buslistMain p {
  width: 100%;
  margin-top: 4px;
  background-color: #fff;
  display: flex;
  align-items: center;
  color: #555;
}
.buslistMain p span {
  margin: 0 10px;
  font-size: 12px;
}
.buslistMain p span:nth-of-type(1) {
  width: 30px;
  height: 30px;
  background: url(../../assets/line/11.png) no-repeat center;
  background-size: 60%;
}
</style>