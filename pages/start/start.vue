<template>
	<view class='content'>
		<swiper class="swiper-box" @change="change" :style="view_height" :autoplay="autoplay" :interval="interval" :duration="duration">
			<swiper-item v-for="(item, index) in list" :key="index">
				<image :src="item.url" class="swiper-item" ></image>
			</swiper-item>
		</swiper>
		<swiper-dot class="dot" :current="current" :list="list" ></swiper-dot>
		<view class="bottom-btn">
			<view class="reg" @tap.stop="jump(0)">注册</view>
			<view class="reg" @tap.stop="jump(1)">登录</view>
		</view>
	</view>
</template>

<script>
	import swiperDot from '@/components/swiper-dot/swiper_dot.vue';
	export default {
		components: { swiperDot },
		data() {
			return {
				list: [
					{
						url:require("../../static/img/swiperban.jpg")
					},
					{
						url:require("../../static/img/1080.png")
					},
					{
						url:require("../../static/img/swiperban.jpg")
					}
				],
				view_height:{
					height:this.$store.state.system.windowHeight-0+"px",
				},
				autoplay: true,
				interval: 2000,
				duration: 500,
				
				current: 0
			};
		},
		onLoad() {
			
		},
		methods:{
			/**
			 * @param {Object} e
			 * 轮播自定义指示点方法
			 */
			change(e) {
				this.current = e.detail.current;
			},
			
			/**
			 * 登录注册跳转方法
			 */
			jump(index){
				uni.reLaunch({url:"/pages/login/login?type="+index})
			}
		}
		
	}
</script>

<style lang="scss">
	.content{
		.swiper-box{
			position:relative;
			.swiper-item{
				width:100%;height:100%;
			}
		}
		
		.dot{
			position: absolute;bottom:180upx;
		}
		
		.bottom-btn{
			position: absolute;bottom:60upx;
			width:100%;
			display: flex;justify-content: space-around;
			align-items: center;
			.reg{
				background:#FFBF29;border-radius: 8upx;
				color:#fff;width:250upx;justify-content: center;
				height:52upx;
				display: flex;align-items: center;font-size: 26upx;
			}
			
		}
	}
</style>
