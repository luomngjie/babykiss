<template>
	<view class="content">
		<custom :back="false" title="添加疫苗" leftText="取消" @click-left="left"></custom>
		<view class="item" v-for="(item,index) in list" @click="detail(item)">{{item.name}}</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list:[
					{
						name:"自定义疫苗",
						type:"custom"
					},
					{
						name:"水痘疫苗",
						type:"system"
					}
				]
			};
		},
		methods:{
			/**
			 * nav取消
			 */
			left(){
				uni.navigateBack()
			},
			
			/**
			 * 疫苗详情
			 */
			detail(item){
				uni.navigateTo({
					url:"/pages/index/Vaccination/detail?types="+item.type
				})
				
			}
		}
	}
</script>

<style lang="scss" scoped>
	.content{
		background-color: #fff;
		.item{
			font-size: 26upx;
			border-bottom: 1upx solid #eee;
			padding:33upx;
		}
	}
	
</style>
