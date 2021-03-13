<template>
  <div class="lost">
    <header>
      <span class="iconfont icon-lunboyou1"
            @click="back(-1)"></span>
      <span>失物招领</span>
      <span></span>
    </header>
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
    <main v-for="content in contents"
          :key="content.id">
      <!-- 搜索 -->
      <!-- <div class="search">
        <div class="inpWrap">
          <span class="iconfont icon-suosou"></span>
          <input type="text"
                 placeholder="请输入您要查询物品的关键词" />
        </div>
      </div> -->
      <div class="box">
         <!-- v-if="id === content.id" -->
        <!-- <p>{{content.data}}</p> -->
        <a href="javascript:;">
          {{content.content}}
        </a>
      </div>
    </main>
    </van-pull-refresh>
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
      isLoading:false,
      contents:[]
    }
  },
  components: {
    PublicFooter
  },
  methods: {
    back (path) {
      this.$router.go(path);
    },
    getStatic() {
      axios.get('shiwu1588922260084.json').then(res => {
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
  },
  mounted(){
    this.getStatic();
  }
};
</script>

<style scoped lang="scss">
.lost {
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
    .box {
      width: 100%;
      padding: 10px;
        p {
          color: #555;
          margin-bottom: 10px;
       }
       a {
          color: #000;
        }
    }
    .box 
    .search {
      width: 100%;
      padding: 6px;
      .inpWrap {
        width: 100%;
        background-color: rgb(226, 226, 226);
        border-radius: 6px;
        .icon-suosou {
          color: #ccc;
          margin: 0 10px;
        }
        input {
          width: 80%;
          height: 36px;
          border: 0;
          outline: none;
          background-color: rgb(226, 226, 226);
          padding: 4px;
        }
      }
    }
  }
}
</style>