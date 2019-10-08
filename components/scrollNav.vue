<template>
	<view class="scroll-nav">
		<view class="scroll-view-item_H" v-for="item in typeList" :key="item.type" :class="{ active: item.type === currentType }" @click="onSelect(item.type)">
			<view class="text-wrap">
				<text class="text">{{ item.name }}</text>
			</view>
		</view>
	</view>
</template>
<script>
export default {
	data() {
		return {
			currentType: 2,
			typeList: [
				{
					type: 2,
					name: '热歌榜'
				},
				{
					type: 1,
					name: '新歌榜'
				},
				{
					type: 11,
					name: '摇滚榜'
				},
				{
					type: 21,
					name: '欧美金曲'
				}
			]
		};
	},
	methods: {
		onSelect(type) {
			this.currentType = type;
			let typeStr = '';
			if (type == 2) typeStr = 'hotSong';
			else if (type == 1) typeStr = 'newSong';
			else if (type == 11) typeStr = 'rockSong';
			else if (type == 21) typeStr = 'usaSong';
			this.$store.commit('changeScroll', typeStr);
		}
	}
};
</script>

<style lang="less">
.scroll-nav {
	display: flex;
	align-items: center;
	background: #fff;
	width: 100%;
	box-sizing: border-box;
	padding: 0 10rpx;
	height:100rpx;
	.scroll-view-item_H {
		display: inline-block;
		flex:1;
		text-align: center;
		padding: 0 20rpx;
		box-sizing: border-box;
		height: 80rpx;
		line-height: 80rpx;
		.text-wrap {
			max-width: 100%;
			position: relative;
			.text {
				color: #666;
				font-size: 36rpx;
				&:after {
					content: '';
					position: absolute;
					left: 0;
					bottom: -1px;
					z-index: 3;
					width: 100%;
					height: 4px;
					-webkit-transform: scaleY(0.5);
					background: #1296db;
					visibility: hidden;
					opacity: 0;
				}
			}
		}
		&.active {
			.text {
				color: #1296db;
				&:after {
					visibility: visible;
					opacity: 1;
				}
			}
		}
	}
}
</style>
