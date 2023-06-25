import request from '@/utils/request'

export default {
  //生成数据
  createStaData(day) {
    return request({
      url: `/staservice/sta/staCount/${day}`,
      method: 'post'
    })
  },
  //获取统计数据
  getDataSta(searchObj) {
    const {type, begin, end} = searchObj;
    return request({
      // url: `/staservice/sta/showData/${searchObj.type}/${searchObj.begin}/${searchObj.end}`,
      url: `/staservice/sta/showData/${type}/${begin}/${end}`,
      method: 'get'
    })
  },

  //获得当天统计数据
  getCountData() {
    return request({
      url: `/staservice/sta/getCountData`,
      method: 'get'
    })
  },


  //查询前8条热门教师
  getHotTeacher() {
    return request({
      url: `/eduservice/teacher/hotTeacher`,
      method: 'get'
    })
  },

  //查询最近上架的5个课程
  getRecentCourse() {
    return request({
      url: `/eduservice/course/getRecentCourse`,
      method: 'get'
    })
  },

  //查询最近注册的8个用户
  getRecentUser() {
    return request({
      url: `/educenter/member/getRecentMember`,
      method: 'get'
    })
  }


}
