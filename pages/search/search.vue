<template>
	<view class="search-wrap">
		<v-searchJHeader @onSearch="onSearch" @onCancel="onCancel" @onClear="onClear" :sKey="searchKey"/>
		<v-advertising :url="adUrl" class="ad"/>
		<scroll-view scroll-y="true" class="search-scroll" @scrolltolower="onBottom">
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
				<view v-for="(item,index) in searchList" :key="index" class="search-item" @click="onDetail(item.song_id)">
					<image :src="item.pic_small" class="small-pic"></image>
					<view class="info">
						<view class="item-title">{{item.title}}</view>
						<view class="item-author">{{item.author}}</view>
					</view>
				</view>
			</view>
		</scroll-view>
		<v-loading/>
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
			searchKey:'',
			page:1,
			isLoading:false
		};
	},
	methods: {
		openLoading() {
			this.$store.commit('changeLoading', true);
		},
		closeLoading() {
			this.$store.commit('changeLoading', false);
		},
		lock(){
			this.isLoading = true
		},
		unLock(){
			this.isLoading = false
		},
		getNew() {
			this.openLoading()
			searchModel.getNew().then(res => {
				this.closeLoading()
				if(res.song_list){
					this.hotList = res.song_list
				}
			}).catch(()=>this.closeLoading());
		},
		getHistory(){
			this.historyList = searchModel.getHistory()
			console.log(this.historyList)
		},
		onSearch(key){
			this.openLoading()
			this.isSearching = true
			this.searchKey = key
			searchModel.searchByKey(key,this.page).then(res => {
				this.closeLoading()
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
			}).catch(()=>this.closeLoading())
		},
		loadMore(){
			if(this.isLoading){
				return
			}
			this.lock()
			this.openLoading()
			searchModel.searchByKey(this.searchKey,this.page++).then(res => {
				this.closeLoading()
				this.unLock()
				if(res.result && res.result.song_info.song_list){
					this.searchList = this.searchList.concat(res.result.song_info.song_list)
				}
			}).catch(()=>{
				this.closeLoading()
				this.unLock()
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
		},
		onBottom(){
			this.loadMore()
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
