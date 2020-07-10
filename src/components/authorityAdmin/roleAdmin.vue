<template>
	<div class="main">
		<div class="bread-crumbs columnCenterStart">
			<el-breadcrumb separator-class="el-icon-arrow-right">
			  <el-breadcrumb-item>权限管理/角色管理</el-breadcrumb-item>
			</el-breadcrumb>
			<div class="now-position">所在位置：角色管理</div>
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
				<el-table-column label="角色" prop="role" align="center"></el-table-column>
				<el-table-column label="角色描述" prop="describes" align="center" :show-overflow-tooltip="true"></el-table-column>
				<el-table-column label="创建时间" prop="createTime" align="center" :show-overflow-tooltip="true"></el-table-column>
				
				<el-table-column label="操作" align="center">
					<template slot-scope="scope">
						<el-button
							type="text"
							size="mini">
							<span @click="adminTable(scope.$index, scope.row)" class="text-red">权限管理</span>
						</el-button>
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
				<el-form-item label="角色:" :label-width="formLabelWidth" prop="role">
					<el-input v-model="dialogForm.role" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="角色描述:" :label-width="formLabelWidth" prop="describes">
					<el-input type="textarea" v-model="dialogForm.describes" autocomplete="off"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="clearForm">取 消</el-button>
				<el-button type="primary" @click="saveSet('dialogForm')">确 定</el-button>
			</div>
		</el-dialog>
		<!-- 权限管理弹窗 -->
		<el-dialog title="权限分配" :visible.sync="dialogFormAdmin">
			<el-transfer 
			 v-model="menuRelRoleList" 
			 :data="menuList"
			 :props="{key: 'id',label: 'title'}"
       :titles="['可选权限', '已选权限']"></el-transfer>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogFormAdmin = false">取 消</el-button>
				<el-button type="primary" @click="saveAdmin">确 定</el-button>
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
					role: '',
					describes: ''
				},
				dialogFormRules: {
					role: [
						{ required: true, message: '请输入角色名', trigger: 'blur' },
					],
					describes: [
						{ required: true, message: '请输入角色描述', trigger: 'blur' },
					],
				},
				formLabelWidth: '80px',
				dialogFormVisible: false, //false
				dialogType: 1, //1新增2编辑
				dialogFormAdmin: false, //false 权限弹窗
				originalMenuRelRoleList: [], //该用户原有权限，用来判断添加or删除
				menuRelRoleList: [], //已选中的权限
				menuList: [],//所有权限
				buserRoleId: ''//角色id
			}
		},
		mounted() {
			this.initTable();
			this.getMenuList();
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
				let apiurl = this.api.listRole;
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
			// 获取权限即菜单列表
			getMenuList() {
				let apiurl = (`${this.api.listMenuByRoleId}/1`);
				this.common.getAxios(apiurl, this.returnMenuList);
			},
			returnMenuList(res) {
				if(res.data.status) {
					let menu = res.data.data.menu;
					let menuList = [];
					for(var i in menu) {
						if(menu[i].childList != null) {
							for(var j in menu[i].childList) {
								var obj = {
									id: menu[i].childList[j].id,
									title: menu[i].childList[j].title,
								}
								menuList.push(obj);
								console.log(menuList)
							}
						} else {
							var obj = {
								id: menu[i].id,
								title: menu[i].title
							}
							menuList.push(obj);
						}
					}
					this.menuList = menuList;
				}
			},
			// 权限管理弹窗
			adminTable(index, row) {
				this.buserRoleId = row.id;
				this.getRoleMenu();
				this.dialogFormAdmin = true;
			},
			// 获取该角色现有权限
			getRoleMenu() {
				let _this = this;
				let apiurl = (`${this.api.listUserMenuByRoleId}/${this.buserRoleId}`);
				this.common.getAxios(apiurl, returnRoleMenu);
				function returnRoleMenu(res) {
					if(res.data.status) {
						let data = res.data.data;
						let list = data.map(item => {
							return item.bmenuId
						})
						_this.menuRelRoleList = list;
						_this.originalMenuRelRoleList = list;
					} else {
						_this.$message.error(res.data.msg);
					}
				}
			},
			// 保存权限设置
			saveAdmin() {
				// console.log(this.menuRelRoleList);
				let originalMenuRelRoleList = this.originalMenuRelRoleList;//原有权限
				let menuRelRoleList = this.menuRelRoleList;//现在选中
				console.log(originalMenuRelRoleList, 'originalMenuRelRoleList')
				console.log(menuRelRoleList, 'menuRelRoleList')
				// 处理新增的  现在>原有
				let newMenuRelRoleList = [];
				menuRelRoleList.forEach(item => {
					if(originalMenuRelRoleList.indexOf(item) == -1) {
						newMenuRelRoleList.push(item)
					}
				})
				let list = newMenuRelRoleList.map(item => {
					return {bmenuId: item, buserRoleId: this.buserRoleId}
				});
				console.log('新增',list)
				let apiurl = this.api.insertRoleRelMenu;
				let menuRelRole = {
					list: list
				}
				if(list.length != 0) {
					this.common.postAxios(apiurl, menuRelRole, this.returnSaveAdmin);
				}
				// 处理删除的 原有>现在
				let delMenuRelRoleList = [];
				const a = [1,2,3,4,5], b = [1,2],c = [];
				    a.forEach( v => {
				      if(b.indexOf(v) === -1) c.push(v)
				    })
				originalMenuRelRoleList.forEach(item => {
					if(menuRelRoleList.indexOf(item) == -1) {
						delMenuRelRoleList.push(item)
					}
				});
				let delList = delMenuRelRoleList.map(item => {
					return {bmenuId: item, buserRoleId: this.buserRoleId}
				});
				console.log('删除',delList)
				let apiurlDel = this.api.deleteRoleRelMenu;
				let menuRelRoleDel = {
					list: delList
				}
				if(delList.length != 0) {
					this.common.deleteAxios(apiurlDel, {data: menuRelRoleDel}, this.returnSaveAdminDel);
				}
			},
			returnSaveAdmin(res) {
				// console.log(res)
				if(res.data.status) {
					this.$message({
						type: 'success',
						message: '新增成功'
					})
					this.dialogFormAdmin = false;
				} else {
					this.$message.error(res.data.msg);
				}
			},
			returnSaveAdminDel(res) {
				if(res.data.status) {
					this.$message({
						type: 'success',
						message: '删除成功'
					})
					this.dialogFormAdmin = false;
				} else {
					this.$message.error(res.data.msg);
				}
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
							let apiurl = _this.api.insertRole;
							let industry = {
								role: _this.dialogForm.role,
								describes: _this.dialogForm.describes,
							};
							_this.common.postAxios(apiurl, industry, _this.returnSave)
						} else {
							let apiurl = _this.api.updateRole;
							let industry = {
								role: _this.dialogForm.role,
								describes: _this.dialogForm.describes,
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
						role: '',
						describes: ''
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
						role: '',
						describes: ''
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
					let apiurl = _this.api.deleteRole;
					let agreement = {
						id: row.id
					};
					_this.common.deleteAxios(apiurl, {data: agreement}, _this.returnDel)
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
