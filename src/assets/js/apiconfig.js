// 配置API接口地址
var root = process.env.API_ROOT

export default({
	// 获取用户列表
	listUser: root + 'user/listUser',
	// 根据id获取用户详情
	getUserById: root + 'user/getUserById',
	// 将前台用户设置为后台用户
	insertBackgroudUser: root + 'backgroud/user/insertBackgroudUser',
	// 后台分页查询店铺列表
	listBackShops: root + 'shops/listBackShops',
	// 店铺详情
	getBackShopsInfo: root + 'shops/getBackShopsInfo',
	// 商铺认证/与修改
	shopsAuthAndUpdate: root + 'shops/shopsAuthAndUpdate',
	// 查询会费订单列表
	listShopsFeeOrderpangingByShopsId: root + 'shops/listShopsFeeOrderpangingByShopsId',
	// 查询行业
	listIndustry: root + 'category/listIndustry',
	// 新增行业分类
	insertIndustry: root + 'category/insertIndustry',
	// 编辑行业分类
	updateIndustryById: root + 'category/updateIndustryById',
	// 删除行业分类
	deleteIndustryById: root + 'category/deleteIndustryById',
	// 查询banner列表
	listBanner: root + 'banner/listBanner',
	// 修改banner
	updateBannerById: root + 'banner/updateBannerById',
	// 删除banner
	deleteBannerById: root + 'banner/deleteBannerById',
	// 新增banner
	insertBanner: root + 'banner/insertBanner',
	// 上传文件
	uplodFiles: root + 'upload/uplodFiles',
	// 查询属性list
	getAttribute: root + 'category/getAttribute',
	// 新增属性
	insertAttribute: root + 'category/insertAttribute',
	// 删除属性
	deleteAttribure: root + 'category/deleteAttribure',
	// 修改属性
	updateAttribute: root + 'category/updateAttribute',
	// 查询优惠券list
	selectCoupon: root + 'selectCoupon',
	// 新增优惠券
	insertCoupon: root + 'insertCoupon',
	// 删除优惠券
	// 修改优惠券
	updateConponById: root +  'updateConponById',
	// 查看优惠券用id
	selectCouponById: root + 'selectCouponById',
})