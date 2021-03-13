import request from '@/utils/request'

export function getBusRouter(data) {
    return request({
        url: `/linedetail?lineid=${data.id}&dir=${data.dir}&route=true`,
        method: 'get',
        data
    })
}

// 逆地里编码
// export function getamap(){
//     return request({
//         url: `https://restapi.amap.com/v3/geocode/regeo?parameters`,
//         method: 'get',
//         data
//     })
// }