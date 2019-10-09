<template>
	<view class="search-wrap">
		<v-searchJHeader @onSearch="onSearch" @onCancel="onCancel" @onClear="onClear" :sKey="searchKey"/>
		<v-advertising :url="adUrl" class="ad"/>
		<scroll-view scroll-y="true" class="search-scroll">
			<view v-if="!isSearching">
				<view class="search-item-wrap">
					<view class="title">
						<view class="icon"></view>
						<text class="text">热门搜索</text>
					</view>
					<view class="tag-list">
						<view class="tag" v-for="item in hotList" :key="item.song_id" @click="onSearch(item.album_title)">{{item.album_title}}</view>
					</view>
				</view>
				<view class="search-item-wrap">
					<view class="title">
						<view class="icon"></view>
						<text class="text">历史搜索</text>
					</view>
					<view class="tag-list">
						<view class="tag" v-for="item in historyList" :key="item" @click="onSearch(item)">{{item}}</view>
					</view>
				</view>
			</view>
			<view class="search-list" v-else>
				<view v-for="item in searchList" :key="item.song_id" class="search-item" @click="onDetail(item.song_id)">
					<image :src="item.pic_small" class="small-pic"></image>
					<view class="info">
						<view class="item-title">{{item.title}}</view>
						<view class="item-author">{{item.author}}</view>
					</view>
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
			adUrl: require('@/static/advertising.png'),
			isSearching:false,
			searchList:[],
			total:0,
			searchKey:''
		};
	},
	methods: {
		getNew() {
			searchModel.getNew().then(res => {
				if(res.song_list){
					this.hotList = res.song_list
				}
			});
		},
		getHistory(){
			this.historyList = searchModel.getHistory()
			console.log(this.historyList)
		},
		onSearch(key){
			this.isSearching = true
			this.searchKey = key
			searchModel.searchByKey(key,1).then(res => {
				if(res.result && res.result.song_info.song_list){
					this.total = res.result.song_info.total
					this.searchList = res.result.song_info.song_list
					const arr = uni.getStorageSync('historyList') || [1]
					if(!arr.includes(key)){
						arr.unshift(key)
					}
					if(arr.length > 10){
						arr.pop()
					}
					uni.setStorageSync('historyList',arr)
					this.historyList = arr
				}
			})
		},
		onDetail(id){
			uni.navigateTo({
			    url: '/pages/detail/detail?id='+id
			});
			this.$store.commit('changeCurrentId',id)
		},
		onClear(){
			this.searchList = []
			this.isSearching = false
		},
		onCancel(){
			this.onClear()
			uni.switchTab({
			    url: '/pages/index/index'
			});
		}
	},
	onLoad() {
		this.getNew();
		this.getHistory()
	}
};
</script>

<style lang="less">
	@import url('search.less');
</style>
