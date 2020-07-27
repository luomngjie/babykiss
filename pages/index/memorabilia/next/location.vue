<template>
	<view class="content">
		<custom  :back="false" leftText="取消"
			 @click-left="left" color="#aaa"
			:title="'所在位置'" :statusBarBackground="'#fff'" :bg="'#fff'">
			<view slot="right" >
				<view class="photo-item" >
					<image src="../../../../static/img/se.png" class="pahoto" @click="right" ></image>
				</view>
			</view>
		</custom>
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
</style>
