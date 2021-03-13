<template>
  <div id="PublicFooter">
    <div class="footer">
      <a
        v-for="(item,index) in router"
        :key="index"
        class="footerA"
        @click="toRouter(index)"
        :class="{active:isActive == index}"
      >
        <!-- <span :class="item.className"></span> -->
        <svg-icon
          :icon-class="item.className"
          :className='item.GMIcon'
        />
        <p>{{item.text}}</p>
      </a>
    </div>
  </div>

</template>
<script>
export default {
  name: 'PublicFooter',
  props: {
    type: String,
    // required: true
  },
  data() {
    return {
      showActive: 'Page',
      isActive: -1,
      router: [
        { 'className': 'home', 'text': '首页', 'path': 'Page', 'GMIcon': "Page GMIcon" },
        { 'className': 'nextBus', 'text': '实时公交', 'path': 'NextBus', 'GMIcon': "path GMIcon" },
        { 'className': 'QR', 'text': '', 'path': '', 'GMIcon': "GMIcon QR" },
        { 'className': 'service', 'text': '服务大厅', 'path': 'Service', 'GMIcon': "GMIcon Service" },
        { 'className': 'myCenter', 'text': '个人中心', 'path': 'PersonalCenter', 'GMIcon': "GMIcon PersonalCenter" },
      ],
    }
  },
  watch: {
    type: {
      deep: true, //开启监听模式
      immediate: true,
      handler(newValue) {
        // console.log('newValue', newValue);
        let typeInt = parseInt(newValue);
        this.isActive = typeInt;
      }
    },
  },
  methods: {
    // 页面跳转
    toRouter(index) {
      // this.showActive = path;
      if (index != this.isActive) { //单击 跳转
        // this.$router.push(path);
        switch (index) {
          case 0: //0跳转首页
            this.$router.push('Page');
            break;
          case 1: //1跳转实时公交
            this.$router.push('NextBus');
            break;
          case 2: //2
            // this.$router.push(path);
            this.$toast('敬请期待');
            break;
          case 3: //0服务大厅
            this.$router.push('Service');
            break;
          // case 4: //4个人中心
          
          //   this.$router.push('PersonalCenter');
          //   break;
          default: //4个人中心
            this.$toast('敬请期待');
          // this.$router.push(path);
        }

      } else { //双击 不跳转
        this.isActive = -1;
      }
      // console.log(this.isActive);
    },
  },
  mounted() {
    //页面进来 默认 跳转首页
    // this.toRouter(0);
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.GMIcon {
  font-size: 24px;
}
.QR {
  font-size: 36px;
}
.footer {
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: space-evenly;
  text-align: center;
  align-items: center;
  position: fixed;
  bottom: 0;
  left: 0;
  border: 1px solid #ccc;
  background-color: #fff;
}

.footerA {
  width: 20%;
  font-family: cursive, Times, "New Century Schoolbook", Georgia, "New York",
    serif;
  padding: 2px;
  color: #222;
  display: inline-block;
}

.footerA p {
  margin-top: 4px;
}

// .footerA:nth-of-type(3) p {
//   margin-top: 20px;
// }
.iconhome {
  color: rgb(226, 108, 62);
}
.iconbus {
  color: rgb(192, 62, 79);
}
.iconfont {
  font-size: 24px;
}
.scan {
  font-size: 60px;
  color: #0c61d8;
}
.serve {
  font-size: 30px;
  color: rgb(178, 233, 116);
}
.personal {
  font-size: 26px;
  color: rgb(74, 170, 235);
}
/* 添加点击样式 */
.active {
  color: rgb(12, 97, 216);
  span {
    color: rgb(12, 97, 216);
  }
  p {
    color: rgb(12, 97, 216);
  }
  .iconfont {
    color: rgb(12, 97, 216);
  }
}
</style>