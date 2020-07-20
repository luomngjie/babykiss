<template>
	<view class="container">
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {

		},
		onLoad() {
			this.http("/api").then(res=>{
				console.log(12)
			})
		}
	}
</script>

<style lang="scss" scoped>
	
</style>
