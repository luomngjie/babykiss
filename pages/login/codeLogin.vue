<template>
	<view class="content" :style="{'height':height+'px'}">
		<custom></custom>
		<view class="title code">输入验证码</view>
		<view class="tips">验证码已发送到:+86 &nbsp;{{phone}}</view>
		<validCode :maxlength="4" :isPwd="false" @finish="finish"></validCode>
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
				phone:"",
				count: 59,
				timer:null,
				codeTextShow:0,
				pwd:"",//注册账号，跳转密码登录
				wchart:{}//微信登录传的参数
			};
		},
		
		onLoad(opt) {
			this.phone=opt.tel
			this.pwd=opt.pwd
			this.height=this.$store.state.system.screenHeight
			if(opt.parame) this.wchart=JSON.parse(opt.parame)
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
			   this.count=59
			   this.getCode()
			   this.http("/sms/send",{mobile:this.phone},'',true).then(res=>{
				if(res.code==1){
					uni.showToast({
						title:res.msg,
						icon:"none"
					})
				}else{
					uni.showToast({
						title:res.msg,
						icon:"none"
					})
				}
			   })
			  
		   },
		   
			
		   /**
			* 验证码输入完成自动触发
			*/
		   finish(e){
			   if(this.pwd=="pwd"){
				   this.http("/sms/check",{mobile:this.phone,captcha:e}).then(res=>{
					   if(res.code==1){
						   let isCodeLogin=true
						    //密码登录
							uni.showToast({
								title:res.msg,
								icon:"none"
							})
							setTimeout(()=>{
								uni.reLaunch({
									url:"/pages/index/index"
								})
							},1200)
					   }else{
						   uni.showToast({
								title:res.msg,
								icon:"none"
						   })
					   }
				   })
				  
			   }else if(this.pwd=="code"){
				    //手机验证码登录
				   this.http("/user/mobilelogin",{code:e, mobile:this.phone}).then(res=>{
						 if(res.code==1){
							 uni.setStorageSync("userInfo",res.data.userinfo)
							 uni.showToast({
								title:res.msg,
								icon:"none",
								success:res=>{
									setTimeout(()=>{
										 uni.switchTab({url:"/pages/index/index"})
									},1200)
								}
							 })
						 }else{
							 uni.showToast({
								title:res.msg,
								icon:"none"
							 })
						 }
				   				
				   })
				   
				  
			   }else if(this.pwd=="qq"){
				   this.wchart.code = e
				   console.log(this.wchart)
				   this.http("/user/bind_mobile",this.wchart).then(res=>{
					   console.log(res)
				   })
				  
			   }
			 
			  
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
