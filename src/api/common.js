import request from '@/utils/request'

export function getUserSig(params){
    return request({
        url: '/trtc/config/getUserSig',
        method:'get',
        params: params
    })
}

export function createMeet(params) {
    return request({
        url: '/trtc/room/create',
        method: 'post',
        data: params
    })
}

export function getMeetingList(params) {
    return request({
        url: '/trtc/room/findList',
        method: 'get',
        params: params
    })
}

export function getMeetingDetail(params) {
    return request({
        url: '/trtc/room/getById',
        method: 'get',
        params: params
    })
}

export function beginMeeting(params) {
    return request({
        url: '/trtc/room/start',
        method: 'post',
        data: params
    })
}

export function endMeeting(params) {
    return request({
        url: '/trtc/room/complete',
        method: 'post',
        data: params
    })
}

export function deleteMeeting(params) {
    return request({
        url: '/trtc/room/delete',
        method: 'post',
        data: params
    })
}