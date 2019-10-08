import Vue from '@/main'
const detailModel = {
	getDetailById(id){
		return Vue.$http({
			url:`method=baidu.ting.song.play&songid=${id}`
		})
	},
	getLrcById(id){
		return Vue.$http({
			url:`method=baidu.ting.song.lry&songid=${id}`
		})
	}
}
export default detailModel