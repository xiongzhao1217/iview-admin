import axios from '@/libs/api.request'
import * as util from '@/libs/util'

export const login = ({ userName, password }) => {
  const data = {
    userName,
    password
  }
  return axios.request({
    url: 'login',
    data,
    method: 'post'
  })
}

export const getUserInfo = () => {
  return util.request('/api/user/getUserInfo?appsId=1')
}

export const logout = (token) => {
  return axios.request({
    url: 'logout',
    method: 'post'
  })
}
