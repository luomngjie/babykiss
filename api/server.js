const baseURL = "https://api.diewo.cn/index.php"


const http = (url, data, method = 'POST', isloading = false) => {
	return new Promise((resolve, reject) => {
		const token = uni.getStorageSync("userInfo")||''
		isloading && uni.showLoading({
			title: '加载中...',
			mask: true
		})
		{
			data = {
				...data,
				token:token.token
			}
		}
		
		uni.request({
			url: baseURL + url,
			data: data,
			header: {
				"Content-Type": "application/x-www-form-urlencoded"
			},
			method: method,
			success: function(res) {
				resolve(res.data)
			},
			fail: function(e) {
				reject(e)
			},
			complete(res) {
				uni.hideLoading()
				if (res.data.code == 401) {
					uni.showToast({
						title:res.data.msg,
						icon:"none"
					})
					setTimeout(()=>{
						uni.reLaunch({
							url:"/pages/login/login?type=1"
						})
					},1200)
					uni.removeStorageSync('token')
					
				}
			}
		})
	})
}

export default http