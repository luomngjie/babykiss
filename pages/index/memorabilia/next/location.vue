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
		
		<view class="tab">
			<view class="tabs" @click="check(index)" v-for="(item,index) in tab" :key="index" :class="{'active':index==current}">{{item.name}}</view>
			
		</view>
		
		<view class="tabCon" :style="{'height':height-100+'px'}">
			<scroll-view :style="{'height':height-130+'px'}" v-if="current==1" @scrolltolower="onReachScollBottom" @scroll="scroll" scroll-y="true" class="scroller" scroll-with-animation="true">
				<view class="index" v-for="(item,index) in poi" @click="checkAddress(item,index)">
					<view class="left">
						<view class="title">{{item.name}}</view>
						<view class="listCon">{{item.address}}</view>
					</view>
					<image :src="cur==index?img:''" class="img"></image>
				</view>
			</scroll-view>
			
			<scroll-view :style="{'height':height-130+'px'}" v-if="current==0" @scrolltolower="onReachScollBottom" @scroll="scroll" scroll-y="true" class="scroller" scroll-with-animation="true">
				<view class="index" >
					暂无法获取位置信息
				</view>
			</scroll-view>
			 
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
				img:require("../../../../static/img/gou.png"),
				current:1,
				cur:0,//地图位置选择，右侧打勾
				height:0,
				tab:[
					{
						name:"拍摄位置",
						id:0
					}, 
					{
						name:"当前位置",
						id:1
					}
				],
				weather: {  
					hasData: false,  
					data: []  
				} ,
				location:{
					locat:{}
				},//定位位置信息
				poi:[]
			};
		},
		onLoad() {
			this.height=this.$store.state.system.screenHeight
			if(this.current==1){
				// #ifdef APP-PLUS
					this.getLocation()
				// #endif
			}
			//this.loadCity()
		},
		methods:{
			/**
			 * 顶部tab切换
			 */
			check(index){
				this.current=index
				if(this.current==1){
					// #ifdef APP-PLUS
						this.getLocation()
					// #endif
				}
				
			},
			
			/**
			 * 位置选择
			 */
			checkAddress(item,index){
				this.cur=index
				uni.setStorageSync("address",item)
				let addre = item.location.split(",")
				uni.redirectTo({
					url:"/pages/index/memorabilia/next/next"
				})
			},
			/**
			 * @param {Object} opt
			 * 滚动底部事件，无无限加载
			 */
			onReachScollBottom(e){
				uni.showToast({
					title:"到底了",
					icon:"none"
				})
				
			},
			
			scroll(e){
				this.scrollTop=e.detail.scrollTop
			},
			
			/**
			 * uniapp自带方法获取经纬度信息
			 */
			getLocation(){
				let self=this
				uni.getLocation({
					geocode: 'true',
					type:'wgs84',
					success:res=>{
						self.location.locat.lat=res.latitude
						self.location.locat.lon=res.longitude
						self.location.address = res.address
						self.loadCity(res.latitude,res.longitude)
					}
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
				uni.showLoading({
					title:"加载中..."
				})
				myAmapFun.getRegeo({
				  success: function (e) {
					  let parame = JSON.stringify(e)
					  let data = JSON.parse(parame)
					  that.poi=data[0].regeocodeData.pois
					  uni.hideLoading();  
					
					 
					 
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
		.tab{
			display: flex;
			justify-content: space-around;
			background-color: #fff;
			margin-bottom: 33upx;
			
			.active{
				&::after{
				content: '';
				width:120upx;
				border-bottom: 2px solid #FFC227;
				position:absolute;
				bottom:10upx;left: 0;
				border-radius: 20upx;
				}
			}
			.tabs{
				font-size: 28upx;
				padding: 20upx 0;
				position:relative;
				
			}
		}
		.tabCon{
			display: flex;
			flex-direction: column;
			.scroller{
				background-color: #fff;
				.index{
					margin: 33upx;
					display: flex;
					flex-direction: row;
					justify-content: space-between;
					align-items: center;
					border-bottom: 1upx solid #eee;
					padding-bottom:10upx;
					.left{
						width:90%;
						.title{
							font-size: 28upx;
						}
						.listCon{
							width:100%;
							color:#aaa;
							margin-top: 10upx;
							overflow: hidden;
						    text-overflow: ellipsis;
						    white-space: nowrap;
							font-size: 22upx;
						}
					}
					
					.img{
						width:30upx;height:30upx;
					}
				}
			}
		}
	}
</style>
