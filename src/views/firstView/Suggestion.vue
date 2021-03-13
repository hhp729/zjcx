<template>
  <div class="Suggestion">
    <div class="hearder">
      <van-icon
        name="arrow-left"
        @click="toRouter(-1)"
      />
      <span>意见建议</span>
      <van-icon name="smile-comment-o" />
    </div>
    <!--  -->
    <div class="Suggestion_content">
      <textarea
        placeholder="请填写您的宝贵意见:"
        v-model.trim="content"
        cols="80"
        rows="7"
         maxlength="300"
         οnchange="this.value=this.value.substring(0, 300)"
         οnkeydοwn="this.value=this.value.substring(0, 300)"
         οnkeyup="this.value=this.value.substring(0, 300)"
      >
                </textarea>
      <div class="number">{{reduceCount}}</div>
    </div>
    <div
      class="btn"
      @click="submit()"
    >
      <van-button color="linear-gradient(to right, #4bb0ff, #6149f6)">提交</van-button>
    </div>
    <!-- <van-popup
      v-model="show"
      position="bottom"
      :style="{ height: '20%' }"
    >请正确输入意见及反馈内容
    </van-popup> -->
  </div>
</template>
<script>

export default {
  name: 'Suggestion',
  components: {

  },
  data() {
    return {
      textNumber: 300,
      content: '',
      show: false
    }
  },
  mounted() {

  },
  methods: {
    submit() {
      if (this.content.length == 0) {
        this.$toast('输入内容不可为空')
      } else {
        this.$toast('该功能暂未开放，敬请期待')
      }
    },
    toRouter(G) {
      this.$router.go(G)
    }

  },
  computed: {
    reduceCount() {
      return this.textNumber - this.content.length
    }
  }
}
</script>
<style rel="stylesheet/css" scoped>
.van-icon,
.van-icon {
  font-size: 20px;
}
.van-button {
  width: 100%;
}
.van-popup--bottom {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgb(0, 0, 0, 0.1);
  color: #fff;
}
</style>
<style scoped>
.Suggestion {
  width: 100%;
  height: 100vh;
  background-color: rgb(247, 247, 247);
}
.hearder {
  width: 100%;
  height: 50px;
  background-image: linear-gradient(to right, #1c88e0, rgb(9, 71, 158));
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #fff;
  padding: 10px 20px;
}
/* Suggestion */
.Suggestion_content {
  width: 100%;
  padding: 10px;
  overflow: hidden;
  position: relative;
}
/* 去掉右下角的三角*************/
textarea {
  width: 100%;
  resize: none;
  border: 0;
  padding: 10px;
}
.number {
  position: absolute;
  bottom: 18px;
  right: 30px;
}
/*  */
.btn {
  width: 100%;
  padding: 10px;
}
/* 弹出层 */
</style>