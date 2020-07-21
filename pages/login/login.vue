<template>
	<view class='content'>
		<custom v-if="type==0"></custom>
		<custom v-if="type==1 && isCodeLogin" rightText="遇到问题" :back="false" :borfrt="false"></custom>
		<view class="login">{{type==0?'注册':'登录'}}</view>
		<view class="log_input">
			<view class="tel">
				<view class="tel_number">
					<view class="phone">+86</view>
					<image src="../../static/img/san.png" class="san"></image>
				</view>
				<input maxlength="11" class="number" v-model="userInfo.tel" type="number" value="" placeholder="请输入手机号码" placeholder-style="color:#F3F3F3;font-size:26upx;"/>
				<image src="../../static/img/cha.png" class="clear" v-if="userInfo.tel.length>0" @tap.stop="clearPhone"></image>
			</view>
			<view class="tel password" v-if="isCodeLogin">
				<view class="tel_number">
					<view class="pass">密码</view>
				</view>
				<input maxlength="16" class="number" v-model="userInfo.password" type="password" value="" placeholder="输入密码(至少6位)" placeholder-style="color:#F3F3F3;font-size:26upx;"/>
				<image src="../../static/img/cha.png" class="clear" v-if="userInfo.password.length>0" @tap.stop="clearPassword"></image>
			</view>
		</view>
		<view class="sublime" :class="{bggray: userInfo.codeTextShow == 1 || userInfo.tel.length<11}" @tap.stop="login">{{isCodeLogin?'登录':'获验证码'}}</view>
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
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userInfo:{
					tel:"",
					password:'',
					codeTextShow:0
				},
				codeText: {
					getCode: '验证码登录',
					countDown: 's秒后重发	',
					getAgain: '获取验证码',
				},
				
				isCodeLogin:false,
				type:""
				
			};
		},
		
		onLoad(opt) {
			this.type=opt.type
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
				let url
				if(this.isCodeLogin){
					let loginRules = [
					  {name: 'tel', required: true, type: 'phone', errmsg: '请输入正确的手机号'},
					  {name: 'password', type: 'required', errmsg: '请输入密码'},
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
					if(this.isCodeLogin){
						url="/user/login"
						this.send(url)
					}else{
						url="/sms/send"
						this.send(url)
					}
					//uni.navigateTo({url:"/pages/login/codeLogin"})
				}
				
			},
			
			/**
			 * 根据状态判断获取验证码或者登录
			 */
			send(url){
				let self=this
				this.http({
					url:url,
					data:{
						mobile:self.userInfo.tel
					}
				}).then(res=>{
					console.log(res)
				}).catch(err=>{
					console.log(err)
				})
			},
			
			/**
			 * 其他三方登录
			 */
			quickLogin(provider, type){
				let self = this
				uni.login({
					provider: provider,
					success(){
						uni.getUserInfo({
							provider: provider,
							success(result){
								let openId = result.userInfo.openId
								let nickName = result.userInfo.nickName
								let avatarUrl = ''
								if(type == 1){
									avatarUrl = result.userInfo.avatarUrl
								}else {
									avatarUrl = result.userInfo.figureurl_qq || result.userInfo.avatarUrl
								}
								self.http("/user/get_wx",{
									openid:openId
								}).then(res=>{
									console.log(res)
									// uni.navigateTo({
									// 	url:"/pages/login/wxPhone"
									// })
								}).catch(err=>{
									console.log(err)
								})
							}
						})
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.content{
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
	}
	
</style>
