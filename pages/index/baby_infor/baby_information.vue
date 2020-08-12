<template>
	<view class="content">
		
		<custom  :back="true" leftText="宝宝"
			class="custom" @click-left="left" color="#fff"
			:title="titleCen" 
			>
			<view slot="right" >
				<view class="photo-item" @click="operation">
					<image src="../../../static/img/more.png" class="pahoto"></image>
				
				</view>
			</view>
		</custom>
		
		<view class="background"  style="z-index: 0;" >
			<image class="background" v-model='babySess.cover' :src="babySess.cover!=''?apis+'/'+babySess.cover:backgroundImg" @click="setCover"></image>
			<view class="logo" style="z-index: 1000;" @click="imgpopup">
				<image v-model='babySess.head_portrait' :src="babySess.head_portrait?apis+'/'+babySess.head_portrait:system" class="img"  style="border-radius: 50%;"></image>
				<view class="right">
					<view class="name">第{{days.day}}天</view>
					
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
					<text v-if="parame">{{parame.sex==0?'未知':parame.sex==1?"男孩":parame.sex==2?"女孩":'未知'}}</text>
					<image src="../../../static/img/jiantou.png" class="image"></image>
				</view>
			</view>
			<view class="line"></view>
			<view class="vacName" @click="change('birth')">
				<view class="name">生日</view>
				<view class="state">
					<picker :start="'2017-07-05'" :end="'2020-12-31'" @change="dateChange" mode="date">
						<view style="font-size: 24upx;">{{parame.birth_date}}</view>
					</picker>
					<image src="../../../static/img/jiantou.png" class="image"></image>
				</view>
			</view>
			<view class="line"></view>
			<view class="vacName" @click="change('boold')">
				<view class="name">血型</view>
				<view class="state">
					<text>{{parame.blood_type==1?"A型":parame.blood_type==2?"B型":parame.blood_type==3?"AB型":parame.blood_type==4?"O型":"未知"}}</text>
					<image src="../../../static/img/jiantou.png" class="image"></image>
				</view>
			</view>
			<view class="line"></view>
			<view class="vacName" @click="change('time')">
				<view class="name">出生时刻</view>
				<view class="state">
					<picker :start="'2017-07-05'" :end="'2020-12-31'" @change="timeChange" mode="time">
						<view style="font-size: 24upx;">{{parame.birth_moment?parame.birth_moment:'未知'}}</view>
					</picker>
					<image src="../../../static/img/jiantou.png" class="image"></image>
				</view>
			</view>
			<view class="line"></view>
			<view class="vacName" @click="change('cm')">
				<view class="name">身高</view>
				<view class="state">
					<text>{{parame.height?"未知":parame.height}}</text>
					<image src="../../../static/img/jiantou.png" class="image"></image>
				</view>
			</view>
			<view class="line"></view>
			<view class="vacName" @click="change('kg')">
				<view class="name">体重</view>
				<view class="state">
					<text>{{parame.weight==''?"未知":parame.weight}}</text>
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
				<view class="item-list" style="display: flex;align-items: center;" @click="changeItem(item.value)" v-for="(item,index) in sex">
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
		onLoad(opt) {
			let baby = uni.getStorageSync("babyItem")
			if(baby){
				this.parame.birth = baby.birth_date
				this.parame.name = baby.name
				this.parame = baby
			}
			this.dayBaby()
			
		},
		data() {
			return {
				backgroundImg:require('../../../static/img/banner.jpg'),
				animationData:{},
				parame:{},//参数
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
				system:require("../../../static/img/baby.png"),
				days:{},//宝宝天数
				babySess:{},//宝宝信息
				apis:"https://api.diewo.cn/",
				api:"https://api.diewo.cn/index.php"//图片上传
				
				
			}
		},
		onShow() {
			
		},
		methods: {
			/**
			 * 获取宝宝天数
			 */
			dayBaby(){
				this.http("/app_baby/babyList",{baby_id:this.parame.id}).then(res=>{
					if(res.code==1){
						this.babySess=res.data.data[0]
						if(this.babySess.day){
							this.days = res.data.data[0]
						}
					}
					
				})
			},
			/**
			 * @param {Object} 性别选择
			 */
			changeItem(e){
				uni.showLoading({
					title:"加载中..."
				})
				let obj = {}
				obj.baby_id = this.parame.id
				obj.head_portrait = this.parame.head_portrait
				obj.cover = this.parame.cover
				obj.name = this.parame.name
				obj.sex = e
				obj.type = this.parame.type
				obj.status = this.parame.status
				obj.due_date = this.parame.due_date
				obj.birth_date = this.parame.birth_date
				obj.birth_moment = this.parame.birth_moment
				obj.weight = this.parame.weight
				obj.blood_type = this.parame.blood_type
				this.current = e
				this.parame.sex = e
				this.http("/app_baby/updateBaby",obj).then(res=>{
					if(res.code==1){
						uni.showToast({
							title:"修改成功",
							icon:"none"
						})
						this.$store.commit("babyItem",this.parame)
						setTimeout(()=>{
							uni.redirectTo({
								url:"/pages/index/baby_infor/baby_information"
							})
						},1200)
					}else{
						uni.showToast({
							title:res.msg,
							icon:"none"
						})
					}
					uni.hideLoading()
				})
				this.$refs["sex"].close()
				
			},
			/**
			 * 选择日期
			 */
			dateChange(e) {
				this.parame.birth_date = e.target.value
				uni.showLoading({
					title:"加载中..."
				})
				let obj = {}
				obj.baby_id = this.parame.id
				obj.head_portrait = this.parame.head_portrait
				obj.cover = this.parame.cover
				obj.name = this.parame.name
				obj.sex = e
				obj.type = this.parame.type
				obj.status = this.parame.status
				obj.due_date = this.parame.due_date
				obj.birth_date = this.parame.birth_date
				obj.birth_moment = this.parame.birth_moment
				obj.weight = this.parame.weight
				obj.blood_type = this.parame.blood_type
				
				this.http("/app_baby/updateBaby",obj).then(res=>{
					if(res.code==1){
						uni.showToast({
							title:"修改成功",
							icon:"none"
						})
						this.$store.commit("babyItem",this.parame)
						setTimeout(()=>{
							uni.redirectTo({
								url:"/pages/index/baby_infor/baby_information"
							})
						},1200)
					}else{
						uni.showToast({
							title:res.msg,
							icon:"none"
						})
					}
					uni.hideLoading()
				})
			},
			timeChange(e){
				this.parame.birth_moment = e.target.value
				uni.showLoading({
					title:"加载中..."
				})
				let obj = {}
				obj.baby_id = this.parame.id
				obj.head_portrait = this.parame.head_portrait
				obj.cover = this.parame.cover
				obj.name = this.parame.name
				obj.sex = e
				obj.type = this.parame.type
				obj.status = this.parame.status
				obj.due_date = this.parame.due_date
				obj.birth_date = this.parame.birth_date
				obj.birth_moment = this.parame.birth_moment
				obj.weight = this.parame.weight
				obj.blood_type = this.parame.blood_type
				
				this.http("/app_baby/updateBaby",obj).then(res=>{
					if(res.code==1){
						uni.showToast({
							title:"修改成功",
							icon:"none"
						})
						this.$store.commit("babyItem",this.parame)
						setTimeout(()=>{
							uni.redirectTo({
								url:"/pages/index/baby_infor/baby_information"
							})
						},1200)
					}else{
						uni.showToast({
							title:res.msg,
							icon:"none"
						})
					}
					uni.hideLoading()
				})
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
				let self=this;
				uni.showModal({
					title:"提示",
					content:"你确定删除宝宝么？这会导致你无法继续查看宝宝相关信息",
					success:res=>{
						if (res.confirm) {
							uni.showLoading({
								title:"加载中..."
							})
								self.http("/app_baby/delBaby",{baby_id:self.parame.id}).then(res=>{
									if(res.code==1){
										uni.showToast({
											title:"删除成功",
											icon:"none"
										})
										uni.removeStorageSync("babyItem")
										setTimeout(()=>{
											uni.reLaunch({
												url:"/pages/index/index"
											})
										},1000)
									}else{
										uni.showToast({
											title:res.msg,
											icon:"none"
										})
									}
									uni.hideLoading()
								})
								
								self.$refs["popup"].close()
							} else if (res.cancel) {
								self.$refs["popup"].close()
							}
					}
				})
				
			},
			
			/**
			 * 取消
			 */
			closes(){
				this.$refs["popup"].close()
			},
			
			/**
			 * 设置背景封面
			 */
			setCover(){
				this.tips = "设置封面"
				this.$refs["operation"].open()
			},
			/**
			 * @param {Object} 首页头像事件
			 */
			imgpopup(){
				this.tips = "设置头像"
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
				self.$refs["operation"].close()
				uni.chooseImage({
				    count: 6, //可以选择图片的张数
				    sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
				    sourceType:index==2?['album']:['camera'], //从相册选择  默认是两个都有
				    success: function (res) { 
						uni.showLoading({
							title:"图片上传中"
						})
						uni.uploadFile({
							url:self.api+'/file_upload/upload',
							fileType:'image',
							filePath:res.tempFilePaths[0],
							sizeType: ['compressed'],  
							name:'file',  
							formData:{
								token:uni.getStorageSync('userInfo').token
							},
							success: (uploadFileRes) => {
								
								let objs = JSON.parse(uploadFileRes.data);
								if(objs.code==1){
									let obj = {};
									let item = uni.getStorageSync("babyItem")
									if(self.tips=="设置封面"){
										obj={
											baby_id:uni.getStorageSync("babyItem").id,
											cover:objs.data.str_url
										}
										item.cover=objs.data.str_url
										self.babySess.cover = objs.data.str_url
										self.$store.commit("babyItem",item)
										
									}else{
										obj={
											baby_id:uni.getStorageSync("babyItem").id,
											head_portrait:objs.data.str_url
										}
										item.head_portrait=objs.data.str_url
										self.babySess.head_portrait = objs.data.str_url
										self.$store.commit("babyItem",item)
										//self.babySess.head_portrait = objs.data.str_url
									}
									
									self.http("/app_baby/updateBaby",obj).then(res=>{
										if(res.code==1){
											
											uni.showToast({
												title:"修改成功",
												icon:"none"
											})
											
											
											self.$store.commit("babyItem",self.babySess)
											
										}else{
											uni.showToast({
												title:res.msg,
												icon:"none"
											})
										}
									})
								}
								
								
								
								
							},
							fail:(error)=>{
								uni.showToast({
									title:"图片上传失败",
									icon:"none"
								})
							}
						})
						uni.hideLoading({
							title:"图片上完毕"
						})
						
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
