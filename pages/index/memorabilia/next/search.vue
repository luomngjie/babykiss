<template>
	<view style=" margin-top: 73upx;">
		<!-- 搜索条 -->
		<view class="searchTopBox">
			<view class="left" style="width: 30px;height: 100%;display: flex;align-items: center;justify-content: center;" @click="left">
				<image src="../../../../static/img/backw.png" mode="" style="width: 30upx;height: 30upx;"></image>
			</view>
			<view class="searchBoxRadius">
				<view class="grace-search-icon searchBoxIcon"></view>
				<input class="searchBoxIpt" type="search" v-model="ipt" @confirm="searchNow($event)" placeholder="搜索附近位置"></input>
			</view>
			<view class="name" style="font-size: 32upx;color:#fff;width:100upx;display: flex;justify-content: center;align-items: center;height: 100%;">搜索</view>
		</view>
		<!-- 搜索历史 -->
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
				<view class="list" v-for="item in 13">
					<view class="title">举要古药房</view>
					<view class="tips">重庆市与i北区龙之你次啊少女的女氨基酸的封闭式的分布计算的难受的感觉是</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				searchKey: [],
				ipt: '',
				searchClose: true,
				height:0

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
