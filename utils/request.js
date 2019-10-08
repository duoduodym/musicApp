import {serverConfig} from '@/config/server'
function request({url, data = {}, method = 'get',isBaseUrl = true}) {
	return new Promise((resolve, reject) => {
			uni.request({
					url:isBaseUrl ? serverConfig.apiBaseUrl + url : url, //仅为示例，并非真实接口地址。
					data,
					method,
					success: (res) => {
						if(res.data) resolve(res.data)
					},
					fail: () => {
						reject()
					}
			});
	})

}
export default request
