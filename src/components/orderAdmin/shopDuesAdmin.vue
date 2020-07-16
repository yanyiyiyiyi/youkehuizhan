<template>
	<div class="main">
		<div class="bread-crumbs columnCenterStart">
			<el-breadcrumb separator-class="el-icon-arrow-right">
			  <el-breadcrumb-item>订单管理/商铺会费</el-breadcrumb-item>
			</el-breadcrumb>
			<div class="now-position">所在位置：商铺会费</div>
		</div>
		<div class="table-area">
			<div class="search-area rowBetweenCenter">
				<!-- <div class="rowStartCenter search-input-area">
					<span class="input-tip">订单编号：</span>
					<el-input v-model="searchForm.nickName" clearable class="search-input"></el-input>
					<span class="input-tip">联系人：</span>
					<el-input v-model="searchForm.phone" clearable class="search-input"></el-input>
					<span class="input-tip">交易号：</span>
					<el-input v-model="searchForm.phone" clearable class="search-input"></el-input>
					<span class="input-tip">电话：</span>
					<el-input v-model="searchForm.phone" clearable class="search-input"></el-input>
				</div>
				<div class="btn-area">
					<el-button type="primary" @click="getTable">搜索</el-button>
				</div> -->
			</div>
			<el-table 
			 :data="tableData" 
			 border 
			 class="my-table"
			 :header-cell-style="{background:'#F5F6FA',color:'#000',fontWeight:'bold'}">
				<el-table-column type="index" :index="indexMethod" label="序号" width="100" align="center">
				</el-table-column>
				<el-table-column label="订单编号" prop="shopsFeeNo" align="center" :show-overflow-tooltip="true"></el-table-column>
				<el-table-column label="行业" align="center" :show-overflow-tooltip="true">
					<template slot-scope="scope">
						<span v-if="scope.row.shopsRelIndustryList!=null" v-for="item in scope.row.shopsRelIndustryList">{{item.industryName}}</span>
					</template>
				</el-table-column>
				<el-table-column label="公司名" align="center" :show-overflow-tooltip="true">
					<template slot-scope="scope">
						<span v-if="scope.row.shops!=null">{{scope.row.shops.company}}</span>
					</template>
				</el-table-column>
				<el-table-column label="手机号" align="center" :show-overflow-tooltip="true">
					<template slot-scope="scope">
						<span v-if="scope.row.shops!=null">{{scope.row.shops.contactsPhone}}</span>
					</template>
				</el-table-column>
				<el-table-column label="联系人" align="center">
					<template slot-scope="scope">
						<span v-if="scope.row.shops!=null">{{scope.row.shops.contacts}}</span>
					</template>
				</el-table-column>
				<el-table-column label="金额" prop="totalPrice" align="center"></el-table-column>
				<el-table-column label="订单创建时间" prop="createTime " align="center" :show-overflow-tooltip="true"></el-table-column>
				<el-table-column label="支付时间" prop="updateTime" align="center"></el-table-column>
				<el-table-column label="支付状态" prop="feePayStatus " align="center">
					<template slot-scope="scope">
						<span v-if="scope.row.feePayStatus  == 0">未支付</span>
						<span v-else-if="scope.row.feePayStatus  == 1">已支付</span>
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
				shopsId: this.$store.state.userDetail.shops
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
				let apiurl = this.api.listShopsFeeOrderpangingByShopsId + '?page=' + this.page + '&length=' + this.length+'&shopsId='+this.shopsId;
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
			
		}
	}
</script>

<style scoped>
	.user-dialog{
		width: 60%;
		margin: 0 auto;
	}
</style>
