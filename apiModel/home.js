import Vue from '@/main'
const HomeModel = {
	getListByType(type, size, offset) {
		return Vue.$http({
			url:`method=baidu.ting.billboard.billList&type=${type}&size=${size}&offset=${offset}`
		})
	},
	searchByKey() {
		return Vue.$http({
			url:'method=baidu.ting.search.catalogSug&query=我和我的祖国'
		})
	},
	getAblumDetail(id,isBaseUrl){
		return Vue.$http({
			url:`http://music.taihe.com/data/tingapi/v1/restserver/ting?method=baidu.ting.album.getAlbumInfo&album_id=${id}&from=web`,
			isBaseUrl
		})
	}
	
}
export default HomeModel
