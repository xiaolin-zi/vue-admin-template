import Cookies from 'js-cookie'

const TokenKey = 'vue_admin_template_token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  //设置cookie，过期时间半个小时
  return Cookies.set(TokenKey, token, {expires: 0.5/24})
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
