<template>
  <div class="SearchWrap">
    <div class="hearder">
      <div class="search">
        <van-icon name="search search-icon" />
        <input
          ref="inputs"
          maxlength="20"
          v-model="searchContent"
          placeholder="请输入公交线路、站点"
        >
      </div>
      <div
        class="positio"
        @click="toRouter(-1)"
      >
        <span>取消</span>
      </div>
    </div>
    <p v-if="searchContent.length === 0">
      搜索历史
    </p>
    <div
      class="searVals"
      v-if="searchContent.length === 0"
    >
      <a
        href="javascript:;"
        @click="searchClick(history)"
        v-for="(history,index) in historys"
        :key="index"
      >
        <span>
          <img
            :src="busStaions"
            alt=""
          >
        </span>
        {{history}}
      </a>
      <p @click="RemoveLoaclstorage()">清空历史记录</p>
    </div>
    <!-- 搜索结果 -->
    <div
      class="main"
      v-show="dejuge&&searchContent.length !== 0"
    >
      <p v-show="searchContent.length !== 0">线路</p>
      <div
        class="contene"
        @click="toBusRouterDetail(result.id,0,result.up.last,result.down.last)"
        v-for="result in results"
        :key="result.id"
      >
        <svg-icon
          icon-class="bus_2"
          className='bus_2'
        />
        <a href="javascript:;">
          <p><i>{{result.name}}</i>路</p>
          <p>开往<i>{{result.up?result.up.last:'数据加载中'}}</i>方向</p>
        </a>
      </div>
    </div>
    <!-- 搜索结果 -->
    <div
      class="main"
      v-show="!dejuge&&searchContent.length !== 0"
    >
      <p v-show="searchContent.length !== 0">站点</p>
      <div
        class="contene"
        @click="toLocalRouter(result.name)"
        v-for="result in results"
        :key="result.id"
      >
        <span>
          <img
            :src="busStaions"
            alt=""
          >
        </span>
        <a href="javascript:;">
          <p><i>{{result.name}}</i></p>
        </a>
      </div>
    </div>
  </div>
</template>
<script>
import { myRequire } from '@/utils/index';
export default {
  name: 'Search',
  components: {

  },
  data() {
    return {
      searchContent: '',
      results: [],
      dejuge: true,
      // searVals: [],
      historys: [],
      busStaions: require('@/assets/line/busStaions.png'),
      timeout: null
    }
  },
  created() {
  },
  methods: {
    // input默认聚焦
    foucs() {
      this.$nextTick(() => {
        this.$refs['inputs'].focus()
      })
    },
    // 路由
    toRouter(G) {
      this.$router.go(G)
    },
    //读取localstoage
    getLocalstorage() {
      console.log('读取localstoage');
      let history = localStorage.getItem('history')
      console.log(history);
      if (history) {
        this.historys = JSON.parse(history);
        this.historys = this.historys.slice(0, 10);
        console.log(this.historys);
      }
    },
    // 搜索历史记录点击事件
    searchClick(h) {
      this.searchContent = h;
    },
    // 删除本地存储localstorage
    RemoveLoaclstorage() {
      window.localStorage.removeItem('history');
      this.historys = [];
      this.$router.go(0);
    },
    //跳转去BusRouterDetail
    toBusRouterDetail(id, dir, upLast, downLast) {
      // console.log(id, dir, upLast, downLast);
      this.$router.push({
        path: `/BusRouterDetail/${id}/${dir}/${upLast}/${downLast}`,
        params: {
          id,
          dir,
          upLast,
          downLast
        }
      })
    },
    // 跳转去同城线路
    toLocalRouter(n) {
      console.log(n);
      this.$router.push({
        path: `/LocalRouter/${n}`,
        params: {
          n
        }
      })
    },
    // 默认请求
    getInfo(get, url, sendData) {
      myRequire(get, url, sendData, res => {
        console.log('搜索结果：', res.data);
        res.data.lines ? this.dejuge = true : this.dejuge = false;
        res.data.lines ? this.results = res.data.lines : this.results = res.data.stations;
        // this.results = res.data.lines;
        console.log(this.results);
      })
      // change事件
    },
    //  * poi模糊搜索列表
    getListPOI(inputVal) {
      console.log(inputVal);
      if (inputVal === '') {
        return false;
      }
      this.getInfo(`get`, `search`, `query=${inputVal}`);
      // 搜索内容保存到localstorage
      this.historys.unshift(inputVal);//最后搜索放在头部
      this.historys = this.historys.slice(0, 10);//只取十条数据
      console.log('historys', this.historys);
      console.log(this.historys);
      window.localStorage.setItem('history', JSON.stringify(this.historys));//保存到localstorage
    }

  },
  watch: {
    searchContent(curVal, oldVal) {
      // console.log('watch', curVal, oldVal);
      // 实现input连续输入，只发一次请求,函数防抖
      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        this.getListPOI(curVal.trim());
      }, 300)
    }
  },
  mounted() {
    this.foucs();
    //取localstorage里面的history
    this.getLocalstorage();

  }
}
</script>
<style rel="stylesheet/css" scoped>
.bus_2 {
  font-size: 30px;
}
.search-icon {
  color: #ccc;
  margin: 0 8px;
  font-size: 18px !important;
  vertical-align: middle;
}
</style>
<style scoped>
.SearchWrap {
  width: 100%;
  height: 100vh;
  background-color: rgb(247, 247, 247);
}
.SearchWrap > p {
  text-align: left;
  padding: 10px 10px;
  color: #555;
  margin-bottom: 3px;
  background-color: #fff;
  display: flex;
  justify-content: space-between;
}

