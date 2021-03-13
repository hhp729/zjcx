import Vue from 'vue'
import App from './App.vue'
import router from "./router";


import Mint from 'mint-ui';//引入Mint组件
import 'mint-ui/lib/style.css';

import Vant from 'vant';//引入Vant组件
import 'vant/lib/index.css';
import 'lib-flexible/flexible.js'//px转rem  

// import "./assets/iconfont/iconfont.css";//引入icon图标

import AMap from 'vue-amap';//导入高德地图
import Mui from "vue-awesome-mui";//对手机进行物理监听
import '@/icons'
// 动态生成页面标题
router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  if (to.name) {
    document.title = to.name
  }
  next()
})

Vue.use(AMap);
Vue.use(Vant);
Vue.use(Mint);
Vue.use(Mui);
Vue.prototype.bus = new Vue;//VUEloading 加载效果

// 初始化vue-amap
AMap.initAMapApiLoader({
  // 高德key4b39ed0835df2a001df5dbdb969b1ee4
  // js 	576dd27bf12ff0da4402006b9e5aca1d
  key: '576dd27bf12ff0da4402006b9e5aca1d',
  // 插件集合 （插件按需引入）
  plugin: ['AMap.PolyEditor', //折线、多边形编辑插件
    'AMap.CircleEditor',//圆编辑插件
    'AMap.Geolocation',
    // 'AMap.Autocomplete',//输入提示，根据输入关键字提示匹配信息
    // 'AMap.PlaceSearch', //地点搜索服务插件，提供某一特定地区的位置查询服务
    // 'AMap.Scale', //地图比例尺插件
    // 'AMap.OverView', //地图鹰眼插件，默认在地图右下角显示缩略图
    'AMap.ToolBar', //地图工具条插件，可以用来控制地图的缩放和平移
    // 'AMap.MapType', //地图类型切换插件，用来切换固定的几个常用图层
  ],
  // 1.4.15 及以上版本更好的支持自定义样式
  uiVersion: '1.0.11',
  v: '1.4.15'
});

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
