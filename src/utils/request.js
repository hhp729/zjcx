import axios from 'axios'
import BASEURL from '@/api/BASEURL.js';

// 创建一个axios实例
const service = axios.create({
    baseURL: BASEURL.CONSTAURL, // url = base url + request url
    // withCredentials: true, // 当跨域请求时发送cookie
    timeout: 5000 // 请求超时
})

// request interceptor
service.interceptors.request.use(
    config => {
        // 在发送请求之前做些什么
        // if (store.getters.token) {
        //   // let each request carry token
        //   // ['X-Token'] is a custom headers key
        //   // please modify it according to the actual situation
        //   config.headers['X-Token'] = getToken()
        // }
        return config
    },
    error => {
        // 处理请求错误
        console.log(error) // for debug
        return Promise.reject(error)
    }
)

// // response interceptor
// service.interceptors.response.use(
//     /**
//       *如果你想获得http信息，如报头或状态
//       *请返回响应=>响应
//     */

//     /**
//       *通过自定义代码确定请求状态
//       这里只是一个例子
//       *你也可以通过HTTP状态码来判断状态
//      */
//     response => {
//         const res = response.data

//         // 如果自定义代码不是20000，则判断为错误。
//         if (res.code ? res.code !== 20000 : null) {
//             Message({
//                 message: res.message || 'Error',
//                 type: 'error',
//                 duration: 5 * 1000
//             })

//             // 50008:非法令牌;50012:其他客户登录;50014:令牌过期;
//             if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
//                 // to re-login
//                 MessageBox.confirm('您已经登出，您可以取消以停留在此页面，或再次登录', '确认注销', {
//                     confirmButtonText: '重新登入',
//                     cancelButtonText: '取消',
//                     type: 'warning'
//                 }).then(() => {
//                     store.dispatch('user/resetToken').then(() => {
//                         location.reload()
//                     })
//                 })
//             }
//             return Promise.reject(new Error(res.message || 'Error'))
//         } else {
//             return res
//         }
//     },
//     error => {
//         console.log('err' + error) // for debug
//         Message({
//             message: error.message,
//             type: 'error',
//             duration: 5 * 1000
//         })
//         return Promise.reject(error)
//     }
// )

export default service
