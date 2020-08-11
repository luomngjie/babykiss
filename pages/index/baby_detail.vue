<template>
	<view class="content" :style="{'height':height+'px'}">
			<custom  :back="true" leftText="宝宝"
				class="custom" @click-left="left" color="#fff"
				:title="titleCen" v-if="scrollTop>=100" :bg="'#FFC227'"
				:statusBarBackground="'#FFC227'">
				<view slot="right" >
					<view class="photo-item" >
						<image src="../../static/img/icon_sosuo_mian.png" class="pahoto"></image>
						<image src="../../static/img/xiangji.png" class="pahoto" @click="rightShow" ></image>
					</view>
				</view>
			</custom>
			<custom  :back="true" leftText="宝宝" 
				style="position: absolute;top: 0;" @click-left="left" color="#fff"
				:title="titleCen" v-else>
				<view slot="right" >
					<view class="photo-item" :style="{'borderRadius':'50%'}">
						<image src="../../static/img/xiangji.png" class="pahoto" @click="rightShow" ></image>
					</view>
				</view>
			</custom>
			
			<scroll-view  :style="{'height':height-90+'px'}"  @scrolltolower="onReachScollBottom" 
			 @scroll="scroll" scroll-y="true" class="scroller" scroll-with-animation="true">
			
			<view class="background"  >
				<image :src="babySess.cover?apis+'/'+babySess.cover:backgroundImg" class="background" @click="clickCover"></image>
				<!-- 宝宝头像 -->
				<view class="logo">
					<image :src="babySess.head_portrait?apis+'/'+babySess.head_portrait:system" class="img"  style="border-radius: 50%;" @click="imgpopup"></image>
					<view class="right" @tap.click="clickLogo">
						<view class="name">{{param.name}}</view>
						<view class="name">刚出生<image src="../../static/img/ready.png" class="ready"></image></view>
					</view>
				</view>
				<view class="nav">
					<view class="nav-item" v-for="(item,idnex) in nav" :key="item.id" @tap.stop="baby(item.id,item.url)">
						{{item.name}}
					</view>
				</view>
			</view>
			
			<view class="tipse" v-if="false">
				<image src="../../static/img/cao.png" class="img"></image>
				<view class="tips">和宝妈一起见证宝宝的成长吧</view>
			</view>
			
			
			<view class="timeLine" v-if="talk.length==0">
				<view class="scroll">
					<view class="item-menu"  @tap.stop="upload">
						<view class="day">7月12日&nbsp;第1天</view>
						<view class="conten">
							<image src="../../static/img/banner.jpg" class="image"></image>
							<view class="tipsl">有了宝宝的陪伴,每天都是奇妙的体验，从现在开始记录，留住成长的美好.</view>
							<view class="uploat" >上传照片和视频</view>
						</view>
					</view>
				</view>
			</view>
			<ysteps :talk="talk" :type="type" v-else @fun="detail"></ysteps>
			
			<uni-popup type="center" ref="operation" zIndex="999">
				<view class="popup-center">
					<view class="item-list">操作</view>
					<view class="line"/>
					<view class="item-list" @tap.click="babyInfor">宝宝信息</view>
					<view class="line"/>
					<view class="item-list" @tap.click="setLogo('logo')">设置头像</view>
					<view class="line"/>
					<view class="item-list" @tap.click="setLogo('cover')">设置封面</view>
				</view>
			</uni-popup>
			
			
			</scroll-view>
			<view class="hide" v-if="isShows" @tap.stop="close" >
				<view class="top">
					<view class="time">
						<view class="day">{{week.day}}</view>
						<view class="week">
							<view class="weeks">{{week.week}}</view>
							<view class="weeks">{{week.month}}/{{week.year}}</view>
						</view>
						<view class="numday">出生第14天</view>
					</view>
					<image src="../../static/img/banner.jpg" class="bg"></image>
				</view>
				<view class="bottomItem" >
					<view class="items" v-for="(item,index) in bottom" :key="index" :animation="animationData" @click="animateFun(item.name)">
						<view class="menu" :style="{'background':item.bg}">
							<image :src="item.img" class="item-img"></image>
						</view>
						<view class="name" style="font-size: 22upx;">{{item.name}}</view>
					</view>
					
				</view>
			</view>
		<!-- 
		
		<uni-load-more :status="status"></uni-load-more>
		<loading v-model="show"></loading> -->
	</view>
</template>

