<template>
  <div id="rouerQuery">
    <!-- 获取定位信息 -->
    <el-amap vid="amap" :plugin="plugin" class="amap-demo" :center="center">
      </el-amap>
    <!-- 头部 -->
    <hearder>
      <span slot="left" @click="toRouter(-1)">
        <svg-icon icon-class="goBack" class="goBack" />
      </span>
      <span slot="center">定制包车</span>
      <span slot="right"></span>
    </hearder>

    <!-- main -->
    <div class="main">
      <div class="position">
        <van-steps direction="vertical" :active="active">
          <van-step v-for="(p,index) in flows" :key="p.id">
            <p>
              <span @click="localtion(index)" class="PM">{{p}}</span>
              <svg-icon
                v-show="index != 0 && index != flows.length - 1"
                icon-class="delete"
                class="delete"
                @click.native="DE(index)"
              />
            </p>
          </van-step>
        </van-steps>
        <hr style="background-color:#ccc;height:1px;border:none;margin:5px 0" />
        <van-row type="flex" justify="space-between">
          <van-col span="6">
            <!-- --公里 -->
          </van-col>
          <van-col span="6">
            <van-button type="info" size="mini" @click="addPath" plain>添加途径地点</van-button>
          </van-col>
        </van-row>
      </div>
      <!-- 选择时间 -->
      <div class="time">
        <van-steps direction="vertical" :active="timeactive">
          <van-step v-for="(p,index) in time" :key="p.id">
            <h3 @click="optionTime(index)">{{p}}</h3>
          </van-step>
        </van-steps>
      </div>
      <!-- 定制类型 -->
      <van-row class="typeWrap">
        <van-col span="12">
          <svg-icon icon-class="type" class="type" />定制类型
        </van-col>
        <van-col span="12">
          <van-radio-group v-model="radio" class="radio">
            <van-radio
              v-for="cntype in cntypes"
              :key="cntype.id"
              :name="cntype.name"
              class="zl"
              @click="cntypechange"
            >{{cntype.title}}</van-radio>
          </van-radio-group>
        </van-col>
      </van-row>
      <!-- 车辆详情 -->
      <div class="busdetails">
        <van-row style="padding:10px;border-bottom:1px solid #ccc;">
          <!-- 乘车人数 -->
          <van-col :span="12">
            <svg-icon icon-class="myCenter" class="myCenter" />
            <span style="margin-left:5px;">乘车人数</span>
          </van-col>
          <van-col :span="12">
            <input
              type="text"
              placeholder="请输入乘车人数"
              class="inp"
              v-model="values.bycarnumber"
              @change="inpnumber"
            />
          </van-col>
        </van-row>
        <!-- 包车用途 -->
        <van-row style="padding:10px;border-bottom:1px solid #ccc;">
          <van-col :span="12">
            <svg-icon icon-class="type" class="type" />
            <span style="margin-left:5px;">包车用途</span>
          </van-col>
          <van-col :span="12" @click="judeg.showbycar = true">
            <span style="color:#888;">{{bycaruse}}</span>
            <svg-icon icon-class="rightJT" class="rightJT" style="float:right" />
          </van-col>
        </van-row>
        <!-- 车座车型 -->
        <van-row style="padding:10px;border-bottom:1px solid #ccc;">
          <van-col :span="12">
            <svg-icon icon-class="bus_04" class="bus_04" />
            <span style="margin-left:5px;">车座车型</span>
          </van-col>
          <van-col :span="12" @click="ISBusType">
            <span style="color:#888;">{{busType}}</span>
            <svg-icon icon-class="rightJT" class="rightJT" style="float:right" />
          </van-col>
        </van-row>
        <!-- 司机费用 -->
        <!-- <van-row style="padding:10px;border-bottom:1px solid #ccc;">
          <van-col :span='12'>
            <svg-icon
              icon-class="driver"
              className='driver'
            />
            <span style="margin-left:5px;">司机费用</span>

          </van-col>
          <van-col
            :span='12'
            @click="judeg.showDriver = true"
          >
            <span style="color:#888;">{{driver}}</span>
            <svg-icon
              icon-class="rightJT"
              className='rightJT'
              style="float:right"
            />
          </van-col>
        </van-row>-->
        <van-row style="padding:10px;border-bottom:1px solid #ccc;">
          <!-- 乘车人数 -->
          <van-col :span="12">
            <svg-icon icon-class="contacts" class="myCenter" />
            <span style="margin-left:5px;">联系人</span>
          </van-col>
          <van-col :span="12">
            <input
              type="text"
              placeholder="请输入姓名"
              class="inp"
              v-model="values.name"
              @change="inpnumber1"
            />
          </van-col>
        </van-row>
        <van-row style="padding:10px;">
          <!-- 乘车人数 -->
          <van-col :span="12">
            <svg-icon icon-class="phone" class="myCenter" />
            <span style="margin-left:5px;">联系方式</span>
          </van-col>
          <van-col :span="12">
            <input
              type="text"
              placeholder="请输入手机号码"
              class="inp"
              v-model="values.phone"
              @change="inpnumber2"
            />
          </van-col>
        </van-row>
      </div>
      <!-- 备注 -->
      <div class="vanWrap">
        <van-row style="padding:10px" class="Notes" @click="ISMessage">
          <van-col span="12">
            <svg-icon icon-class="notes" class="notes" />
            <span style="margin-left:5px;">备注</span>
          </van-col>
          <van-col span="12">
            <svg-icon
              icon-class="rightJT"
              class="rightJT"
              style="float:right"
              v-show="!judeg.showMessage"
            />
            <svg-icon icon-class="BM" class="BM" style="float:right" v-show="judeg.showMessage" />
          </van-col>
        </van-row>
        <van-cell-group v-show="judeg.showMessage">
          <van-field
            v-model="values.message"
            rows="2"
            autosize
            label="留言"
            type="textarea"
            maxlength="50"
            placeholder="请输入留言"
            show-word-limit
          />
        </van-cell-group>
        <div class="bz">
          <span>提交信息后,我公司会安排专人电话联系您确认具体价格和付款方式。</span>
        </div>
      </div>
      <!-- 底部支付 -->
      <div class="footer">
        <!-- <a href="javascript:;">
          <span>总计：{{values.price}} 元</span>
        </a>-->
        <a href="javascript:;">
          <button @click="ISpay" :disabled="judeg.pay" :style="judeg.payStyle">信息提交</button>
        </a>
      </div>
    </div>
    <!-- 弹出框 时间选择器-->
    <van-popup v-model="judeg.showtime" position="bottom" :style="{ height: '40%' }">
      <van-datetime-picker
        v-model="currentDate"
        type="datetime"
        :min-date="minDate"
        @confirm="confirm"
        @cancel="cancel"
      />
    </van-popup>
    <!-- 弹出框  包车用途 -->
    <van-popup v-model="judeg.showbycar" position="bottom" :style="{ height: '40%' }">
      <van-picker
        show-toolbar
        :columns="ISbycaruse"
        :default-index="0"
        @cancel="judeg.showbycar = false"
        @confirm="confirmbycar"
      />
    </van-popup>
    <!-- 汽车类型 -->
    <SaddleModels @fullnumber="fullnumber" v-show="judeg.cp" />
    <!-- 地图 -->
    <mapPosition v-if="judeg.mapPosition" @sendMap="sendMap"/>
  </div>
