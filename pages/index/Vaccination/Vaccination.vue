<template>
	<view class='content'>
		<custom :back="true" @click-right="add" title="接种信息列表" rightText="添加"></custom>
		<view class="menu" v-for="(item,index) in list" :key="index" @click="detail(item)">
			<view class="left">
				<view class="item">{{item.name}}</view>
				<view class="item font">
					<image src="../../../static/img/yuer.png" class="image" v-if="item.state==0"></image>
					<text class="color">{{item.text}}</text>
				</view>
			</view>
			<view :class="item.state==1?'okState':'state'">{{item.statetext}}</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list:[
					{
						name:"乙肝疫苗(第2剂)",
						text:"1月龄请设置具体接种日期",
						statetext:"未接种",
						state:0
					},
					{
						name:"骨髓炎",
						text:"5月龄",
						statetext:"已接种",
						state:1
					},
					{
						name:"慢性支气管炎",
						text:"5岁龄请设置具体接种日期",
						statetext:"未接种",
						state:0
					},
				]
			};
		},
		methods:{
			/**
			 * 添加
			 */
			add(){
				uni.navigateTo({
					url:"/pages/index/Vaccination/add"
				})
				//this.$refs["popup"].open()
			},
			
			/**
			 * 详情
			 */
			detail(item){
				uni.navigateTo({//list参数，与疫苗接种添加详情共用一个页面，用来区分
					url:"/pages/index/Vaccination/detail?type="+'list'
				})
			}
		}
	}
</script>

<style lang="scss">
	.content{
		.menu{
			display: flex;
			justify-content: space-between;
			font-size: 26upx;
			align-items: center;
			border-bottom: 1px solid #eee;
			padding:16upx 20upx;
			background-color: #fff;
			.left{
				display: flex;
				flex-direction: column;
				justify-content: flex-start;
				.item{
					margin: 5upx 0;
					display: flex;
					align-items: center;
					.color{
						color:#6DD7A9;
						font-size:20upx;
						
					}
					.image{
						width:30upx;height:30upx;
					}
				}
			}
			.state{
				padding:5upx;
				border: 1upx solid #6DD7A9;
				border-radius: 10upx;
				font-size: 22upx;color: #6DD7A9 ;
			}
			.okState{
				padding:5upx;
				border: 1upx solid red;
				border-radius: 10upx;
				font-size: 22upx;color:red ;
			}
		}
	}
</style>
