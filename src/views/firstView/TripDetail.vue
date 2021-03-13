<template>
  <div class="TripDetail">
    
    <header>
      <span class="iconfont icon-lunboyou1"
            @click="back(-1)"></span>
      <span>出行信息</span>
      <span>&emsp;</span>
    </header>
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
    <main v-for="content in contents"
          :key="content.id">
      <!-- <div class="title"
           v-if="id === content.id">
        <h3>{{content.name}}</h3>
      </div> -->
      <div class="box">
         <!-- v-if="id === content.id" -->
        <!-- <p>{{content.data}}</p> -->
        <a href="javascript:;">
          {{content.content}}
        </a>
        <!-- <p v-for="(item,index) in content.BrContent"
           :key="index">{{item.text}}</p> -->
      </div>
     
    </main>
    </van-pull-refresh>
    <!--  -->
    <PublicFooter :type="'1'"
                  v-show="showFooter"></PublicFooter>
  </div>
</template>

<script>
import PublicFooter from "../../components/PublicFooter"; //引入通用底部组件
import axios from 'axios';
import { Toast } from 'vant';
export default {
  inject: ['reload'],
  data () {
    return {
      showFooter: true,
      contents: [],
      id: "",
      isLoading: false,
    };
  },
  components: {
    PublicFooter
  },
  methods: {
    back (path) {
      this.$router.go(path);
    },
    // 请求json
    getStatic() {
      axios.get('chuxing1588906272404.json').then(res => {
        console.log(res)
        this.contents = res.data;
        //this.$indicator.close();//关闭loading
      })
    },
    //下拉刷新
    onRefresh() {
      setTimeout(() => {
        Toast('刷新成功');
        this.reload();
        this.isLoading = false;
      }, 1000);
    },
    // getStatic () {
    //   let url = `https://api.myjson.com/bins/12f68c`;
    //   axios.get(url).then((res) => {
    //     this.contents = res.data.data[0].ServiceContent;
    //   })
    // }
  },
  mounted () {
    this.id = this.$route.query.id;
    this.getStatic(this.id);
  }
};
</script>

<style scoped lang="scss">
.TripDetail {
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
    .titleList {
      width: 100%;
      color: gray;
    }
  }
}
.title {
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.title h3 {
  font-size: 14px;
  font-weight: 600;
}
.box {
  width: 100%;
  padding: 10px;
}
.box p {
  color: #555;
  margin-bottom: 10px;
}
.box a {
  color: #000;
}
</style>