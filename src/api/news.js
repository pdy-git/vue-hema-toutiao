import request from '@/utils/request'
/**
 * 获取文章
 * @param {*} channelId 频道ID
 * @param {*} timestamp 时间戳，请求当前的时间戳，请求历史推荐传指定的时间戳
 * @returns promise
 */

export const getArticleAPI = (channelId, timestamp) => {
  return request({
    url: '/v1_0/articles',
    params: {
      channel_id: channelId,
      timestamp
    }
  })
}
