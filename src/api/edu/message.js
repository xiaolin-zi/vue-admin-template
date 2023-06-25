import request from '@/utils/request'
export default {
  //获取留言列表
  getMessages(page,limit,searchObj) {
    return request({
      url: `/eduservice/msg/pageMessageCondition/${page}/${limit}`,
      method: 'post',
      data: searchObj
    })
  },

  //删除留言
  deleteMessage(id) {
    return request({
      url: `/eduservice/msg/${id}`,
      method: 'delete'
    })
  }
}
