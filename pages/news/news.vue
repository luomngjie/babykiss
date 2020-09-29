<template>
	<view class="content">
		<custom  :back="false" color="black" :bg="'#fff'":statusBarBackground="'#fff'" title="消息">
			<view slot="right" >
				<view class="photo-item" >
					<image src="../../static/img/add.png" class="pahoto"></image>
				</view>
			</view>
			<view slot="left" >
				<view class="photo-item" >
					<image src="../../static/img/main.png" class="pahoto"></image>
				</view>
			</view>
		</custom>
		<tabBar :pagePath="'/pages/news/news'"></tabBar>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
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
</style>
