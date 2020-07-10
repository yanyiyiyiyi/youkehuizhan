<template>
	<div class="main">
		<div class="bread-crumbs columnCenterStart">
			<el-breadcrumb separator-class="el-icon-arrow-right">
			  <el-breadcrumb-item  :to="{ path: 'bannerAdmin' }">分类管理/banner</el-breadcrumb-item>
				<el-breadcrumb-item v-if="descType == 'add'">banner新增</el-breadcrumb-item>
				<el-breadcrumb-item v-else-if="descType == 'edit'">banner修改</el-breadcrumb-item>
			</el-breadcrumb>
			<div class="now-position" v-if="descType == 'add'">所在位置：banner新增</div>
			<div class="now-position" v-else-if="descType == 'edit'">所在位置：banner修改</div>
		</div>
		<div class="table-area">
			<el-form :model="dialogForm" ref="dialogForm">
				<el-form-item label="banner权重:" :label-width="formLabelWidth">
					<el-input v-model="dialogForm.weight" autocomplete="off" class="banner-input" type="number"></el-input>
				</el-form-item>
				<el-form-item label="banner:" :label-width="formLabelWidth">
					<el-upload
					  class="avatar-uploader"
					  :action="uploadApiurl"
					  :show-file-list="false"
					  :on-success="handleAvatarSuccess">
					  <img v-if="dialogForm.url&&dialogForm.type == '0'" :src="dialogForm.url" class="avatar">
						<video v-if="dialogForm.url&&dialogForm.type == '1'" :src="dialogForm.url" class="avatar" autoplay controls ></video>
					  <i v-if="dialogForm.url == ''" class="el-icon-plus avatar-uploader-icon"></i>
						<!-- 上传图片或视频 -->
					</el-upload>
					<span class="text-red">上传视频或图片</span>
					<!-- <el-input v-model="dialogForm.url" autocomplete="off" show-password></el-input> -->
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
				uploadApiurl: this.api.uplodFiles,
				imageUrl: '',
				// 弹窗中表单
				dialogForm: {
					type: '',
					weight: '',
					url: '',
					bannerId: '',
				},
				formLabelWidth: '80px',
			}
		},
		mounted() {
			 if(this.$route.params.descType == 'edit') {
				 this.dialogForm = {
					 type: this.$route.params.type,
					 weight: this.$route.params.weight,
					 url: this.$route.params.url,
					 id: this.$route.params.id,
				 }
			 }
		},
		methods: {
			handleAvatarSuccess(res, file) {
				console.log(res,file)
				this.dialogForm.url = res.data.file;
				this.dialogForm.type = res.data.type;
			},
			// 提交
			saveTable() {
				let _this = this;
				if(_this.descType == 'add') {
					let apiurl = _this.api.insertBanner;
					let banner = _this.dialogForm;
					_this.common.postAxios(apiurl, banner, _this.returnSave);
				} else {
					let apiurl = _this.api.updateBannerById;
					let banner = _this.dialogForm;
					_this.common.putAxios(apiurl, banner, _this.returnUpdate);
				}
			},
			returnSave(res) {
				if(res.data.status) {
					this.$message({
						type: 'success',
						message: '新增成功'
					});
					this.dialogForm = {
						weight: '',
						url: '',
						type: '',
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
		width: 17rem;
	}
	.avatar-uploader >>> .el-upload {
		border: 0.1rem dashed #d9d9d9;
		border-radius: 0.6rem;
		cursor: pointer;
		position: relative;
		overflow: hidden;
	}
	.avatar-uploader >>> .el-upload:hover {
		border-color: #409EFF;
	}
	.avatar-uploader-icon {
		font-size: 2.8rem;
		color: #8c939d;
		width: 17.8rem;
		height: 17.8rem;
		line-height: 17.8rem;
		text-align: center;
	}
	.avatar {
		width: 17.8rem;
		height: 17.8rem;
		display: block;
	}
</style>
