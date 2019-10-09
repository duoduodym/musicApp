import Vue from '@/main'
const searchModel = {
	getNew(){
		return Vue.$http({
			url:`from=qianqian&version=2.1.0&method=baidu.ting.plaza.getNewSongs&format=json&limit=10`
		})
	},
	getHistory(){
		return uni.getStorageSync('historyList') || []
	},
	searchByKey(key,page){
		return Vue.$http({
			url:`from=android&version=5.6.5.0&method=baidu.ting.search.merge&format=json&query=${key}&page_no=${page}&page_size=10&type=-1&data_source=0&use_cluster=1`
		})
	}

}
export default searchModel