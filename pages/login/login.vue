<template>
	<view class='content' :style="{'height':height+'px'}">
		<custom v-if="type==0"></custom>
		<custom v-if="type==1 && isCodeLogin" rightText="遇到问题" :back="false"  @click-right="popup"></custom>
		<view class="login">{{type==0?'注册':'登录'}}</view>
		<view class="log_input">
			
			<view class="tel">
				<view class="tel_number">
					<view class="phone">{{!isCodeLogin?"+86":"用户名:"}}</view>
					<image src="../../static/img/san.png" class="san" v-if="!isCodeLogin"></image>
				</view>
				<input maxlength="11" v-if="!isCodeLogin" class="number" v-model="userInfo.tel" type="number" value="" placeholder="请输入手机号码" placeholder-style="color:#F3F3F3;font-size:26upx;"/>
				<input class="number" v-else v-model="userInfo.name" type="text" value="" placeholder="请输入用户名" placeholder-style="color:#F3F3F3;font-size:26upx;"/>
				<image src="../../static/img/cha.png" class="clear" v-if="!isCodeLogin&&userInfo.tel.length>0" @tap.stop="clearPhone"></image>
			</view>
			<view class="tel password" v-if="isCodeLogin">
				<view class="tel_number">
					<view class="pass">密码</view>
				</view>
				<input maxlength="16" class="number" v-model="userInfo.password" type="password" value="" placeholder="输入密码(至少6位)" placeholder-style="color:#F3F3F3;font-size:26upx;"/>
				<image src="../../static/img/cha.png" class="clear" v-if="userInfo.password.length>0" @tap.stop="clearPassword"></image>
			</view>
		</view>
		<view class="sublime" :class="{bggray: userInfo.codeTextShow == 1 || userInfo.tel.length<11}" @tap.stop="login" v-if="!isCodeLogin">获验证码</view>
		<view class="sublime" :class="{bggray: userInfo.name==0 || userInfo.password<6}" @tap.stop="login" v-else>登录</view>
		<view class="around-tip" v-if="type==1">
			<view class="tips" @tap.stop="codeReg" >{{isCodeLogin?(userInfo.codeTextShow==0?codeText.getCode: userInfo.codeTextShow==1?count + codeText.countDown: codeText.getAgain):'密码登录'}}</view>
			<view class="tips" @tap.stop="regNewNumber">注册账号</view>
		</view>
		<view class="other-login" >
			<view class="other-tip" v-if="type==1">其他登录方式</view>
			<view class="list" v-if="type==1">
				<image src="../../static/img/weixin.png" mode="widthFix" class="img" @tap.stop="quickLogin('weixin', 1)"></image>
				<image src="../../static/img/qq.png" mode="widthFix" class="img" @tap.stop="quickLogin('qq', 2)"></image>
			</view>
			<view class="clause">
				<text>隐私条款</text>和<text>服务协议</text>
			</view>
		</view>
		<uni-popup type="center" ref="popup" zIndex="999">
			<view class="popup-center">
				<view class="item-list">提示</view>
				<view class="line"/>
				<view class="item-list" @click="forget">忘记密码</view>
				
			</view>
		</uni-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userInfo:{
					tel:"",
					password:'',
					name:"",//用户名
					codeTextShow:0
				},
				codeText: {
					getCode: '验证码登录',
					countDown: 's秒后重发	',
					getAgain: '获取验证码',
				},
				
				isCodeLogin:false,
				type:"",
				height:0
				
			};
		},
		
		onLoad(opt) {
			this.type=opt.type
			if(opt.isCodeLogin) this.isCodeLogin = opt.isCodeLogin
			this.height=this.$store.state.system.screenHeight+200
		},
		
		methods:{
			/**
			 * 清除手机号
			 */
			clearPhone(){
				this.userInfo.tel = ''
			},
			
			
			/**
			 * 清除密码
			 */
			clearPassword() {
				this.userInfo.password = ''
			},
			
			/**
			 * 验证码登录
			 */
			codeReg(){
				this.isCodeLogin=!this.isCodeLogin;
			},
			
			/**
			 * 注册新账户
			 */
			regNewNumber(){
				uni.navigateTo({
					url:"/pages/login/login?type="+"0"
				})
			},
			
			/**
			 * 获取表单数据实现登录
			 */
			login(){
				let valLoginRes
				if(this.isCodeLogin){
					if(this.userInfo.name.length==0){
						uni.showToast({
							title:"请填写用户名",
							icon:"none"
						})
						return 
					}
					let loginRules = [
					  // {name: 'userName', required: true, type: 'phone', errmsg: '请输入正确的用户名'},
					  {name: 'password',required: true, type: 'required', errmsg: '请输入密码'},
					  {name: 'password', type: 'pwd', errmsg: '密码须是6～16位字符'},
					]
					valLoginRes = this.$validate.validate(this.userInfo, loginRules)
				}else{
					let code = [
						{name: 'tel', required: true, type: 'phone', errmsg: '请输入正确的手机号'},
					  // {name: 'telCode', type: 'required', errmsg: '请输入验证码'},
					  // {name: 'telCode', type: 'lengthRange', min: 6, max: 6, errmsg: '请正确输入验证码'}
					]
					valLoginRes = this.$validate.validate(this.userInfo, code)
				}
				if (!valLoginRes.isOk) {
				  uni.showToast({
					icon: 'none',
					title: valLoginRes.errmsg
				  })
				  return false
				}else{
					if(!this.isCodeLogin){//验证码登录/注册账号
						let obj = {mobile:this.userInfo.tel}
						this.send("/sms/send",obj)
					}else if(this.isCodeLogin){
						//密码登录
						let obj = {password:this.userInfo.password,account:this.userInfo.name}
						this.send("/user/login",obj)
					}
					
				}
				
			},
			
			/**
			 * 根据状态判断获取验证码或者登录
			 */
			send(url,obj){
				let self=this
				this.http(url,obj,'',true).then(res=>{
					if(res.code==1){
						uni.showToast({
							title:res.msg,
							icon:"none"
						})
						setTimeout(()=>{
							if(!self.isCodeLogin){
								//验证码登录
								if(self.type==1){
									uni.navigateTo({
										url:"/pages/login/codeLogin?tel="+this.userInfo.tel+"&pwd="+'code'
									})
								}else if(self.type==0){
									//注册
									uni.navigateTo({
										url:"/pages/login/codeLogin?tel="+this.userInfo.tel+"&pwd="+'pwd'
									})
								}
							}else{
								//密码登录
								uni.reLaunch({
									url:"/pages/index/index"
								})
							}
							
						},1200)
					}else{
						uni.showToast({
							title:res.msg,
							icon:"none"
						})
					}
				})
			},
			
			/**
			 * 遇到问题弹窗
			 */
			popup(){
				this.$refs["popup"].open()
			},
			
			/**
			 * 其他三方登录
			 */
			quickLogin(provider, type){
				let self = this
				if(type==2){
					uni.showToast({
						title:'暂未开通QQ登录,请选择微信登录或者密码、验证码登录。',
						icon:"none"
					})
					return
				}
				uni.login({
					provider: provider,
					success(){
						uni.getUserInfo({
							provider: provider,
							success(result){
								let obj = {}
								let openId = result.userInfo.openId
								let nickName = result.userInfo.nickName
								let avatarUrl = ''
								obj.openid = result.userInfo.openId
								//obj.nickname = result.userInfo.nickName
								
								if(type == 1){
									avatarUrl = result.userInfo.avatarUrl
								}else {
									avatarUrl = result.userInfo.figureurl_qq || result.userInfo.avatarUrl
								}
								//obj.avatar = avatarUrl
								//obj.type = type
								
								
								self.http("/user/get_wx",obj).then(res=>{
									if(res.code==1){
										uni.setStorage({
											key: 'userInfo',
											data: res.data.userinfo
										})
										self.$toast(res.msg, ()=>{
											setTimeout(() => {
												uni.switchTab({
													url: '/pages/index/index'
												})
											}, 1000)
										}, 1000)
									}else{
										if(res.data){
											if(res.data.jump_code == 1){
												uni.showToast({
													title:res.msg,
													icon:'none'
												})
												setTimeout(()=>{
													uni.reLaunch({
														url:"/pages/login/wxPhone?openid="+openId+"&nickname="+nickName+"&avatar="+avatarUrl
													})
												},1200)
												
											}
										}
									}
								})
								
							}
						})
					}
				})
			},
			
			
			/*
			忘记密码*
			 */
			forget(){
				uni.navigateTo({
					url:"/pages/login/forget"
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.content{
		background-color: #fff;
		position: fixed;
		.login{
			display: flex;
			justify-content: center;
			margin:130upx;
		}
		.log_input{
			display: flex;
			flex-direction: column;
			
			.tel{
				display: flex;
				align-items: center;
				justify-content: space-around;
				border-bottom: 1px solid #eee;
				margin:30upx 33upx;
				padding:20upx 0;
				input{
					color:#F3F3F3;
				}
				.tel_number{
					display: flex;
					align-items: center;
					.phone{
						font-size: 26upx;
					}
					.san{
						displa:flex;
						flex-direction: row;
						flex-wrap: nowrap;
						width:40upx;
						height:40upx;
					}
				}
				.number{
					flex: 1;margin-left:20upx;
					color:#aaa;
				}
				.clear{
					width:30upx;height:30upx;
				}
			}
			.password{
				.pass{
					font-size: 26upx;
					margin-right: 40upx;
				}
			}
		}
		
		.sublime{
			border-radius: 20px;
			background-color: #FFBF29;
			color:#fff;width:80%;
			margin: 0 auto;
			height:80upx;
			text-align: center;
			line-height: 80upx;
			font-size: 32upx;
			margin-top: 60upx;
		}
		
		.around-tip{
			display: flex;
			justify-content: space-between;
			margin:36upx 75upx;
			color:#BBBBBB;font-size: 22upx;
		}
		
		.other-login{
			display: flex;
			justify-content: center;
			flex-direction: column;
			align-items: center;
			position: fixed;
			width: 100%;
			bottom: 60upx;
			.clause{
				font-size: 22upx;color:#aaa;
				// margin-top:10upx;
				// margin-top:40upx;
				text-align: center;
				text{
					border-bottom: 1px solid #aaa;
				}
			}
			.other-tip{
				font-size: 26upx;
				color:#aaa;margin-bottom:33upx;
			}
			.list{
				display: flex;
				justify-content: space-between;
				.img{
					width:100upx;height: 100upx;
					margin:0 103upx;
				}
			}
			
		}
		
		
		
		.bggray{
			background-color: #dddddd;
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
				border-bottom:2upx solid #eee;
				margin:0 30upx
			}
			
		}
	}
	
</style>
