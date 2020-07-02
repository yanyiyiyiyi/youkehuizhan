<template>
	<div class="main">
		<div class="bread-crumbs columnCenterStart">
			<el-breadcrumb separator-class="el-icon-arrow-right">
			  <el-breadcrumb-item>用户管理</el-breadcrumb-item>
			</el-breadcrumb>
			<div class="now-position">所在位置：用户管理</div>
		</div>
		<div class="table-area">
			<div class="search-area rowBetweenCenter">
				<div class="rowStartCenter search-input-area">
					<span class="input-tip">用户昵称：</span>
					<el-input v-model="searchForm.nickName" clearable class="search-input"></el-input>
					<span class="input-tip">用户手机号：</span>
					<el-input v-model="searchForm.phone" clearable class="search-input"></el-input>
				</div>
				<div class="btn-area">
					<el-button type="primary" @click="getTable">搜索</el-button>
				</div>
			</div>
			<el-table 
			 :data="tableData" 
			 border 
			 class="my-table"
			 :header-cell-style="{background:'#F5F6FA',color:'#000',fontWeight:'bold'}">
				<el-table-column type="index" :index="indexMethod" label="序号" width="100" align="center">
				</el-table-column>
				<el-table-column label="用户昵称" prop="nickName" align="center"></el-table-column>
				<el-table-column label="用户名" prop="backgroudUserName" align="center"></el-table-column>
				<el-table-column label="用户手机号" prop="phone" align="center"></el-table-column>
				<el-table-column label="角色" prop="role" align="center"></el-table-column>
				<el-table-column label="角色描述" prop="roleDescribes" align="center"></el-table-column>
				<el-table-column label="创建时间" prop="createTime" align="center"></el-table-column>
				<!-- <el-table-column label="操作" align="center">
					<template slot-scope="scope">
						<el-button
							type="text"
							size="mini">
							<span @click="viewTable(scope.$index, scope.row)" class="text-black">详情</span>
						</el-button>
						<el-button
							 v-if="scope.row.backUserSign!='1'"
							type="text"
							size="mini">
							<span @click="setTable(scope.$index, scope.row)" class="text-red">设为后台用户</span>
							</el-button>
					</template>
				</el-table-column> -->
			</el-table>
			<div class="block rowEndCenter">
			  <el-pagination
			    layout="prev, pager, next"
			    :total="total"
					@current-change="handleCurrentChange">
			  </el-pagination>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				page: 1,
				length: 10,
				total: 0,
				tableData: [],
				// 搜索form
				searchForm: {
					nickName: '',
					phone: ''
				},
				// 弹窗中表单
				dialogForm: {
					username: '',
					password: ''
				},
				dialogFormRules: {
					username: [
						{ required: true, message: '请输入用户名', trigger: 'blur' },
					],
					password: [
						{ required: true, message: '请输入密码', trigger: 'blur' },
					],
				},
				formLabelWidth: '80px',
				dialogFormVisible: false, //false
			}
		},
		mounted() {
			this.initTable();
		},
		methods: {
			// 序号设置
			indexMethod(index) {
			  return (this.page - 1) * 10 + index + 1;
			},
			// 初始化table信息
			initTable() {
				this.page = 1;
				this.getTable();
			},
			// 获取table信息
			getTable() {
				let apiurl = this.api.listBackGroudUserPaging + '/' + this.page + '/' + this.length;
				// if(this.searchForm.nickName != '') {
				// 	apiurl += '&nickName=' + this.searchForm.nickName;
				// }
				// if(this.searchForm.phone != '') {
				// 	apiurl += '&phone=' + this.searchForm.phone;
				// }
				this.common.getAxios(apiurl, this.returnTable);
			},
			// table信息返回
			returnTable(res) {
				this.tableData = res.data.data.records;
				this.total = res.data.data.total;
			},
			handleCurrentChange(val) {
				this.page = val;
				this.getTable();
			},
			
		}
	}
</script>

<style scoped>
	.user-dialog{
		width: 60%;
		margin: 0 auto;
	}
</style>
