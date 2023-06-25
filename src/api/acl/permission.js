import request from '@/utils/request'

const api_name = '/admin/acl/permission'

export default {
  getNestedTreeList() {
    return request({
      url: `${api_name}`,
      method: 'get'
    })
  },
  removeById(id) {
    return request({
      url: `${api_name}/remove/${id}`,
      method: "delete"
    })
  },
  saveLevelOne(menu) {
    return request({
      url: `${api_name}/save`,
      method: "post",
      data: menu
    })
  },
  update(menu) {
    return request({
      url: `${api_name}/update`,
      method: "put",
      data: menu
    })
  },
  toAssign(roleId) {
    return request({
      url: `${api_name}/getPermission/${roleId}`,
      method: 'get'
    })
  },
  doAssign(roleId, permissionIds) {
    return request({
      url: `${api_name}/setPermission`,
      method: "post",
      params: {roleId, permissionIds}
    })
  }
}
