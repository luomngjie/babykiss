<template>
	<view class="content">
		
		<custom  :back="true" leftText="宝宝"
			class="custom" @click-left="left" color="#fff"
			:title="titleCen" 
			:statusBarBackground="'#FFC227'">
			<view slot="right" >
				<view class="photo-item" @click="operation">
					<image src="../../../static/img/more.png" class="pahoto"></image>
				
				</view>
			</view>
		</custom>
		
		<view class="background" @click="imgpopup(0)" style="z-index: 0;">
			<view class="logo" style="z-index: 1000;" @click="imgpopup(1)">
				<image src="../../../static/img/baby.png" class="img"  ></image>
				<view class="right">
					<view class="name">第十天</view>
					
				</view>
			</view>
			
		</view>
		
		<view class="vacList">
			<view class="vacName" @click="change('name')">
				<view class="name" >小名</view>
				<view class="state">
					<text>{{parame.name}}</text>
					<image src="../../../static/img/jiantou.png" class="image"></image>
				</view>
			</view>
			<view class="line"></view>
			<view class="vacName" @click="change('sex')">
				<view class="name">性别</view>
				<view class="state">
					<text>女孩</text>
					<image src="../../../static/img/jiantou.png" class="image"></image>
				</view>
			</view>
			<view class="line"></view>
			<view class="vacName" @click="change('birth')">
				<view class="name">生日</view>
				<view class="state">
					<picker :start="'2017-07-05'" :end="'2020-12-31'" @change="dateChange" mode="date">
						<view style="font-size: 24upx;">{{parame.birth}}</view>
					</picker>
					<image src="../../../static/img/jiantou.png" class="image"></image>
				</view>
			</view>
			<view class="line"></view>
			<view class="vacName" @click="change('boold')">
				<view class="name">血血型</view>
				<view class="state">
					<text>未填写</text>
					<image src="../../../static/img/jiantou.png" class="image"></image>
				</view>
			</view>
			<view class="line"></view>
			<view class="vacName" @click="change('time')">
				<view class="name">出生时刻</view>
				<view class="state">
					<picker :start="'2017-07-05'" :end="'2020-12-31'" @change="timeChange" mode="time">
						<view style="font-size: 24upx;">{{parame.time}}</view>
					</picker>
					<image src="../../../static/img/jiantou.png" class="image"></image>
				</view>
			</view>
			<view class="line"></view>
			<view class="vacName" @click="change('cm')">
				<view class="name">身高</view>
				<view class="state">
					<text>66.0cm</text>
					<image src="../../../static/img/jiantou.png" class="image"></image>
				</view>
			</view>
			<view class="line"></view>
			<view class="vacName" @click="change('kg')">
				<view class="name">体重</view>
				<view class="state">
					<text>66.0kg</text>
					<image src="../../../static/img/jiantou.png" class="image"></image>
				</view>
			</view>
			<view class="line"></view>
			
		</view>
			
			
			
			
			<uni-popup type="center" ref="operation" zIndex="999">
				<view class="popup-center">
					<view class="item-list">{{tips}}</view>
					<view class="line"/>
					<view class="item-list" @tap.click="upload(1)">拍照</view>
					<view class="line"/>
					<view class="item-list" @tap.stop="upload(2)">本地相册</view>
				</view>
			</uni-popup>
			
			<uni-popup type="center" ref="popup" zIndex="999">
				<view class="popup-center">
					<view class="item-list">操作</view>
					<view class="line"/>
					<view class="item-list" @click="deleted">删除</view>
					<view class="line"/>
					<view class="item-list" @tap.stop="closes">取消</view>
				</view>
			</uni-popup>
			
			
		<uni-popup type="center" ref="sex" zIndex="999">
			<view class="popup-center">
				<view class="item-list">性别</view>
				<view class="line"/>
				<view class="item-list" style="display: flex;align-items: center;" @click="changeItem(index)" v-for="(item,index) in sex">
					<radio  class="round red" style="transform: scale(.7);" :value="item.value" :checked="index === current"/>
					<view class="sex">{{item.name}}</view>
				</view>
				
			</view>
		</uni-popup>
	</view>
</template>

