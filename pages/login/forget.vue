<template>
	<view class="content" :style="{'height':height+'px'}">
		<custom  :isLeft="true" title="找回密码"></custom>
		<view class="forget">
			<view class="forget-title" style="color: #212832;">找回密码</view>
			<view class="forget-con">
				<view class="forget-align">
					<text class="" style="#212832">+86</text>
					<input class="" maxlength="11" v-model="phone" type="number" placeholder="请输入手机号码" />
					<image src="../../static/img/cha.png" class="clear" v-if="phone.length>0" @tap.stop="clearPhone"></image>
				</view>
				<view class="forget-code">
					<input class="forget-input" type="number" maxlength="6" v-model="code" placeholder="请输入验证码" />
					<image src="../../static/img/cha.png" class="clear" v-if="code.length>0" @tap.stop="clearCode" style="margin-right: 10px; width: 22px;"></image>
					<text @tap.stop="getcode" :class="{bggray: codeTextShow == 1 || phone.length<11}"  class="forget2">
						{{codeTextShow==0?codeText.getCode: codeTextShow==1?count + codeText.countDown: codeText.getAgain}}
					</text>
				</view>
			</view>
			<view class="btn">
				<button class="forget-btn" :class="{disable: code.length<6}" @tap.stop="next" type="default">提交</button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				height:0,
				phone: '',
				code: '',
				timer: null,
				count: 59,
				codeTextShow: 0,
				codeText: {
					getCode: '获取验证码',
					countDown: 's秒后重发',
					getAgain: '重新获取',
				},
				disabled: false
			}
		},
		onLoad() {
			this.height=this.$store.state.system.screenHeight
		},
		methods: {
			next() {
				if(this.code.length<6) {
					return
				}
				if (!(/^1[3456789]\d{9}$/.test(this.phone))) {
					uni.showToast({
						title:"手机号输入不正确，请重新输入",
						icon:"none"
					})
					return
				}
				if (this.code == '' || this.code == null) {
					uni.showToast({
						title:"请输入验证码",
						icon:"none"
					})
					return
				}
				let params = {
					mobile: this.phone,
					code : this.code
				}
				// this.http('/user/resetpwd_first', params).then(res=>{
				// 	if(res.code == 1){
				// 		this.router.push(`/pages/client/forget/resetPwd?mobile=${this.phone}`)
						
				// 	}
				// })
				
			},
			getcode() {
				let self = this
				if (self.disabled) {
					return
				}
				if (!(/^1[3456789]\d{9}$/.test(self.phone))) {
					uni.showToast({
						title:"手机号输入不正确，请重新输入",
						icon:"none"
					})
					return
				}
				self.codeTextShow = 1
				self.disabled = true
				let params = {
					mobile: self.phone,
					event: 'resetpwd'
				}
				// self.http('/sms/send', params).then(res => {
				// 	if(res.code == 1){
				// 		this.$toast(res.msg)
				// 	}
				// })
				self.timer = setInterval(() => {
					--self.count
					if (self.count < 0) {
						self.codeTextShow = 2
						self.disabled = false
						self.count = 59
						clearInterval(self.timer)
						self.timer = null
					}
				}, 1000)
			},
			clearPhone() {
				this.phone = ''
			},
			clearCode() {
				this.code = ''
			},
		}
	}
</script>

<style lang="scss" scoped>
	.content{
		.forget{
			margin-top: 100upx;
			.forget-title{
				text-align: center;
				font-size: 32upx;
			}
			.forget-con{
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				.forget-align,.forget-code{
					display: flex;
					flex-direction: row;
					width: 677upx;
					align-items: center;
					justify-content: flex-start;
					border-bottom:1px solid #eee;
					margin:33upx;padding-bottom: 20upx;
					text{
						margin-right: 20upx;
					}
					input{
						width:100%;height:100%;
					}
					.clear{
						width:30upx;height:30upx;
					}
				}
				.forget-code{
					text{
						width:230upx;
						font-size: 26upx;background-color: #eee;
						color:#fff;border-radius: 20upx;
						text-align: center;height:50upx;
						line-height: 50upx;
					}
				}
			}
			.btn{
				width: 300px;
				margin: 0 auto;
				button{
					border-radius: 24px;
					color:#fff;background-color: #FFBF29;
					&.disable{
						background:rgba(221,221,221,1);
						box-shadow:0px 7upx 20upx 0px rgba(221,221,221,0.16);
						color: #fff;
					}
				}
			}
		}
	}
</style>
