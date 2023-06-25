import request from '@/utils/request'
export default {

  //文章列表
  getList(current, limit,searchForm) {
    return request({
      url: `/eduservice/article/pageArticleCondition/${current}/${limit}`,
      method: 'post',
      data: searchForm
    })
  },

  //删除文章
  deleteArticle(id) {
    return request({
      url: `/eduservice/article/${id}`,
      method: 'delete'
    })
  },

  //修改文章状态
  publishArticle(id) {
    return request({
      url: `/eduservice/article/publishArticle/${id}`,
      method: 'put'
    })
  },

  //添加文章
  saveArticle(article) {
    return request({
      url: `/eduservice/article/addArticle`,
      method: 'post',
      data: article
    })
  },

  //根据id查询文章
  getArticleById(id) {
    return request({
      url: `/eduservice/article/getArticleById/${id}`,
      method: 'get'
    })
  },

  //修改文章
  updateArticle(article) {
    return request({
      url: `/eduservice/article/updateArticle`,
      method: 'post',
      data: article
    })
  },

  //获取文章类别
  getArticleType() {
    return request({
      url: `/eduservice/article/findArticleType`,
      method: 'get'
    })
  },

  //添加文章类别
  saveArticleType(articleType) {
    return request({
      url: `/eduservice/article/addArticleType`,
      method: 'post',
      data: articleType
    })
  },

  //删除文章类别
  deleteArticleType(id) {
    return request({
      url: `/eduservice/article/deleteArticleType/${id}`,
      method: 'delete'
    })
  }
}
