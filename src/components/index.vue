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
					<div class="rowEndCenter header-con">
						<el-dropdown @command="handleCommand">
							<span>欢迎您，{{this.$store.state.userDetail.nickName}}</span>
							<el-dropdown-menu slot="dropdown">
								<el-dropdown-item command="a">退出登录</el-dropdown-item>
							</el-dropdown-menu>
						</el-dropdown>
					</div>
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
		this.getUserDetail();
	},
	methods: {
		getUserDetail(){
			if(localStorage.getItem("userDetail")){
				var userDetail=JSON.parse(localStorage.getItem("userDetail"));
				this.$store.commit("setUserDetail",userDetail);
				this.getMenuList();
			}else{
				this.$router.push("/")
			}
		},
		// 获取菜单列表
		getMenuList() {
			let apiurl = this.api.listMenuByRoleId+'/'+this.$store.state.userDetail.roleId;
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
		},
		// 退出登录
		handleCommand(command) {
			let _this = this;
			let apiurl = this.api.logout;
			this.common.postAxios(apiurl, {}, returnLogout);
			function returnLogout(res) {
				if(res.data.status) {
					localStorage.clear();
					var userDetail = {};
					_this.$store.commit("setUserDetail",userDetail);
					_this.$router.push("/");
				} else {
					_this.$message.error(res.data.msg);
				}
			}
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
