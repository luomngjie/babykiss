<template>
	<view class="content" :style="{'height':height+'px'}">
		<custom  :isLeft="true" ></custom>
		<view class="title code">绑定手机号</view>
		<view class="tips">为保护账户安全,请先绑定手机号码。绑定后您可以使用该手机号登录APP</view>
		<view class="tel">
			<view class="tel_number">
				<view class="phone">+86</view>
				<image src="../../static/img/san.png" class="san"></image>
			</view>
			<input maxlength="11" class="number" v-model="userInfo.mobile" type="number" value="" placeholder="输入手机号码" placeholder-style="color:#F3F3F3;font-size:26upx;"/>
			<image src="../../static/img/cha.png" class="clear" v-if="userInfo.mobile.length>0" @tap.stop="clearPhone"></image>
		</view>
		<view class="next" @click="next" >
			下一步
		</view>
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
				userInfo:{
					mobile:""
				},
			};
		},
		methods:{
		   /**
		    * 清除手机号
		    */
		   clearPhone(){
		   	this.userInfo.mobile = ''
		   },
		   
		   /**
			* 下一步
			*/
		   next(){ 
			   if(this.userInfo.mobile.length<12&&this.userInfo.mobile.length==0){
				   uni.showToast({
				   	title:'请正确输入手机号',
					icon:"none"
				   })
				   return
			   }else{
				   this.http("/sms/send",{mobile:this.userInfo.mobile}).then(res=>{
					   let json = JSON.stringify(this.userInfo)
					   if(res.code==1){
							uni.showToast({
								title:res.msg,
								icon:"none"
							})
							setTimeout(()=>{
								uni.navigateTo({
									url:"/pages/login/codeLogin?pwd="+"qq"+"&parame="+json
								})
							},1200)
					   }
				   })
			   }
				
		   }
		  
		},
		onLoad(opt) {
			this.userInfo.openid = opt.openid
			this.userInfo.nickname = opt.nickname
			this.userInfo.avatar = opt.avatar
			this.height=this.$store.state.system.screenHeight
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
		margin:33upx 40upx;
	}
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
			flex: 1;margin-left:20upx;color:#aaa;
		}
		.clear{
			width:30upx;height:30upx;
		}
	}
	.false{
		background: #aaa;
	}
	.next{
		width:600upx;
		margin:0 auto;
		text-align: center;
		height:80upx;
		background-color: #FFBF29;
		border-radius: 20px;
		line-height: 80upx;
		color:#fff;
		font-size: 26upx;
		margin-top: 120upx;
	}
	
</style>
