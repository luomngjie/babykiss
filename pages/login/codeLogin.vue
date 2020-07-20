<template>
	<view class="content">
		<custom></custom>
		<view class="title code">输入验证码</view>
		<view class="tips">验证码已发送到:+86 &nbsp;{{phone}}</view>
		<validCode :maxlength="4" :isPwd="true" @finish="getCode"></validCode>
	</view>
</template>

<script>
	import validCode from '@/components/validCode/validCode.vue'
	export default {
		components:{
			validCode
		},
		data() {
			return {
				phone:"18223138790",
				one:"",
				two:"",
				three:"",
				fore:"",
				iptValue:'',
				isFocus: false
			};
		},
		methods:{
		   /**
			* @param {Object} e
			* 获取自动填充数字
			*/
		   getCode(e){
			   console.log(e)
		   }
		}
	}
</script>

<style lang="scss" scoped>
	.title,.tips{
		display: flex;
		justify-content: center;
	}
	.code{
		margin-top:60upx;
	}
	.tips{
		font-size: 26upx;
		margin:33upx 0;
	}
	
</style>
