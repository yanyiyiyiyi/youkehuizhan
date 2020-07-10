<template>
	<div class="main">
		<div class="bread-crumbs columnCenterStart">
			<el-breadcrumb separator-class="el-icon-arrow-right">
			  <el-breadcrumb-item>其他功能/优惠券</el-breadcrumb-item>
			</el-breadcrumb>
			<div class="now-position">所在位置：优惠券</div>
		</div>
		<div class="table-area">
			<div class="search-area rowBetweenCenter">
				<div class="rowStartCenter search-input-area">
					<!-- <span class="input-tip">创建时间：</span>
					<el-input v-model="searchForm.nickName" clearable class="search-input"></el-input> -->
				</div>
				<div class="btn-area rowBetweenCenter">
					<el-button type="primary" @click="addTable">新增</el-button>
					<!-- <el-button type="primary" @click="getTable" plain>搜索</el-button> -->
				</div>
			</div>
			<el-table 
			 :data="tableData" 
			 border 
			 class="my-table"
			 :header-cell-style="{background:'#F5F6FA',color:'#000',fontWeight:'bold'}">
				<el-table-column type="index" :index="indexMethod" label="序号" width="100" align="center">
				</el-table-column>
				<el-table-column label="优惠券描述" prop="couponDescribe" align="center" :show-overflow-tooltip="true"></el-table-column>
				<el-table-column label="开始时间" prop="startTime" align="center"></el-table-column>
				<el-table-column label="结束时间" prop="endTime" align="center"></el-table-column>
				<el-table-column label="数量" prop="number" align="center"></el-table-column>
				<el-table-column label="满" prop="useStart" align="center"></el-table-column>
				<el-table-column label="减" prop="useEnd" align="center"></el-table-column>
				<el-table-column label="创建时间" prop="createTime" align="center" :show-overflow-tooltip="true"></el-table-column>
				<el-table-column label="操作" align="center" min-width="120px">
					<template slot-scope="scope">
						<el-button
							type="text"
							size="mini">
							<span @click="viewTable(scope.$index, scope.row)" class="text-black">编辑</span>
						</el-button>
						<!-- <el-button
							 v-if="scope.row.backUserSign!='1'"
							type="text"
							size="mini">
							<span @click="delTable(scope.$index, scope.row, '1')" class="text-red">删除</span>
						</el-button> -->
					</template>
				</el-table-column>
			</el-table>
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
				formLabelWidth: '80px',
				dialogFormVisible: false, //false
			}
		},
		mounted() {
			this.getTable();
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
				let apiurl = this.api.selectCoupon+'?page='+this.page+'&length='+this.length;
				this.common.getAxios(apiurl, this.returnTable);
			},
			// table信息返回
			returnTable(res) {
				this.tableData = res.data.data;
				// this.total = res.data.data.total;
			},
			handleCurrentChange(val) {
				this.page = val;
				this.getTable();
			},
			// 查看table详情并编辑
			viewTable(index, row) {
				console.log(index, row);
				this.$router.push({name: 'couponAdminDesc', params: {
					descType: 'edit',
					id: row.id,
				}})
			},
			addTable() {
				this.$router.push({name: 'couponAdminDesc', params: {descType: 'add'}})
			},
			// 删除table
			delTable(index, row) {
				let _this = this;
				this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					let apiurl = this.api.deleteBannerById;
					let banner = {
						id: row.id
					}
					this.common.deleteAxios(apiurl, {data: banner}, this.returnDel);
				}).catch(() => {
					_this.$message({
						type: 'info',
						message: '已取消删除'
					});          
				});
			},
			returnDel(res) {
				if(res.data.status) {
					this.$message({
						type: 'success',
						message: '删除成功'
					});
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
