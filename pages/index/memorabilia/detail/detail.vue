<template>
	<view class="content" :style="{'height':height-80+'px'}">
		<!-- <view class="navBar" >
			<view class="leftNav" @click="left">
				<image src="../../../../static/img/left.png" class="navImg"></image>
				<view class="name">宝宝</view>
			</view>
			<view style="font-size: 26upx;" >
				何苦
			</view>
			<view class="photo-item" @click="right">
				
				<image src="../../../../static/img/more.png" class="pahoto"></image>
			</view>
		</view> -->
		<custom  :back="true"
			class="custom" @click-left="left"
			:title="'何苦'"  :bg="'#fff'"
			:statusBarBackground="'#fff'">
			<view slot="right" >
				<view class="photo-item" >
					<image src="../../../../static/img/more.png" class="pahoto" @click="right" ></image>
				</view>
			</view>
		</custom>
		
		<scroll-view  :style="{'height':height-90+'px'}"  @scrolltolower="onReachScollBottom" @scroll="scroll" scroll-y="true" class="scroller" scroll-with-animation="true">
			<view class="tlak_o" >
				<view class="date">
					<view class="day">昨天</view>
					<view class="dayNumber">第14天</view>
				</view>
				
				<view class="date">
					<view class="dayNumber">看见</view>
				</view>
				
				<view class="first">
					<view class="list" @click="firstFun">第一次脐带掉落看见</view>
				</view>
				
				
				<view class="tabbar">
					<view class="name">
						<text>爸爸,1小时前</text>
					</view>
					<image src="../../../../static/img/mess.png" class="image"></image>
				</view>
				
				<view class="tabbar">
					<view class="name">
						<text>爸爸被萌化了</text>
					</view>
				</view>
			</view>
		</scroll-view>
		
		<uni-popup type="center" ref="popup" zIndex="999">
			<view class="popup-center">
				<view class="item-list">更多操作</view>
				<view class="line"/>
				<view class="item-list" >分享</view>
				<view class="line"/>
				<view class="item-list" >编辑</view>
				<view class="line"/>
				<view class="item-list" @tap.stop="deleted">删除</view>
				<view class="item-list" @tap.stop="cancel">取消</view>
			</view>
		</uni-popup>
		
		<cu-modal ref="quanxian"  @cancel='modalHide'  @Confirm="modalConfirm">
			<!-- :cancelText='cancel' :confirmText='confirmbtn' -->
			<text slot="content">
				删除后其他亲友也将无法查看这条记录，确定继续吗?
			</text>
		</cu-modal>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				height:0
			};
		},
		onLoad() {
			this.height=this.$store.state.system.screenHeight
		},
		methods:{
			/**
			 * nav左侧返回
			 */
			left(){
				uni.navigateBack()
			},
			
			/**
			 * @param {Object} index右侧三点点击事件
			 */
			right(){
				this.$refs["popup"].open()
			},
			
			/**
			 * 删除
			 */
			deleted(index){
				// uni.showModal({
				// 	title: '提示',
				// })
				this.$refs["popup"].close()
				this.$refs.quanxian.open()
			},
			
			/**
			 * 第一次事件（tips）
			 */
			firstFun(){
				uni.navigateTo({
					url:"/pages/index/memorabilia/memorabilia"
				})
			},
			
			
			/**
			 * prop框取消按钮
			 */
			cancel(){
				this.$refs["popup"].close()
			},
			
			
			/**
			 * modal取消按钮
			 */
			modalHide(){
				this.$refs.quanxian.close()
			},
			
			/**
			 * modal确定按钮
			 */
			modalConfirm(){
				this.$refs.quanxian.close()
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
			
			
			/**
			 * @param {Object} e滚动事件
			 */
			scroll(e){
				this.scrollTop=e.detail.scrollTop
			},
		}
	}
</script>

<style lang="scss" scoped>
	.content{
		.photo-item{
			height:60upx;
			 // border-radius: 50%;
			 display: flex;
			 align-items: center;
			 justify-content: center;
			 //background-color: #FFC227;
			 margin:0 40upx;
			 .pahoto{
				 width:40upx;height:40upx;
				 margin:0 10upx;
			 }
		}
		
		.tlak_o {
			background: #fff;
			display: flex;
			padding-bottom: 20upx;
			flex-direction: column;
			margin-bottom: 33upx;
			.date{
				display: flex;
				flex-direction: row;
				justify-content: flex-start;
				align-items: center;
				padding: 0 26upx;
				margin: 15upx 0;
				.day{
					font-size: 38upx;
					margin-right: 15upx;
				}
				.dayNumber{
					font-size: 22upx;
				}
			}
			.first{
				display: flex;
				flex-direction: row;
				flex-wrap: wrap;
				justify-content: flex-start;
				padding: 0 26upx;
				.list{
					background-color: #aaa;
					color:#2C405A;
					font-size: 22upx;
					padding: 10upx 20upx;
					border-radius: 25upx;
					margin:10upx;
				}
			}
			.tabbar{
				display: flex;
				justify-content: space-between;
				padding:0 26upx;
				margin-top: 20upx;
				.name{
					font-size: 22upx;coloe:#EFEFEF;
				}
				.image{
					width:30upx;height: 30upx;
				}
			}
		}
	}
</style>
