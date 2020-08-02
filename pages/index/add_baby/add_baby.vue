<template>
	<view class="content" :style="{'height':height+'px'}">
		<custom  :isLeft="true" title="添加宝宝"></custom>
		<view class="title">请选择宝宝性别或孕期</view>
		<view class="list">
			<block v-for="(item,index) in typeList" :key="item.type">
				<view class="list-item" :style="{'background':item.type == 0?'#FFF0F3':item.type==1?'#F3F7FF':item.type==2?'#FFF7E4':''}" @click="createBaby(item.type)">
					<image :src="item.url" class="img"></image>
					<view class="gray" :style="{'color':item.type == 0?'#ED9796':item.type==1?'#849DDF':item.type==2?'#EFC83C':''}">{{item.name}}</view>
				</view>
			</block>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				height:0,
				typeList:[
					// {
					// 	name:"备孕中",
					// 	url:"../../../static/img/babysel.png",
					// 	type:0
					// },
					{
						name:"已怀孕",
						url:"../../../static/img/babysel.png",
						type:1
					},
					{
						name:"宝宝已出生",
						url:"../../../static/img/babysel.png",
						type:2
					},
				]
			};
		},
		methods:{
			/**
			 * 创建宝宝或孕期
			 * type=0=备孕中 1=已怀孕 2=宝宝已出生
			 */
			createBaby(type){
				
				uni.navigateTo({
					url:"/pages/index/baby_infor/baby_infor?type="+type
				})
			}
		},
		onLoad() {
			this.height=this.$store.state.system.windowHeight
		}
	}
</script>

<style lang="scss" scoped>
	page{
		background-color: #fff;
	}
	.content{
		
	.title{
		width:100%;text-align: center;margin:100upx 0;
		font-size: 26upx;
	}
	
	.list{
		display: flex;
		flex-direction: row;
		justify-content: space-around;
		align-items: center;
		.list-item{
			width:200upx;height:300upx;
			flex-direction: column;
			background-color: #FFF0F3;
			border-radius:7px;
			display: flex;
			align-items: center;
			justify-content:center;
			.img{
				width:80upx;height:80upx;
			}
			.gray{
				font-size: 26upx;color:#FFC6CC;
				margin-top: 60upx;
			}
			
		}
	}
}
</style>
