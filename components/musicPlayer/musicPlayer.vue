<template>
	<view class="music-player" @click="onStop">
		<image :src="songDetal.songinfo.pic_huge" class="bgImg" ></image>
		<view class="mask"></view>
		<image :src="stickImg" class="stickImg" :class="{'playing':isPlaying}"></image>
		<view class="play-wrap" :class="{'playing':isPlaying}">
			<image :src="playerBg" class="playerBg">
			<image :src="songDetal.songinfo.pic_radio" class="smImg"></image>
			<view class="play-btn" @click.stop="onPlay" v-if="!isPlaying">
				<image :src="playBtnImg" class="play-btn-img"></image>
			</view>
		</view>
		<view class="lrc-wrap"  id="lrcWrap">
			<view class="lrc-List"  id="lrcList" :style="{top:lTop}" :animation ="animationData">
				<view class="lrc-item" v-for="(val,key) in lrc" :class="{'active':currentTime == key}">{{val}}</view>
			</view>
			<view class="hide-item"></view>
		</view>
	</view>
</template>

<script>
	const innerAudioContext = uni.createInnerAudioContext();
	import {throttle} from 'utils/util'
	import { mapState } from 'vuex';
	export default {
		props:{
			lrc:Object,
			songDetal:Object
		},
		data() {
			return {
				playerBg:require('@/static/music@bg.png'),
				stickImg:require('@/static/stick.png'),
				playBtnImg:require('@/static/play.png'),
				playSrc:'',
				lrcWrapHeight:0,
				lrcListHeight:0,
				lrcItemHeight:0,
				lTop:0,
				currentTime:'',
				timeArray:[],
				dist:0,
				isPlaying:false
				
			};
		},
		computed:{
			...mapState(['playerStatus'])
		},
		watch:{
			lrc:{
				handler(){
					this.timeArray = Object.keys(this.lrc)
				},
				deep:true
			},
			songDetal:{
				handler(val){
					if(val) this.checkStatus(val)
				},
				deep:true
			},
			
		},
		methods:{
			onPlay(){
				innerAudioContext.src = this.songDetal.bitrate.file_link
				innerAudioContext.play()
				this.isPlaying = true
				this.$store.commit('changePlayStatus',true)
			},
			onStop(){
				innerAudioContext.pause()
				this.isPlaying = false
				this.$store.commit('changePlayStatus',false)
			},
			moveLrc(){
				if(this.isPlaying){
					this.timeArray.forEach((val,index) => {
						let  num = parseInt(this.lTop)	
						if(val == Math.floor(innerAudioContext.currentTime)){
								this.currentTime = Math.floor(innerAudioContext.currentTime)
								num = -index * this.lrcItemHeight
								this.lTop = num + 'px'
								return
						}
					})
				}
				
			},
			getItemHeight(){  //获取每一行歌词高度
				const query = uni.createSelectorQuery().in(this)
				const el4 = query.select('.hide-item')
				el4.fields({
					size:true
				},data=>{
					this.lrcItemHeight = data.height
				}).exec();
			},
			checkStatus(v){
				if(!this.playerStatus){
					this.isPlaying = false
					return
				}
				console.log(v.bitrate.file_link == innerAudioContext.src)
				if(v.bitrate.file_link == innerAudioContext.src){
					
					this.isPlaying = true
				}
			
			}
			
		},
		created(){
			this.moveLrc = throttle(this.moveLrc,1000)
			innerAudioContext.onTimeUpdate(()=>this.moveLrc())
		},
		mounted(){
			this.getItemHeight()
		}
	}
</script>

<style lang="less">
	@import url('musicPlayer.less');
</style>
