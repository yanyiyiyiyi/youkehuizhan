<template>
  <div class="main-container">
		<el-container>
		  <el-aside>
				<div class="web-info rowStartCenter">
					<div class="logo-img"></div>
					<p class="logo-tip">优客会展</p>
				</div>
				<el-menu
					default-active="1"
					class="el-menu-vertical-demo"
					active-text-color="#F44A00"
					:unique-opened="true">
					<template v-for="list in menuList">
						<el-submenu :index="list.id" v-if="list.childList != null">
							<template slot="title">
								<i :class="list.icon"></i>
								<span>{{list.title}}</span>
							</template>
							<el-menu-item-group>
								<el-menu-item :index="item.id" v-for="item in list.childList" @click="goPath(item.path)">{{item.title}}</el-menu-item>
								
							</el-menu-item-group>
						</el-submenu>
						<el-menu-item :index="list.id" v-else @click="goPath(list.path)">
							<i :class="list.icon"></i>
							<span slot="title">{{list.title}}</span>
						</el-menu-item>
					</template>
					
					
				</el-menu>
			</el-aside>
		  <el-container>
		    <el-header>
					<div class="rowEndCenter header-con">欢迎您，管理者</div>
				</el-header>
		    <el-main>
					<router-view/>
				</el-main>
		  </el-container>
		</el-container>
	</div>
</template>

<script>
export default {
  name: 'index',
  data () {
    return {
      menuList:  [
      {
        "id": '1',
        "title": "用户管理",
      	"path": "userAdmin",
        "icon": "el-icon-user",
        "childList": null
      },{
        "id": '2',
        "title": "店铺管理",
				"path": "shopAdmin",
        "icon": "el-icon-present",
        "childList": null
      },{
        "id": '3',
        "title": "订单管理",
        "icon": "el-icon-coin",
        "childList": [
          {
            "id": '3-1',
            "title": "商铺会费",
            "path": "shopDuesAdmin",
          },
					{
					  "id": '3-2',
					  "title": "用户订单",
					  "path": "userOrderAdmin",
					}
        ]
      },{
        "id": '4',
        "title": "商品管理",
        "icon": "el-icon-goods",
				"path": "goodsAdmin",
        "childList": null,
      },{
        "id": '5',
        "title": "分类管理",
        "icon": "el-icon-coin",
        "childList": [
          {
            "id": '5-1',
            "title": "行业分类",
            "path": "businessAdmin",
          },
					{
					  "id": '5-2',
					  "title": "banner",
					  "path": "bannerAdmin",
					},
					{
					  "id": '5-3',
					  "title": "商品属性",
					  "path": "attributesAdmin",
					}
        ]
      },{
        "id": '6',
        "title": "其他功能",
        "icon": "el-icon-coin",
        "childList": [
          {
            "id": '6-1',
            "title": "优惠券",
            "path": "couponAdmin",
          },
					{
					  "id": '6-2',
					  "title": "维权",
					  "path": "rightsProtection",
					},
					{
					  "id": '6-3',
					  "title": "退款",
					  "path": "refundAdmin",
					}
        ]
      }]
    }
  },
	methods: {
		goPath(path) {
			this.$router.push(path)
		}
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
	.el-container{
		height: 100%!important;
	}
	.el-aside{
		height: 100%!important;
		background: #fff;
		width: 20rem!important;
		box-shadow:0rem 0.1rem 1.9rem 0.2rem rgba(0, 0, 0, 0.1);
		z-index: 1;
	}
	.logo-img{
		width: 3.7rem;
		height: 3.7rem;
		background: #D7D7D7;
		margin: 1.2rem 1.5rem;
	}
	.logo-tip{
		font-size: 1.4rem;
		color: #333333;
		font-weight: bold;
		letter-spacing: 0.1rem;
	}
	.el-header{
		background: #fff;
	}
	.header-con{
		height: 100%;
	}
	
	.el-menu-item{
		padding-left: 3rem!important;
		text-align: left;
	}
	.el-submenu__title{
		padding-left: 3rem!important;
	}
	.el-submenu{
		padding-left: 0rem!important;
		text-align: left;
	}
	.el-menu-item-group .el-menu-item{
		text-align: center;
	}
	.el-menu{
		border-right: none;
	}
</style>
