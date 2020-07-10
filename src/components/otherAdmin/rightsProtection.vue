<template>
	<div class="main">
		<div class="bread-crumbs columnCenterStart">
			<el-breadcrumb separator-class="el-icon-arrow-right">
			  <el-breadcrumb-item>维权</el-breadcrumb-item>
			</el-breadcrumb>
			<div class="now-position">所在位置：维权</div>
		</div>
		<div class="table-area">
			<div class="search-area rowBetweenCenter">
				<!-- <div class="rowStartCenter search-input-area">
					<span class="input-tip">订单编号：</span>
					<el-input v-model="searchForm.nickName" clearable class="search-input"></el-input>
					<span class="input-tip">发起人昵称：</span>
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
				<el-table-column label="订单编号" prop="orderNO" align="center" :show-overflow-tooltip="true"></el-table-column>
				<el-table-column label="发起人昵称" prop="nickName" align="center" :show-overflow-tooltip="true"></el-table-column>
				<el-table-column label="用户手机号" prop="phone" align="center" :show-overflow-tooltip="true"></el-table-column>
				<el-table-column label="店铺" prop="shopsName" align="center" :show-overflow-tooltip="true"></el-table-column>
				<el-table-column label="原因" prop="reson" align="center" :show-overflow-tooltip="true"></el-table-column>
				<el-table-column label="处理结果" prop="end" align="center" :show-overflow-tooltip="true"></el-table-column>
				<el-table-column label="处理状态" prop="maintainStatus" align="center">
					<template slot-scope="scope">
						<span v-if="scope.row.maintainStatus == '0'">未处理</span>
						<span v-else-if="scope.row.maintainStatus == '1'">已处理</span>
					</template>
				</el-table-column>
				<el-table-column label="创建时间" prop="createTime" align="center" :show-overflow-tooltip="true"></el-table-column>
				<!-- <el-table-column label="状态" prop="nickName"></el-table-column> -->
				<el-table-column label="操作" align="center">
					<template slot-scope="scope">
						<el-button
							type="text"
							size="mini">
							<span @click="setTable(scope.$index, scope.row)" v-if="scope.row.maintainStatus == '0'">处理</span>
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
		<!-- 设为后台用户弹窗 -->
		<el-dialog title="设为后台用户" :visible.sync="dialogFormVisible" :before-close="clearForm">
			<el-form :model="dialogForm" :rules="dialogFormRules" ref="dialogForm" class="dialogForm user-dialog">
				<el-form-item label="处理结果:" :label-width="formLabelWidth" prop="end">
					<el-input v-model="dialogForm.end" autocomplete="off" type="area"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="clearForm">取 消</el-button>
				<el-button type="primary" @click="saveSet('dialogForm')">确 定</el-button>
			</div>
		</el-dialog>
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
					end: '',
				},
				dialogFormRules: {
					end: [
						{ required: true, message: '请输入处理结果', trigger: 'blur' },
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
				let apiurl = this.api.listMaintain + '?page=' + this.page + '&length=' + this.length;
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
			// 维权处理弹窗
			setTable(index, row) {
				this.id = row.id;
				this.dialogFormVisible = true;
			},
			// 确定设置
			saveSet(formName) {
				let _this = this;
				this.$refs[formName].validate((valid) => {
					if (valid) {
						let apiurl = _this.api.maintainHandle;
						let backgroudUser = {
							end: _this.dialogForm.end,
							id: _this.id
						};
						_this.common.postAxios(apiurl, backgroudUser, _this.returnSave)
					} else {
						return false;
					}
				});
			},
			returnSave(res) {
				let _this = this;
				if(res.data.status) {
					_this.$message({
						type: 'success',
						message: '处理成功'
					});
					_this.$refs['dialogForm'].resetFields();
					_this.dialogFormVisible = false;
          _this.initTable();
				} else {
					_this.$refs['dialogForm'].resetFields();
					_this.$message.error(res.data.msg);
					// _this.dialogFormVisible = false;
					_this.dialogForm = {
						end: '',
					}
				}
			},
			// 关闭弹窗前
			clearForm() {
				let _this = this;
				_this.$refs['dialogForm'].resetFields();
				_this.dialogFormVisible = false;
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
