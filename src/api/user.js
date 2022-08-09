import request from '@/utils/request'

/**
 *
 * @param {string} mobile
 * @param {string} code
 * @returns promise
 */
export const login = (mobile, code) => {
  return request({
    url: '/v1_0/authorizations',
    method: 'POST',
    data: { mobile, code }
  })
}

export const getCodeAPI = (mobile) => {
  return request({
    url: `/v1_0/sms/codes/${mobile}`
  })
}

export const getUserInfo = () => {
  return request({
    url: '/v1_0/user/profile'
  })
}

// 上传文件
export const UploadAvator = (file) => {
  const fm = new FormData()
  fm.append('photo', file)
  return request({
    url: '/v1_0/user/photo',
    method: 'PATCH',
    data: fm
  })
}

// 编辑用户个人资料
export const UpDataAvator = (data) => {
  return request({
    method: 'PATCH',
    url: '/v1_0/user/profile',
    data
  })
}

// 获取用户自己的信息
export const getUserInfoResult = () => {
  return request({
    url: '/v1_0/user',
    method: 'GET'
  })
}
