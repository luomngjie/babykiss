const baseURL = "https://api.diewo.cn/index.php"

const token = uni.getStorageSync("token")||''
const http = (url, data, method = 'POST', isloading = false) => {
	return new Promise((resolve, reject) => {
		isloading && uni.showLoading({
			title: '加载中...',
			mask: true
		})
		{
			data = {
				...data,
				token:token
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
				if (res.data.code == 0) {
					uni.showToast({
						title: res.data.msg,
						icon: "none",
						duration: 2000,
						position: 'bottom',
						success() {
							setTimeout(() => {
								uni.hideToast()
							}, 2000)
						}
					})
				}
				if (res.data.code == 401) {
					uni.removeStorageSync('token')
					
				}
			}
		})
	})
}

export default http