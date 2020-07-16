<template>
	<div class="main">
		<div class="bread-crumbs columnCenterStart">
			<el-breadcrumb separator-class="el-icon-arrow-right">
				<el-breadcrumb-item :to="{ path: 'userOrderAdmin' }">用户订单</el-breadcrumb-item>
			  <el-breadcrumb-item>订单详情</el-breadcrumb-item>
			</el-breadcrumb>
			<div class="now-position">所在位置：订单详情</div>
		</div>
		<div class="table-area">
			<div class="info-tip">基本信息</div>
			<div class="rowStartCenter info-desc">
				<span>订单号	：{{baseInfo.orderNo}}</span>
				<span>订单状态：
					<span v-if="baseInfo.orderStatus == '0'">未付款</span>
					<span v-else-if="baseInfo.orderStatus == '1'">待发货</span>
					<span v-else-if="baseInfo.orderStatus == '2'">运送中</span>
					<span v-else-if="baseInfo.orderStatus == '3'">待收货</span>
					<span v-else-if="baseInfo.orderStatus == '4'">已完成</span>
					<span v-else-if="baseInfo.orderStatus == '5'">退款审核</span>
					<span v-else-if="baseInfo.orderStatus == '6'">退款中</span>
					<span v-else-if="baseInfo.orderStatus == '7'">退款完成</span>
				</span>
				<!-- <span>优惠券：{{baseInfo.phone}}</span> -->
				<span>订单金额：{{baseInfo.totalPrice}}</span>
				<span>支付时间：{{baseInfo.payTime}}</span>
				<!-- <span>实际金额：{{baseInfo.phone}}</span> -->
				<span>创建时间：{{baseInfo.createTime}}</span>
				<span>支付状态：
					<span v-if="baseInfo.payStatus == '0'">未支付</span>
					<span v-else-if="baseInfo.payStatus == '1'">已支付</span>
				</span>
				<!-- <span>物流单号	：{{baseInfo.phone}}</span> -->
				<span>发货时间：{{baseInfo.sendTime}}</span>
			</div>
			<div class="info-tip">收件人信息</div>
			<div class="rowStartCenter info-desc">
				<span>收件人	：{{baseInfo.addressInfo.receiver}}</span>
				<span>手机号：{{baseInfo.addressInfo.phone}}</span>
				<!-- <span>物流公司：{{baseInfo.phone}}</span> -->
				<span>收货地址：{{baseInfo.addressInfo.area}}{{baseInfo.addressInfo.addressDetail}}{{baseInfo.addressInfo.numbers}}</span>
			</div>
			<!-- <div class="info-tip">买家信息</div>
			<div class="rowStartCenter info-desc">
				<span>用户名：{{baseInfo.nickName}}</span>
				<span>手机号：{{baseInfo.phone}}</span>
			</div>
			<div class="info-tip">店铺信息</div>
			<div class="rowStartCenter info-desc">
				<span>店铺名称：{{baseInfo.nickName}}</span>
				<span>店主昵称：{{baseInfo.phone}}</span>
			</div> -->
			<div class="info-tip">商品信息</div>
			<el-table 
			 :data="baseInfo.orderDetails"
			 border 
			 class="my-table"
			 :header-cell-style="{background:'#F5F6FA',color:'#000',fontWeight:'bold'}">
				<el-table-column prop="productsName" label="商品名称" algin="center"></el-table-column>
				<el-table-column prop="majorPicture" label="图片" algin="center">
					<template slot-scope="scope">
						<img class="good-pic" :src="scope.row.majorPicture" alt="">
					</template>
				</el-table-column>
				<el-table-column prop="area" label="规格" algin="center">
					<template slot-scope="scope">
						<span v-for="list in scope.row.attrOptContent">{{list.optionName}};</span>
					</template>
				</el-table-column>
				<!-- <el-table-column prop="area" label="单价" algin="center"></el-table-column> -->
				<el-table-column prop="number" label="数量" algin="center"></el-table-column>
				<el-table-column prop="price" label="金额" algin="center"></el-table-column>
				<el-table-column prop="introduction" label="简介" algin="center" :show-overflow-tooltip="true"></el-table-column>
			</el-table>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				orderId: this.$route.query.orderId,
				baseInfo: '',
			}
		},
		mounted() {
			this.getDesc();
		},
		methods: {
			getDesc() {
				let apiurl = this.api.getOrderDetailById+'?orderId='+this.orderId;
				this.common.getAxios(apiurl, this.returnDesc);
			},
			returnDesc(res) {
				if(res.data.status) {
					this.baseInfo = res.data.data;
					this.baseInfo.addressInfo = JSON.parse(this.baseInfo.addressInfo);
					for(var i in this.baseInfo.orderDetails) {
						this.baseInfo.orderDetails[i].attrOptContent = JSON.parse(this.baseInfo.orderDetails[i].attrOptContent);
					}
				} else {
					this.$message.error(res.data.msg);
				}
			}
		}
	}
</script>

<style scoped>
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
		flex-wrap: wrap;
	}
	.info-desc span{
		margin-right: 3rem;
	}
	.good-pic{
		width: 3rem;
		height: 3rem;
	}
	.my-table{
		text-align: center;
	}
</style>
