import request from '@/utils/request'
// 获取附件公交线路
export function getNearbybusline(data) {
    return request({
        url: `/nearbusline?X=${data.x}&Y=data${data.y}`,
        method: 'get',
        data
    })
}
// 详细线路信息
export function getlinedetail(data) {
    return request({
        url: `/linedetail?lineid=${data.id}&dir=${data.dir}&route=true`,
        method: 'get',
        data
    })
}
// 详细线路车辆信息
export function getLineRealtimeStatus(data) {
    return request({
        url: `/LineRealtimeStatus?lineid=${data.id}&dir=${data.dir}&route=true`,
        method: 'get',
        data
    })
}

