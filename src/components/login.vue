<template>
  <div class="login-area">
		<div class="login-form">
			<div class="login-form-area">
				<p class="login-form-title">优客会展后台管理平台</p>
				<el-input class='login-input' prefix-icon="el-icon-user" placeholder="用户名" v-model="form.username"></el-input>
				<el-input show-password class='login-input' prefix-icon="el-icon-key" placeholder="密码" v-model="form.password"></el-input>
				
				<div class="rowCenterCenter">
					<el-button type="primary" class="login-btn" size="medium" @click="goIndex">登录</el-button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
  name: 'login',
  data () {
    return {
      form: {
				username: '',
				password: ''
			}
    }
  },
	methods: {
		goIndex() {
			let apiurl = this.api.login;
			let login = this.form;
			this.common.postAxios(apiurl, login, this.returnLogin);
		},
		returnLogin(res) {
			if(res.data.status) {
				this.$store.commit("setUserDetail",res.data.data);
				localStorage.setItem("userDetail", JSON.stringify(res.data.data));
				this.$router.push('index')
			} else {
				this.$message.error(res.data.msg);
			}
		}
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.login-area{
		background-image: url(../assets/img/login-bg.jpg);
		width: 100%;
		height: 100%;
		background-size: cover;
		border: 0.01rem solid transparent
	}
	.login-form{
		width: 50.7rem;
		height: 30rem;
		margin: 12rem auto 0;
		background: #fff;
		padding: 5rem 0;
	}
	.login-form-title{
		font-size: 1.8rem;
		color: #333;
		font-weight: bold;
		text-align: left;
	}
	.login-form-area{
		width: 65%;
		margin: 0 auto;
	}
	.login-input >>> .el-input__inner{
		border-radius: 0;
		border-top-width: 0;
		border-right-width: 0;
		border-left-width: 0;
	}
	.login-input{
		margin-top: 3rem;
		width: 100%;
	}
	.login-btn{
		margin-top: 7.5rem;
	}
</style>
