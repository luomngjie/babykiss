<template>
	<view class="content" :style="{'height':height+'px'}">
		<custom  :back="false" leftText="取消"
			 @click-left="left" color="#aaa"
			:title="'谁可以看'" :statusBarBackground="'#fff'" :bg="'#fff'" rightText="确定" @click-right="right">
			
		</custom>
		
		<view class="con">
			<view class="list" v-for="(item,index) in  list" :key="index" @click="check(item)">
				<image :src="current==index?url:''" class="pahoto" ></image>
				<view class="name">{{item.name}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				height:0,
				current:0,
				url:require("../../../../static/img/gou.png"),
				list:[
					{
						name:"所有亲",
						id:0
					},
					{
						name:"仅自己",
						id:1
					},
					{
						name:"选择亲",
						id:2
					}
				]
			};
		},
		
		onLoad() {
			this.height=this.$store.state.system.screenHeight
		},
		
		methods:{
			/**
			 * 选择亲戚
			 */
			check(item){
				this.current = item.id
			},
			/**
			 * nav左侧返回
			 */
			left(){
				uni.navigateBack()
			},
			
			/**
			 * 右侧搜索图标
			 */
			right(){
				uni.showToast({
					title:"点击了确定",
					icon:"none"
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.content{
		background-color: #fff;
		.con{
			margin-top: 33upx;
			.list{
				border-bottom: 1upx solid #eee;
				padding:22upx 33upx;
				display: flex;
				flex-direction: row;
				justify-content: flex-start;
				align-items: center;
				.pahoto{
					width:30upx;height:30upx;
					margin-right: 33upx;
					
				}
				.name{
					font-size: 32upx;
				}
			}
		}
	}
</style>
