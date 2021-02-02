export default function $http(options) {
	const { url,data } = options
	const dataObj = {
		user_id : '5ff5c3a04d4a960001a04677',
		...data
	}
	return new Promise((reslove,reject) => {
		uniCloud.callFunction({
			name: url,
			data :dataObj
		}).then(res => {
			if(res.result.code === 200){
				reslove(res.result)
			}else {
				reject(res.result)
			}
		}).catch(err => {
			reject(err)
		}) 
	})
}