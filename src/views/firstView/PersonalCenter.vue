<template>
  <div class="PersonalCenter">
    <div class="hearder">
      <span>图片素材</span>
    </div>
     <!--  广播 -->
    <div class="title">
        <!-- <van-notice-bar :text="'{{Broadcasting}}'"
                        left-icon="volume-o broadcast-icon" /> -->
        <div class="bdg van-notice-bar">
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
        </div>
      </div>
    <div class="menu">
      <img src="../../assets/001.jpg" alt="">
    </div>
    <div class="menu_1">
      <img src="../../assets/005.gif" alt="">
    </div>
    <div class="menu_2">
      <img src="../../assets/006.png" alt="">
    </div>
    <div class="menu_3">
      <img src="../../assets/006.jpg" alt="">
    </div>
    <div class="menu_4">
      <img src="../../assets/007.gif" alt="">
    </div>
     <div class="menu_5">已到达底部</div>
    <!-- 引入通用底部组件 -->
    <PublicFooter :type="'4'"></PublicFooter>
  </div>
</template>
<script>
import PublicFooter from '../../components/PublicFooter';//引入通用底部组件


export default {
  name: 'PersonalCenter',
  components: {
    PublicFooter,
  },
  data () {
    return {
      Broadcasting: '图片仅供欣赏。',
      animation_duration: 'padding-left: 266px; animation-delay: 0s; animation-duration: 16.8006s;'
    }
  },
  methods:{
      // 修改滚动速度
    getAnimation_duration(P) {
      return this.animation_duration = `padding-left: 266px; animation-delay: 0s; animation-duration: ${P}s;`
    }
  },
  mounted(){
     this.getAnimation_duration(10);//控制动画几秒钟内播完
  }
}
</script>
<style scoped>
.title{
  width: 100%;
  height: 45px;
  margin: 6px 0;
  overflow: hidden;
}
.hearder {
  width: 100%;
  height: 50px;
  background-image: linear-gradient(to right, #1c88e0, rgb(9, 71, 158));
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
}
.menu,.menu_1,.menu_2,.menu_3,.menu_4{
  width: 100%;
  height: 180px;
}
.menu_5{
  width: 100%;
  height: 80px;
  color: #458cdc;
  text-align: center;
}
.menu img{
  width: 100%;
}
.menu_1 img{
  width: 100%;
}
.menu_2 img{
  width: 100%;
}
.menu_3 img{
  width: 100%;
}
.menu_4 img{
  width: 100%;
  height: 100%;
}
</style>