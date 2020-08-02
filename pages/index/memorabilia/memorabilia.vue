<template>
	<view class="content" :style="{'height':height-80+'px'}">
		<custom :back="true" :title="title"  rightText="添加" @click-right="add" :bg="'#fff'" :statusBarBackground="'#fff'"></custom>
		<scroll-view  :style="{'height':height-90+'px'}"  @scrolltolower="onReachScollBottom" @scroll="scroll" scroll-y="true" class="scroller" scroll-with-animation="true">
			<view class="nav" v-if="tips.length>0">
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
				talk: [],
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
			this.listMemorabiliaOne()
			this.listMemorabiliaBabyTag()
		},
		methods:{
			/**
			 * 大事记列表
			 */
			listMemorabiliaOne(){
				this.http("/app_baby/listMemorabiliaOne",{baby_id:uni.getStorageSync("babyItem").id}).then(res=>{
					if(res.code==1){
						this.talk = res.data.memorabilia.length>0?res.data.memorabilia:res.data.array_tag
						
					}else{
						uni.showToast({
							title:res.msg,
							icon:"none"
						})
					}
					
				})
			},
			/**
			 * 大事记列表顶部标签
			 */
			listMemorabiliaBabyTag(){
				this.http("/app_baby/tagListCustom",{baby_id:uni.getStorageSync("babyItem").id}).then(res=>{
					if(res.code==1){
						this.tips = res.data
						
					}else{
						uni.showToast({
							title:res.msg,
							icon:"none"
						})
					}
					
				})
			},
			/**
			 * 添加大事记
			 */
			add(){
				uni.navigateTo({
					url:"/pages/index/memorabilia/add/add?custom="+ 1
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
