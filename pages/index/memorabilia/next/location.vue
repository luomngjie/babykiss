<template>
	<view class="content">
		<view class="navBar" >
			<view class="leftNav" @click="left">
				<view class="name" style="color:black">取消</view>
			</view>
			<view style="font-size: 26upx;" >
				所在位置
			</view>
			<view class="photo-item" @click="right">
				
				<image src="../../../../static/img/se.png" class="pahoto"></image>
			</view>
		</view>
	</view>
</template>

<script>
	import amapFile  from '@/common/amap-wx.js'
	export default {
		data() {
			return {
				key:"e3561e3b447fb01cd5ea41ea5fe55f9a",
				addressName: '', 
				amapPlugin: null, 
				weather: {  
					hasData: false,  
					data: []  
				}  
			};
		},
		onLoad() {
			//this.loadCity()
		},
		methods:{
			
			/**
			 * uniapp自带方法获取经纬度信息
			 */
			getLocation(){
				uni.getLocation({
					
				})
			},
			/**
			 * 根据经纬度获取定位
			 */
			loadCity(latitude, longitude){//高德小程序 SDK，获取当前位置地址信息，以及当前位置的天气情况
				var that = this;
				// uni.showLoading({
				// 	title: '正在获取位置信息'  
				// });  
				var myAmapFun = new amapFile.AMapWX({ key: that.key });
				myAmapFun.getRegeo({
				  success: function (e) {
					  let parame = JSON.stringify(e)
					  let data = JSON.parse(parame)
					  console.log(data)
						   // uni.hideLoading();  
					
					 
					 
				  },
				  fail: function (info) {
					uni.showToast({
						title:"定位失败!请稍后重试",
						icon:"none"
					})
				   }
				});
				
			},
			
			/**
			 * nav左侧返回
			 */
			left(){
				uni.navigateBack()
			},
			
			/**
			 * 右侧搜索图标
			 */
			right(){
				uni.navigateTo({
					url:"/pages/index/memorabilia/next/search"
				})
			}
		}
	}
</script>

<style lang="scss">
	.content{
		.navBar{
			 display: flex;
			 justify-content: space-between;
			 align-items: center;
			 background-color: #fff;
			 margin-top: 73upx;
			 width: 100%;
			 padding: 10upx 0;
			 .leftNav{
				 display: flex;
				 flex-direction: row;
				 justify-content: flex-start;
				 align-items: center;
				 margin:0 40upx;
				 .navImg{
					 width:30upx;height:30upx;
				 }
				 view{
					 font-size: 28upx;
					 color:#fff;
				 }
			 }
			 .photo-item{
				height:60upx;
				 display: flex;
				 align-items: center;
				 justify-content: center;
				 margin:0 40upx;
				 .pahoto{
					 width:40upx;height:40upx;
					 margin:0 10upx;
				 }
			 }
					
		}
	}
</style>
