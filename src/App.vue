<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
	body,
	html,
	#app,
	.main-container{
		height: 100%!important;
		margin: 0 !important;
		padding: 0!important;
		font-size: 62.5%;
		background: #F0F2F5!important;
	}
/* #app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
} */
.el-main{
	padding-top: 1.5rem;
	padding-bottom: 1.5rem;
}
.main{
	width: 100%;
	height: 100%;
	margin: 0 auto;
}
.bread-crumbs{
	width: calc(100% - 1.85rem);
	height: 7rem;
	background: #fff;
	border-radius: 0.2rem;
}
.table-area{
	width: calc(100% - 4rem);
	min-height: calc(100% - 12.5rem);
	background: #fff;
	margin: 1.5rem 0 0;
	padding: 2rem;
	border-radius: 0.2rem;
}
.bread-crumbs{
	padding-left: 1.85rem;
}
.now-position{
	font-size: 1.4rem;
	margin-top: 0.8rem;
}
.el-breadcrumb{
	font-size: 1.2rem;
}
.el-breadcrumb__item:last-child .el-breadcrumb__inner{
	color: #999999;
}

/* 表单 */
	.el-form-item__content{
		line-height: 3rem;
	}
	.el-input{
		font-size: 1.2rem;
	}
	/* 搜索区域 */
	.search-area .el-input{
		width: auto;
	}
	.search-input-area{
		width: 90%;
	}
	.dialogForm .el-input{
		/* width: 100%; */
	}
	.el-input .el-input__icon{
		line-height: 3rem;
	}
	.el-form-item__label{
		line-height: 3rem;
		font-size: 1.2rem;
	}
	.el-form-item{
		margin-bottom: 1.8rem;
	}
	.el-dialog__footer{
		text-align: center;
	}
	.el-select-dropdown__item{
		height: 3rem;
		line-height: 3rem;
	}
	.el-input__inner{
		height: 3rem;
		line-height: 3rem;
	}
	.input-tip{
		font-size: 1.2rem;
		color: #333;
		min-width: 7rem;
		/* margin-left: 2rem; */
	}
	.search-input{
		margin-right: 2rem;
	}
	.el-date-editor .el-range__icon {
		line-height: 2.4rem;
	}
	.el-date-editor .el-range-separator {
		line-height: 2.4rem;
	}
	.el-date-editor .el-range__close-icon {
		line-height: 2.4rem;
	}
	/* .el-select{
		width: 100%;
	} */
	/* 按钮 */
	.el-button{
		padding: 0.9rem 2rem;
		font-size: 1.2rem;
	}
	.el-button--text{
		padding: 0.9rem 0;
	}
	/* 文字颜色 */
	.text-red{
		color: #F44A00;
	}
	.text-gray{
		color: #999999;
	}
	.text-black{
		color: #000;
	}
	/* 表格 */
	.my-table {
		width: 100%;
		margin: 2rem auto;
	}
	.el-table td {
		padding: 0.2rem 0;
	}
	.el-table th {
		padding: 0.6rem 0;
	}
	.my-wrap{
		flex-wrap: wrap;
	}
</style>
