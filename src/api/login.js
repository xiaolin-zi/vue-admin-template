import request from '@/utils/request'

// 登录
export function login(user) {
  // debugger
  const { username, password } = user
  console.log("username:"+username)
  console.log("password:"+password)
  return request({
    url: '/admin/acl/login',
    method: 'post',
    data: {
      "username":username,
      "password":password
    }
  })
}

// export function getInfo(token) {
//     return request({
//         url: '/eduservice/user/info',
//         method: 'post',
//         params: { token }
//     })
// }

// 获取用户信息
export function getInfo(token) {
  return request({
    url: '/admin/acl/index/info',
    method: 'get',
    params: { token }
  })
}

// 登出
export function logout() {
  //debugger
  return request({
    url: '/admin/acl/logout',
    method: 'post'
  })
}
