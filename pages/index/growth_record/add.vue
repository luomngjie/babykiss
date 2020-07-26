<template>
	<view class="content">
		<custom :back="false" @click-right="save" title="增加生长记录" leftText="取消" @click-left="cancel" rightText="保存" style="background-color: #fff;"></custom>
		
		<view class="menu">
			<view class="menu-item" v-for="(item,index) in list">
				<view class="left">{{item.name}}</view>
				<input :type="item.type" :placeholder="item.placeholder" placeholder-style="font-size:28upx;" v-model="item.value" class="input">
				<view class="company">{{item.com}}</view>
			</view>
			<view class="menu-item-picker">
				<view class="nowSelect">
					日期
				</view>
				<view class="picker">
					<picker mode="date" :value="parame.date" :start="startDate" :end="endDate" @change="bindDateChange">
						<view class="">{{parame.date}}</view>
					</picker>
				</view>
			</view>
			
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			const currentDate = this.getDate({
				format: true
			})
			return {
				startDate:"2020/07/26",
				endDate:'2030/07/26',
				parame:{
					date: currentDate
				},
				list:[
					{
						name:"身高",
						com:"cm",
						placeholder:"请输入身高",
						type:"text",
						value:''
					},
					{
						name:"体重",
						com:"kg",
						placeholder:"请输入体重",
						type:"number",
						value:''
					},
					{
						name:"头围",
						com:"cm",
						placeholder:"请输入头围",
						type:"number",
						value:''
					}
				]
			};
		},
		methods:{
			/**
			 * 保存生长记录
			 */
			save(){
				let obj={}
				this.list.forEach(item=>{
					if(item.value==''){
						uni.showToast({
							title:"请输入宝宝的身高、体重或者头围信息",
							icon:"none"
						})
						return 
					}
					this.parame[item.name]=item.value
				})
				console.log(this.parame)
			},
			
			/**
			 * 取消
			 */
			cancel(){
				uni.navigateBack()
			},
			
			 
			/*
			日期选择*
			 */
			bindDateChange(e){
				this.parame.date = e.target.value
			},
			
			getDate(type) {
				const date = new Date();
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let day = date.getDate();

				if (type === 'start') {
					year = year - 60;
				} else if (type === 'end') {
					year = year + 2;
				}
				month = month > 9 ? month : '0' + month;;
				day = day > 9 ? day : '0' + day;
				return `${year}-${month}-${day}`;
			}
		}
	}
</script>

<style lang="scss" scoped>
	.content{
		.menu{
			display: flex;
			flex-direction: column;
			justify-content: flex-start;
			background-color: #fff;
			margin-top: 33upx;
			.menu-item{
				font-size: 26upx;
				margin: 33upx;
				padding: 20upx 0;
				display: flex;
				flex-direction: row;
				border-bottom: 1upx solid #eee;
				justify-content: space-around;
				.input{
					border:none;outline:none;
				}
			}
			.menu-item-picker{
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				padding: 20upx 0;
				margin: 0 33upx;
				.nowSelect,.picker{
					font-size: 26upx;
					margin: 0 33upx;
				}
				.picker{
					width: 60%;
				}
			}
		}
	}
</style>
