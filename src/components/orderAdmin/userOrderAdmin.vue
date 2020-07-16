<template>
	<div class="main">
		<div class="bread-crumbs columnCenterStart">
			<el-breadcrumb separator-class="el-icon-arrow-right">
			  <el-breadcrumb-item>订单管理/用户订单</el-breadcrumb-item>
			</el-breadcrumb>
			<div class="now-position">所在位置：用户订单</div>
		</div>
		<div class="table-area">
			<div class="search-area rowBetweenCenter">
				<div class="rowStartCenter search-input-area">
					<span class="input-tip">订单编号：</span>
					<el-input v-model="searchForm.orderNo" clearable class="search-input"></el-input>
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
				<el-table-column label="订单编号" prop="orderNo" align="center" :show-overflow-tooltip="true"></el-table-column>
				<el-table-column label="店铺名称" prop="orderNo" align="center" :show-overflow-tooltip="true">
					<template slot-scope="scope">
						<span v-if="scope.row.shops!=null">{{scope.row.shops.company}}</span>
					</template>
				</el-table-column>
				<el-table-column label="金额" align="center" :show-overflow-tooltip="true">
					<template slot-scope="scope">
						<span>{{scope.row.totalPrice}}元</span>
					</template>
				</el-table-column>
				<el-table-column label="订单状态" prop="feePayStatus " align="center">
					<template slot-scope="scope">
						<span v-if="scope.row.orderStatus  == 0">未付款</span>
						<span v-else-if="scope.row.orderStatus  == 1">待发货</span>
						<span v-else-if="scope.row.orderStatus  == 2">运送中</span>
						<span v-else-if="scope.row.orderStatus  == 3">待收货</span>
						<span v-else-if="scope.row.orderStatus  == 4">已完成</span>
						<span v-else-if="scope.row.orderStatus  == 5">退款审核</span>
						<span v-else-if="scope.row.orderStatus  == 6">退款中</span>
						<span v-else-if="scope.row.orderStatus  == 7">退款完成</span>
					</template>
				</el-table-column>
				<el-table-column label="支付状态" align="center">
					<template slot-scope="scope">
						<span v-if="scope.row.payStatus  == 0">未支付</span>
						<span v-else-if="scope.row.payStatus  == 1">已支付</span>
					</template>
				</el-table-column>
				<el-table-column label="订单创建时间" prop="createTime" align="center" :show-overflow-tooltip="true"></el-table-column>
				<el-table-column label="支付时间" prop="payTime" align="center" :show-overflow-tooltip="true"></el-table-column>
				<el-table-column label="发货时间" prop="sendTime" align="center" :show-overflow-tooltip="true"></el-table-column>
				<el-table-column fixed="right" label="操作" width="120" align="center">
					<template slot-scope="scope">
						<el-button
							type="text"
							size="small">
							<span class="text-red" v-if="scope.row.orderStatus == 1" @click="setTable(scope.$index,scope.row)">发货</span>
							<span class="text-gray" @click="viewTable(scope.$index,scope.row)">详情</span>
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
					orderNo: '',
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
				shopsId: this.$store.state.userDetail.shops.id,
			}
		},
		mounted() {
			this.initTable();
			// console.log(this.$store.state.userDetail)
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
				let apiurl = this.api.listOrderPagingByShopsId 
										+ '?page=' + this.page + '&length=' + this.length + '&shopsId=' + this.shopsId;
				if(this.searchForm.orderNo != '') {
					apiurl += '&orderNo=' + this.searchForm.orderNo;
				}
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
				this.$router.push({path: 'userOrderAdminDesc', query: {orderId: row.id}})
			},
			// 发货
			setTable(index, row) {
				let apiurl = this.api.updateOrderStatus;
				let data = {
					orderId: row.id,
					sendTime: this.moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
					operate: 2,
				}
				this.common.putAxios(apiurl, data, this.returnSet);
			},
			returnSet(res) {
				if(res.data.status) {
					this.$message.success('发货成功');
					this.getTable();
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
