<script>
export default {
	onLaunch: function() {
		
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
	/* #endif */
	.content{
		width:100%;
		background:#fff;
	}
	body{
		overflow-x: hidden;
	}
</style>
