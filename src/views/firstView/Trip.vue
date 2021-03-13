<template>
  <div class="trip">
    <header>
      <span
        class="iconfont icon-lunboyou1"
        @click="back(-1)"
      ></span>
      <span>出行信息</span>
      <span>&emsp;</span>
    </header>
    <main>
      <div
        v-for="(item,index) in contene"
        :key="index"
        @click="routeList('TripDetail',item.id)"
      >
        <div class="textTheme">
          <span class="iconfont icon-hunyushouyang-jiaotongchuhang-jiaoyujiuxue-"></span>
          <span>{{item.name}}</span>
        </div>
        <div class="title_list">
          <div class="side">
            <span>{{item.data}}</span>
            <p>{{item.content}}</p>
          </div>
        </div>
      </div>
      <div class="nextList"></div>
    </main>
    <PublicFooter
      :type="'1'"
      v-show="showFooter"
    ></PublicFooter>
  </div>
</template>

<script>
import PublicFooter from "../../components/PublicFooter"; //引入通用底部组件
import axios from 'axios';
export default {
  data() {
    return {
      showFooter: true,
      contene: []
    };
  },
  components: {
    PublicFooter
  },
  methods: {
    back(path) {
      this.$router.go(path);
    },
    routeList(path, id) {
      this.$router.push({
        path: path,
        query: {
          id: id
        }
      });
    },
    //请求JSON
    getStatic() {
      let url = `https://api.myjson.com/bins/12f68c`;
      axios.get(url).then((res) => {
        this.contene = res.data.data[0].ServiceContent;//内容
      })
    }
  },
  mounted() {
    this.getStatic();
  }
};
</script>

<style scoped lang="scss">
.trip {
  header {
    width: 100%;
    height: 50px;
    background-image: linear-gradient(to right, #1c88e0, rgb(9, 71, 158));
    display: flex;
    justify-content: space-between;
    color: white;
    line-height: 50px;
    span:nth-child(1) {
      margin-left: 4%;
      font-size: 18px;
    }
  }
  main {
    width: 100%;
    .textTheme {
      width: 100%;
      height: 20px;
      line-height: 20px;
      margin-top: 20px;
      span:nth-child(1) {
        margin-left: 20px;
        margin-right: 15px;
      }
      span:nth-child(2) {
        font-weight: 600;
      }
    }
    .title_list {
      width: 100%;
      padding-top: 2%;
      color: gray;
      .side {
        width: 90%;
        height: 90px;
        margin: 0 auto;
        border-bottom: 1px solid #dcdcdc;
        span {
          font-size: 12px;
          display: block;
          margin-bottom: 5px;
          color: #555;
        }
        p {
          width: 100%;
          font-size: 14px;
          height: 58px;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 3; //多行文本溢出变成省略号
          overflow: hidden;
          color: #999;
        }
      }
    }
    .nextList {
      margin-top: 10px;
      width: 100%;
      min-height: 300px;
      background: #f0f0f1;
    }
  }
}
</style>