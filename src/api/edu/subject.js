import request from '@/utils/request'

export default {

    //1、课程分类列表
    getSubjectList() {
        return request({
            url: '/eduservice/subject/getAllSubject',
            method: 'get'
        })
    },

    // 2、根据一级分类id添加二级分类
    addTwoLevel(id, subject) {
        return request({
            url: '/eduservice/subject/addTwoLevel/' + id,
            method: 'post',
            data: subject
        })
    },

    // 3、添加一级分类
    addOneLevel(subject) {
        return request({
            url: '/eduservice/subject/addOneLevel',
            method: 'post',
            data: subject
        })
    },


    // 4、一个方法替换2和3
    addSubject(id, subject) {
        return request({
            url: '/eduservice/subject/addSubject/' + id,
            method: 'post',
            data: subject
        })
    },


    // 5、删除二级分类
    deleteSubject(id) {
        return request({
            url: '/eduservice/subject/deleteSubject/' + id,
            method: 'delete',
        })
    },

    //6、删除一级分类和其下二级分类
    deleteAllSubject(id) {
        return request({
            url: '/eduservice/subject/deleteAllSubject/' + id,
            method: 'delete',
        })
    },

    // 7、根据id修改分类
    updateSubject(id, subject) {
        return request({
            url: '/eduservice/subject/updateSubject/' + id,
            method: 'post',
            data: subject
        })
    }

}