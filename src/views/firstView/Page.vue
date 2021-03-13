<template>
  <!-- 头部 -->
  <div class="Page">
    <div class="hearder">
      <div class="search">
        <van-icon name="search search-icon" />
        <input
          type="text"
          @click="toRouter('Search')"
          placeholder="搜索公交线路、站点"
        >
      </div>
      <div class="positio">
        <van-icon name="location-o loacltion-icon" />
        <span @click="cuts()">{{cut}}</span>
      </div>

    </div>
    <van-pull-refresh
      v-model="isLoading"
      @refresh="onRefresh"
    >
      <!-- 轮播图 -->
      <Swiper />

      <div class="mainPage">
        <!--  广播 -->
        <div class="title">
          <van-notice-bar scrollable  :text="Broadcasting" background="#FFFFFF"
                        left-icon="volume-o broadcast-icon" delay=0 />
          <!-- <div class="bdg van-notice-bar">
            <van-icon name="volume-o" />
            <div class="van-notice-bar__wrap">
              <div
                class="van-notice-bar__content van-notice-bar__play--infinite"
                ref="animation_duration"
                :style="animation_duration"
              >
                {{Broadcasting}}
              </div>
            </div>
          </div> -->
        </div>
        <!-- classify分类 -->
        <div class="classify">
          <a
            href="javascript:;"
            @click="toRouter('NextBus')"
          >
            <svg-icon
              icon-class="nextBus"
              className='GMicon nextBus'
            />
            <p>实时公交</p>
          </a>
          <a
            href="javascript:;"
            @click="toRouter('Search')"
          >
            <svg-icon
              icon-class="RouteQuery"
              className='GMicon Search'
            />
            <p>线路查询</p>
          </a>
          <a
            href="javascript:;"
            @click="toRouter('Search')"
          >
            <svg-icon
              icon-class="busStation"
              className='GMicon Search'
            />
            <p>站点查询</p>
          </a>
          <a
            href="javascript:;"
            @click="toRouter('Service')"
          >
            <svg-icon
              icon-class="service"
              className='GMicon Service'
            />
            <p>服务大厅</p>
          </a>
          <!-- <a
            href="javascript:;"
            @click="toRouter('routerQuery')"
          >
            <svg-icon
              icon-class="charteredBus"
              className='GMicon charteredBus'
            />
            <p>包车</p>
          </a> -->
          <a
            href="javascript:;"
          >
            <svg-icon
              icon-class="lundu"
              className='GMicon lundu'
            />
            <p>轮渡客渡</p>
          </a>
          <a
            href="javascript:;"
          >
            <svg-icon
              icon-class="gaotie"
              className='GMicon gaotie'
            />
            <p>北站高铁</p>
          </a>
          <a href="javascript:;">
            <p>更多服务<br />敬请期待</p>
          </a>
        </div>
      </div>
    </van-pull-refresh>
    <!--  引入通用底部组件-->
    <PublicFooter :type="'0'"></PublicFooter>
  </div>
</template>
<script>
import PublicFooter from '../../components/PublicFooter';//引入通用底部组件
import Swiper from '../../components/Swiper';//引入swiper组件
import axios from 'axios';
import { Toast } from 'vant';

export default {
  inject: ['reload'],
  name: 'Page',
  components: {
    PublicFooter,
    Swiper
  },
  data() {
    return {
      cut: '城市',
      Broadcasting: '',
      broadcast: '',
      judeg: false,
      show: false,
      animation_duration: 'padding-left: 266px; animation-delay: 0s; animation-duration: 16.8006s;',
      count: 0,
      isLoading: false,
    }
  },
  methods: {
    showPopup() {
      this.show = true;
    },
    toRouter(path) {
      this.$router.push(path);
    },
    cuts() {
      this.judeg = !this.judeg;
      this.judeg ? this.cut = '城乡' : this.cut = '城市';
    },
    totest(path) {
      // this.$router.push(path)
      let id = 7
      let dir = 1;
      this.$router.push({
        path: `${path}/${id}/${dir}`,
        params: {
          id: id,
          dir: dir
        }
      })
    },
    onRefresh() {
      setTimeout(() => {
        Toast('刷新成功');
        this.reload();
        this.isLoading = false;
      }, 1000);
    },
    // 请求json
    getStatic() {
      axios.get('guangbo1588846504973.json').then(res => {
        this.Broadcasting = res.data.content.content;
      })
    },
    // getStatic() {
    //   let url = `https://api.myjson.com/bins/12f68c`;
    //   axios.get(url).then((res) => {
    //     this.$indicator.close();//关闭loading
    //     if (res.status === 200) {
    //       this.Broadcasting = res.data.data[0].Broadcasting;//滚动条内容
    //     } else {
    //       this.$toast('加载失败')
    //     }

    //   })
    // },
    // 修改滚动速度
    getAnimation_duration(P) {
      return this.animation_duration = `padding-left: 266px; animation-delay: 0s; animation-duration: ${P}s;`
    }
  },
  mounted() {
    this.bus.$emit('loading', false);//关闭loading
    this.getStatic();
    this.getAnimation_duration(10);//控制动画几秒钟内播完


  },
  created() {
    //this.$indicator.open('加载中...');//打开loading
  },
  computed: {

  },
  watch: {

  }
}
</script>
<style rel="stylesheet/css" scoped>
.GMicon {
  font-size: 38px;
}
.van-icon-volume-o {
  font-size: 20px;
  vertical-align: middle;
  color: orange;
  width: 50px;
  height: 100%;
  background-color: #fff;
  z-index: 999;
}
.search-icon {
  color: #ccc;
  margin: 0 20px;
  font-size: 18px !important;
  vertical-align: middle;
}
</style>
<style scoped>
.Page {
  width: 100%;
  height: 100vh;
  background-color: rgb(247, 247, 247);
}
.hearder {
  width: 100%;
  height: 50px;
  background-image: linear-gradient(to right, #1c88e0, rgb(9, 71, 158));
  overflow: hidden;
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.hearder .search i {
  margin: 0 8px;
  vertical-align: text-top;
}
.search {
  width: 80%;
  height: 30px;
  display: inline-block;
  border-radius: 5px;
  background-color: rgba(0, 0, 0, 0.1);
  margin-left: 10px;
  overflow: hidden;
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
  color: #ccc;
}
.positio span {
  margin-left: 2px;
}
.loacltion-icon {
  font-size: 18px;
  display: inline-block;
  vertical-align: middle;
  margin-left: 10px;
}
/* main */
.mainPage {
  width: 100%;
  background-color: rgb(247, 247, 247);
  overflow-x: hidden;
}
/* 广播 */
.mainPage .title {
  width: 100%;
  height: 45px;
  margin: 6px 0;
  overflow: hidden;
}
/* classify */
.classify {
  width: 100%;
  height: 220px;
  display: flex;
  flex-wrap: wrap;
  overflow: hidden;
}
.classify a {
  width: 32.7%;
  /* border: 1px solid #ccc; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #555;
  background-color: #fff;
  margin: 1px;
}
.classify a p {
  margin-top: 4px;
}
/* 广播 */
.bdg {
  width: 100%;
  height: 100%;
  background-color: #fff;
  display: flex;
  align-items: center;
  overflow: hidden;
}
.bdg i {
  display: flex;
  align-items: center;
  border-radius: 10px;
}
/* .tc{
  width: 100px;
  height: 100px;
  background: red;
} */
</style>