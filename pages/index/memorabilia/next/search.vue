<template>
	<view style=" margin-top: 73upx;">
		<!-- 搜索条 -->
		<custom  :back="true" 
			 @click-left="left" 
			 :statusBarBackground="'#fff'" :bg="'#fff'" >
			<view slot="ceb" style="width: 100%;height:50upx;display: flex;align-items: center;">
				<view class="input" style="display: flex;height:100%;width:100%;flex-direction: row;justify-content: flex-start;background:#eee;align-items: center;border-radius: 5px;">
					<image src="../../../../static/img/se.png" style="width:20upx;height: 20upx;margin:0 20upx"></image>
					<input type="text" style="font-size: 28upx;" placeholder="搜索附近位置" placeholder-style="font-size:22upx;color:#aaa;" :focus='setFocus' @confirm="searchMap" v-model="keywords" confirm-type="搜索" >
				</view>
			</view>
			<view slot="right">
				<view class="rightName" style="color:#FFC227;font-size: 26upx;" @click="searchMap">搜索</view>
			</view>
		</custom>
		<view class="searchBotBox" v-if="false">
			<view class="ov">
				<view class="fl">搜索历史</view>
				<view @tap="clearKey" class="fr grace-more-r grace-search-remove">
					<image src="../../../../static/img/delete.png" style="width: 50upx;height: 50upx;"></image>
				</view>
			</view>
			<view class="searchHistoryBox">
				<view class="searchHistoryBoxItem" v-for="(item,index) in searchKey" :key='index' v-if="searchKey.length>0">
					{{item}}
				</view>
			</view>
		</view>
		<scroll-view  :style="{'height':height-110+'px'}"  @scrolltolower="onReachScollBottom"
		 @scroll="scroll" scroll-y="true" class="scroller" scroll-with-animation="true">
			<view class="menu" :style="{'height':height-70+'px'}">
				<view class="list" v-for="(item,index) in list" :key="item.id"  @click="checkAddress(item)">
					<view class="title">{{item.name}}</view>
					<view class="tips">{{item.district}}--{{item.address.length==0?'':item.address}}</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>
<script>
	import amapFile  from '@/common/amap-wx.js'
	export default {
		data() {
			return {
				searchKey: [],
				key:"e3561e3b447fb01cd5ea41ea5fe55f9a",
				ipt: '',
				searchClose: true,
				height:0,
				setFocus:true,
				list:[],
				keywords:""//搜索关键词

			}
		},
		onLoad() {
			this.height=this.$store.state.system.screenHeight
		},
		onShow() {
			var vv = uni.getStorageSync('searchLocal');
			var arr = vv.split("-");
			this.searchKey = arr;
		},
		methods: {
			/**
			 * 位置选择
			 */
			checkAddress(item){
				
				console.log(item)
			},
			/**
			 * @param {Object} e地图关键词搜索
			 */
			searchMap(){
				let self = this
				this.setFocus=false;
				var myAmapFun = new amapFile.AMapWX({ key: this.key });
				uni.showLoading({
					title:"加载中..."
				})
				myAmapFun.getInputtips({
					keywords:self.keywords,
					success:res=>{
						self.list=res.tips
						uni.hideLoading();  
					}
				})
			},
			scroll(e){
				this.scrollTop=e.detail.scrollTop
				
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
			clearKey: function() {
				var that = this;
				uni.showModal({
					title: '提示',
					content: '点击确定将删除所有历史信息，确定删除吗？',
					success: function(res) {
						if (res.confirm) {
							that.searchKey = [];
							uni.setStorage({
								key: 'searchLocal',
								data: that.searchKey
							});
							
						} else if (res.cancel) {

						}
					}
				});

			},
			searchNow: function(e) {
				if (this.ipt == '') {
					uni.showToast({
						title: '未输入搜索关键字',
						icon: 'none',
						duration: 1000
					});
					return false;
				}
				var that = this;
				var newArr = that.searchKey;
				newArr.push(this.ipt);
				this.searchKey = newArr;
				var newStr = newArr.join('-');
				uni.setStorage({
					key: 'searchLocal',
					data: newStr
				});
				console.log(this.searchKey)
			},
			
			left(){
				uni.navigateBack()
			}
		}
	}
</script>
<style >
	page {
		background: #FFF;
	}

	.ov {
		overflow: hidden;
	}

	.fl {
		float: left;
	}

	.fr {
		float: right;
	}

	.searchTopBox {
		width: 100%;
		background-color: #0b877f;
		height: 100upx;
		box-sizing: border-box;
	
		display: flex;
		justify-content: space-between;
		align-items: center;
		
	}
	
	.list{
		display: flex;
		
		justify-content: flex-start;
		flex-direction: column;
		border-bottom: 1px solid #eee;
		padding: 20upx;
	}
	
	.title{
		font-size: 28upx;
	}
	
	.tips{
		font-size: 22upx;
		color:#aaa;
		width: 677upx;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		margin: 10upx 0;
	}

	.searchBoxRadius {
		width: 70%;
		height: 70upx;
		background-color: #fff;
		margin-left: 5%;
		overflow: hidden;
		border-radius: 35upx;
	}

	.searchBoxIcon {
		font-size: 40upx;
		margin-top: 20upx;
		margin-left: 20upx;
		float: left;
	}

	.searchBoxIpt {
		height: 70upx;
		line-height: 70upx;
		margin-left: 20upx;
		float: left;
	}

	.searchBotBox {
		width: 100%;
		margin-top: 30upx;
		padding: 15upx 3%;
		box-sizing: border-box;
	}

	.searchHistoryBox {
		width: 100%;
		box-sizing: border-box;
		overflow: hidden;
		margin-top: 40upx;
	}

	.searchHistoryBoxItem {
		float: left;
		font-size: 26upx;
		color: #666;
		line-height: 46upx;
		height: 46upx;
		padding: 0 20upx;
		border-radius: 23upx;
		margin-left: 15upx;
		margin-bottom: 20upx;
		border: 1px solid #ccc;
	}
	
</style>
