import axios from 'axios';
//type:请求类型；url：请求接口api； data:传入参数，类型是对象,callback执行成功的回调函数

function myRequire(type, url, parameter, callback) {

  let Hp = 'https://Bustonecms.top:2007/COM/7/';
  if (type === 'get') {
    axios.get(Hp + url + '?' + parameter).then((res) => {
      callback(res)
    })
  }

  if (type === 'post') {
    axios.get(Hp + url + '?' + parameter).then((res) => {
      callback(res)
    })
  }
}

export { myRequire }