<template>
	<div class="main">
		<div class="bread-crumbs columnCenterStart">
			<el-breadcrumb separator-class="el-icon-arrow-right">
			  <el-breadcrumb-item  :to="{ path: 'bannerAdmin' }">其他功能/优惠券</el-breadcrumb-item>
				<el-breadcrumb-item v-if="descType == 'add'">优惠券新增</el-breadcrumb-item>
				<el-breadcrumb-item v-else-if="descType == 'edit'">优惠券修改</el-breadcrumb-item>
			</el-breadcrumb>
			<div class="now-position" v-if="descType == 'add'">所在位置：优惠券新增</div>
			<div class="now-position" v-else-if="descType == 'edit'">所在位置：优惠券修改</div>
		</div>
		<div class="table-area">
			<el-form :model="dialogForm" ref="dialogForm">
				<el-form-item label="优惠券描述:" :label-width="formLabelWidth">
					<el-input v-model="dialogForm.couponDescribe" autocomplete="off" class="banner-input" type="textarea"></el-input>
				</el-form-item>
				<el-form-item label="优惠券数量:" :label-width="formLabelWidth">
					<el-input v-model="dialogForm.number" autocomplete="off" class="banner-input" type="number"></el-input>
				</el-form-item>
				<el-form-item label="满" :label-width="formLabelWidth">
					<el-input v-model="dialogForm.useStart" autocomplete="off" class="banner-input" type="number">
						<template slot="append">元</template>
					</el-input>
					<span>减</span>
					<el-input v-model="dialogForm.useEnd" autocomplete="off" class="banner-input" type="number">
						<template slot="append">元</template>
					</el-input>
				</el-form-item>
				<el-form-item label="起始时间:" :label-width="formLabelWidth">
					<div class="block">
						<el-date-picker
							v-model="dialogForm.datas"
							type="daterange"
							range-separator="至"
							start-placeholder="开始日期"
							end-placeholder="结束日期" 
							value-format="yyyy-MM-dd">
						</el-date-picker>
					</div>
				</el-form-item>
			</el-form>
			<div class="rowStartCenter">
				<el-button type="primary" plain @click="saveTable">确定</el-button>
			</div>
			
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				descType: this.$route.params.descType,
				// 弹窗中表单
				dialogForm: {
					couponDescribe: '',
					startTime: '',
					endTime: '',
					useStart: '',
					useEnd: '',
					number: '',
					datas: ''
				},
				id: '',
				formLabelWidth: '80px',
			}
		},
		mounted() {
			console.log(this.$route)
			 if(this.$route.params.descType == 'edit') {
				 this.dialogForm = {
					 id: this.$route.params.id,
				 }
				 this.id = this.$route.params.id;
				 this.getDesc();
			 }
		},
		methods: {
			handleAvatarSuccess(res, file) {
				console.log(res,file)
				this.dialogForm.url = res.data.file;
				this.dialogForm.type = res.data.type;
			},
			// 获取详情
			getDesc() {
				let apiurl = (`${this.api.selectCouponById}/${this.id}`);
				this.common.getAxios(apiurl, this.returnDesc);
			},
			returnDesc(res) {
				if(res.data.status) {
					this.dialogForm = res.data.data;
					this.dialogForm.datas=[this.dialogForm.startTime,this.dialogForm.endTime];
				} else {
					this.$message.error(res.data.msg)
				}
			},
			// 提交
			saveTable() {
				let _this = this;
				if(_this.descType == 'add') {
					let apiurl = _this.api.insertCoupon;
					let coupon = _this.dialogForm;
					coupon.startTime = coupon.datas[0];
					coupon.endTime = coupon.datas[1];
					_this.common.postAxios(apiurl, coupon, _this.returnSave);
				} else {
					let apiurl = _this.api.updateConponById;
					let coupon = _this.dialogForm;
					coupon.startTime = coupon.datas[0];
					coupon.endTime = coupon.datas[1];
					_this.common.putAxios(apiurl, coupon, _this.returnUpdate);
				}
			},
			returnSave(res) {
				if(res.data.status) {
					this.$message({
						type: 'success',
						message: '新增成功'
					});
					this.dialogForm = {
						couponDescribe: '',
						startTime: '',
						endTime: '',
						useStart: '',
						useEnd: '',
						number: '',
						datas: ''
					}
				} else {
					this.$message.error(res.data.msg);
				}
			},
			returnUpdate(res) {
				if(res.data.status) {
					this.$message({
						type: 'success',
						message: '修改成功'
					});
				} else {
					this.$message.error(res.data.msg);
				}
			}
		}
	}
</script>

<style scoped>
	
	.banner-input{
		width: 27rem;
	}
	
</style>
