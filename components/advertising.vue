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
		width: 100%;
		height:23.47vw;
		image{
			width: 100%;
			height:100%;
		}
	}
</style>
