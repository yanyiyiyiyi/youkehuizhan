<template>
	<div class="main">
		<div class="bread-crumbs columnCenterStart">
			<el-breadcrumb separator-class="el-icon-arrow-right">
				<el-breadcrumb-item :to="{ path: 'drugAdmin' }">商品管理</el-breadcrumb-item>
			</el-breadcrumb>
			<div class="now-position">所在位置：商品详情</div>
		</div>
		<div class="table-area">
			<el-form :model="goodsDescForm" label-width="100px" class="goods-dialog">
				<el-form-item label="商品名称:">
					<el-input v-model="goodsDescForm.productsName"></el-input>
				</el-form-item>
				<el-form-item label="商品编号:">
					<el-input v-model="goodsDescForm.productsNo"></el-input>
				</el-form-item>
				<el-form-item label="商品简介:">
					<el-input v-model="goodsDescForm.introduction"></el-input>
				</el-form-item>
				<el-form-item label="价格区间:">
					<div class="rowBetweenCenter">
						<el-input v-model="goodsDescForm.minPicture">
							<template slot="append">元</template>
						</el-input>
						<span>　-　</span>
						<el-input v-model="goodsDescForm.maxPicture">
							<template slot="append">元</template>
						</el-input>
					</div>
				</el-form-item>
				<el-form-item label="划线价:">
					<el-input v-model="goodsDescForm.scribePicture">
						<template slot="append">元</template>
					</el-input>
				</el-form-item>
				<el-form-item label="发货地:">
					<el-input v-model="goodsDescForm.delivePlace"></el-input>
				</el-form-item>
				<!-- <el-form-item label="缩略图:">
					<el-upload
					  class="avatar-uploader"
					  :action="uploadApiurl"
					  :show-file-list="false"
					  :on-success="handleAvatarSuccess">
					  <img v-if="goodsDescForm.majorPicture" :src="goodsDescForm.majorPicture" class="avatar">
					  <i v-if="goodsDescForm.majorPicture == ''" class="el-icon-plus avatar-uploader-icon"></i>
						
					</el-upload>
				</el-form-item> -->
				<el-form-item label="商品图:">
					<el-upload
					  :action="uploadApiurl"
					  list-type="picture-card"
						:file-list='this.productsResources'
					  :show-file-list="true"
					  :on-success="handlePictureCardPreview"
					  :on-remove="handleRemove">
					  <i class="el-icon-plus"></i>
					</el-upload>
				</el-form-item>
				<template v-for="(list,listIndex) in attributeRelOptionsVOS">
					<el-form-item label="属性:">
						 <el-select v-model="list.attributeId" placeholder="请选择">
								<el-option
									v-for="item in attrList"
									:key="item.id"
									:label="item.attributeName"
									:value="item.id">
								</el-option>
							</el-select>
							<el-button type="primary" class="add-attr" @click="addAttr">新增</el-button>
					</el-form-item>
					<el-form-item label="选项:">
						 <el-input class="option-input" v-model="option.optionName" v-for="option in list.optionsList"></el-input>
						 <span class="el-icon-circle-plus-outline text-red option-text" @click="addOption(listIndex)"></span>
					</el-form-item>
				</template>
				<el-form-item label="">
					<el-button type="primary" @click="saveBase">保存</el-button>
				</el-form-item>
				<el-form-item label="库存:">
					<div class="rowStartCenter stock-row" v-for="list in listVos">
						<el-select class="stock-el" v-for="attribute in list.attributeRelOptionsVOS" v-model="attribute.myOptionsId" :placeholder="'请选择'+attribute.attributeName">
							<el-option v-for="item in attribute.optionsList" :value="item.id" :key="item.id" :label="item.optionName"></el-option>
						</el-select>
						<el-input class="stock-el" v-model="list.productsStocks.price" placeholder="价格"></el-input>
						<el-input class="stock-el" v-model="list.productsStocks.stocks" placeholder="库存"></el-input>
						<span class="el-icon-circle-plus-outline text-red stock-text" @click="addStock"></span>
					</div>
				</el-form-item>
				<el-form-item label="">
					<el-button type="primary" @click="saveStock">发布</el-button>
				</el-form-item>
			</el-form>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				productsId: '',
				descType: '',
				goodsDescForm: {
					productsNo:"",
					shopsId:this.$store.state.userDetail.shops,
					productsName:"",
					introduction:"",
					// majorPicture:"",
					minPicture:"",
					maxPicture:"",
					scribePicture:"",
					delivePlace:""
				},
				productsResources:[],//商品图
				imageUrlList: [],//商品图自用
				attrList: [],//属性名列表
				attributeRelOptionsVOS: [{
					attributeId: '',
					optionsList: [
						{optionName: ""},
					]
				}],
				listVos: [
					{
					  optionsId: [],
					  productsStocks: {
					    price: "",
					    productsId: '',
					    stocks: ""
					  },
						attributeRelOptionsVOS: []
					}
				],
				uploadApiurl: this.api.uplodFiles,
			}
		},
		mounted() {
			this.getAttr();
			if(this.$route.params.descType == 'edit') {
				// 编辑
				this.descType = this.$route.params.descType;
				this.productsId = this.$route.params.productsId;
				this.getDesc();
			} else if(this.$route.params.descType == 'add') {
				// 添加
				this.descType = this.$route.params.descType;
			}
		},
		methods: {
			// 查询商品详情
			getDesc() {
				let apiurl = this.api.getBackProductsById+'?id='+this.productsId;
				this.common.getAxios(apiurl, this.returnDesc);
			},
			returnDesc(res) {
				if(res.data.status) {
					this.goodsDescForm = {
						productsNo:res.data.data.productsNo,
						shopsId:res.data.data.shopsId,
						productsName:res.data.data.productsName,
						introduction:res.data.data.introduction,
						// majorPicture:res.data.data.productsNo,
						minPicture:res.data.data.minPicture,
						maxPicture:res.data.data.maxPicture,
						scribePicture:res.data.data.scribePicture,
						delivePlace:res.data.data.delivePlace
					},
					this.attributeRelOptionsVOS = res.data.data.attributesVOS;
					// 属性设置
					for(var i in this.attributeRelOptionsVOS) {
						this.attributeRelOptionsVOS[i].optionsList = this.attributeRelOptionsVOS[i].optionsVOS;
						this.attributeRelOptionsVOS[i].attributeId = this.attributeRelOptionsVOS[i].id;
					}
					// 库存回显
					let productsStocks = res.data.data.productsStocks;
					if(productsStocks.length != 0) {			
						this.listVos = [];
						for(var i in productsStocks) {
							var obj = {
								id: productsStocks[i].id,
								optionsId: [],
								productsStocks: {
									price: productsStocks[i].price,
									productsId: this.productsId,
									stocks: productsStocks[i].stocks
								},
								attributeRelOptionsVOS: [],
								optionsList: productsStocks[i].optionsList
							}
							this.listVos.push(obj)
						}
						for(var i in this.listVos) {
							this.listVos[i].attributeRelOptionsVOS = JSON.parse(JSON.stringify(this.attributeRelOptionsVOS));
							for(var j in productsStocks[i].optionsList) {
								for(var k in this.listVos[i].attributeRelOptionsVOS) {
									if(j == k) {
										this.listVos[i].attributeRelOptionsVOS[k].myOptionsId = productsStocks[i].optionsList[j].id
									}
								}
							}
						}
					} else {
						for(var i in this.listVos) {
							this.listVos[i].attributeRelOptionsVOS = JSON.parse(JSON.stringify(this.attributeRelOptionsVOS));
						}
					}
					this.productsResources = res.data.data.resourcesVOS;
					for(var i in res.data.data.resourcesVOS) {
						this.imageUrlList.push(res.data.data.resourcesVOS[i].url);
					}
				}
			},
			// 缩略图上传成功回调
			handleAvatarSuccess(res, file) {
				console.log(res,file)
				if(res.status) {
					this.goodsDescForm.majorPicture = res.data.file;
				} else {
					this.$message.error(res.msg)
				}
			},
			// 商品图上传成功
			handlePictureCardPreview(res) {
				if(res.status) {
					if(this.productsResources.length == 0) {
						var obj = {
							url: res.data.file,
							type: res.data.type,
							majorType: 1
						}
					} else {						
						var obj = {
							url: res.data.file,
							type: res.data.type,
							majorType: 0
						}
					}
					this.imageUrlList.push(res.data.file);
					this.productsResources.push(obj);
				} else {
					this.$message.error(res.msg)
				}
			},
			// 商品图删除
			handleRemove(file, fileList) {
				let a = file.url;
				let b = this.imageUrlList.indexOf(a);
				this.imageUrlList.splice(b,1);
				this.productsResources.splice(b,1);
			},
		  // 获取属性
			getAttr() {
				let apiurl = this.api.getAttribute+'?page=1&length=1000';
				this.common.getAxios(apiurl, this.returnAttr);
			},
			returnAttr(res) {
				if(res.data.status) {
					this.attrList = res.data.data.records;
				} else {
					this.$message.error(res.data.msg);
				}
			},
			// 新增属性
			addAttr() {
				let obj = {
					attributeId: '',
					optionsList: [
						{optionName: ""},
					]
				}
				this.attributeRelOptionsVOS.push(obj);
			},
			// 新增属性选项（属性值）
			addOption(listIndex) {
				console.log(999)
				let obj = {optionName: ""}
				this.attributeRelOptionsVOS[listIndex].optionsList.push(obj);
				this.$forceUpdate();//由于编辑的时候会有问题，强制刷新  
			},
			// 保存基本
			saveBase() {
				let attributeRelOptionsVOS = this.attributeRelOptionsVOS;
				let products = this.goodsDescForm;
				let productsResources = this.productsResources;
				if(this.attributeRelOptionsVOS[0].attributeId == '') {
					attributeRelOptionsVOS = [];
				}
				let productsVO = {
					attributeRelOptionsVOS: attributeRelOptionsVOS,
					products: products,
					productsResources: productsResources
				}
				if(this.descType == 'add') {
					let apiurl = this.api.insertProducts;	
					this.common.postAxios(apiurl, productsVO, this.returnSaveBase);
					console.log(productsVO);
				} else if(this.descType == 'edit'){
					productsVO.products.id = this.productsId;
					let apiurl = this.api.updateProducts;	
					this.common.putAxios(apiurl, productsVO, this.returnSaveBaseUpdate);
				}
			},
			returnSaveBase(res) {
				if(res.data.status) {
					this.$message({
						type: 'success',
						message: '新增成功'
					});
					this.productsId = res.data.data.productsId;
					this.descType = 'edit';
					this.getDesc();
				} else {
					thid.$message.error(res.data.msg);
				}
			},
			returnSaveBaseUpdate(res) {
				if(res.data.status) {
					this.$message({
						type: 'success',
						message: '修改成功'
					});
					this.productsId = res.data.data.productsId;
					this.getDesc();
				} else {
					thid.$message.error(res.data.msg);
				}
			},
			// 新增库存区域
			addStock() {
				let obj = {
					optionsId: [],
					productsStocks: {
						price: "",
						productsId: '',
						stocks: ""
					},
					attributeRelOptionsVOS: this.attributeRelOptionsVOS
				};
				console.log(this.attributeRelOptionsVOS)
				this.listVos.push(obj);
			},
			// 保存库存
			saveStock() {
				if(this.listVos[0].productsStocks.stocks == '') {
					this.$message.error('未设置库存');
				} else {
					for(var i in this.listVos) {
						for(var j in this.listVos[i].attributeRelOptionsVOS) {
							this.listVos[i].optionsId.push(this.listVos[i].attributeRelOptionsVOS[j].myOptionsId);
						}
						this.listVos[i].productsStocks.productsId = this.productsId;
					}
					console.log(this.listVos)
					for(var i in this.listVos) {
						delete this.listVos[i].attributeRelOptionsVOS;
					}
					let data = {
						listVos: this.listVos
					}
					console.log('data', data)
					if(this.descType == 'add') {
						let apiurl = this.api.insertProductsStocks;
						this.common.postAxios(apiurl, data, this.returnSaveStock)
					} else if(this.descType == 'edit'){
						let apiurl = this.api.updateProductsStock;
						this.common.putAxios(apiurl, data, this.returnSaveStockUpdate)
					}
				}
			},
			returnSaveStock(res) {
				if(res.data.status) {
					this.$message.success('库存设置成功');
					this.$router.go(-1);//返回上一层
				} else {
					this.$message.error(res.data.msg);
				}
			},
			returnSaveStockUpdate(res) {
				if(res.data.status) {
					this.$message.success('库存修改成功');
					this.$router.go(-1);//返回上一层
				} else {
					this.$message.error(res.data.msg);
				}
			}
			
		}
	}
</script>

<style scoped>
	.goods-dialog{
		width: 55%;
		margin: 0 auto;
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
	.option-input{
		width: 8rem;
		margin-right: 1.5rem;
	}
	.add-attr{
		margin-left: 2rem;
	}
	.option-text{
		font-size: 2.3rem;
		vertical-align: middle;
		display: inline-block;
	}
	.stock-el{
		width: 15rem;
		margin-right: 1rem;
		margin-bottom: 1rem;
	}
	.stock-row{
		flex-wrap: wrap;
	}
	.stock-text{
		font-size: 2.3rem;
		vertical-align: middle;
		display: inline-block;
		margin-bottom: 1rem;
	}
</style>
