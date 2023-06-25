import request from '@/utils/request'

const api_name = '/admin/acl/user'

export default {

  getUserInfo() {
    return request({
      url: `${api_name}/getUserInfo`,
      method: 'get'
    })
  },


  getPageList(page, limit, searchObj) {
    return request({
      url: `${api_name}/${page}/${limit}`,
      method: 'get',
      params: searchObj // url查询字符串或表单键值对
    })
  },
  getById(id) {
    return request({
      url: `${api_name}/get/${id}`,
      method: 'get'
    })
  },

  save(user) {
    return request({
      url: `${api_name}/save`,
      method: 'post',
      data: user
    })
  },

  updateById(user) {
    return request({
      url: `${api_name}/update`,
      method: 'put',
      data: user
    })
  },

  getAssign(userId) {
    return request({
      url: `${api_name}/getRole/${userId}`,
      method: 'get'
    })
  },
  saveAssign(userId, roleIds) {
    return request({
      url: `${api_name}/setRole`,
      method: 'post',
      params: {userId, roleIds}
    })
  },
  removeById(id) {
    return request({
      url: `${api_name}/remove/${id}`,
      method: 'delete'
    })
  },
  removeRows(idList) {
    return request({
      url: `${api_name}/batchRemove`,
      method: 'delete',
      data: idList
    })
  }
}
