<script>
export default {
	onLaunch: function() {
		const token = uni.getStorageSync("userInfo")
		if(!token){
			uni.reLaunch({
				url:"/pages/login/login?type=1"
			})
		}
	},
	onShow: function() {
		uni.getSystemInfo({
			success:res=>{
				this.$store.commit("getSystem",res)
			}
		})
	},
	onHide: function() {
		
	}
};
</script>

<style lang='scss'>
	@import "./common/css/icon.css";
	@import url("/common/css/animate.css");
	/* 解决头条小程序组件内引入字体不生效的问题 */
	/* #ifdef MP-TOUTIAO */
		@font-face {
			font-family: uniicons;
			src: url('/static/uni.ttf');
		}
		@font-face {
			font-family: uniicons;
			src: url('/static/iconfont.ttf');
		}
	/* #endif */
	.content{
		width:100%;
		/* background:#fff; */
	}
	page{
		background-color: #F5F5F5;
	}
	body{
		overflow-x: hidden;
	}
	::-webkit-scrollbar {  
	    display: none;  
	    width: 0 !important;  
	    height: 0 !important;  
	    -webkit-appearance: none;  
	    background: transparent;  
	}
	.popup-center{
		width:600upx;background-color: #fff;
		border-radius: 7upx;
		font-size: 22upx;
		display: flex;
		flex-direction: column;
		.item-list{
			padding:33upx;
		}
		.line{
			border-bottom:1upx solid #eee;
			margin:0 30upx
		}
		
	}
</style>