.hearder {
  width: 100%;
  height: 50px;
  background-image: linear-gradient(to right, #1c88e0, rgb(9, 71, 158));
  overflow: hidden;
  padding: 10px;
}
.search {
  width: 80%;
  height: 30px;
  display: inline-block;
  border-radius: 5px;
  background-color: rgba(0, 0, 0, 0.1);
  margin-left: 10px;
}
.hearder .search i {
  margin: 0 8px;
  vertical-align: text-top;
}
.search input {
  width: 80%;
  height: 30px;
  outline: none;
  border: none;
  border-radius: 5px;
  background: none;
  color: #ccc;
}
.search input::-webkit-input-placeholder {
  color: #ccc;
}
.positio {
  display: inline-block;
  color: #fff;
}
.positio span {
  margin-left: 16px;
}
/* ---main */
.main {
  width: 100%;
  background-color: rgb(247, 247, 247);
}
.contene {
  width: 100%;
  background-color: #fff;
  padding: 5px;
  display: flex;
  align-items: center;
  margin: 2px 0;
}
.main > p {
  text-align: left;
  padding: 5px;
  padding-left: 10px;
  color: #555;
  margin-bottom: 3px;
  background-color: #fff;
}
.contene span {
  color: rgb(51, 51, 51);
  display: inline-block;
  font-size: 20px;
  margin: 0 10px 0 5px;
}
.contene span img {
  width: 20px;
  height: 20px;
}
.contene a {
  color: #555;
}

.contene a p:nth-of-type(1) {
  font-weight: 600;
  color: #000;
  margin-bottom: 2px;
}
.contene a p:nth-of-type(2) i {
  margin: 0 5px;
}
/* 搜索记录 */
.searVals {
  width: 100%;
}
.searVals > a {
  display: block;
  margin: 2px 0;
  background-color: #fff;
  padding: 5px 10px;
  color: #555;
  display: flex;
  font-weight: 600;
}
.searVals > a > span img {
  width: 20px;
  height: 20px;
  margin-right: 15px;
}
.searVals p {
  width: 100%;
  padding: 10px;
  background-color: #fff;
  text-align: center;
  color: #888;
}
</style>