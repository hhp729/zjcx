<template>
  <div class="main">
    <mt-swipe :auto="4000">
      <mt-swipe-item v-for="(item, index) in swiper"
                     :key="index">
        <img :src="item.img"
             alt="">
      </mt-swipe-item>
    </mt-swipe>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  data () {
    return {
      swiper: [
        // {img:require("../assets/001.jpg")},
        // {img:require("../assets/002.jpg")},
      ]
    }
  },
  methods: {
    // 请求json
    getSwiper() {
      var arr = [];
      axios.get('lunbo1588905063628.json').then(res => {
        console.log(res)
        arr = res.data.children;
        this.swiper = arr.map(p => {
          return {
            img: p.content.url
          }
        });
        this.$indicator.close();//关闭loading
      })

    }
    // getStatic () {
    //   let url = `https://api.myjson.com/bins/12f68c`;
    //   axios.get(url).then((res) => {
    //     console.log(res.data.data[0].Swiper);
    //     this.swiper = res.data.data[0].Swiper;
    //   })
    // }
  },
  mounted () {
    // this.getStatic();
    this.getSwiper();
  }
}
</script>
<style  scoped>
.main {
  width: 100%;
  height: 180px;
}
.main img {
  width: 100%;
  height: 100%;
}
</style>