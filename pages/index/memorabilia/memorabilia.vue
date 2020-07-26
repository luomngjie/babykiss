<template>
	<view class="content" :style="{'height':height-80+'px'}">
		<custom :back="true" :title="title"  rightText="添加" @click-right="add" ></custom>
		<scroll-view  :style="{'height':height-90+'px'}"  @scrolltolower="onReachScollBottom" @scroll="scroll" scroll-y="true" class="scroller" scroll-with-animation="true">
			<view class="nav">
				<view class="list" v-for="(item,index) in tips" :key="index">{{item.name}}</view>
			</view>
			
			<ysteps :talk="talk" :type="type" @fun="detail"></ysteps>
		</scroll-view>
		
		
	</view>
</template>

<script>
	import ysteps from '@/components/YSteps/YSteps.vue'
	export default {
		components:{
			ysteps
		},
		data() {
			return {
				title:"宝宝大事记",
				height:0,
				type:"note",//用于时间线类型区别。区分首页时间线样式和宝宝大事记样式
				talk: [
					{
						"id": 1,
						"MMDD": "1月21",
						"data":[
							{
								"user": {
									"u_name": "李四",
									"hms": "第一次学游泳",
									"talk": "好嗨哟",
									"image":'../../../static/img/banner.jpg'
								}
							}
						]
						
					},
					{
						"id": 2,
						"MMDD": "10月21",
						"data":[
							{
								"user": {
									"u_name": "李阿达",
									"HMS": "05:20:18",
									"talk": "测试数据测试数据测试数据测试数据测试数据测试数据",
								}
							}
						]
						
					},
					{
						"id": 3,
						"MMDD": "5月21",
						"data":[
							{
								"user": {
									"u_name": "165.0.cm",
									"hms": "56.0kg",
									"talk": "15.0cm",
								}
							},
							{
								"user": {
									"u_name": "165.0.cm",
									"hms": "156.0kg",
									"talk": "15.0cm",
								}
							}
							
						]
						
					}
					
				],
				tips:[
					{
						name:"路径",
						id:0
					},
					{
						name:"叫爸爸",
						id:1
					},
					{
						name:"好嗨哟",
						id:2
					},
				]
			};
		},
		onLoad() {
			this.height=this.$store.state.system.screenHeight
		},
		methods:{
			/**
			 * 添加大事记
			 */
			add(){
				uni.navigateTo({
					url:"/pages/index/memorabilia/add/add"
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
			
			/**
			 * @param {Object} e滚动事件
			 */
			scroll(e){
				this.scrollTop=e.detail.scrollTop
			},
			
			/**
			 * 时间线组件触发的详情事件
			 */
			detail(e){
				uni.navigateTo({
					url:"/pages/index/memorabilia/detail/detail"
				})
			},
			
			
		}
	}
</script>

<style lang="scss">
	.content{
		.nav{
			display: flex;
			flex-direction: row;
			flex-wrap: wrap;
			justify-content: flex-start;
			background-color: #fff;
			padding: 20upx 0;
			.list{
				padding:10upx 20upx;height:30upx;
				background-color: #aaa;
				font-size: 26upx;
				border-radius: 30upx;
				margin: 10upx 20upx;
				display: flex;
				align-items: center;
			}
		}
	}
</style>
