<template>
	<view class="advertising">
		<image :src="url"></image>
	</view>
</template>

<script>
	export default {
		props:{
			url:String
		},
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="less">
	.advertising{
		position: fixed;
		left:0;
		top:160rpx;
		width: 100%;
		height:23.47vw;
		z-index: 10;
		image{
			width: 100%;
			height:100%;
		}
	}
</style>
