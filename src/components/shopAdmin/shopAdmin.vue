<template>
	<div class="main">
		<div class="bread-crumbs columnCenterStart">
			<el-breadcrumb separator-class="el-icon-arrow-right">
			  <el-breadcrumb-item>店铺管理</el-breadcrumb-item>
			</el-breadcrumb>
			<div class="now-position">所在位置：店铺管理</div>
		</div>
		<div class="table-area">
			<div class="search-area rowBetweenCenter">
				<div class="rowStartCenter search-input-area">
					<span class="input-tip">店铺名字：</span>
					<el-input v-model="searchForm.nickName" clearable class="search-input"></el-input>
					<span class="input-tip">联系人：</span>
					<el-input v-model="searchForm.phone" clearable class="search-input"></el-input>
					<span class="input-tip">行业：</span>
					<el-input v-model="searchForm.phone" clearable class="search-input"></el-input>
					<span class="input-tip">电话：</span>
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
				<el-table-column label="店铺名字" prop="company" align="center" :show-overflow-tooltip="true"></el-table-column>
				<!-- <el-table-column label="店铺logo" align="center">
					<template slot-scope="scope">
						<image :src="scope.row.avatarUrl" style="width:2.4rem;height:2.4rem"></image>
					</template>
				</el-table-column> -->
				<el-table-column label="联系人" prop="contacts " align="center"></el-table-column>
				<el-table-column label="行业" align="center" :show-overflow-tooltip="true">
					<template slot-scope="scope">
						<span v-if="scope.row.industryList!=null" v-for="item in scope.row.industryList">{{item.industryName}}</span>
					</template>
				</el-table-column>
				<el-table-column label="电话" prop="contactsPhone" align="center"></el-table-column>
				<el-table-column label="店铺认证" prop="authStatus" align="center">
					<template slot-scope="scope">
						<span v-if="scope.row.authStatus == 0">待认证</span>
						<span v-else-if="scope.row.authStatus == 1">认证成功</span>
						<span v-else-if="scope.row.authStatus == 2">认证失败</span>
					</template>
				</el-table-column>
				<el-table-column label="会费" prop="memberFeeStatus " align="center">
					<template slot-scope="scope">
						<span v-if="scope.row.memberFeeStatus  == 0">未交</span>
						<span v-else-if="scope.row.memberFeeStatus  == 1">已交</span>
					</template>
				</el-table-column>
				<el-table-column label="店铺状态" prop="shopsStatus " align="center">
					<template slot-scope="scope">
						<span v-if="scope.row.shopsStatus  == 0">停店</span>
						<span v-else-if="scope.row.shopsStatus  == 1">正常运营</span>
					</template>
				</el-table-column>
				<el-table-column label="操作" align="center" min-width="120px">
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
							<span @click="setTable(scope.$index, scope.row, '1')" class="text-red">通过</span>
						</el-button>
						<el-button
							 v-if="scope.row.backUserSign!='1'"
							type="text"
							size="mini">
							<span @click="setTable(scope.$index, scope.row, '2')" class="text-gray">拒绝</span>
						</el-button>
					</template>
				</el-table-column>
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
				let apiurl = this.api.listBackShops + '?page=' + this.page + '&length=' + this.length;
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
			// 查看table详情
			viewTable(index, row) {
				console.log(index, row);
				this.$router.push({path: 'shopAdminDesc', query: {shopId: row.id,userId: row.userId}})
			},
			// 认证修改
			setTable(index, row, type) {
				let apiurl = this.api.shopsAuthAndUpdate;
				let shops = {
					id: row.id,
					authStatus: type
				}
				this.common.postAxios(apiurl, shops, this.returnSet)
			},
			returnSet(res) {
				if(res.data.status) {
					this.$message({
						type: 'success',
						message: '操作成功'
					});
          this.initTable();
				} else {
					this.$message.error(res.data.msg);
				}
			}
			
		}
	}
</script>

<style scoped>
	.user-dialog{
		width: 60%;
		margin: 0 auto;
	}
</style>
