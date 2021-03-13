<template>
  <div class="BusRouterDetail">
    <!-- 头部 -->
    <div class="hearder">
      <svg-icon
        icon-class="goBack"
        className='goBack'
        @click.native="Return(-1)"
      />
      <p>
        <i>{{busRouterInfo.name}}</i>
        路&emsp13;开往&emsp13;{{busRouterInfo.length?busRouterInfo.stations[busRouterInfo.stations.length-1].name:'数据加载中'}}&emsp13;方向
      </p>
      <svg-icon
        icon-class="map"
        className='map'
        @click.native="toRouter('/map')"
      />
    </div>
    <!-- main -->
    <div class="main">
      <!-- 行驶向-票价 -->
      <div class="from">
        <p>
          <i>{{busRouterInfo.length?busRouterInfo.stations[0].name:'数据加载失败'}}</i>
          <svg-icon
            icon-class="rightAR"
            className='rightAR'
          />
          <i>{{busRouterInfo.length?busRouterInfo.stations[busRouterInfo.stations.length-1].name:'数据加载中'}}</i>
        </p>
        <p>
          首&nbsp;{{busRouterInfo.length?busRouterInfo.first:'数据加载中'}}&nbsp;末&nbsp;{{busRouterInfo.length?busRouterInfo.end:'数据加载中'}}&emsp;·&emsp;票价
          <i>{{busRouterInfo.length?busRouterInfo.price:'数据加载中'}}</i>
        </p>
      </div>
      <!-- 站点距离 -->
      <div class="distanceTop">
        <!-- 判断当只有一条数据 -->
        <a
          href="javascript:;"
          v-if="counts.length == 1"
        >
          <a
            href="javascript:;"
            v-if="counts[0].countList < 0"
          >
            <p>
              <a href="javascript:;">等待发车</a>
            </p>
          </a>
          <!-- 当只有一条数据的判断显示 -->
          
          <a
            href="javascript:;"
            v-else-if="counts[0].countList == 0 && counts[0].status==1"
          >
            <p>
              <a href="javascript:;">即将到站</a>
            </p>
          </a>
           <a
            href="javascript:;"
            v-else-if="counts[0].countList == 0 && counts[0].status==0"
          >
            <p>
              <a href="javascript:;">已到站</a>
            </p>
          </a>
          <!-- 当只有一条数据的判断显示 -->
          <a
            href="javascript:;"
            v-else-if="counts[0].countList > 0"
          >
            <p>
              <a
                class="FTB"
                href="javascript:;"
              >{{counts[0].countList}}</a>站
            </p>
            <p class="FTB_B">
              约
              <i>{{stsBusdirection[0]}}</i>km
            </p>
          </a>
        </a>
        <!-- 判断没有数据 -->
        <a
          href="javascript:;"
          v-else-if="counts.length < 1"
        >
          <a
            href="javascript:;"
            class="busUndefined"
          >
            <van-icon name="info-o warnIcon" />等待发车
          </a>
        </a>
        <!-- 判断多条数据 -->
        <a
          href="javascript:;"
          class="PL"
          v-else
        >
          <a
            href="javascript:;"
            v-for="(count,index) in counts"
            :key="index"
          >
            <a
              href="javascript:;"
              v-if="count.countList > 0"
            >
              <span class="FTB">{{count.countList}}</span>
              <span>站</span>
              <p>
                约
                <span>{{stsBusdirection[index]}}</span>km
              </p>
            </a>
            <!-- 当某条数据到站时 -->
            <a
              href="javascript:;"
              v-if="count.countList == 0 && count.status==1"
            >
              <span class="PYL">即将到站</span>
            </a>
            
            <a
              href="javascript:;"
              v-if="count.countList == 0 && count.status==0"
            >
              <span class="PYL">已到站</span>
            </a>
            <!-- 当某条数据小于时 -->
            <a
              href="javascript:;"
              v-if="count.countList  < 0"
            >
              <span class="PYL">等待发车</span>
            </a>
          </a>
        </a>
      </div>
      <div class="distanceBottom">
        <a
          href="javascript:;"
          @click="LocalRouter()"
        >
          <svg-icon
            icon-class="sameRouter"
            className='sameRouter'
          />
          同城线路
        </a>
        <a
          href="javascript:;"
          @click="toBusList('/BusList')"
        >
          <svg-icon
            icon-class="busList"
            className='busList'
          />
          车辆列表
        </a>
      </div>
      <!-- 三角形 -->
      <div class="box"></div>
      <!-- 时间轴 -->

      <div class="site_list">
        <div class="wapper_sitelist">
          <ul class="road">
            <li
              class="part"
              ref="boxSite"
              @click="checkedBusStaion(item,index)"
              v-for="(item, index ) in busRouterNames"
              :class="{'active':index === isActive}"
              :key="item.id"
            >
              <span class="dot_p_wrap">
                <!-- v-shou 判断坐标点显示和隐藏 -->
                <span
                  class="dot_p"
                  v-show="isActive === index"
                ></span>
              </span>
              <span class="dot_r">
                <span
                  class="dot_bus"
                  ref="buscut"
                  v-for="B in busIndex"
                  :key="B.name"
                  v-show="B.index === index "
                  :class="B.status == 0 ?'DZ':'WDZ'"
                ></span>
                <!-- v-shou 判断坐标点显示和隐藏 -->
                <span
                  class="roundness"
                  v-show="isActive === index"
                ></span>
              </span>
              <div class="name">
                <span v-show="item.clock">
                  <svg-icon
                    icon-class="clock_2"
                    className='clock_2'
                  />
                </span>
                <span
                  class="sign"
                  v-show="!item.clock"
                >{{index+1}}</span>
                <span class="dot_d"></span>
                <span class="text">{{item.name}}</span>
                <div
                  class="bus_road"
                  v-if="item.isList"
                ></div>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <!-- 底部 -->
      <div class="footer">
        <a
          href="javascript:;"
          @click="flush"
        >
          <svg-icon
            icon-class="flush"
            className='GMIcon flush'
          />
          <p>刷新</p>
        </a>
        <a
          href="javascript:;"
          @click="SwitchBusRouter()"
        >
          <svg-icon
            icon-class="reversing"
            className='GMIcon reversing'
          />
          <p>切换方向</p>
        </a>
        <a href="javascript:;">
          <svg-icon
            icon-class="QR"
            className='GMIcon QR'
          />
        </a>
        <!-- 收藏 -->
        <a
          href="javascript:;"
          @click="collect"
        >
          <van-icon
            name="star-o"
            size="21px"
            v-show="!judeg.collect"
          />
          <van-icon
            name="star"
            size="21px"
            v-show="judeg.collect"
          />
          <p>{{values.collectContent}}</p>
        </a>
        <a
          href="javascript:;"
          @click="showPopup()"
        >
          <svg-icon
            icon-class="clock"
            className='GMIcon clock'
          />
          <p>公交闹钟</p>
        </a>
      </div>
      <!-- 闹钟弹窗 -->
      <div>
        <van-popup
          v-model="show"
          close-icon="close"
          position="bottom"
          style="margin-left:1%;width:98%; border-radius: 10px;background:url(0,0,0,0.7);overflow-y: hidden;"
        >
          <div class="add">
            <p>添加公交闹铃</p>
            <p @click="upClock">添加闹铃</p>
            <p @click="showPopupCall()">取消闹钟</p>
          </div>
          <div
            class="cancel"
            @click="showPopup()"
          >关闭</div>
        </van-popup>
      </div>
      <!-- 闹钟mp3-->
      <!-- -->
      <audio
        ref="myAuto"
        preload='preload'
        id="music"
        :src="mp3"
      >
      <!-- http://downsc.chinaz.net/Files/DownLoad/sound1/201911/12216.mp3 -->
        <!-- http://fs.mobile.kugou.com/201911221450/eee0c9293142da9870d750f48ada449a/G083/M08/00/04/84YBAFhks0aAYGsBADl8RUL2DXQ825.mp3 -->
        <!-- autoplay="autoplay" 自动播放 -->
        <!-- controls='controls' -->
        loop
        您的浏览器不支持 audio 标签
      </audio>
    </div>
  </div>
