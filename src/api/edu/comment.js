import request from '@/utils/request'

export default {
  //获取评论列表
  getCommentList(page, limit, searchObj) {
    return request({
      url: `/eduservice/comment/pageComment/${page}/${limit}`,
      method: 'post',
      data: searchObj
    })
  },

  //删除评论
  deleteComment(id) {
    return request({
      url: `/eduservice/comment/${id}`,
      method: 'delete'
    })
  }
}
