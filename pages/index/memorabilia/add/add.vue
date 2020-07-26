<template>
	<view class="content" :style="{'height':height+'px'}">
		<custom :back="false" :title="title"  rightText="下一步" leftText="取消" @click-right="next" @click-left="cancal" style="background-color: #fff;"></custom>
		<view class="top">
			<view class="share_choice"  >
				<view class="con" @click="selectShow" :class="select?'':'showClass'">
					<uni-icons type="checkmarkempty" size="20" color="#fff" v-if="select"></uni-icons>
				</view>
				<text  class="shar_time">第一次</text>
			</view>
			<view class="input">
				<input type="text" placeholder="请输入" placeholder-style="font-size:22upx;color:#aaa" v-model="parame.value">
			</view>
		</view>
		
		<view class="nav">
			<view class="list" v-for="(item,index) in tips" :key="index" @click="tipsFun(item)">{{item.name}}</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title:"大事记",
				check:'0',
				height:0,
				select:true,
				parame:{
					value:""
				},
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
					{
						name:"脐带掉落看见",
						id:2
					},
					{
						name:"3",
						id:2
					},
					{
						name:"叫妈妈",
						id:2
					},
					{
						name:"坐车",
						id:2
					},
					{
						name:"吃药",
						id:2
					},
					{
						name:"洗澡",
						id:2
					},
					{
						name:"笑",
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
			 * 下一步
			 */
			next(){
				uni.navigateTo({
					url:"/pages/index/memorabilia/next/next"
				})
			},
			
			/**
			 * 取消
			 */
			cancal(){
				uni.navigateBack()
			},
			
			/**
			 * tips点击事件
			 */
			tipsFun(item){
				this.parame.value=item.name
			},
			
			/**
			 * 复选框事件
			 */
			selectShow(){
				this.select=!this.select
			}
		}
	}
</script>

<style lang="scss" scoped>
	.showClass{
		background:transparent !important;
		border: 1upx solid #eee;
		
	}
	.content{
		background: #fff;
		
		.top{
			.share_choice{
				display: flex;
				align-items: center;
				margin: 0 40upx;
				.con{
					width:35upx;height:35upx;
					border-radius: 3px;
					background-color: #FFBF29;
					display: flex;
					align-items: center;
					justify-content: center;
					margin-right: 10upx;
				}
				.shar_time{
					font-size: 22upx;
				}
			}
			.input{
				width:90%;
				background-color: #eee;
				height:60upx;border-radius: 10upx;
				margin: 23upx auto;
				
				input{
					height: 100%;width: 100%;
					padding-left: 33upx;
					font-size: 22upx;
				}
			}
		}
		.nav{
			display: flex;
			flex-direction: row;
			flex-wrap: wrap;
			justify-content: flex-start;
			background-color: #fff;
			padding: 20upx 10upx;
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
