<template>
	<view class="content">
		<scroll-view class="scroll" scroll-x="true">
			<view class="VI">
				<view class="but" v-for='index,i in tabel'  :key="i" @click="dj(i)" :class="{active:isShow==i}" >{{index}}</view>
			</view>
		</scroll-view>
		
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				tabel:['育儿助手','社区'],
				isShow:0,
			};
		},
		methods:{
			dj(e){
				this.isShow=e
			},
		}
	}
</script>

<style lang="scss">
	.VI{
			justify-content: center;
			display: flex;
		    background: #ffff;
	}
	.but{
		margin: 10px 10px 5rpx;
	}
	.active{
		    color: #ff9c09;
			border-bottom: 1rpx solid;
			padding-bottom: 5rpx;
		
	}
	.image{
		width: 100rpx;
		height: 100rpx;
	}
</style>
