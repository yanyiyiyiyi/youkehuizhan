<template>
	<div class="main">
		<div class="bread-crumbs columnCenterStart">
			<el-breadcrumb separator-class="el-icon-arrow-right">
			  <el-breadcrumb-item>其他功能/评分管理</el-breadcrumb-item>
			</el-breadcrumb>
			<div class="now-position">所在位置：评分管理</div>
		</div>
		<div class="table-area">
			<div class="search-area rowEndCenter">
				<div class="rowStartCenter search-input-area">
					<!-- <span class="input-tip">行业名称：</span>
					<el-input v-model="searchForm.nickName" clearable class="search-input"></el-input>
					<span class="input-tip">收费价格：</span>
					<el-input v-model="searchForm.phone" clearable class="search-input"></el-input> -->
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
				<el-table-column label="等级描述" prop="gradeDescribe" align="center"></el-table-column>
				<el-table-column label="分数起始" prop="scoreStart" align="center"></el-table-column>
				
				<el-table-column label="分数结束" prop="scoreEnd" align="center"></el-table-column>
				<el-table-column label="操作" align="center">
					<template slot-scope="scope">
						<el-button
							type="text"
							size="mini">
							<span @click="setTable(scope.$index, scope.row)" class="text-black">编辑</span>
						</el-button>
						<el-button
							 v-if="scope.row.backUserSign!='1'"
							type="text"
							size="mini">
							<span @click="delTable(scope.$index, scope.row)" class="text-red">删除</span>
							</el-button>
					</template>
				</el-table-column>
			</el-table>
			
		</div>
		<!-- 新增行业分类弹窗 -->
		<el-dialog title="行业分类" :visible.sync="dialogFormVisible" :before-close="clearForm">
			<el-form :model="dialogForm" :rules="dialogFormRules" ref="dialogForm" class="dialogForm user-dialog">
				<el-form-item label="等级描述:" :label-width="formLabelWidth" prop="gradeDescribe">
					<el-input v-model="dialogForm.gradeDescribe" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="分数起始:" :label-width="formLabelWidth" prop="scoreStart">
					<el-input v-model="dialogForm.scoreStart" autocomplete="off" type="number"></el-input>
				</el-form-item>
				<el-form-item label="分数结束:" :label-width="formLabelWidth" prop="scoreEnd">
					<el-input v-model="dialogForm.scoreEnd" autocomplete="off" type="number"></el-input>
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
					gradeDescribe: '',
					scoreStart: '',
					scoreEnd: ''
				},
				dialogFormRules: {
					gradeDescribe: [
						{ required: true, message: '请输入等级描述', trigger: 'blur' },
					],
					scoreStart: [
						{ required: true, message: '请输入起始分数', trigger: 'blur' },
					],
					scoreEnd: [
						{ required: true, message: '请输入结束分数', trigger: 'blur' },
					],
				},
				formLabelWidth: '80px',
				dialogFormVisible: false, //false
				dialogType: 1, //1新增2编辑
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
				let apiurl = this.api.listScore;
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
				this.tableData = res.data.data;
				// this.total = res.data.data.total;
			},
			handleCurrentChange(val) {
				this.page = val;
				this.getTable();
			},
			// 查看table详情
			viewTable(index, row) {
				console.log(index, row);
				this.$router.push({path: 'userAdmindesc', query: {userId: row.id}})
			},
			// 新增table
			addTable() {
				this.dialogType = 1;
				this.dialogFormVisible = true;
			},
			// 设为后台用户弹窗
			setTable(index, row) {
				let _this = this;
				_this.dialogFormVisible = true;
				// 回显数据
				this.$nextTick(function(){
					_this.id = row.id;
				  _this.dialogForm = row;
				})
				_this.dialogType = 2;
			},
			// 确定设置
			saveSet(formName) {
				let _this = this;
				this.$refs[formName].validate((valid) => {
					if (valid) {
						if(_this.dialogType == 1) {
							let apiurl = _this.api.insertScore;
							let industry = {
								gradeDescribe: _this.dialogForm.gradeDescribe,
								scoreEnd: _this.dialogForm.scoreEnd,
								scoreStart: _this.dialogForm.scoreStart,
							};
							_this.common.postAxios(apiurl, industry, _this.returnSave)
						} else {
							let apiurl = _this.api.updateScoreById;
							let industry = {
								gradeDescribe: _this.dialogForm.gradeDescribe,
								scoreEnd: _this.dialogForm.scoreEnd,
								scoreStart: _this.dialogForm.scoreStart,
								id: _this.dialogForm.id
							};
							_this.common.putAxios(apiurl, industry, _this.returnUpdate)
						}
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
						message: '新增成功'
					});
					_this.$refs['dialogForm'].resetFields();
					_this.dialogFormVisible = false;
          _this.initTable();
				} else {
					_this.$refs['dialogForm'].resetFields();
					_this.$message.error(res.data.msg);
					// _this.dialogFormVisible = false;
					_this.dialogForm = {
						gradeDescribe: '',
						scoreStart: '',
						scoreEnd: ''
					}
				}
			},
			returnUpdate(res) {
				let _this = this;
				if(res.data.status) {
					_this.$message({
						type: 'success',
						message: '修改成功'
					});
					_this.$refs['dialogForm'].resetFields();
					_this.dialogFormVisible = false;
				  _this.initTable();
				} else {
					_this.$refs['dialogForm'].resetFields();
					_this.$message.error(res.data.msg);
					// _this.dialogFormVisible = false;
					_this.dialogForm = {
						gradeDescribe: '',
						scoreStart: '',
						scoreEnd: ''
					}
				}
			},
			// 删除table
			delTable(index, row) {
				let _this = this;
				this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					let apiurl = _this.api.deleteScoreById + '?id=' + row.id;
					let data = {};
					_this.common.deleteAxios(apiurl, data, _this.returnDel)
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
						message: '删除成功!'
					});
					this.initTable();
				} else {
					this.$message.error(res.data.msg);
				}
			},
			// 关闭弹窗前
			clearForm() {
				let _this = this;
				_this.$refs['dialogForm'].resetFields();
				_this.dialogFormVisible = false;
				_this.initTable();
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
