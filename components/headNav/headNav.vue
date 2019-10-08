<template>
	<view class="head-nav">
		<view class="search-box">
			<view class="icon">&#xe604;</view>
			<text class="text">搜索</text>
		</view>
		<view class="musicIcon" :class="{'active':playerStatus}" @click="goBack" v-if="currentId">&#xe607;</view>
	</view>
</template>

<script>
import { mapState } from 'vuex';
export default {
	methods:{
		goBack(){
			uni.navigateTo({
			    url: '/pages/detail/detail?id='+this.currentId
			});
		}
	},
	computed: {
		...mapState(['playerStatus','currentId'])
	}
};
</script>
<style lang="less">
@import url('headNav.less');
</style>
