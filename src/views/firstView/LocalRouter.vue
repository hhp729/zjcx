<template>
  <div class="LocalRouter">
    <div class="hearder">
      <svg-icon
        icon-class="goBack"
        className='goBack'
        @click.native="Return(-1)"
      />
      <span>{{name}}</span>
      <span></span>
    </div>
    <!-- 线路 -->
    <div
      class="main"
      v-for="busStaion in busStaions"
      @click="toBusRouterDetail(busStaion.id,0,name,busStaion.down.last)"
      :key="busStaion.id"
    >
      <svg-icon
        icon-class="bus_2"
        className='bus_2'
      />
      <a href="javascript:;">
        <p><i>{{busStaion.name}}路</i></p>
        <p>开往<i>{{busStaion.up.last}}</i>方向</p>
      </a>
    </div>

  </div>
</template>
<script>
import { myRequire } from '@/utils/index.js';//引入axios
export default {
  name: 'LocalRouter',
  components: {

  },
  data() {
    return {
      name: '',
      busStaions: []
    }
  },
  methods: {
    Return(g) {
      this.$router.go(g)
    },
    // 通过名称获取线路信息
    getBusStaions(name) {
      myRequire(`get`, `StationLine`, `station=${name}`, res => {
        console.log(res.data);
        this.busStaions = res.data;
      })
    },
    // 跳转toBusRouterDetail
    toBusRouterDetail(id, dir, name, downLast) {
      this.$router.push({
        path: `/BusRouterDetail/${id}/${dir}/${name}/${downLast}`,
        params: {
          id,
          dir,
          name,
          downLast
        }
      })
    }

  },
  mounted() {
    console.log(this.$route.params);
    this.name = this.$route.params.name;
    this.getBusStaions(this.name)//调用axios获取数据
  }
}
</script>
<style rel="stylesheet/css" scoped>
.bus_2 {
  font-size: 30px;
}
</style>
<style scoped>
.LocalRouter {
  width: 100%;
  height: 100vh;
  background-color: rgb(247, 247, 247);
}
.hearder {
  width: 100%;
  height: 50px;
  background-image: linear-gradient(to right, #1c88e0, rgb(9, 71, 158));
  display: flex;
  align-items: center;
  color: #fff;
  padding: 0 10px;
  justify-content: space-between;
}
/* 线路 */
.main {
  width: 100%;
  background-color: #fff;
  display: flex;
  align-items: center;
  padding: 5px;
  margin: 2px 0;
}
.main span {
  font-size: 20px;
  margin-right: 20px;
}
.main > a {
  color: #555;
}
.main > a > p > i {
  font-weight: 600;
  margin: 0 5px;
}
</style>