<script>
export default {
	onLaunch: function() {
		// uni.setTabBarBadge({
		//   index: 0,
		//   text: '1'
		// })
	},
	onShow: function() {
		uni.getSystemInfo({
			success:res=>{
				this.$store.commit("getSystem",res)
			}
		})
	},
	onHide: function() {
		
	},
	onLoad() {
		
	}
};
</script>

<style lang='scss'>
	@import "./common/css/icon.css";
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
		background:#fff;
	}
	page{
		background-color: #F5F5F5;
	}
	body{
		overflow-x: hidden;
	}
</style>
