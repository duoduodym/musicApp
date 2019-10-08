<template>
	<view class="search-wrap">
		<v-searchJHeader />
		<v-advertising :url="adUrl" class="ad"/>
		<scroll-view scroll-y="true" class="search-scroll">
			<view class="search-item-wrap">
				<view class="title">
					<view class="icon"></view>
					<text class="text">热门搜索</text>
				</view>
				<view class="tag-list">
					<view class="tag" v-for="item in hotList" :key="item.song_id">{{item.album_title}}</view>
				</view>
			</view>
			<view class="search-item-wrap">
				<view class="title">
					<view class="icon"></view>
					<text class="text">历史搜索</text>
				</view>
				<view class="tag-list">
					<view class="tag" v-for="item in historyList" :key="item">{{item}}</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
import searchJHeader from '@/components/searchJHeader.vue';
import searchModel from '@/apiModel/search';
import advertising from '@/components/advertising';
export default {
	components: {
		'v-searchJHeader': searchJHeader,
		'v-advertising': advertising,
	},
	data() {
		return {
			hotList:[],
			historyList:[],
			adUrl: require('@/static/advertising.png')
		};
	},
	methods: {
		getNew() {
			searchModel.getNew().then(res => {
				console.log(res);
				if(res.song_list){
					this.hotList = res.song_list
				}
			});
		}
	},
	onLoad() {
		this.getNew();
	}
};
</script>

<style lang="less">
.search-wrap {
	.search-scroll {
		position: absolute;
		top: 300rpx;
		left: 0;
		width: 100%;
		bottom: 0;
		padding: 0 20rpx;
		box-sizing: border-box;
		.title {
			display: flex;
			align-items: center;
			height:100rpx;
			font-size: 36rpx;
			.icon {
				width: 8rpx;
				background: #d43c33;
				height: 40rpx;
				margin-right: 10rpx;
			}
		}
		.tag-list{
			display: flex;
			flex-wrap:wrap;
			.tag{
				margin-right: 20rpx;
				color: #666;
				font-size: 32rpx;
				height:60rpx;
				line-height: 60rpx;
				padding: 0 20rpx;
				border:1px solid #e5e5e5;
				border-radius: 10rpx;
				margin-bottom: 20rpx;
				color: #666;
			}
		}
	}
}
</style>
