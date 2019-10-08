<template>
	<view class="detail-nav">
		<view class="back-btn" @click="goBack">&#xe600;</view>
	</view>
</template>

<script>
	export default {
		methods:{
			goBack(){
				uni.navigateBack();
			}
		}
	}
</script>

<style lang="less">
	.detail-nav{
		position: absolute;
		width: 100%;
		top:0;
		left:0;
		z-index: 99;
		display: flex;
		height: 100rpx;
		align-items: center;
		padding: 0 20rpx 20rpx;
		padding-top: var(--status-bar-height);
		.back-btn{
			font-family:iconfont ;
			color: #fff;
		}
	}
</style>
