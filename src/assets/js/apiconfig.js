// 配置API接口地址
var root = process.env.API_ROOT

export default({
	// 用户登录
	login: root + 'background/login',
	// 退出登录
	logout: root + 'background/logout',
	// 上传文件
	uplodFiles: root + 'upload/uplodFiles',
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
	// 查询维权list
	listMaintain: root + 'maintain/listMaintain',
	// 维权处理
	maintainHandle: root + 'maintain/maintainHandle',
	// 评分查询list
	listScore: root + 'score/listScore',
	// 新增评分
	insertScore: root + 'score/insertScore',
	// 修改评分
	updateScoreById: root + 'score/updateScoreById',
	// 删除评分
	deleteScoreById: root + 'score/deleteScoreById',
	// 协议查询list
	listAgreement: root + 'agreement/listAgreement',
	// 新增协议
	insertAgreement: root + 'agreement/insertAgreement',
	// 修改协议
	updateAgreementById: root + 'agreement/updateAgreementById',
	// 删除协议
	deleteAgreementById: root + 'agreement/deleteAgreementById',
	// 后台用户查询list
	listBackGroudUserPaging: root + 'backgroud/user/listBackGroudUserPaging',
	// 角色查询list
	listRole: root + 'backgroud/role/listRole',
	// 新增角色
	insertRole: root + 'backgroud/role/insertRole',
	// 修改角色
	updateRole: root + 'backgroud/role/updateRole',
	// 删除角色
	deleteRole: root + 'backgroud/role/deleteRole',
	// 菜单列表查询 1
	listMenuByRoleId: root + 'background/menu/listMenuByRoleId',
	// 新增角色和菜单列表关联
	insertRoleRelMenu: root + 'background/menu/insertRoleRelMenu',
	// 删除角色和菜单的关联
	deleteRoleRelMenu: root + 'background/menu/deleteRoleRelMenu',
	// 通过角色id查询当角色有那些菜单权限
	listUserMenuByRoleId: root + 'background/menu/listUserMenuByRoleId',
	// 查询日志list
	listLogsPaging: root + 'logs/listLogsPaging',
	// 查询商品list
	listBackProductsPagingById: root + 'products/listBackProductsPagingById',
	// 查询商品详情
	getBackProductsById: root + 'products/getBackProductsById',
	// 新增商品
	insertProducts: root + 'products/insertProducts',
	// 修改商品
	updateProducts: root +  'products/updateProducts',
	// 新增库存
	insertProductsStocks: root + 'products/insertProductsStocks',
	// 修改库存
	updateProductsStock: root + 'products/updateProductsStock',
	// 查询订单list
	listOrderPagingByShopsId: root + 'order/listOrderPagingByShopsId',
	// 修改订单状态 发货
	updateOrderStatus: root + 'order/updateOrderStatus',
	// 获取订单详情
	getOrderDetailById: root + 'order/getOrderDetailById',
})