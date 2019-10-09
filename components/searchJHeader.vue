<template>
	<view class="search-header">
		<view class="search-box">
			<input type="text" placeholder="搜索歌名" confirm-type="search" 
			class="search-input" placeholder-class="ph" 
			v-model.trim="searchKey" @confirm="onConfirm">
			<view class="icon">&#xe604;</view>
			<view class="clear-btn" v-if="searchKey"  @click="onClear">&#xe61d;</view>
		</view>
		<view class="cancel-btn" @click="onCancel">取消</view>
	</view>
</template>

<script>
	export default {
		props:{
			sKey:String
		},
		data(){
			return {
				searchKey:''
			}
		},
		watch:{
			sKey(val){
				this.searchKey = val
			}
		},
		methods:{
			onClear(){
				this.searchKey = ''
				this.$emit('onClear')
			},
			onConfirm(){
				this.$emit('onSearch',this.searchKey)
			},
			onCancel(){
				this.onClear()
				this.$emit('onCancel')
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
		height: 120rpx;
		align-items: center;
		padding: 60rpx 20rpx 0rpx;
		display: flex;
		box-sizing: border-box;
		.search-box{
			position: relative;
			flex:1;
			height:60rpx;
			line-height: 60rpx;
			display: flex;
			border:1px solid #e5e5e5;
			border-radius: 10rpx;
			box-shadow: 0rpx 0rpx 8rpx rgba(0,0,0,0.1);
			.icon {
				position: absolute;
				top:0;
				left:10rpx;
				font-family: iconfont;
				color: #999;
			}
			.search-input{
				color: #666;
				padding-left: 60rpx;
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
				color: #999;
				font-size: 32rpx;
				line-height: 80rpx;
			}
		}
		.cancel-btn{
			flex:0 0 80rpx;
			width:80rpx;
			text-align: center;
			color: #666;
			font-size: 32rpx;
		}
	}
</style>
