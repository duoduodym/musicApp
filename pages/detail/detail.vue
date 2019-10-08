<template>
	<view class="detail-wrap">
		<v-detailNav />
		<v-player :lrc="lrc" :songDetal="songInfo"/>
		<v-loading class="loading" :showLoading="showLoading" />
	</view>
</template>
<script>
	import detailModel from '@/apiModel/detail'
	import musicPlayer from '@/components/musicPlayer/musicPlayer.vue'
	import {parseLyric} from '@/utils/util'
	import detailNav from '@/components/detailNav.vue'
	import loading from '@/components/loading';
	import { mapState } from 'vuex';
	export default {
		components:{
			'v-player':musicPlayer,
			'v-detailNav':detailNav,
			'v-loading': loading
		},
		data(){
			return {
				lrc:null,
				songInfo:null
			}
		},
		computed: {
			...mapState(['showLoading'])
		},
		methods:{
			openLoading() {
				this.$store.commit('changeLoading', true);
			},
			closeLoading() {
				console.log('进来了')
				this.$store.commit('changeLoading', false);
			},
			getDetail(option){
				if(!uni.getStorageSync(`song-${option.id}`) || !uni.getStorageSync(`lrc-${option.id}`)){
					this.openLoading();
					console.log('没缓存')
					const p1 = detailModel.getDetailById(option.id)
					const p2 = detailModel.getLrcById(option.id)
					Promise.all([p1,p2]).then((res)=>{
						if(res[0]) {
							this.songInfo = res[0]
							uni.setStorageSync(`song-${option.id}`,this.songInfo)
						}
						if(res[1]){
							const  lrc = res[1].lrcContent
							uni.setStorageSync(`lrc-${option.id}`,lrc)
							this.lrc = parseLyric(lrc)
						}
						this.closeLoading()
					}).catch(()=>this.closeLoading())
				}else {
					console.log('有缓存')
					this.songInfo = uni.getStorageSync(`song-${option.id}`)
					const  lrc = uni.getStorageSync(`lrc-${option.id}`)
					this.lrc = parseLyric(lrc)
				}
				
			}
		},
		onLoad(option){
			this.getDetail(option)
		}
	}
</script>

<style lang="less">
	.detail-wrap{
		position: relative;
		height:100%;
	}
		
</style>