</template>

<script>
import hearder from "@/components/hearder";
import SaddleModels from "@/components/SaddleModels";
import mapPosition from "@/components/mapPosition";
import VueAMap from "vue-amap";
import axios from "axios";
import Vue from "vue";
import { Toast, Notify } from "vant";
Vue.use(Toast);
Vue.use(Notify);
export default {
  name: "rouerQuery",
  components: {
    hearder,
    SaddleModels,
    mapPosition
  },
  data() {
    let self = this;
    return {
          center: [121.59996, 31.197646],
          lng: 0,
          lat: 0,
          local:[],
          plugin: [{
            pName: 'Geolocation',
            events: {
              init(o) {
                // o 是高德地图定位插件实例
                o.getCurrentPosition((status, result) => {
                  if (result && result.position) {
                    self.lng = result.position.lng;
                    self.lat = result.position.lat;
                    self.local = [self.lng, self.lat];
                    localStorage.setItem('position',JSON.stringify(result))
                    console.log(result)
                    self.loaded = true;
                    self.$nextTick();
                  }
                });
              }
            }
          }],
      active: 0,
      flows: ["选择出发地", "选择目的地"],
      time: ["请选择出发时间", "请选择返程时间"],
      cntypes: [
        { title: "往返", name: "1" },
        { title: "单程", name: "2" }
      ],
      ISbycaruse: ["旅游", "会务", "婚庆", "其它"],
      // ISDriver: ['司机三餐自理', '司机住宿自理', '司机停车费自理'],
      driver: "请选择...",
      bycaruse: "请输入包车用途",
      busType: "请输入车座车型",
      timeactive: 0,
      minHour: 10,
      maxHour: 20,
      minDate: new Date(),
      currentDate: new Date(),
      judeg: {
        IS: false,
        showtime: false,
        showbycar: false,
        showDriver: false,
        showMessage: false,
        pay: false,
        cp: false,
        payStyle: `background-color: #ccc`,
        mapPosition: false
        // background-color: rgb(25, 137, 250)
      },
      values: {
        opIndex: null,
        bycarnumber: "",
        name: "",
        phone: "",
        message: "",
        replaceindex: "",
        address: [],
        time: [],
        greattime: "",
        radio: "1", //定制类型
        bycaruse: "", //包车用途
        type: "" //车辆类型
      },
      radio: "1"
    };
  },
  methods: {
    DE(index) {
      console.log(index, "index");
      this.flows.splice(index, 1);
    },
    // 返回
    toRouter(path) {
      this.$router.go(path);
    },
    // 选择位置
    localtion(i) {
      console.log(i, "--");
      this.values.replaceindex = i;
      this.judeg.mapPosition = true;
    },
    // 添加途径点
    addPath() {
      this.flows.splice(this.flows.length - 1, 0, "请添加途径地");
    },
    // 选择时间
    optionTime(index) {
      this.values.opIndex = index;
      this.judeg.showtime = true;
      console.log(this.values.opIndex, "---");
    },
    // 处理时间
    p(s) {
      return s < 10 ? "0" + s : s;
    },
    // 确定时间
    confirm() {
      console.log(this.values.time);
      console.log(this.currentDate);
      const d = new Date(this.currentDate);
      const resDate =
        d.getFullYear() +
        "-" +
        this.p(d.getMonth() + 1) +
        "-" +
        this.p(d.getDate());
      const resTime =
        this.p(d.getHours()) +
        ":" +
        this.p(d.getMinutes()) +
        ":" +
        this.p(d.getSeconds());
      this.time[this.values.opIndex] = resDate + " " + resTime;
      if (this.values.opIndex == 0) {
        this.values.time[0] = Math.round(d.getTime() / 1000);
      } else {
        this.values.time[1] = Math.round(d.getTime() / 1000);
      }

      console.log(this.values.time);
      this.judeg.showtime = false;
      this.timeactive++;
    },
    // 取消时间
    cancel() {
      this.judeg.showtime = false;
    },
    // 定制类型
    cntypechange() {
      this.values.radio = this.radio;
      console.log(this.radio, "--------");
    },
    // 乘车人数
    inpnumber() {
      console.log(this.values.bycarnumber, "-----------");
    },
    //联系人
    inpnumber1() {
      console.log(this.values.name, "-----------");
    },
    //联系号码
    inpnumber2() {
      const reg = /^1[3456789]\d{9}$/;
      var phone = Number(this.values.phone);
      if (phone == "" || phone.length <= 10 || !reg.test(phone)) {
        Toast("手机号码不正确");
      }
      console.log(Number(this.values.phone), "-----------");
    },
    //包车选择
    confirmbycar(v, i) {
      this.bycaruse = v;
      this.judeg.showbycar = false;
      this.values.bycaruse = this.bycaruse;
      console.log(this.bycaruse, "包车类型");
    },
    // 司机选择
    DriverMN(v, i) {
      this.driver = v;
      this.judeg.showDriver = false;
      this.values.price = this.driver;
      console.log(this.driver, "司机");
    },
    // 显示留言板否
    ISMessage() {
      this.judeg.IS = !this.judeg.IS;
      this.judeg.IS
        ? (this.judeg.showMessage = true)
        : (this.judeg.showMessage = false);
    },
    // 车辆车型
    ISBusType() {
      if (this.values.bycarnumber.trim()) {
        this.judeg.cp = true;
      } else {
        this.$toast("请先选择乘车人数!");
      }
    },
    // 子组件向父组件传递
    fullnumber(value, value2) {
      console.log(value, value2);
      this.judeg.cp = value;
      this.busType = value2;
      this.values.type = value2;
      console.log(this.values.type);
    },
    // 地图子组件向父组件传参
    sendMap(v1, v2) {
      console.log(v1, v2, "1111");
      this.judeg.mapPosition = v1;
      const that = this;
      var geocoder = new AMap.Geocoder({
        radius: 1000 //范围，默认：500
      });
      let lnglat = [v2.lng, v2.lat];
      geocoder.getAddress(lnglat, function(status, result) {
        if (status === "complete" && result.regeocode) {
          console.log(result.regeocode.formattedAddress); //打印地址
          // that.values.address.first=result.regeocode.formattedAddress
          // console.log(that.values)
          console.log(that.flows, " that.flows");
          console.log(that.values.replaceindex, "that.values.replaceindex");
          that.flows[that.values.replaceindex] =
            result.regeocode.formattedAddress;
          console.log(that.flows[that.values.replaceindex]); //打印地址
          if (that.values.replaceindex == 0) {
            that.values.address[0] = that.flows[that.values.replaceindex];
          } else if (that.values.replaceindex == 1) {
            that.values.address[1] = that.flows[that.values.replaceindex];
          } else {
            that.values.address[2] = that.flows[that.values.replaceindex];
          }
          console.log(that.values.address);
          that.$forceUpdate();
          that.active++;
        } else {
          that.$toast("查询地址失败");
        }
      });
    },
    // 信息提交
    ISpay() {
      const reg = /^1[23456789]\d{9}$/;
      var phone = this.values.phone;
      phone == "" || phone.length <= 10 || !reg.test(phone);
      if (
        this.values.address.length >= 2 &&
        this.values.time.length == 2 &&
        this.values.bycarnumber &&
        this.values.bycaruse &&
        this.values.name &&
        phone.length >= 10 &&
        reg.test(phone)
      ) {
        const d = new Date();
        this.values.greattime = Math.round(d.getTime() / 1000);
        console.log(this.values.greattime);
        //提交数据
        axios
          .post("https://bustonecms.top:2007/Manager/56/UploadCarRequired", {
            departureaddress: this.values.address[0],
            arriveaddress: this.values.address[this.values.address.length - 1],
            departuretime: this.values.time[0],
            backtime: this.values.time[1],
            greattime: this.values.greattime,
            requiretype: Number(this.values.radio),
            cartype: Number(this.values.type),
            requireuse: this.values.bycaruse,
            peoplenum: Number(this.values.bycarnumber),
            requirename: this.values.name,
            phonenum: this.values.phone,
            remarks: this.values.message
          })
          .then(res => {
            console.log(res.data);
            Notify({ type: "success", message: "提交成功" });
          });
      } else {
        Toast("请将信息填写完整");
      }
      console.log(this.values);
    }
  },
  mounted() {},
  watch: {}
};
</script>

