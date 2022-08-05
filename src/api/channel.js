import request from '@/utils/request'
import storage from '@/utils/storage'

export const getMyChannel = () => {
  return request({
    url: '/v1_0/user/channels'
    // headers: {
    //   Authorization: 'Bearer ' + store.state.tokenObj.token
    // }
  })
}

export const getAllChannels = () => {
  return request({
    url: '/v1_0/channels'
  })
}

// 删除用户频道
export const delChannel = (target) => {
  return request({
    url: `/v1_0/user/channels/${target}`,
    method: 'DELETE'
  })
}

// 添加频道
export const addChannel = (id, seq) => {
  return request({
    url: '/v1_0/user/channels',
    method: 'PATCH',
    data: {
      channels: [{ id, seq }]
    }
  })
}

//
const HEIMA_TOUTIAO_MY_CHANNELS = 'HEIMA_TOUTIAO_MY_CHANNELS'

export const setMyChannelsToLocal = (myChannels) => {
  storage.set(HEIMA_TOUTIAO_MY_CHANNELS, myChannels)
}

export const getMyChannelsByLocal = () => {
  return storage.get(HEIMA_TOUTIAO_MY_CHANNELS)
}
