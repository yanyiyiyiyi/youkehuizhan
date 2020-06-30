<template>
	<div class="main">
		<div class="bread-crumbs columnCenterStart">
			<el-breadcrumb separator-class="el-icon-arrow-right">
				<el-breadcrumb-item :to="{ path: 'userAdmin' }">店铺管理</el-breadcrumb-item>
			  <el-breadcrumb-item>店铺详情</el-breadcrumb-item>
			</el-breadcrumb>
			<div class="now-position">所在位置：店铺详情</div>
		</div>
		<div class="table-area">
			<div class="info-tip">基本信息</div>
			<div class="rowStartCenter info-desc my-wrap">
				<span>店铺名称：{{baseInfo.company}}</span>
				<span>所在地区：{{baseInfo.addressArea}}</span>
				<span>详细地址：{{baseInfo.addressDetail}}</span>
				<span>店主姓名：{{baseInfo.contacts}}</span>
				<span>电话：{{baseInfo.contactsPhone}}</span>
				<span>邮箱：{{baseInfo.email}}</span>
				<span>店铺评分：{{baseInfo.shopsScore}}</span>
				<span>认证：
					<span v-if="baseInfo.authStatus == 0">待认证</span>
					<span v-else-if="baseInfo.authStatus == 1">认证成功</span>
					<span v-else-if="baseInfo.authStatus == 2">认证失败</span>
				</span>
				
			</div>
			<div class="info-tip">营业执照</div>
			<div class="info-desc rowStartCenter">
				<img class="shop-img" :src="baseInfo.businessLicense">
			</div>
			<div class="info-tip">店铺图片</div>
			<div class="rowStartCenter my-wrap info-desc">
				<img class="shop-img" :src="img.image" v-for="img in baseInfo.images">
			</div>
		</div>
		
	</div>
</template>

<script>
	export default {
		data() {
			return {
				shopId: this.$route.query.shopId,
				userId: this.$route.query.userId,
				baseInfo: {},
				addressList: [],
			}
		},
		mounted() {
			this.getInfo();
		},
		methods: {
			// 获取用户详情信息
			getInfo() {
				let apiurl = (`${this.api.getBackShopsInfo}?userId=${this.userId}&shopsId=${this.shopId}`);
				this.common.getAxios(apiurl, this.returnInfo);
			},
			returnInfo(res) {
				this.baseInfo = res.data.data;
				this.baseInfo.images = JSON.parse(this.baseInfo.iamges);
				console.log(this.baseInfo)
				// this.addressList = res.data.data.addressList;
			}
		}
	}
</script>

<style>
	.info-tip{
		color: #333;
		font-size: 1.4rem;
		padding-left: 1rem;
		border-left: 0.4rem solid #F44A00;
		line-height: 2.2rem;
		text-align: left;
	}
	.info-desc{
		font-size: 1.4rem;
		margin: 2rem 0 2rem 2rem;
	}
	.info-desc span{
		margin-right: 3rem;
		line-height: 2.4rem;
	}
	.shop-img{
		width: 18rem;
		margin-right: 2rem;
	}
</style>
