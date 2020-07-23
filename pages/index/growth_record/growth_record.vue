<template>
	<view class="content">
		<custom :back="true" @click-right="add" title="生长记录" rightText="添加"></custom>
		
		<view class="body-view">
				<scroll-view class="top-menu-view" scroll-x="true" :scroll-left="scrollLeft">
					<view style="display: flex;justify-content: center;padding:20upx 0;">
					<block v-for="(menuTab,index) in menuTabs" :key="index">
						<view class="menu-one-view" v-bind:id="'tabNum'+index" @click="swichMenu(index)" >
							<view :class="[currentTab==index ? 'menu-one-act' : 'menu-one']">
								<view class="menu-one-txt">{{menuTab.name}}</view>
								<view class="menu-one-bottom">
									<view class="menu-one-bottom-color"></view>
								</view>
							</view>
						</view>
					</block>
					</view>
				</scroll-view>
				<swiper :current="currentTab" class="swiper-box-list" duration="300" @change="swiperChange" :style="{'height':height-80+'px'}">
					<block v-show="currentTab==index" v-for="(item,index) in menuTabs">
						<swiper-item :style="{'marginTop':currentTab==0?'20'+'upx':''}">
							<scroll-view class="swiper-one-list" scroll-y="true" :style="{'height':height-110+'px'}" @scrolltolower="onReachScollBottom">
								<view class="swiper-list-entity" >
									<view class="menu-item" v-for="index in 5">
										<view class="tips">
											<view class="top">
												<text class="day">2020-07-22</text>
												<text class="time">第11天</text>
											</view>
											<view class="miao">宝宝长得又高又壮哦</view>
										</view>
										<view class="line"></view>
										<view class="menu">
											<view class="list">身高<text style="margin-left:10upx;color:#E1CA56;">160cms</text></view>
											<view class="list" style="text-align: right;">体重<text style="margin-left:10upx;color:#E1CA56;">65kg</text></view>
											<view class="list">头围<text style="margin-left:10upx;color:#4CD964;">32cm</text></view>
										</view>
									</view>
									
									
								</view>
								
							</scroll-view>
						</swiper-item>
					</block>
				</swiper>
		</view>
		
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				scrollLeft: 0,
				isClickChange: false,
				currentTab: 0,
				swiper:0,
				height:0,
				menuTabs: [{
					name: '记录列表'
				}, {
					name: '身高曲线'
				}, {
					name: '体重曲线'
				}, {
					name: '头围曲线'
				}]
				//swiperDateList: [[],[],[],[]]
			};
		},
		onLoad() {
			this.height=this.$store.state.system.screenHeight
			//初始化数据
			// for (var i = 0; i < this.swiperDateList.length; i++) {
			// 	this.getDateList(i);
			// }
		},
		methods:{
			/**
			 * 添加
			 */
			add(){
				uni.navigateTo({
					url:"/pages/index/growth_record/add"
				})
				//this.$refs["popup"].open()
			},
			swichMenu: async function(current) { //点击其中一个 menu
				if (this.currentTab == current) {
					return false;
				} else {
					this.currentTab = current;
					this.swiper = current
					this.setScrollLeft(current);
				}
			},
			swiperChange: async function(e) {
					let index = e.target.current;
					this.setScrollLeft(index);
					this.currentTab = index;
					 this.swiper = index
			},
			setScrollLeft: async function(tabIndex) {
					let leftWidthSum = 0;
					for (var i = 0; i <= tabIndex; i++) {
						let nowElement = await this.getWidth('tabNum' + i);
						leftWidthSum = leftWidthSum + nowElement.width;
					}
					let winWidth = uni.getSystemInfoSync().windowWidth;
					this.scrollLeft = leftWidthSum > winWidth ? (leftWidthSum - winWidth) : 0
				},
				getWidth: function(id) { //得到元素的宽高
					return new Promise((res, rej) => {
						uni.createSelectorQuery().select("#" + id).fields({
							size: true,
							scrollOffset: true
						}, (data) => {
							res(data);
						}).exec();
					})
				},
				
				/**
				 * @param {Object} opt
				 * 滚动底部事件，无无限加载
				 */
				onReachScollBottom(){
					uni.showToast({
						title:"到底了",
						icon:"none"
					})
				}
				
				// getDateList: function(tabIndex) {
				// 	for (var i = 0; i < 20; i++) {
				// 		var entity = this.menuTabs[tabIndex].name + (this.swiperDateList[tabIndex].length);
				// 		this.swiperDateList[tabIndex].push(entity);
				// 	}
				// }
		}
	}
