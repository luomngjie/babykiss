<template>
	<view class="content">
		<custom :back="false" title="添加疫苗" leftText="取消" @click-left="left"></custom>
		<view class="item" v-for="(item,index) in custom" @click="detail(item)">{{item.name}}</view>
		<view class="item" v-for="(item,index) in data" @click="detail(item)">{{item.title}}</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				data:[
					{
						name:"水痘疫苗",
						type:"system"
					}
				],
				custom:[
					{
						name:"自定义疫苗",
						type:"custom"
					},
				]
			};
		},
		onLoad() {
			this.list()
		},
		methods:{
			/**
			 * 系统疫苗列表
			 */
			list(){
				let obj={
					baby_id:uni.getStorageSync("babyItem").id
				}
				this.http("/app_baby/selectAppVero",obj).then(res=>{
					if(res.code==1){
						res.data.forEach(item=>{
							item.type="system"
						})
						this.data = res.data
					}else{
						uni.showToast({
							title:res.msg,
							icon:"none"
						})
					}
				})
			},
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
					url:"/pages/index/Vaccination/detail?types="+JSON.stringify(item)
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