<style rel="stylesheet/css" scoped>
.delete {
  font-size: 15px;
  float: right;
  width: 10%;
}
.van-col--6 {
  text-align: center;
}
.myCenter {
  font-size: 18px;
}
.bus_04,
.driver,
.notes,
.rightJT {
  font-size: 20px;
}
</style>
<style scoped>
.main {
  width: 100%;
  background-color: rgb(247, 247, 247);
  overflow: hidden;
}
.position {
  background-color: #fff;
  padding: 8px;
  margin: 5px;
}
.time,
.typeWrap,
.busdetails,
.vanWrap {
  background-color: #fff;
  margin: 5px;
}
.vanWrap {
  margin-bottom: 80px;
  overflow: hidden;
}
.vanWrap .bz {
  padding: 10px;
  color: red;
}
.typeWrap {
  padding: 5px;
  display: flex;
  align-items: center;
}
.type {
  font-size: 20px;
  vertical-align: middle;
}
.zl {
  margin: 2px 0;
}
.inp {
  background: none;
  outline: none;
  border: none;
}
.footer {
  width: 100%;
  height: 50px;
  background-color: #fff;
  display: flex;
  align-items: center;
  text-align: center;
  position: fixed;
  bottom: 0;
  overflow: hidden;
}
.footer a {
  width: 100%;
  color: black;
}
.footer a button {
  width: 100%;
  height: 50px;
  outline: none;
  border: none;
}
.van-button--normal {
  width: 100%;
}
.PM {
  display: inline-block;
  width: 90%;
}
</style>