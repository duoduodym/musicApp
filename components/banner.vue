<template>
	<view class="banner-wrap">
		<swiper class="swiper" :indicator-dots="true" indicator-active-color="#fff" indicator-color="#999">
			<swiper-item v-for="(item,index) in bannerList" :key="index">
				<image :src="item.url" model="top" mode="aspectFit"></image>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	export default {
		data(){
			return {
				bannerList:[
					{
						url:require('@/static/banner1.jpg'),
						albumId:670131592
					},
					{
						url:require('@/static/banner2.jpg'),
						albumId:670253010
					},
					{
						url:require('@/static/banner3.jpg'),
						albumId:670251901
					},
					{
						url:require('@/static/banner4.jpg'),
						albumId:670280057
					}
				]
			}
		}
	}
</script>

<style lang="less">
	.banner-wrap{
		.swiper{
			width: 100%;
			height:40vw;
			overflow: hidden;
			image{
				width: 100%;
				height: 100%;
			}
		}
	}
</style>
