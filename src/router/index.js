import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login' //登录
import index from '@/components/index' //首页
import userAdmin from '@/components/userAdmin/userAdmin' //用户管理-用户管理
import userAdminDesc from '@/components/userAdmin/userAdminDesc' //用户管理-用户管理-用户详情
import shopAdmin from '@/components/shopAdmin/shopAdmin' //店铺管理-店铺管理
import shopAdminDesc from '@/components/shopAdmin/shopAdminDesc' //店铺管理-店铺管理-店铺详情
import shopDuesAdmin from '@/components/orderAdmin/shopDuesAdmin' //订单管理-商铺会费
import userOrderAdmin from '@/components/orderAdmin/userOrderAdmin' //订单管理-用户订单
import goodsAdmin from '@/components/goodsAdmin/goodsAdmin' //商品管理-商品管理
import industryAdmin from '@/components/sortAdmin/industryAdmin' //分类管理-行业分类
import bannerAdmin from '@/components/sortAdmin/bannerAdmin' //分类管理-banner
import bannerAdminDesc from '@/components/sortAdmin/bannerAdminDesc' //分类管理-banner-banner详情
import attributesAdmin from '@/components/sortAdmin/attributesAdmin' //分类管理-商品属性
import couponAdmin from '@/components/otherAdmin/couponAdmin' //其他功能-优惠券 
import couponAdminDesc from '@/components/otherAdmin/couponAdminDesc' //其他功能-优惠券-详情
import rightsProtection from '@/components/otherAdmin/rightsProtection' //其他功能-维权 
import refundAdmin from '@/components/otherAdmin/refundAdmin' //其他功能-退款 
import scoreAdmin from '@/components/otherAdmin/scoreAdmin' //其他功能-退款 
import agreementAdmin from '@/components/otherAdmin/agreementAdmin' //其他功能-退款 
import authorityAdmin from '@/components/authorityAdmin/authorityAdmin' //权限管理-权限管理
import roleAdmin from '@/components/authorityAdmin/roleAdmin' //权限管理-角色管理
import logAdmin from '@/components/authorityAdmin/logAdmin' //权限管理-日志管理
import backgroundUserAdmin from '@/components/authorityAdmin/backgroundUserAdmin' //权限管理-后台用户


Vue.use(Router)

export default new Router({
  routes: [
		{
		  path: '/',
		  name: 'login',
		  component: login,
			meta: {
				title: '登录'
			}
		},{
		  path: '/index',
		  name: 'index',
			redirect: 'index/userAdmin',
		  component: index,
			meta: {
				title: '首页'
			},
			children: [{
				path: 'userAdmin',
				component: userAdmin,
				meta: {
					title: '用户管理'
				}
			},{
				path: 'userAdminDesc',
				component: userAdminDesc,
				meta: {
					title: '用户详情'
				}
			},{
				path: 'shopAdmin',
				component: shopAdmin,
				meta: {
					title: '店铺管理'
				}
			},{
				path: 'shopAdminDesc',
				component: shopAdminDesc,
				meta: {
					title: '店铺详情'
				}
			},{
				path: 'shopDuesAdmin',
				component: shopDuesAdmin,
				meta: {
					title: '商铺会费'
				}
			},{
				path: 'userOrderAdmin',
				component: userOrderAdmin,
				meta: {
					title: '用户订单'
				}
			},{
				path: 'goodsAdmin',
				component: goodsAdmin,
				meta: {
					title: '商品管理'
				}
			},{
				path: 'industryAdmin',
				component: industryAdmin,
				meta: {
					title: '行业分类'
				}
			},{
				path: 'bannerAdmin',
				component: bannerAdmin,
				meta: {
					title: 'banner'
				}
			},{
				path: 'bannerAdminDesc',
				name: 'bannerAdminDesc',
				component: bannerAdminDesc,
				meta: {
					title: 'banner详情'
				}
			},{
				path: 'attributesAdmin',
				component: attributesAdmin,
				meta: {
					title: '商品属性'
				}
			},{
				path: 'couponAdmin',
				component: couponAdmin,
				meta: {
					title: '优惠券'
				}
			},{
				path: 'couponAdminDesc',
				name: 'couponAdminDesc',
				component: couponAdminDesc,
				meta: {
					title: '优惠券详情'
				}
			},{
				path: 'rightsProtection',
				component: rightsProtection,
				meta: {
					title: '维权'
				}
			},{
				path: 'refundAdmin',
				component: refundAdmin,
				meta: {
					title: '退款'
				}
			},{
				path: 'agreementAdmin',
				component: agreementAdmin,
				meta: {
					title: '协议'
				}
			},{
				path: 'scoreAdmin',
				component: scoreAdmin,
				meta: {
					title: '评分管理'
				}
			},{
				path: 'authorityAdmin',
				component: authorityAdmin,
				meta: {
					title: '权限管理'
				}
			},{
				path: 'roleAdmin',
				component: roleAdmin,
				meta: {
					title: '角色管理'
				}
			},{
				path: 'logAdmin',
				component: logAdmin,
				meta: {
					title: '日志管理'
				}
			},{
				path: 'backgroundUserAdmin',
				component: backgroundUserAdmin,
				meta: {
					title: '后台用户'
				}
			}]
		},
    
  ]
})
