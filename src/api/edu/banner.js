import request from '@/utils/request'
export default {

    //获取轮播图列表
    //current当前页，limit每页记录数，teacherQuery查询条件
    getBannerListPage(current, limit, bannerQuery) {
        return request({
            // url: '/table/list/'+current+"/"+limit,
            url: `/educms/banneradmin/pageBanner/${current}/${limit}`,
            method: 'post',
            //teacherQuery条件对象，后端使用@RequestBody获取数据
            //data表示把对象转换json进行传递到接口里面
            data: bannerQuery
        })
    },

    //删除讲师
    deleteBannerId(id) {
        return request({
            url: `/educms/banneradmin/remove/${id}`,
            method: 'delete'
        })
    },

    //添加讲师
    addBanner(banner) {
        return request({
            url: `/educms/banneradmin/addBanner/`,
            method: 'post',
            data: banner
        })
    },

    //根据id查找讲师
    getBannerInfo(id) {
        return request({
            url: `/educms/banneradmin/get/${id}`,
            method: 'get',
        })
    },

    //修改讲师
    updateBanner(banner) {
        return request({
            url: `/educms/banneradmin/updateBanner/`,
            method: 'post',
            data: banner
        })
    },
}