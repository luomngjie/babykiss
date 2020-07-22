<template>
	<view class="content" :style="{'height':height+'px'}">
		<custom></custom>
		<view class="title code">输入验证码</view>
		<view class="tips">验证码已发送到:+86 &nbsp;{{phone}}</view>
		<validCode :maxlength="4" :isPwd="false" @finish="finish"></validCode>
		<view class="time" v-if="count>0">{{count}}秒后重新获取</view>
		<view class="time" v-if="count==0" @tap.stop="againCode">重新获取</view>
		<view class="time" v-if="count>0">{{count}}秒后重新获取</view>
		<view class="time" v-if="count==0" @tap.stop="againCode">重新获取</view>
	</view>
</template>

<script>
	import validCode from '@/components/validCode/validCode.vue'
	export default {
		components:{
			validCode
		},
		data() {
			return {
				height:0,
				phone:"18223138790",
				count: 10,
				codeText: {
					getCode: '重新获取',
					countDown: 's秒后重发	',
					getAgain: '获取验证码',
				},
				timer:null,
				codeTextShow:0
			};
		},
		
		onLoad() {
			this.height=this.$store.state.system.screenHeight
			this.getCode()
		},
		methods:{
		   /**
			* @param {Object} e
			* 倒计时
			*/
		   getCode(e){
			   let self=this;
			   self.timer = setInterval(() => {
			   	--self.count
			   	if (self.count < 0) {
			   		self.codeTextShow = 2
			   		self.disabled = false
			   		self.count = 0
			   		clearInterval(self.timer)
			   		self.timer = null
			   	}
			   }, 1000)
		   },
		   
			
		   /*
		   重新获取*
			*/
		   againCode(){
			   this.count=10
			   this.getCode()
		   },
		   
			
		   /**
			* 验证码输入完成自动触发
			*/
		   finish(e){
			   console.log(13)
			   uni.switchTab({url:"/pages/index/index"})
		   }
		   
		}
	}
</script>

<style lang="scss" scoped>
	.title,.tips{
		display: flex;
		justify-content: center;
	}
	.code{
		margin-top:60upx;
	}
	.tips{
		font-size: 26upx;
		margin:33upx 0;
	}
	
	.time{
		margin: 0 auto;
		width: 40%;text-align: center;
		font-size: 22upx;margin-top: 20upx;
	}
	
</style>
