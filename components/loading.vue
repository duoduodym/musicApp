<template>
	<view class="loading-wrap" v-if="showLoading">
		<view class="round round1"></view>
		<view class="round round2"></view>
		<view class="round round3"></view>
		<view class="round round4"></view>
	</view>
</template>
<script>
import { mapState } from 'vuex';
export default {
	props:{
		showLoading:Boolean
	}
};
</script>
<style lang="less">
.loading-wrap {
	.round {
		position: absolute;
		margin-left: -5px;
		margin-top: -5px;
		width: 10px;
		height: 10px;
		box-sizing: border-box;
		border-radius: 50%;
	}
	.round1 {
		top: 50%;
		left: 52%;
		background: #ff6c6e;
		animation: mymove 0.5s 0s infinite alternate;
	}
	.round2 {
		top: 50%;
		left: 48%;
		background: #5bc6ab;
		animation: mymove2 0.5s 0s infinite alternate;
	}
	.round3 {
		top: 48%;
		left: 50%;
		background: #ec7546;
		animation: mymove3 1s 0s infinite alternate;
	}
	.round4 {
		top: 52%;
		left: 50%;
		background: #8364a4;
		animation: mymove4 1s 0s infinite alternate;
	}
	@keyframes mymove {
		from {
			left: 52%;
			transform: rotate(0deg);
		}
		to {
			left: 48%;
			transform: rotate(360deg);
			border-color: #159de3;
		}
	}
	@keyframes mymove2 {
		from {
			left: 48%;
			transform: rotate(0deg);
		}
		to {
			left: 52%;
			transform: rotate(360deg);
			border-color: blue;
		}
	}
	@keyframes mymove3 {
		from {
			top: 48%;
			transform: rotate(0deg);
		}
		to {
			top: 52%;
			transform: rotate(360deg);
			border-color: green;
		}
	}
	@keyframes mymove4 {
		from {
			top: 52%;
			transform: rotate(0deg);
		}
		to {
			top: 48%;
			transform: rotate(360deg);
			border-color: #159dd6;
		}
	}
}


</style>
