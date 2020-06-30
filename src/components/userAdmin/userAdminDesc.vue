<template>
	<div class="main">
		<div class="bread-crumbs columnCenterStart">
			<el-breadcrumb separator-class="el-icon-arrow-right">
				<el-breadcrumb-item :to="{ path: 'shopAdmin' }">用户管理</el-breadcrumb-item>
			  <el-breadcrumb-item>用户详情</el-breadcrumb-item>
			</el-breadcrumb>
			<div class="now-position">所在位置：用户详情</div>
		</div>
		<div class="table-area">
			<div class="info-tip">基本信息</div>
			<div class="rowStartCenter info-desc">
				<span>用户昵称：{{baseInfo.nickName}}</span>
				<span>用户手机号：{{baseInfo.phone}}</span>
				<span>用户身份：
					<span v-if="baseInfo.shopsSign == '0'">普通用户</span>
					<span v-else-if="baseInfo.shopsSign == '1'">商户</span>
				</span>
				<span>是否后台用户：
					<span v-if="baseInfo.backUserSign == 1">是</span>
					<span v-else>否</span>
				</span>
				
			</div>
			<div class="info-tip">收货地址</div>
			<el-table 
			 :data="addressList"
			 border 
			 class="my-table"
			 :header-cell-style="{background:'#F5F6FA',color:'#000',fontWeight:'bold'}">
				<el-table-column prop="receiver" label="收货人姓名" algin="center"></el-table-column>
				<el-table-column prop="phone" label="收货人电话" algin="center"></el-table-column>
				<el-table-column prop="area" label="省市区" algin="center"></el-table-column>
				<el-table-column prop="addressDetail" label="详细地址" algin="center" :show-overflow-tooltip="true"></el-table-column>
			</el-table>
		</div>
		
	</div>
</template>

<script>
	export default {
		data() {
			return {
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
				let apiurl = this.api.getUserById + '/' + this.userId;
				this.common.getAxios(apiurl, this.returnInfo);
			},
			returnInfo(res) {
				this.baseInfo = res.data.data;
				this.addressList = res.data.data.addressList;
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
	}
</style>
