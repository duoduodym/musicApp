<template>
	<view class="detail-wrap">
		<v-player :lrc="lrc" :songDetal="songInfo"/>
	</view>
</template>
<script>
	import detailModel from '@/apiModel/detail'
	import musicPlayer from '@/components/musicPlayer/musicPlayer.vue'
	import {parseLyric} from '@/utils/util'
	export default {
		components:{
			'v-player':musicPlayer
		},
		data(){
			return {
				lrc:null,
				songInfo:null
			}
		},
		methods:{
			getDetail(option){
				const p1 = detailModel.getDetailById(option.id)
				const p2 = detailModel.getLrcById(option.id)
				Promise.all([p1,p2]).then((res)=>{
					if(res[0]) this.songInfo = res[0]
					if(res[1]){
						const  lrc = res[1].lrcContent
						this.lrc = parseLyric(lrc)
					}
					
				})
			}
		},
		onLoad(option){
			this.getDetail(option)
		}
	}
</script>

<style lang="less">
	.detail-wrap{
		height:100%;
	}
		
</style>
