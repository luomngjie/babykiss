<template>
	<view class='content'>
		<custom ></custom>
		<view class="login">输入密码</view>
		<view class="log_input">
			<view class="tel">
				<view class="tel_number">
					<view class="phone">+86</view>
					<image src="../../static/img/san.png" class="san"></image>
				</view>
				<input maxlength="11" class="number" v-model="userInfo.tel" type="number" value="" placeholder="请输入手机号码" placeholder-style="color:#F3F3F3;font-size:26upx;"/>
				<image src="../../static/img/cha.png" class="clear" v-if="userInfo.tel.length>0" @tap.stop="clearPhone"></image>
			</view>
			<view class="tel password" >
				<view class="tel_number">
					<view class="pass">密码</view>
				</view>
				<input maxlength="16" class="number" v-model="userInfo.password" type="password" value="" placeholder="输入密码(至少6位)" placeholder-style="color:#F3F3F3;font-size:26upx;"/>
				<image src="../../static/img/cha.png" class="clear" v-if="userInfo.password.length>0" @tap.stop="clearPassword"></image>
			</view>
		</view>
		<view class="sublime" :class="{bggray: userInfo.password == 1 || userInfo.tel.length<11}" @tap.stop="sublime">提交</view>
		
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userInfo:{
					tel:"",
					password:'',
					
				},
				isCodeLogin:false,
				
				
			};
		},
		
		onLoad(opt) {
			
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
			 * 提交
			 */
			sublime(){
				let loginRules = [
				  {name: 'tel', required: true, type: 'phone', errmsg: '请输入正确的手机号'},
				  {name: 'password', required: true,type: 'required', errmsg: '请输入密码'},
				  {name: 'password', required: true,type: 'pwd', errmsg: '密码须是6～16位字符'},
				]
				
				if(this.userInfo){
					let valLoginRes = this.$validate.validate(this.userInfo, loginRules)
					if (!valLoginRes.isOk) {
					  uni.showToast({
						icon: 'none',
						title: valLoginRes.errmsg
					  })
						return;
					}else{
						uni.showToast({
							icon: 'none',
							title: "提交成功"
						})
					}
				}
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
