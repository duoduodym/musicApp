<template>
	<view class="search-header">
		<view class="search-box">
			<input type="text" placeholder="搜索歌名/专辑/歌手" confirm-type="search" 
			class="search-input" placeholder-class="ph" 
			v-model.trim="searchKey" @confirm="onConfirm">
			<view class="clear-btn" v-if="searchKey"  @click="onClear">&#xe61d;</view>
		</view>
		<view class="cancel-btn">取消</view>
	</view>
</template>

<script>
	export default {
		data(){
			return {
				searchKey:''
			}
		},
		methods:{
			onClear(){
				this.searchKey = ''
			},
			onConfirm(){
				console.log(2222)
			}
		}
		
	}
</script>
<style lang="less">
	.search-header{
		position: fixed;
		width: 100%;
		top:0;
		left:0;
		z-index: 99;
		display: flex;
		height: 140rpx;
		align-items: center;
		padding: 60rpx 20rpx 0rpx;
		display: flex;
		box-sizing: border-box;
		.search-box{
			flex:1;
			height:80rpx;
			line-height: 80rpx;
			display: flex;
			border:1px solid #e5e5e5;
			.search-input{
				color: #666;
				padding-left: 10rpx;
				line-height: 80rpx;
				flex:1;
				height:100%;
				font-size: 32rpx;
			}
			.clear-btn{
				font-family: iconfont;
				flex:0 0 80rpx;
				width: 80rpx;
				text-align: center;
				color: #666;
			}
			.ph{
				color: #666;
				font-size: 32rpx;
				line-height: 80rpx;
			}
		}
		.cancel-btn{
			flex:0 0 140rpx;
			width:140rpx;
			text-align: center;
			color: #666;
		}
	}
</style>
