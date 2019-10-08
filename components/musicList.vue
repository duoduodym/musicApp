<template>
	<view class="music-list">
		<view class="title-warp">
			<view class="icon-wrap">
				<view class="icon"></view>
				<text class="title">{{ title }}</text>
				<image :src="iconImg" class="hotImg" v-if="title == '热歌榜'"></image>
			</view>
			<text class="more">更多</text>
		</view>
		<view class="item-wrap">
			<view class="music-item" v-for="item in songList" @click="goPlay(item.song_id)">
				<view class="img-wrap"><image :src="item.pic_radio"></image></view>
				<text class="item-title">{{ item.title }}</text>
			</view>
			<view class="item-empty"></view>
		</view>
	</view>
</template>

<script>
export default {
	props: {
		title: String,
		songList:Array
	},
	data() {
		return {
			iconImg:require('@/static/hot.png')
		};
	},
	methods:{
		goPlay(id){
			uni.navigateTo({
			    url: '/pages/detail/detail?id='+id
			});
			this.$store.commit('changeCurrentId',id)
		}
	}
};
</script>

<style lang="less">
.music-list {
	margin-top: 10rpx;
	background: #fff;
	padding: 0 20rpx;
	background: #fff;
	margin-bottom: 20rpx;
	.title-warp {
		width: 100%;
		height: 100rpx;
		line-height: 100rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		.icon-wrap{
			display: flex;
			align-items: center;
			.icon{
				width: 10rpx;
				background:#D43C33;
				height: 60rpx;
				margin-right: 10rpx;
			}
			.hotImg{
				width:40rpx;
				height:40rpx;
				position: relative;
				top:-20rpx;
				right:-4rpx;
			}
		}
		.more {
			font-size: 30rpx;
			color: #666;
		}
	}
	.item-wrap {
		overflow: hidden;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		.music-item {
			flex: 0 0 222rpx;
			width: 222rpx;
			margin-bottom: 10rpx;
			border-radius: 10rpx;
			overflow: hidden;
			.item-title {
				display: block;
				width: 100%;
				color: #666;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
				font-size: 30rpx;
				line-height: 60rpx;
				text-align: center;
			}
			.img-wrap {
				height: 220rpx;
				image {
					width: 100%;
					height: 100%;
				}
			}
		}
		.item-empty {
			height: 0px;
			width: 222rpx;
		}
	}
}
</style>
