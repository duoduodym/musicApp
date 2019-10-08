import Vue from '@/main'
const detailModel = {
	getNew(){
		return Vue.$http({
			url:`from=qianqian&version=2.1.0&method=baidu.ting.plaza.getNewSongs&format=json&limit=10`
		})
	}
}
export default detailModel