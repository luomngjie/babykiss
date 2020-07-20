<template>
	<view class="dot-main">
		<view :class="['dot-item',current==index?'active':'']" v-for="(item,index) in list" :key="index"></view>
	</view>
</template>
<style>
	.dot-main {
		display: flex;
		justify-content: center;
		align-items: center;
		width:100%;
	}
	.dot-item {
		width: 10.41upx;
		height: 10.41upx;
		border-radius: 10upx;
		background-color: #eee;
		margin: 0 6upx;
		box-sizing: border-box;
		width:60upx
	}
	.active {
		border-radius: 33upx;
		width: 60upx;
		background-color: #FFBF29;
	}
</style>
<script>
	export default {
		props: [ 'list','current'],
		data() {
			return {
				
			};
		}
	}
</script>