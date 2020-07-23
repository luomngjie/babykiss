<template>
	<view class="content">
		<custom :back="false" @click-right="save" title="增加生长记录" leftText="取消" @click-left="cancel"></custom>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		methods:{
			/**
			 * 保存生长记录
			 */
			save(){
				console.log("保存生长记录")
			},
			
			/**
			 * 取消
			 */
			cancel(){
				console.log("取消")
			}
		}
	}
</script>

<style lang="scss" scoped>

</style>
