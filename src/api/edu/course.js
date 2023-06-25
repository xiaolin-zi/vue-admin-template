import request from '@/utils/request'
export default {
    //添加课程信息
    addCourseInfo(courseInfo) {
        return request({
            url: '/eduservice/course/addCourseInfo',
            method: 'post',
            data: courseInfo
        })
    },

    //查询所有讲师
    getTeacherList() {
        return request({
            url: '/eduservice/teacher/findAll',
            method: 'get'
        })
    },

    //根据课程id查询课程基本信息
    getCourseInfoById(id) {
        return request({
            url: '/eduservice/course/getCourseInfo/' + id,
            method: 'get'
        })
    },

    //修改课程信息
    updateCourseInfo(courseInfo) {
        return request({
            url: '/eduservice/course/updateCourseInfo',
            method: 'post',
            data: courseInfo
        })
    },

    //课程确认信息显示
    getPublishCourseInfo(id) {
        return request({
            url: '/eduservice/course/getPublishCourseInfo/' + id,
            method: 'get'
        })
    },

    //课程最终发布
    publishCourse(id) {
        return request({
            url: '/eduservice/course/publishCourse/' + id,
            method: 'post'
        })
    },


    //按条件分页查询课程信息
    getCourseListPage(current, limit, courseQuery) {
        return request({
            url: `/eduservice/course/pageCourseCondition/${current}/${limit}`,
            method: 'post',
            data: courseQuery
        })
    },

    //根据课程id删除课程信息
    deleteCourseById(id) {
        return request({
            url: `/eduservice/course/${id}`,
            method: 'delete'
        })
    },


  //更新课程状态
  updateCourseStatus(id, status) {
    return request({
      url: `/eduservice/course/updateCourseStatus/${id}/${status}`,
      method: 'put'
    })
  }



}
