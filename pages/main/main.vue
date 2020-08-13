<template>
	<view class="add">
		<view class="header" @click="userGo">
			<view class="image_user">
				<image class="image" src="../../static/img/user.jpg" mode=""></image>
				<image class="photograph" src="../../static/img/carame.png" mode=""></image>
			</view>
			<view class="text">
				<view class="name">用户</view>
				<view class="details">
					亲，请完善质料
				</view>
			</view>
			<uni-icons class="icon" type="arrowright" size="30upx" />
		</view>
		<view class="header2">
			<view class="">
				<uni-icons  type="plus-filled" size="40upx" />
				<view class="">
					添加宝宝
				</view>
			</view>
			<view class="">
				<uni-icons  type="mail-open-filled" size="40upx" />
				<view class="">
					意见反馈
				</view>
			</view>
			<view class="">
				<uni-icons  type="gear-filled" size="40upx" />
				<view class="">
					通用设置
				</view>
			</view>
		</view>
		<view class="mode" >
			<view class="">
				<uni-icons  type="clear" size="40upx" />
				<text>我的宝豆</text>
			</view>
			<view class="">
				<uni-icons  type="arrowright" size="40upx" />
			</view>
		</view>
		<view class="mode" >
			<view class="">
				<uni-icons  type="clear" size="40upx" />
				<text>童书</text>
			</view>
			<view class="">
				<uni-icons  type="arrowright" size="40upx" />
			</view>
		</view>
		<view class="mode" >
			<view class="">
				<uni-icons  type="clear" size="40upx" />
				<text>亲宝小伴</text>
			</view>
			<view class="">
				<uni-icons  type="arrowright" size="40upx" />
			</view>
		</view>
		<view class="modes" >
			<view class="modes_childe">
				<view class="">
					<uni-icons  type="clear" size="40upx" />
					<text>购物车</text>
				</view>
				<view class="">
					<uni-icons  type="arrowright" size="40upx" />
				</view>
			</view>
			<view class="modes_childe">
				<view class="">
					<uni-icons  type="clear" size="40upx" />
					<text>我的订单</text>
				</view>
				<view class="">
					<uni-icons  type="arrowright" size="40upx" />
				</view>
			</view>
			<view class="modes_childe">
				<view class="">
					<uni-icons  type="clear" size="40upx" />
					<text>优惠卷</text>
				</view>
				<view class="">
					<uni-icons  type="arrowright" size="40upx" />
				</view>
			</view>
			
		</view>
		<view class="mode" >
			<view class="">
				<uni-icons  type="clear" size="40upx" />
				<text>收藏</text>
			</view>
			<view class="">
				<uni-icons  type="arrowright" size="40upx" />
			</view>
		</view>
		
		
		<tabBar :pagePath="'/pages/main/main'"></tabBar>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				
			}
		},
		methods:{
			userGo(){
				uni.navigateTo({
					// url: './userDetail',
				});
			},
			
		}
	}
</script>


<style scoped >
	.icon{
		    color: rgb(51, 51, 51);
		    position: absolute;
		    right: 15upx;
		    top: 50%;
		    transform: translate(0px, -50%);
	}
	.image_user{
		position: relative;
	
	}
	.image{
		width: 130upx;
		height:130upx;
		border-radius: 50%;
		margin: 0 15upx 0 ;
	}
	.photograph{
		position: absolute;
		width: 40upx;
		height: 40upx;
		right: 0;
		bottom: 0;
		}
	.add{
		    color: #5a5858;
		/* font-family: cursive; */
	}
	.header2{
		background-color: #FFFFFF;
		display: flex;
		    text-align: center;
		    justify-content: space-around;
			margin-bottom: 10upx;
			padding-bottom: 25upx;
			padding-top: 25upx;
	}
	.header{
		border-bottom: 1upx solid #fdf6f6;
		background-color: #FFFFFF;
		position: relative;
		display: flex;
		padding: 25upx;
		
	}
	.text{
		line-height: 65upx;
	}
	.details{
		font-size: 20upx;
		color: #9e9e9e;
	}
	.mode{
		    display: flex;
		    justify-content: space-between;
		    background: #ffffff;
			padding: 0 10upx;
		    margin-bottom: 20upx;
			line-height: 80upx;
	}
	.modes{
		margin-bottom: 20upx;
		 background: #ffffff;
		 padding: 0 10upx;
	}
	.modes_childe{
		display: flex;
		justify-content: space-between;
		line-height: 80upx;
		}
	text{
		padding-left: 10upx;
	}
</style>
