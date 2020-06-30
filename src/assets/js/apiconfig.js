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
})