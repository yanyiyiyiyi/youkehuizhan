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
						<el-submenu :index="list.index" v-if="list.childList != null">
							<template slot="title">
								<i :class="list.icon"></i>
								<span>{{list.title}}</span>
							</template>
							<el-menu-item-group>
								<el-menu-item :index="item.index" v-for="item in list.childList" @click="goPath(item.path)">{{item.title}}</el-menu-item>
								
							</el-menu-item-group>
						</el-submenu>
						<el-menu-item :index="list.index" v-else @click="goPath(list.path)">
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
      menuList:  []
    }
  },
	created() {
		this.getMenuList();
	},
	methods: {
		// 获取菜单列表
		getMenuList() {
			let apiurl = this.api.listMenuByRoleId+'/1';
			this.common.getAxios(apiurl, this.returnMenuList);
		},
		returnMenuList(res) {
			if(res.data.status) {
				this.menuList = res.data.data.menu;
			} else {
				this.$message.error(res.data.msg);
			}
		},
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
