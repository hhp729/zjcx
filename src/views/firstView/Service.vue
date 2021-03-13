<template>
  <div class="Service">
    <div class="header">服务大厅</div>
    <div class="nav">
      <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <img
        :src="top"
        alt
      />
       </van-pull-refresh>
      <div class="weather">
        <span>{{nowtime}}</span>
        <!-- <city /> -->
      </div>
      <div class="menu">
        <div @click="train()">
          <van-icon name="logistics train" />
          <p>火车</p>
        </div>
        <div @click="plane()">
          <van-icon name="underway-o aircraft" />
          <p>飞机</p>
        </div>
        <div @click="lost('Lost')">
          <van-icon name="smile-o smile" />
          <p>失物招领</p>
        </div>
        <div @click="toRoute('./Suggestion')">
          <van-icon name="records" />
          <p>意见建议</p>
        </div>
      </div>
      <div class="nextTitle">
        <div class="notice">
          <div class="imgList">
            <img
              :src="arrows"
              alt=""
            >
          </div>
          <div class="ping">
            <span>{{slogan}}</span>
          </div>
        </div>
      </div>
      <!-- <div class="trip">
        <div>出行信息</div>
        
        <div @click="toRoute ()">查看全部</div>
      </div>
     
      <div
        class="titleText"
        @click="toRoute ()"
        v-for="service in services"
        :key="service.id" 
      >
        <p>{{service.title }}</p>
      </div> -->
      <div class="trip">
        <div>出行信息</div>
        <!-- Trip -->
        <div @click="toRoute ('TripDetail')">查看消息</div>
      </div>
      <!-- Trip -->
      <!-- <div
        class="titleText"
        @click="toRoute ('TripDetail')"
      >
        <p>{{services }}</p>
      </div> -->
      <div class="trip">
        <div>失物招领</div>
        <div @click="toRoute ('Lost')">查看全部</div>
      </div>
      <div class="side">
      </div>
     
    </div>
    
    <div class="zx">
          <a href="https://www.bustone.cn/bus/fuwu/dist/">服务协议</a>丨
          <a href="https://www.bustone.cn/bus/yinsi/dist/">隐私政策</a>
    </div>
    
    <PublicFooter :type="'3'"></PublicFooter>
  </div>
</template>
<script>
import PublicFooter from "../../components/PublicFooter"; //引入通用底部组件
import city from '@/components/city';
import axios from 'axios';
import { Toast } from 'vant';
export default {
  inject: ['reload'],
  name: "Service",
  components: {
    PublicFooter,
    city
  },
  data() {
    return {
      isActive: 4,
      nowtime: '',
      top: require("../../assets/005.jpg"),
      arrows: require('../../assets/service/JT.jpg'),
      slogan: '',
      services: [],
      isLoading: false,
    };
  },
  methods: {
    toRoute(path) {
      this.$router.push(path);
    },
    train() {//火车
      location.href = "https://touch.train.qunar.com/train_touch/index.html#/?from=touchindex&bd_source=&ouid=";
    },
    plane() {//飞机
      location.href = "https://m.flight.qunar.com/h5/flight/";
    },
    lost(path) {
      this.$router.push(path);
    },
    onRefresh() {
      setTimeout(() => {
        Toast('刷新成功');
        this.reload();
        this.isLoading = false;
      }, 1000);
    },
    //获取时间
    getTime() {
      setInterval(() => {
        //new Date() new一个data对象，当前日期和时间
        //toLocaleString() 方法可根据本地时间把 Date 对象转换为字符串，并返回结果。
        this.nowtime = new Date().toLocaleString();
      }, 1000)
    },
    // 请求json
    // getStatic(){
    //   axios.get('chuxing1588901712781.json').then(res => {
    //     // console.log(res, 'res');
    //     this.services = res.data.content.title
    //   })
    // },
    trip(){
       axios.get('fwpicture1588846608213.json').then(res => {
        console.log(res,'res')
        this.top = res.data.content.url;
      })
    }
    // getStatic() {
    //   let url = `https://api.myjson.com/bins/12f68c`;
    //   axios.get(url).then((res) => {
    //     this.$indicator.close();//关闭loading
    //     this.Broadcasting = res.data.data[0].Broadcasting;//滚动条内容
    //     this.top = res.data.data[0].Service[0].img;//图片
    //     this.slogan = res.data.data[0].ServiceTitle;//口号
    //     // this.services = res.data.data[0].ServiceContent//出行信息
    //     // this.services = '暂无数据'
    //   })
    // }
  },
  mounted() {
    this.getTime();
  //  this.getStatic();
   this.trip();
  },
  created() {
   // this.$indicator.open('加载中...');//打开loading
  }
};
</script>
<style rel='stylesheet/css' scoped>
.van-icon,
.van-icon {
  width: 40px;
  height: 40px;
  font-size: 25px;
  background-color: rgb(242, 188, 66);
  color: azure;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.smile {
  background-color: rgb(236, 113, 118);
}
.train {
  background-color: rgb(92, 195, 236);
}
.aircraft {
  background-color: rgb(69, 140, 220);
}
</style>
<style lang="scss" scoped>
.Service {
  background-color: rgb(247, 247, 247);
  height: 100vh;
  position: relative;
  .zx{
      position: absolute;
      bottom: 80px;
      left: 35%;
      a,a:hover,a:active{
        color: rgb(69, 140, 220);
      }
    }
  .header {
    width: 100%;
    height: 50px;
    background-image: linear-gradient(to right, #1c88e0, rgb(9, 71, 158));
    text-align: center;
    line-height: 50px;
    color: white;
  }
  .nav {
    width: 100%;
    height: 180px;
    position: relative;
    img {
      width: 100%;
      height: 100%;
    }
    .weather {
      width: 100%;
      height: 25px;
      background: rgba(0, 0, 0, 0.4);
      line-height: 25px;
      position: absolute;
      bottom: 0;
      left: 0;
      color: white;
      span {
        margin-left: 3%;
      }
    }
    .menu {
      width: 100%;
      height: 60px;
      display: flex;
      justify-content: space-around;
      align-items: center;
      background-color: #fff;
      div {
        width: 25%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        span {
          font-size: 30px;
          color: red;
        }
        p {
          margin-top: 2px;
          font-size: 12px;
          color: #555;
        }
      }
    }
    .nextTitle {
      width: 100%;
      background: #f7f7f7;
      padding-top: 10px;
      .notice {
        width: 100%;
        height: 50px;
        display: flex;
        justify-content: space-between;
        line-height: 50px;
        background-color: #fff;
        .imgList {
          width: 30%;
          display: flex;
          justify-content: center;
          img {
            width: 70px;
            margin: 0 auto;
          }
        }
        .ping {
          width: 70%;
          background: white;
          span {
            margin-left: 20px;
          }
        }
      }
    }
    .trip {
      width: 100%;
      height: 40px;
      background: #f7f7f7;
      display: flex;
      justify-content: space-between;
      line-height: 40px;
      text-align: center;
      color: #777777;
      div {
        width: 20%;
        font-size: 13px;
      }
    }
    .titleText {
      width: 100%;
      padding: 5px;
      p {
        width: 100%;
        // margin-left: 4%;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        font-size: 13px;
        margin: 1% 0;
        color: #777777;
      }
    }
    .side {
      width: 100%;
      height: 160px;
      background: #f7f7f7;
    }
  }
}
</style>