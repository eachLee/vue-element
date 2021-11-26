import request from '@/axios'

export function login(params) {
  return request({
    url: 'system/user/token',
    method: 'post',
    data: params
  })
}

export function getInfo(token) {
  return request({
    url: 'system/user/infomation',
    method: 'get',
    params: {
      'token': token
    }
  })
}

export function loginOut(params) {
  return request({
    url: '/system/user/logout',
    method: 'post',
    data: params
  })
}

export function getEmployees(params) {
  return request({
    url: '/employee/employees',
    method: 'get',
    params: params
  })
}