</script>

<style lang="scss">
	
	
	page {
			width: 100%;
			height: 100%;
			display: flex;
			flex-wrap: wrap;
			align-items: flex-start;
			justify-content: center;
			background: rgba(249, 249, 249, 1);
		}
	 
		.body-view {
			display: flex;
			flex: 1;
			flex-direction: column;
			overflow: hidden;
			height: 100%;
			width: 100%;
			align-items: flex-start;
			justify-content: center;
		}
	 
		.top-menu-view {
			display: flex;
			white-space: nowrap;
			width: 100%;
			background-color: #FFFFFF;
			
			/* 在这里设置导航条高度 */
		}
	 
		.top-menu-view .menu-one-view {
			display: inline-block;
			white-space: nowrap;
			height: 100%;
		}
	 
		.top-menu-view .menu-one-view .menu-one {
			/* 在这里写 单个按钮样式 */
			margin-left: 25upx;
			margin-right: 25upx;
			position: relative;
			height: 100%;
			display: flex;
			align-items: center;
			justify-content: center;
		}
	 
		.top-menu-view .menu-one-view .menu-one .menu-one-txt {
			height: 40upx;
			font-size: 28upx;
			font-weight: 400;
			//color: rgba(154, 154, 154, 1);
			line-height: 40upx;
		}
	 
		.top-menu-view .menu-one-view .menu-one .menu-one-bottom {
			position: absolute;
			bottom: 0;
			width: 100%;
		}
	 
		.top-menu-view .menu-one-view .menu-one .menu-one-bottom .menu-one-bottom-color {
			width: 60%;
			height: 4upx;
		}
	 
		.top-menu-view .menu-one-view .menu-one-act {
			/* 在这里写 单个按钮样式 */
			margin-left: 25upx;
			margin-right: 25upx;
			position: relative;
			height: 100%;
			display: flex;
			align-items: center;
			justify-content: center;
		}
	 
		.top-menu-view .menu-one-view .menu-one-act .menu-one-txt {
			height: 40upx;
			font-size: 28upx;
			font-weight: 400;
			//color: rgba(0, 170, 255, 1);
			line-height: 40upx;
		}
	 
		.top-menu-view .menu-one-view .menu-one-act .menu-one-bottom {
			position: absolute;
			bottom: -10upx;
			width: 100%;
			display: flex;
			justify-content: center;
		}
	 
		.top-menu-view .menu-one-view .menu-one-act .menu-one-bottom .menu-one-bottom-color {
			width: 80%;
			height: 3px;
			background: #E1CA56;
			border-radius: 10px;
		}
	 
		.swiper-box-list {
			flex: 1;
			width: 100%;
			
			
		}
	 
		.swiper-one-list {
			// height: 100%;
			width: 100%;
		}
	 
		.swiper-one-list .swiper-list-entity {
			width: 100%;
			
			text-align: center;
			display: flex;
			flex-wrap: wrap;
			align-items: center;
			justify-content: center;
			// background-color: #fff;
		}
		.swiper-list-entity{
			
			.menu-item{
				display: flex;
				flex-direction: column;
				width:100%;
				background-color: #fff;
				margin:15upx auto;
				.tips{
					width: 50%;
					display: flex;
					flex-direction: column;
					padding:10upx 20upx;
					justify-content: flex-start;
					align-items: flex-start;
					text-align: left;
					.top{
						.day{
							font-size: 20upx;
							color:#f5f5f5;
							margin:0 15upx;
						}
						.time{
							font-size: 24upx;color:#f5f5f5;
						}
					}
					.miao{
						font-size: 24upx;color:#E1CA56;
					}
				}
				.line{
					width:100%;border-bottom:1px solid #eee;
					
				}
				.menu{
					display: flex;
					flex-direction: row;
					flex-wrap: wrap;
					justify-content: flex-start;
					padding:10upx 0;
					text-align: left;
					width: 100%;
					//height:150upx;
					.list{
						font-size: 24upx;
						width: 46%;height:40upx;
						margin:10upx;
					}
				}
			}
			
		}
	
</style>
