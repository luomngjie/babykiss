<template>
	<view class="content">
		<custom :back="true" :title="title"  rightText="删除" @click-right="del" v-if="type=='list'"></custom>
		<custom :back="false" :title="title" leftText="取消" @click-left="left" rightText="保存" @click-right="right" v-else></custom>
		
		<view class="vacName" v-if="types=='custom'">
			<view class="name">疫苗名称</view>
			<input type="text" placeholder="请输入疫苗名称" placeholder-style="font-size:26upx;color:#aaa;"style="text-align: right;">
		</view>
		
		<view class="vacList">
			<view class="vacName">
				<view class="name">接种状态</view>
				<view class="state">
					<text>未接种</text>
					<image src="../../../static/img/jiantou.png" class="image"></image>
				</view>
			</view>
			<view class="line"></view>
			<view class="menu-item-picker">
				<view class="nowSelect">
					接种日期
				</view>
				<view class="picker">
					<picker mode="date" :value="parame.date" :start="startDate" :end="endDate" @change="bindDateChange" fields="day">
						<view class="" v-if="type!='list'">{{parame.date}}</view>
						<view class="" v-else style="color:#6DD7A9">{{age}}</view>
					</picker>
					<image src="../../../static/img/jiantou.png" class="image"></image>
				</view>
			</view>
		</view>
		
		<view class="contenttext">
			<view class="title">疫苗简介</view>
			<textarea class="p-20" placeholder="请输入备注信息"  @blur = "descInput" v-model="parame.desc" placeholder-style="font-size:26upx; "/>
		</view>
		
		
		
		<cu-modal ref="quanxian"  @cancel='modalHide'  @Confirm="modalConfirm">
			<!-- :cancelText='cancel' :confirmText='confirmbtn' -->
			<text slot="content">
				确定删除该疫苗?
			</text>
		</cu-modal>
	</view>
</template>

<script>
	export default {
		data() {
			const currentDate = this.getDate({
				format: true
			})
			return {
				title:"添加疫苗",
				types:"",//用于区分是否为系统疫苗或者自定义疫苗
				type:'',//与接种信息公用一个也页面，用于区分显示内容
				startDate:"",
				endDate:'',
				age:"2月龄请设置接种时间",
				parame:{
					date: currentDate,
					desc:''
				},
			};
		},
		onLoad(opt) {
			this.type=opt.type||''
			this.types=opt.types||''
		},
		methods:{
			/**
			 * nav取消
			 */
			left(){
				uni.navigateBack()
			},
			
			/**
			 * nav保存
			 */
			right(){
				console.log(1)
			},
			
			/**
			 * nav删除
			 */
			del(){
				this.$refs.quanxian.open()
			},
			
			/**
			 * 模态框取消
			 */
			modalHide(){
				this.$refs.quanxian.close()
			},
			
			/**
			 * 模态框确认
			 */
			modalConfirm(){
				this.$refs.quanxian.close()
			},
			
			/*
			日期选择*
			 */
			bindDateChange(e){
				this.parame.date = e.target.value
				this.age = e.target.value
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
				this.startDate = `${year}年${month}月${day}日`;
				//return `${year}-${month}-${day}`;
				return `${year}年${month}月${day}日`;
			},
			
			/**
			 * 文本框信息
			 */
			descInput(e){
				let value = e.detail.value
				this.parame.desc=value
				console.log(this.parame)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.vacName{
		display: flex;
		justify-content: space-between;
		padding:20upx 33upx;
		font-size: 28upx;
		background-color: #fff;
		//margin: 33upx 0;
	}
	.vacList{
		background-color: #fff;
		margin: 33upx 0;
		.line{
			width: 95%;
			border-bottom: 1px solid #eee;
			margin: 0 auto;
		}
		.vacName{
			display: flex;
			justify-content: space-between;
			padding:20upx 33upx;
			font-size: 28upx;
			
			.name{
				
			}
			.state{
				display: flex;
				align-items: center;
				.image{
					width: 30upx;height: 30upx;
				}
			}
		}
		.menu-item-picker{
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			padding: 20upx 0;
			
			.nowSelect,.picker{
				font-size: 26upx;
				margin: 0 33upx;
			}
			.picker{
				width: 60%;
				display: flex;
				align-items: center;
				justify-content: flex-end;
				.image{
					width: 30upx;height: 30upx;
				}
			}
		}
	}
	.contenttext{
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		background-color: #fff;
		margin:33upx 0;
		font-size: 26upx;
		padding: 33upx;
		.title{
			margin-bottom:20upx;
		}
	}
</style>