</template>
<script>
import { getlinedetail, getLineRealtimeStatus } from '@/api/Nearbybusline.js';
import { GetDistance } from '@/utils/dist.js';
import { wgs84togcj02 } from '@/utils/coordinateSystem.js';
export default {
  inject: ['reload'],
  name: "BusRouterDetail",
  data() {
    return {
      show: false,
      isActive: false,
      name: "",
      reversalName: "",
      busRouterInfo: {},
      dir: 0,
      busRouterNames: [],
      isAcc: false,
      stations: null, //最近站的index下标默认
      busIndex: [], //汽车所在的index,也就是那一战
      counts: [],
      station_lonlat: [],
      bus_lonlat: [],
      stsBusdirection: [],
      clickIndex: "",
      busStaions: [],
      routeName: "",
      sports: "",
      mysettime: null,
      judeg: {
        collect: false,
        clock: true
      },
      values: {
        collectContent: '收藏'
      },
      collects: [],
      screenWidth: document.body.clientWidth, //当前屏幕宽度
      about: true,
      muted: true,
      mp3:require("../../assets/audio/dingdong.mp3")
    };
  },
  methods: {
    // vue再微信刷新无效,刷新,后退
    Return(G) {
      this.$router.go(G);
    },
    // 刷新
    flush() {
      this.reload()
    },
    // 公交闹钟
    showPopup() {
      this.show = !this.show;
    },
    // 路由跳转
    toRouter(path) {
      let id = this.$route.params.id;
      let dir = this.dir;
      this.$router.push({
        path: `${path}/${id}/${dir}`,
        params: {
          id: id,
          dir: dir
        }
      });
    },
    //跳转取同城线路
    LocalRouter() {
      let n = this.routeName;
      this.$router.push({
        path: `/LocalRouter/${n}`,
        params: {
          n
        }
      });
    },
    // 跳转车辆列表页面
    toBusList(path) {
      let id = this.$route.params.id;
      let dir = this.dir;
      let index = this.clickIndex;
      // console.log('切换页面的', index);
      console.log(id, dir, index);
      this.$router.push({
        path: `${path}/${id}/${dir}/${index}`,
        params: {
          id,
          dir,
          index
        }
      });
    },
    // 点击选中的class
    checkedBusStaion(item, index) {
      console.log(item, index)
      this.routeName = item.name; //给同城站点默认name
      this.clickIndex = index;
      this.isActive = index;
      this.stations = index + 1;

      // 判断还剩下多少站 
      this.counts = []; //每次counts清空
      this.stsBusdirection = []; //每次点击清空
      for (let i = 0; i < this.busIndex.length; i++) {
        let count = null;
        count = index - this.busIndex[i].index;
        // console.log(count,"count")
        if (count >= 0) {
          this.counts.push({
            countList:count,
            status:this.busIndex[i].status
          });
         
        }
      }

      this.GetDistanceDetail(index + 1)
    },
    // 默认进入滚动位置
    siteScroll() {
      //需要异步
      // setTimeout(() => {
      var self = this;
      // var BJ;
      var wapper_sitelist = document.querySelector(".wapper_sitelist");
      // var every = 10;
      wapper_sitelist.scrollLeft = 0;
      for (let i = 0; i < self.busRouterNames.length; i++) {
        if (i == self.stations - 1) {
          setTimeout(() => {
            if (i === 0 || i + 1 === self.busRouterNames.length) {
              if (self.$refs.boxSite[i].offsetLeft) {
                wapper_sitelist.scrollLeft = self.$refs.boxSite[i].offsetLeft;
              }
            } else {
              if (self.$refs.boxSite[i].offsetLeft) {
                wapper_sitelist.scrollLeft = self.$refs.boxSite[i].offsetLeft - self.screenWidth / 2;
              }
            }
          }, 500);
        }
      }
    },
    // js运动；
    montionss() { },
    // 切换上下行方向
    SwitchBusRouter() {
      console.log("-----------------------------------");
      this.about = !this.about;
      this.about ? (this.dir = 0) : (this.dir = 1);
      this.about ? (this.name = this.$route.params.name) : (this.name = this.$route.params.reversalName);
      this.routeName = this.name; //给默认的同城站点一个name
      let data = {
        id: this.$route.params.id,
        dir: this.dir,
        name: this.name
      }
      this.getBusRouterWire(data);//获取线路info
    },
    // 依据经纬度计算距离方法
    // 获取当前线路所有信息
    getBusRouterWire(data) {
      console.log(data, '线路-----');
      getlinedetail(data).then(res => {
        res.data.judeg = true;
        this.busRouterInfo = res.data;
        this.busRouterNames = res.data.stations.map(p => {
          return {
            id: p.id,
            name: p.name.replace("(", "︵").replace(")", "︶").replace("（", "︵").replace("）", "︶"), //处理中英文括号
            xy: [wgs84togcj02(p.x, p.y)],
            judeg: true,
            clock: false
          };
        });
        this.getRecentlyIndex(data.name);
        this.DISFn();
      });
    },
    // 计算当前线路最近的站点
    getRecentlyIndex(name) {
      // 从上个页面接受最近的站点，给上默认class显示
      // let name = this.name;
      for (let i = 0; i < this.busRouterNames.length; i++) {
        if (this.busRouterNames[i].name == name) {
          this.isActive = i; //默认class样式
          this.stations = i + 1; //把默认站点的index赋值出去
          // console.log('最近站点', this.stations);
          this.clickIndex = i + 1; //默认的index
          this.station_lonlat = [
            this.busRouterNames[i].x,
            this.busRouterNames[i].y
          ]; //获取最近站点的经纬度
        }
      }
      this.siteScroll();
      let data = {
        id: this.$route.params.id,
        dir: this.dir,
      }
      this.getBus(data); //等线路信息出来再调用车的信息
    },
    // 获取当前线路有多少辆车
    getBus(data) {
      // console.log(data, '车辆---------');
      // this.counts = [];
      // this.busIndex = [];
      // this.bus_lonlat = [];
      getLineRealtimeStatus(data).then(res => {
        console.log(res,'res')
        this.$indicator.close();//关闭loading
        //无闪烁刷新页面
        if (res.status === 200) {
          let busStaion= res.data.map((i,index)=>{
            return i.status;
          })
          this.busStaions=busStaion;
          let busIn=res.data.map((i,index)=>{
            return i;
          })
          this.busIndex=busIn;
          let bus_lon=res.data.map((i,index)=>{

            return [i.x,i.y];
          })
          this.bus_lonlat=bus_lon;
          let N=res.data.map((i,index)=>{
            let NB = this.stations - (i.index * 1 + 1);
            //闹钟
            let history = JSON.parse(sessionStorage.getItem('audio'));
            let info = JSON.parse(sessionStorage.getItem('info'));
            // console.log(info, 'info');
            // console.log(this.$route.params, this.dir, 'params');
            if (history && info.id === this.$route.params.id && info.dir === this.dir + '' && info.name === this.$route.params.name && info.reversalName === this.$route.params.reversalName) {
              this.busRouterNames = history;//获取sessionStorage
            }
            for (let j = 0; j < this.busRouterNames.length; j++) {
              if (this.busRouterNames[j].clock === true) {
                if (j === i.index) {
                  this.$refs.myAuto.play()
                }
              }
            }
            //map循环里面的判断条件只能用三元运算符，不满足条件的为空
            return NB>=0 ? {
              countList:NB,
              status:i.status
            } : ""
          })
          //在用filter 把不为空的数据筛选出来
          let ns= N.filter((P,index)=>{
            return P!="";
          })
          this.counts=ns;
          //此写法页面刷新会闪烁，用户体验差
          // for (let i = 0; i < res.data.length; i++) {
          //   this.busStaions.push(res.data[i].status);
          //   console.log(this.busStaions,"busStaions")
          //   this.busIndex.push(res.data[i]); //拿到车辆下标
          //   this.bus_lonlat.push([res.data[i].x, res.data[i].y]); //拿到车辆的经纬度
          //   console.log(this.bus_lonlat,"bus_lonlat")
          //   let NB = this.stations - (res.data[i].index * 1 + 1);
          //   //判断默认显示几站的区域。
          //   if (NB >= 0) {
          //     console.log(NB,"NB")
          //     this.counts.push(
          //       {
          //         countList:NB,
          //         status:res.data[i].status
          //       }
          //     ); //拿到处理过的计算站点
          //     console.log(this.counts,"N")
          //   }
          //   // 闹钟
          //   let history = JSON.parse(sessionStorage.getItem('audio'))
          //   let info = JSON.parse(sessionStorage.getItem('info'))
          //   // console.log(info, 'info');
          //   // console.log(this.$route.params, this.dir, 'params');
          //   if (history && info.id === this.$route.params.id && info.dir === this.dir + '' && info.name === this.$route.params.name && info.reversalName === this.$route.params.reversalName) {
          //     this.busRouterNames = history;//获取sessionStorage
          //   }
          //   for (let j = 0; j < this.busRouterNames.length; j++) {
          //     if (this.busRouterNames[j].clock === true) {
          //       if (j === res.data[i].index) {
          //         this.$refs.myAuto.play()
          //       }
          //     }
          //   }
          // }
          this.GetDistanceDetail(this.stations); //计算公里数
        } else {
          this.$toast('数据加载失败')
        }
        // 判断还生效多少站
      });
    },
    // 计算经纬度公里  单位：公里
    GetDistanceDetail(busStaions) {
      this.stsBusdirection = []; 
      for (let j = 0; j < this.busIndex.length; j++) {
        let count = 0;
        if (busStaions > this.busIndex[j].index) {
          // console.log(this.busIndex[j], '当前车辆index', busStaions, '当前默认index');
          let start = (this.busIndex[j].index - 1);
          let end = busStaions - 1;
          for (let i = start; i < end; i++) {
            count += (this.values.KM[i] * 1);//为什么获得的不是相加的内容6，而是123.我已经*1转化为数字了
          }
          this.stsBusdirection.push(count.toFixed(2))
        }
      }
    },
    // 收藏
    collect() {
      // this.$notify({'收藏成功'});
      this.judeg.collect = !this.judeg.collect;
      if (this.judeg.collect) {
        this.values.collectContent = '取消收藏'
        this.collects.unshift(this.$route.params.id) 
        localStorage.setItem("collect", JSON.stringify(this.collects));
        this.$toast('收藏成功')
      } else {
        this.collects = this.collects.filter((item, index) => {
          return item != this.$route.params.id
        })
        localStorage.setItem("collect", JSON.stringify(this.collects));
        this.values.collectContent = '收藏'
        this.$toast('已取消收藏')
      }
    },
    // 进页面判断是否收藏
    getCollect() {
      let history = localStorage.getItem("collect");
      if (history) {
        this.collects = JSON.parse(history);
        if (history.indexOf(this.$route.params.id) == -1) {
          this.judeg.collect = false
          this.values.collectContent = '收藏'
        } else {
          this.judeg.collect = true
          this.values.collectContent = '取消收藏'
        }
      }
    },
    // 重新计算站点距离
    DISFn() {
      this.values.KM = [];
      for (let i = 0; i < this.busRouterNames.length; i++) {
        if ((i + 1) <= (this.busRouterNames.length - 1)) {
          this.values.KM.push(GetDistance(this.busRouterNames[i].xy[0][0], this.busRouterNames[i].xy[0][1], this.busRouterNames[i + 1].xy[0][0], this.busRouterNames[i + 1].xy[0][1]))
        }
      }
    },
    // 上车闹钟
    upClock() {

      this.busRouterNames[this.stations - 1].clock = !this.busRouterNames[(this.stations - 1)].clock;
      console.log(this.busRouterNames)
      this.show = false;
      // 保存到sessionStorage
      sessionStorage.setItem("audio", JSON.stringify(this.busRouterNames));
      sessionStorage.setItem("info", JSON.stringify(this.$route.params))
    },
    // 取消闹钟
    showPopupCall() {
      for (let i = 0; i < this.busRouterNames.length; i++) {
        this.busRouterNames[i].clock = false;
      }
      sessionStorage.setItem("audio", JSON.stringify(this.busRouterNames));
      this.show = false;
    },
    // 监听audio
    addEventListener_music() {
      const that = this;
      var music = document.getElementById('music');
      music.addEventListener('timeupdate', function () {
        if (!isNaN(music.duration)) {
          //currentTime 获取当前时间的位置   duration 获取音频的长度
          var progressValue = music.currentTime / music.duration; //用时间比来获取进度条的值
          if (progressValue == 1) {
            progressValue = 0;//当播放完成，进度条跳到开始
            that.showPopupCall();
          }

        };
      }, false);
    }
  },
  mounted() {
    this.addEventListener_music()
    this.getCollect();
    this.name = this.$route.params.name; //默认up上行
    this.reversalName = this.$route.params.reversalName; //down下行

    this.dir = this.$route.params.dir; //判断头部显示，通过dir上下线，显示不同
    // console.log(this.$refs);

    let data = {
      id: this.$route.params.id,
      dir: this.$route.params.dir,
      name: this.name
    }
    this.getBusRouterWire(data); // 获取当前线路所有信息
    // 计时器
    this.mysettime = setInterval(() => {
      let data = {
        id: this.$route.params.id,
        dir: this.dir,
      }
      this.getBus(data);
    }, 10000);
    setTimeout(() => {
      this.routeName = this.name; //给默认的同城站点一个name
    }, 500);
  },

  created() {
    this.$indicator.open('玩命加载中...');//打开loading
  },
  updated() { },
  beforeDestroy() {
    clearInterval(this.mysettime);//请除定时器
    this.mysettime = null;
  }
};
</script>
<style rel='stylescheet/css'>
.GMIcon {
  font-size: 20px;
}
.clock {
  font-size: 22px;
}
.QR {
  font-size: 38px;
}
.goBack {
  font-size: 20px;
}
.map {
  font-size: 28px;
  margin-top: -4px;
}
.van-icon-info-o {
  width: 30px;
  height: 20px;
  line-height: 20px;
  display: inline-block;
  vertical-align: middle;
}
</style>
<style scoped>
.BusRouterDetail {
  width: 100%;
  height: 100vh;
  background-color: rgb(247, 247, 247);
}
.hearder {
  width: 100%;
  height: 50px;
  overflow: hidden;
  background-image: linear-gradient(to right, #1c88e0, rgb(9, 71, 158));
  display: flex;
  justify-content: space-between;
  padding: 15px;
  color: #fff;
}

.mapIcon {
  font-size: 22px;
}
/* main */
.main {
  width: 100%;
  background-color: rgb(247, 247, 247);
}
/* from */
.from {
  width: 100%;
  height: 50px;
  padding: 0 20px;
  background-color: #fff;
  margin-bottom: 6px;
}
.from p {
  margin-top: 4px;
}
.from p:nth-of-type(1) i {
  margin: 0 18px;
}
.from p:nth-of-type(1) i:nth-of-type(1) {
  margin-left: 0;
}

.from p .Iconj {
  display: inline-block;
  vertical-align: super;
}
/* 站点距离 */
.distanceTop {
  width: 95%;
  height: 80px;
  background-color: #fff;
  padding: 6px;
  text-align: center;
  margin: 2px auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.distanceTop a {
  font-size: 22px;
}
.distanceTop a p {
  font-size: 12px;
  color: #555;
}
.distanceBm {
  width: 100%;
}
.distanceBottom {
  width: 95%;
  background-color: #fff;
  margin: 0 auto;
  padding: 6px;
  display: flex;
  justify-content: space-around;
  position: relative;
}
.distanceBottom a {
  color: #555;
}
/* 三角形 */
.box {
  width: 0;
  height: 0;
  border-top: 10px solid #ffffff;
  border-right: 10px solid transparent;
  border-bottom: 10px solid transparent;
  border-left: 10px solid transparent;
  position: absolute;
  left: 50%;
}
/* 时间轴 */
.site_list {
  width: 100%;
  margin-top: 10px;
}

.site_list .button {
  width: 0.64rem;
  height: 0.64rem;
  border-radius: 50%;
  background: rgb(247, 247, 247);
  position: absolute;
  top: 0.4rem;
  color: #36a3f9;
  line-height: 0.34rem;
  text-align: center;
}

.site_list .bus_road {
  width: 1rem;
  height: 0.5rem;
  background: url("../../assets/line/bus.png");
  background-repeat: no-repeat;
  background-size: 0.48rem 0.24rem;
  position: absolute;
  top: 0.3rem;
  z-index: 1001;
  /* display: none; */
}
.site_list .button span {
  transform: scale(0.7);
  display: block;
}

.site_list .button img {
  width: 0.24rem;
  display: block;
  margin: 0 auto;
  margin-top: 0.05rem;
}

.site_list .wapper_sitelist {
  width: 100%;
  display: flex;
  overflow-x: scroll;
  overflow-y: hidden;
  position: relative;
  -webkit-overflow-scrolling: touch;
}

.wapper_sitelist::-webkit-scrollbar {
  display: none;
}

.site_list .road {
  display: flex;
}

.site_list .part {
  /* width: 1rem; */
  float: left;
  text-align: center;
}

.site_list .dot_show {
  background: url(../../assets/line/position_red.png) no-repeat center;
  background-size: 0.28rem 0.36rem;
}

.site_list .dot_r {
  width: 46px;
  height: 30px;
  background: url(../../assets/line/road.png) no-repeat center;
  background-size: 100%;
  display: block;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}

.site_list .name {
  width: 0.36rem;
  margin: auto;
}

.site_list .dot_d {
  width: 0.12rem;
  height: 0.12rem;
  border-radius: 50%;
  background: #b3b3b3;
  margin-top: 0.1rem;
  margin-right: 0.12rem;
  display: block;
  float: right;
}

.site_list .dot_d_show {
  background: #f0585d;
}

.site_list .text_show {
  color: #f0585d;
}

.site_list .text {
  width: 0.36rem;
  margin-top: 0.2rem;
  float: right;
}
/* 底部 */
.footer {
  width: 100%;
  height: 55px;
  background-color: #fff;
  position: fixed;
  left: 0;
  bottom: 0;
  display: flex;
  padding: 4px 0;
}
.footer a {
  width: 20%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: rgb(12, 97, 216);
}
.footer a p {
  margin-top: 4px;
}
.iconfont {
  font-size: 20px;
}
.iconScan {
  font-size: 60px;
  margin-bottom: 30px;
}
/* 公交闹钟 */
.add {
  width: 96%;
  text-align: center;
  margin: 0 auto;
  background: rgb(247, 247, 247);
  border-radius: 15px;
}
.add p:nth-child(1) {
  color: #555;
  font-size: 15px;
  padding: 2% 0;
  border-bottom: 2px solid #f0f0f0;
}
.add p:nth-child(2) {
  border-bottom: 2px solid #f0f0f0;
}
.add p {
  font-size: 16px;
  padding: 2% 0;
  color: blue;
}
.cancel {
  text-align: center;
  font-size: 16px;
  padding: 3% 0;
  color: blue;
  margin: 10px 2%;
  background: rgb(247, 247, 247);
  border-radius: 10px;
  font-weight: bolder;
}
/* 选中class */
.road .active {
  color: rgb(39, 66, 213);
  font-weight: 600 !important;
}
/*  */
.roundness {
  width: 15px;
  height: 15px;
  display: block;
  background: url(../../assets/line/user-current-icon.png) no-repeat center;
  background-size: 100%;
  /* display: none; */
}
.sign {
  font-size: 10px;
  color: #555;
  /* margin-left: 4px; */
}
.dot_p_wrap {
  width: 35px;
  height: 30px;
  display: inline-block;
}
.site_list .dot_p {
  width: 36px;
  height: 30px;
  display: inline-block;
  background: url(../../assets/line/13.png) no-repeat center;
  background-size: 40%;
  /* margin-left: 5px; */
}
/* if判断区域 */
.distanceTop a {
  color: #555;
  font-size: 16px;
}
.PL {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}
.FTB {
  font-size: 18px !important;
  color: #36a3f9 !important;
}
.PL p,
.FTB_B {
  margin-top: 5px;
}
.PYL {
  display: inline-block;
  vertical-align: sub;
}
.dot_bus {
  width: 35px;
  height: 30px;
  display: inline-block;
  background: url(../../assets/map/pm.png) no-repeat center;
  background-size: contain;
  position: absolute;
  top: -12px;
}
.distanceTop a span {
  font-size: 13px;
}
.DZ {
  left: 3px;
}
.WDZ {
  left: -20px;
}
</style>