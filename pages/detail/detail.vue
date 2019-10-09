<template>
	<view class="detail-wrap">
		<v-detailNav />
		<v-player :lrc="lrc" :songDetal="songInfo"/>
		<v-loading/>
	</view>
</template>
<script>
	import detailModel from '@/apiModel/detail'
	import musicPlayer from '@/components/musicPlayer/musicPlayer.vue'
	import {parseLyric} from '@/utils/util'
	import detailNav from '@/components/detailNav.vue'
	export default {
		components:{
			'v-player':musicPlayer,
			'v-detailNav':detailNav
		},
		data(){
			return {
				lrc:null,
				songInfo:null,
				id:''
			}
		},
		methods:{
			openLoading() {
				this.$store.commit('changeLoading', true);
			},
			closeLoading() {
				this.$store.commit('changeLoading', false);
			},
			getDetail(id){
					this.openLoading();
					const p1 = detailModel.getDetailById(id)
					const p2 = detailModel.getLrcById(id)
					Promise.all([p1,p2]).then((res)=>{
						if(res[0]) {
							this.songInfo = res[0]
						}
						if(res[1]){
							const  lrc = res[1].lrcContent
							this.lrc = parseLyric(lrc)
						}
						this.closeLoading()
					}).catch(()=>this.closeLoading())
			}
		},
		onLoad(option){
			this.id = option.id
		},
		onReady(){
			this.getDetail(this.id)
		}
	}
</script>

<style lang="less">
	.detail-wrap{
		position: relative;
		height:100%;
	}
		
</style>
