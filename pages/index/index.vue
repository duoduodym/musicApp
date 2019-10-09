<template>
	<view class="index-wrap">
		<v-headNav />
		<scroll-view scroll-y="true" class="scroll-musicList" :scroll-with-animation="true" 
		@scroll="onScroll"
		>
			<v-banner class="vb"/>
			<v-scrollNav class="vs" :class="{'fix':isFix}"/>
			<view class="hideNav" v-if="isFix"></view>
			<view><v-musicList title="热歌榜" :songList="hotList" id="hotSong" /></view>
			<view><v-musicList title="新歌榜" :songList="newList" id="newSong" /></view>
			<view><v-musicList title="摇滚榜" :songList="rockList" id="rockSong" /></view>
			<view><v-musicList title="欧美金曲" :songList="usaList" id="usaSong" /></view>
		</scroll-view>
		<v-loading :showLoading="showLoading" />
	</view>
</template>
<script>
import HomeModel from '@/apiModel/home';
import banner from '@/components/banner';
import scrollNav from '@/components/scrollNav';
import musicList from '@/components/musicList';
import advertising from '@/components/advertising';
import { mapState } from 'vuex';
import headNav from '@/components/headNav/headNav';
export default {
	components: {
		'v-banner': banner,
		'v-scrollNav': scrollNav,
		'v-musicList': musicList,
		'v-advertising': advertising,
		'v-headNav':headNav
	},
	data() {
		return {
			songList: [],
			hotList: [],
			newList: [],
			rockList: [],
			usaList: [],
			adUrl: require('@/static/advertising.png'),
			isFix:false,
			bannerH:0
		};
	},
	methods: {
		openLoading() {
			this.$store.commit('changeLoading', true);
		},
		closeLoading() {
			this.$store.commit('changeLoading', false);
		},
		getData() {
			this.openLoading();
			const p1 = HomeModel.getListByType(2, 6, 0);
			const p2 = HomeModel.getListByType(1, 6, 0);
			const p3 = HomeModel.getListByType(11, 6, 0);
			const p4 = HomeModel.getListByType(21, 6, 0);
			Promise.all([p1, p2, p3, p4]).then(res => {
				this.closeLoading();
				if (res[0].song_list) this.hotList = res[0].song_list;
				if (res[1].song_list) this.newList = res[1].song_list;
				if (res[2].song_list) this.rockList = res[2].song_list;
				if (res[3].song_list) this.usaList = res[3].song_list;
			}).catch(()=>this.closeLoading());
		},
		onScroll(ev){
			let h = ev.detail.scrollTop
			if(h >= this.bannerH){
				this.isFix = true
			}else{
				this.isFix = false
			}
		},
		getBannerHeight(){
			const query = uni.createSelectorQuery();
			query.select('.vb').boundingClientRect(data => {
				this.bannerH = data.height
			}).exec();
		}
	},
	computed: {
		...mapState(['scrollToView', 'showLoading'])
	},
	onLoad() {
		this.getData();
	},
	onReady(){
		this.getBannerHeight()
	}
};
</script>

<style lang="less">
.index-wrap {
	height: 100%;
	background: #f8f8f8;
	.scroll-musicList {
		position: absolute;
		top: 140rpx;
		left: 0;
		bottom: 0;
		width: 100%;
	}
	.hideNav{
		height: 100rpx;
		visibility: hidden;
		opacity: 0;
	}
	.vs.fix{
		position: fixed;
		width: 100%;
		left:0;
		top:140rpx;
		z-index: 10;
	}
}
</style>