<script>
	export default {
		components:{
			
		},
		data() {
			return {
				backgroundImg:require('../../../static/img/banner.jpg'),
				animationData:{},
				parame:{//参数
					name:"",
					birth:'2020',
					time:"23:25"
				},
				sex:[
					{
						name:"男孩",
						value:'1'
					},
					{
						name:"女孩",
						value:'2'
					}
				],
				isShows:false,//是否显示遮罩层
				color:[525,255,30],
				tips:"设置头像",
				current:0,
				background:'#FFC227',
				titleCen:"",
				
			}
		},
		onShow() {
			
		},
		methods: {
			/**
			 * @param {Object} 性别选择
			 */
			changeItem(e){
				this.current = e
				this.$refs["sex"].close()
				console.log(e)
			},
			/**
			 * 选择日期
			 */
			dateChange(e) {
				this.parame.birth = e.target.value
			},
			timeChange(e){
				this.parame.time = e.target.value
			},
			/**
			 * @param {Object} 修改信息
			 */
			change(e){
				if(e=="name"){
					uni.navigateTo({
						url:"/pages/index/baby_infor/change?type="+e+"&title="+"小名"
					})
				}else if(e=="boold"){
					uni.navigateTo({
						url:"/pages/index/baby_infor/change?type="+e+"&title="+"血型"
					})
				}else if(e=="kg" || e=="cm"){
					uni.navigateTo({
						url:"/pages/index/growth_record/growth_record"
					})
				}else if(e=="sex"){
					this.$refs["sex"].open()
				}
				//console.log(e)
			},
			
			/**
			 * 操作
			 */
			operation(){
				this.$refs["popup"].open()
			},
			
			/**
			 * 删除
			 */
			deleted(){
				this.$refs["popup"].close()
			},
			
			/**
			 * 取消
			 */
			closes(){
				this.$refs["popup"].close()
			},
			
			
			
			/**
			 * @param {Object} 首页头像事件
			 */
			imgpopup(index){
				console.log(index)
				this.$refs["operation"].open()
			},
			
			
			
			/**
			 * @param {Object} opt左侧返回
			 */
			left(){
				uni.navigateBack()
			},
			
			/**
			 * 上传照片和视频
			 */
			upload(index){
				let self=this
				uni.chooseImage({
				    count: 6, //可以选择图片的张数
				    sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
				    sourceType:index==2?['camera']:['album'], //从相册选择  默认是两个都有
				    success: function (res) {
						self.$refs["operation"].close()
				        console.log(JSON.stringify(res.tempFilePaths));
						//返回结果
				    }
				})
			},
			
			
			
			
			/**
			 * @param {Object} opt关闭遮罩层
			 */
			close(){
				this.isShows=false
			},
			
			
		},
		onLoad(opt) {
			let baby = uni.getStorageSync("babyItem")
			this.parame.birth = baby.birth_date
			this.parame.name = baby.name
			console.log(baby)
		},
		
		onUnload() {
		
		},
		
		mounted() {
			
			
			
		},
		
		
	}
</script>

<style lang="scss" scoped>
	// page{
	// 	background-color: #fff;
	// }

	.content{
		 background-color: #F5F5F5;
		 .custom{
			 position: fixed;background-color:#FFC227 ;
			 z-index: 100;
			 top: 0;
			
		 }
		 .photo-item{
			height:60upx;
			 // border-radius: 50%;
			 display: flex;
			 align-items: center;
			 justify-content: center;
			
			 margin:0 40upx;
			 .pahoto{
				 width:40upx;height:40upx;
				 margin:0 10upx;
			 }
		 }
		 .background{
		 	height:400upx;
		 	background-image: url("../../../static/img/banner.jpg");
		 	background-position: center;
		 	background-repeat: no-repeat;
		 	background-size: cover;
		 	position: relative;
		 	// top: 0;
		 	// position: fixed;
		 	width: 100%;
		 	.logo{
		 		display: flex;flex-direction: row;
		 		justify-content: flex-start;
		 		align-items: center;
		 		position: absolute;
		 		bottom:60upx;
		 		.img{
		 			margin:0 20upx;
		 			width:60upx;height:60upx;
		 		}
		 		.right{
		 			color:#fff;
		 			.name{
		 				font-size: 22upx;
		 				margin:10upx;
		 				display: flex;
		 				align-items: center;
		 				.ready{
		 					margin-left:10upx;
		 					width:20upx;height:20upx;
		 				}
		 			}
		 		}
		 	}
		 	
		 	
		 	
		 }
		 
		 .vacList{
		 	background-color: #fff;
		 	margin: 0 0 33upx 0;
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
		 	
		 }
}
		 
	
	
	
	
	
</style>