<script>
	import loading from '@/components/loading/loading.vue'
	import ysteps from '../../components/YSteps/YSteps.vue'
	export default {
		components:{
			loading,
			ysteps
		},
		data() {
			return {
				backgroundImg:require('../../static/img/banner.jpg'),
				apis:"https://api.diewo.cn/",
				animationData:{},
				bottom:[
					{
						name:"日记",
						img:"../../static/img/xiangji.png",
						bg:"#FD8465"
					},
					{
						name:"大事记",
						img:"../../static/img/xiangji.png",
						bg:"#7BC7F8"
					},
					{
						name:"身高体重",
						img:"../../static/img/xiangji.png",
						bg:"#FFC12B"
					}
				],//底部功能块
				isShowBaby:'',
				type:"index",//用于时间线类型区别。区分首页时间线样式和宝宝大事记样式
				isShows:false,//是否显示遮罩层
				color:[525,255,30],
				talk: [],
				nav:[
					
					{
						name:"生长记录",
						id:1,
						url:"/pages/index/growth_record/growth_record"
					},
					{
						name:"疫苗接种",
						id:2,
						url:"/pages/index/Vaccination/Vaccination"
					},
					{
						name:"大事记",
						id:3,
						url:"/pages/index/memorabilia/memorabilia"
					}
					
				],
				height:0,
				background:'#FFC227',
				titleCen:"",
				scrollTop:0,//页面滚动距离
				timmer:null,//定时器
			
				week:{
					year:'',
					month:"",
					day:"",
					week:""
				},//年月日
				
				page:{
					page:1,//当前页数
					num:5,//当前条数
					total:''//数据总数
				},
				show:true,//全局等待动画
				status: 'more',
				babySess:{},
				system:require("../../static/img/baby.png"),
				param:{},//宝宝详情信息
				api:"https://api.diewo.cn/index.php"//图片上传
				
				
			}
		},
		onShow() {
			
		},
		onReachBottom() {
			
			
		},
		methods: {
			/**
			 * 背景图点击事件
			 */
			clickCover(){
				uni.navigateTo({
					url:"/pages/index/baby_infor/baby_information"
				})
			},
			/**
			 * 获取宝宝信息
			 */
			dayBaby(){
				this.http("/app_baby/babyList",{baby_id:uni.getStorageSync("babyItem").id}).then(res=>{
					if(res.code==1){
						this.babySess=res.data.data[0]
					}
					
				})
			},
			/**
			 * @param {Object}设置头像点击弹窗
			 */
			clickLogo(){
				this.$refs["operation"].open()
			},
			/**
			 * 设置头像
			 * 
			 */
			setLogo(type){
				let self=this
				uni.chooseImage({
				    success: function (res) {
						//JSON.stringify(res.tempFilePaths)
						
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
				        		let obj = JSON.parse(uploadFileRes.data);
				        		if(obj.code==1){
									let objs={}
									if(type=='logo'){
										 objs={
											baby_id:uni.getStorageSync("babyItem").id,
											head_portrait:obj.data.str_url
										}
									}else{
										 objs={
											 baby_id:uni.getStorageSync("babyItem").id,
											cover:obj.data.str_url
										}
									}
									
									//self.babyImg.logo = self.apis+
									self.http("/app_baby/updateBaby",objs).then(res=>{
										if(res.code==1){
											uni.navigateTo({
												url:"/pages/index/baby_detail"
											})
											
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
						self.$refs["operation"].close()
						//返回结果
				    }
				})
			},
			/**
			 * @param {Object} e底部动画跳转
			 */
			animateFun(e){
				if(e=="日记"){
					uni.navigateTo({
						url:"/pages/index/memorabilia/next/next"
					})
				}else if(e=="大事记"){
					uni.navigateTo({
						url:"/pages/index/memorabilia/add/add?custom=1"
					})
				}else if(e=="身高体重"){
					uni.navigateTo({
						url:"/pages/index/growth_record/add"
					})
				}
			},
			/**
			 * 大事记详情
			 */
			detail(e){
				uni.navigateTo({
					url:"/pages/index/memorabilia/detail/detail?item="+JSON.stringify(e)
				})
			},
			/**
			 * 获取当前日期
			 */
			getTime(){
			
				var date = new Date(),
				year = date.getFullYear(),
				month = date.getMonth() + 1,
				day = date.getDate(),
				week = date.getDay(),
				hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours(),
				minute = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes(),
				second = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
				month >= 1 && month <= 9 ? (month = "0" + month) : "";
				day >= 0 && day <= 9 ? (day = "0" + day) : "";
				var timer = month + '月' + day+"日" 
				var weekday=["星期日","星期一","星期二","星期三","星期四","星期五","星期六"];
				this.week.year=year
				this.week.month=month
				this.week.day=day
				this.week.week=weekday[week]
				this.titleCen = timer
				
				return timer;
			},
			/**
			 * 操作
			 */
			operation(){
				this.$refs["popup"].open()
			},
			
			scroll(e){
				this.scrollTop=e.detail.scrollTop
				if(e.detail.scrollTop>100){
					this.getTime()
					this.background=([255,194,39])
				}
				if(e.detail.scrollTop<30){
					this.titleCen=''
					this.background=[]
				}
				
				//this.background="rgba(5,5,155,.5)"
				
				
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
			imgpopup(){
				this.$refs["operation"].open()
			},
			
			/**
			 * nav栏目跳转事件
			 */
			baby(id,url){
				id==1?uni.navigateTo({url:url})
				:id==2?uni.navigateTo({url:url})
				:id==3?uni.navigateTo({url:url})
				:''
				
			},
			
			/**
			 * @param {Object} opt左侧返回
			 */
			left(){
				
				uni.reLaunch({
					url:"/pages/index/index"
				})
			},
			
			/**
			 * 上传照片和视频
			 */
			upload(){
				let self=this
				uni.chooseImage({
				    // count: 6, //可以选择图片的张数
				    sourceType:['album'], //从相册选择  默认是两个都有
				    success: function (res) {
						//JSON.stringify(res.tempFilePaths)
						
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
				        		let obj = JSON.parse(uploadFileRes.data);
				        		if(obj.code==1){
									uni.setStorageSync("img",obj.data.str_url)
				        			uni.navigateTo({
				        				url:"/pages/index/memorabilia/next/next"
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
			 * 宝宝的大事记和体重记录列表
			 */
			appBabyLogList(){
				this.http("/app_baby/appBabyLogList",{baby_id:this.param.id}).then(res=>{
					if(res.code==1){
						this.talk = res.data.data
					}else{
						uni.showToast({
							title:res.msg,
							icon:"none"
						})
					}
					
				})
			},
			
			
			
			/**
			 * @param {Object} opt右侧相机点击事件
			 */
			rightShow(){
				this.isShows=true
				this.getTime()
				this.animate()
			},
			
			/**
			 * @param {Object} opt关闭遮罩层
			 */
			close(){
				this.isShows=false
			},
			
			/**
			 * @param {Object} opt遮罩层动画效果
			 */
			animate(){
				let num=0
				
				this.timmer = setInterval(()=>{
					num+=2
					var animation = uni.createAnimation({  
						duration:300,  
						delay:0,  
					})  
					if(num === 10){  
						num = 0  
						clearInterval(this.timmer)
					}else if(num ===0){  
						// num = -20  
						clearInterval(this.timmer)
					}
					this.animationData = animation  
					
					animation.translateY(-166).step()
					this.animationData = animation.export()  
				},300)
			},
			
			/**
			 * @param {Object} opt宝宝信息
			 */
			babyInfor(){
				uni.navigateTo({
					url:"/pages/index/baby_infor/baby_information"
				})
				this.$refs["operation"].close()
			},
			/**
			 * @param {Object} opt
			 * 滚动底部事件，无无限加载
			 */
			onReachScollBottom(e){
				
			},
			
		},
		
		onLoad(opt) {
			this.param = uni.getStorageSync("babyItem")
			this.height=this.$store.state.system.screenHeight
			this.appBabyLogList()
			this.dayBaby()
			//console.log(this)
		},
		
		onUnload() {
		  this.animationData = {}
		  // 页面关闭后清空数据
		},
		
		mounted() {
			
			
			
		},
		
		/**
		 * 下拉刷新
		 */
		onPullDownRefresh(){
			this.refresh()
			setTimeout(()=>{
				 uni.stopPullDownRefresh();
				 
			},2000)
		},
		
		/**
		 * 监听页面滚动距离
		 */
		onPageScroll(e) {
			this.scrollSize = e.scrollTop

		}
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
			 top: calc(100% - 88upx - constant(safe-area-inset-top));
		 }
		 .photo-item{
			height:60upx;
			 // border-radius: 50%;
			 display: flex;
			 align-items: center;
			 justify-content: center;
			 background-color: #FFC227;
			 margin:0 40upx;
			 .pahoto{
				 width:40upx;height:40upx;
				 margin:0 10upx;
			 }
		 }
		 .leftNav{
			 display: flex;
			 flex-direction: row;
			 justify-content: flex-start;
			 align-items: center;
			 .navImg{
				 width:30upx;height:30upx;
			 }
			 view{
				 font-size: 28upx;
				 color:#fff;
			 }
		 }
		 .scroller{
			//  position:sticky;
			// top: var(--window-10);
		 }
		 .hide{
			 //background-color: #fff;
			 width: 100%;height:100%;
			 position: fixed;opacity: .9;
			 background-color: #fff;
			 top: 0;left: 0;right: 0;
			 bottom: 0;z-index: 10000;
			 .top{
				 display: flex;
				 justify-content: space-between;
				 margin-top: 70upx;
				 .time{
					 width: 200upx;
					 display: flex;
					 flex-direction: row;
					 flex-wrap: wrap;
					 align-items: center;
					 margin-left: 33upx;
					 .day{
						 font-size: 50upx;
						 margin-right: 13upx;
						 color:#aaa;
						 
					 }
					 .week{
						 font-size: 20upx;
					 }
					 .numday{
						 font-size: 28upx;
					 }
				 }
				 .bg{
					 width:220upx;height:180upx;
					  margin-right: 33upx;
				 }
			 }
			 
			 .bottomItem{
				 display: flex;
				 justify-content:space-around; //flex-start;
				 position: fixed;
				 width: 100%;
				 //bottom: 120upx;
				 flex-direction: row;
				 flex-wrap: wrap;
				  bottom: -166upx;
				 .items{
					 // width: 60upx;
					 // height:100upx;
					 border-radius:50%;
					 display: flex;
					flex-direction: column;
					 justify-content: center;
					 align-items: center;
					 margin:20upx 40upx;
					 //position: absolute;
					 //bottom:-
					//animation:fadeIn 1s linear;
					 .menu{
						align-items: center;
						 width: 100upx;
						  height:100upx;
						  border-radius:50%;
						  display: flex;
						 flex-direction: column;
						justify-content: center;
						
						  //margin:20upx 40upx;
						  .item-img{
							  width:50upx;height:50upx;
						  }
					 }
					 .name{
						 margin-top: 15upx;
					 }
					
				 }
			 }
			  // animation: fadeOut .5s;
		 }
		 @keyframes fadeIn {
		   0%   {transform: translateY(80px);opacity: 0;}
		  
		   100% {transform: translateY(0px);opacity: 1}
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
				bottom:120upx;
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
			.nav{
				position: absolute;
				bottom:30upx;
				width:100%;
				display: flex;
				flex-direction: row;
				flex-wrap: nowrap;
				justify-content: space-between;
				.nav-item{
					color:#fff;font-size: 22upx;
					margin: 0 10px;
				}
			}
			
			
		}
		.tipse{
			display: flex;
			flex-direction: row;
			justify-content: flex-start;
			background-color: #fff;
			align-items: center;
			height:120upx;
			// position: fixed;
			// top: 340upx;
			width:100%;
			border:1upx solid #eee;
			.img{
				width:60upx;height:60upx;
				margin:0 33upx;
			}
			.tips{
				font-size: 26upx;
			}
		}
		
		.timeLine{
			// position:fixed;top:500upx;
			display: flex;
			margin-top: 20upx;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			width: 100%;
			.scroll{
				display: flex;
				align-items: center;
				flex-direction: column;
				// padding-bottom:200upx;
			}
			.item-menu{
				.day{
					font-size: 32upx;
					 color:black;
				}
				.conten{
					padding: 20upx;
					margin:20upx 0;
					width:660upx;
					background:#fff;
					border-radius: 5px;
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: center;
					.tipsl{
						font-size: 22upx;
						color:#AEB1B7;
						margin:20upx 0;
					}
					.image{
						width:400upx;height: 300upx;
					}
					.uploat{
						width:200upx;height:50upx;background-color: #fff;
						color:#E1CA56;font-size: 22upx;
						text-align: center;
						line-height: 50upx;
						border-radius: 20px;
						box-shadow: 1px 2px 2px 1px #EFEFEF;;
					}
				}
			}
		}
	}
	
	
	
	
	
	
</style>
