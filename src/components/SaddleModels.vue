<template>
  <div id="SaddleModels">
    <hearder>
      <span slot="left">
        <svg-icon
          icon-class="goBack"
          className='goBack'
          @click.native="toFather"
        />
      </span>
      <span slot="center">车座车型</span>
      <span slot="right"> </span>
    </hearder>
    <!-- 核载人数 -->
    <div class="mian">
      <div class="show">
        <input
          type="text"
          placeholder="核载人数"
          v-model="pepol "
        >
      </div>
      <!-- 汽车 -->
      <div
        class="bus"
        v-for="dataList in dataLists"
        :key="dataList.id"
      >
        <a href="javascript:;">
          <img
            :src="dataList.img"
            alt=""
          >
        </a>
        <a href="javascript:;">
          <h3>{{dataList.start}} - {{dataList.end}}座 ({{dataList.type}})</h3>
          <p>{{dataList.ISluggage == 0 ? '车长8米':'车长6米'}}</p>
          <!-- <p style="float:right"><b>{{dataList.number}}</b> 辆</p> -->
        </a>
        <a href="javascript:;">
          <van-radio-group v-model="radio" style="float:right;margin-right:10px">
                <van-radio :name="dataList.radio" checked-color="#07c160" @click="add(dataList)" label-position="left"></van-radio>
          </van-radio-group>
          <!-- <div class="btn">
            <van-button
              type="primary"
              size="mini"
              class="addbtn"
              @click=" dataList.number++"
            >+</van-button>
            <van-button
              type="primary"
              size="mini"
              class="reducebtn"
              @click="dataList.number > 0 ? dataList.number-- : dataList.number"
            >-</van-button>
          </div> -->
        </a>
      </div>
    </div>
    <div style="padding-left:20px">
      <van-radio-group v-model="tag">
                <van-radio name="1" checked-color="#07c160" @click="changeRadio">任意车辆</van-radio>
      </van-radio-group>
    </div>
    <!-- 确定 -->
    <div class="footer">
      <van-button
        type="primary"
        size="large"
        @click="toFather"
      >确定</van-button>
    </div>
  </div>
</template>

<script>
import hearder from '@/components/hearder';
export default {
  name: 'SaddleModels',
  components: {
    hearder
  },
  data() {
    return {
      values: {
        payNumber: null,
      },
      radio:'1',
      tag:'0',
      count: 0,
      pepol:'核载人数',
      fullnumber:'',
      dataLists: [
        { img: require("../assets/yutong8.jpg"), start: '16', end: '51', type: '宇通', ISluggage: '0', number: 0,cartype:'2',radio:1 },
        { img: require("../assets/haige6.png"), start: '23', end: '60', type: '海格', ISluggage: '1', number: 0, cartype:'4',radio:2},
        { img: require("../assets/haige8.png"), start: '18', end: '44', type: '海格', ISluggage: '0', number: 0, cartype:'3',radio:3}
      ]
    }
  },
  computed: {
    // fullnumber() {
    //   let count = 0;
    //   for (let p of this.dataLists) {
    //     count = count + p.number
    //   }
    //   if (count) {
    //     return count
    //   } else {
    //     return '请选择'
    //   }
    // },
    fulltotal() {
      let count = 0;
      let arr = [];
      let total = 0;
      for (let i = 0; i < this.dataLists.length; i++) {
        count = this.dataLists[i].number * this.dataLists[i].end
        arr.push(count)
      }
      for (let p of arr) {
        total += p
      }
      if (total) {
        return '核载人数' + '' + total
      } else {
        return '核载人数'
      }
    }

  },
  methods: {
    //   向父组件传参
    toFather() {
      this.$emit('fullnumber', false, this.fullnumber)
    },
    add(data){
      this.tag = 0;
      this.pepol ="核载人数"+ data.end
      this.fullnumber = data.cartype
    },
    changeRadio(){
      this.radio = 0;
      this.pepol= '核载人数'
      this.fullnumber = 1;
    }
  },
}
</script>
<style rel='stylesheet/css' scoped>
.van-button--mini {
  min-width: 35px;
}
.van-button--large {
  border-radius: 10px;
}
</style>
<style scoped>
#SaddleModels {
  width: 100%;
  min-height: 100vh;
  top: 0;
  bottom: 0;
  position: fixed;
  overflow-y: scroll;
  background-color: #fff;
  z-index: 9;
}
.mian {
  width: 100%;
  margin-bottom: 70px;
  background-color: rgb(247, 247, 247);
}
.show {
  width: 100%;
  height: 40px;
  padding: 0 20px;
  margin: 10px 0;
  overflow: hidden;
}
.show input {
  width: 100%;
  height: 100%;
  padding: 0 10px;
  outline: none;
}
.bus {
  width: 100%;
  padding: 0 20px;
  display: flex;
  justify-content: space-evenly;
}
.bus a {
  width: 33.33%;
  background-color: #fff;
  border-bottom: 1px solid #ccc;
  padding: 10px 0;
}
.bus a:nth-of-type(2) {
  color: #666;
}
.bus a:nth-of-type(2) p {
  font-size: 12px;
}
.bus a:nth-of-type(2) p:nth-of-type(1) {
  margin: 6px 0;
}
.bus a img {
  width: 100px;
}
.bus a:nth-of-type(3) {
  text-align: center;
  position: relative;
}
.btn {
  width: 100%;
  position: absolute;
  bottom: 5px;
  right: 0;
}
.footer {
  width: 100%;
  background-color: #fff;
  padding: 0 10px;
  position: fixed;
  bottom: 0;
  left: 0;
}
</style>