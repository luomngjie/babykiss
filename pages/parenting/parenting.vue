<template>
	<view class="content">
		<scroll-view class="scroll" scroll-x="true">
			<custom  :back="false" color="#fff":bg="'#fff'":statusBarBackground="'#fff'">
				<view  slot="center">
					<view class="VI">
						<view class="but" v-for='(item,index) in tabel'  :key="index" @click="chack(index)" :class="{active:isShow==index}" >{{item.name}}</view>
					</view>
					
				</view>
				<view slot="right" >
					<view class="photo-item" >
						<image src="../../static/img/se.png" class="pahoto"></image>
					</view>
				</view>
			</custom>
			
		</scroll-view>
		
			<swiper   @change="swiperChange" :current="isShow" >
				<block v-show="isShow==index">
					<swiper-item v-for="(item,index) in tabel">
						<scroll-view  :style="{'height':height-90+'px'}" scroll-y="true" class="scroller" >
							<view class="assistant">{{item.name}}</view>
						</scroll-view>
					</swiper-item>
				</block>
			</swiper>
		
		
		
		<tabBar :pagePath="'/pages/parenting/parenting'"></tabBar>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				tabel:[
					{
						name:"育儿助手"
					},
					{
						name:"社区"
					}
				],
				
				isShow:0,
				//currentTab:0
			};
		},
		onLoad() {
			this.height=this.$store.state.system.screenHeight
		},
		methods:{
			/**
			 * @param {Object} e顶部切换
			 */
			chack(e){
				this.isShow=e
			},
			
			/**
			 * swiper滑动切换
			 */
			swiperChange(e){
				let index = e.target.current;
				this.isShow = index
			}
		}
	}
</script>

<style lang="scss" scoped>
	.photo-item{
		height:60upx;
		 display: flex;
		 align-items: center;
		 justify-content: center;
		
		 margin:0 40upx;
		 .pahoto{
			 width:40upx;height:40upx;
			
		 }
	}
	.VI{
			justify-content: center;
			display: flex;
		    background: #ffff;
	}
	.but{
		color:black;
		margin: 10px 10px 5rpx;
	}
	.active{
		color: #ff9c09;
		position: relative;
		
		padding-bottom: 5rpx;
		&:before{
			content: '';
			width:100%;
			border-bottom: 2px solid #ff9c09;
			position: absolute;
			bottom: 14upx;
		}
		
	}
	.image{
		width: 100rpx;
		height: 100rpx;
	}
</style>
