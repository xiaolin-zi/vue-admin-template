import request from '@/utils/request'
export default {

  //获取订单列表
  getOrderList(page,limit,searchObj) {
    return request({
      url: `/eduorder/order/pageOrderCondition/${page}/${limit}`,
      method: 'post',
      data: searchObj
    })
  },

  //删除订单
  deleteOrder(orderNo) {
    return request({
      url: `/eduorder/order/deleteOrder/${orderNo}`,
      method: 'delete'
    })
  },

  //更新订单
  updateOrder(order) {
    return request({
      url: `/eduorder/order/updateOrder`,
      method: 'post',
      data: order
    })
  }
}
