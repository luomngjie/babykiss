<template>
	<view class="content" :style="{'background':isShowBaby=='addbaby'?'':'#fff'}">
		<custom title="宝宝" rightIcon="jia" @click-right="operation" :back="false" :statusBarBackground="'#fff'" :bg="'#fff'"></custom>
		<scroll-view  :style="{'height':height-130+'px'}"  @scrolltolower="onReachScollBottom"
		 @scroll="scroll" scroll-y="true" class="scroller" scroll-with-animation="true"
			refresher-enabled="true" :refresher-triggered="triggered"
			 :refresher-threshold="50" refresher-background="lightgreen" @refresherpulling="onPulling"
			 @refresherrefresh="onRefresh" @refresherrestore="onRestore" @refresherabort="onAbort"
			 :refresher-background="'#eee'">
			<view class="item" v-for="(item,index) in babyList" :key="index" @click="detail(item)" >
				<view class="item-left">
					<image :src="item.head_portrait?apis+item.head_portrait:customLogo" class="img" v-if="item.type==2"></image>
					<image :src="item.head_portrait?apis+item.head_portrait:customLogoTai" class="img" v-if="item.type==1"></image>
					<view class="con">
						<view class="top">{{item.name}}</view>
						<view class="tips" v-if="item.type==2">第{{item.day||0}}天，共{{item.baby_log_count}}条记录</view>
						<view class="tips" v-if="item.type==1">孕{{item.week||0}}周，共{{item.baby_log_count}}条记录</view>
					</view>
				</view>
				<image src="../../static/img/jiantou.png" class="item-right"></image>
			</view>
		</scroll-view>
		<uni-popup type="center" ref="popup" zIndex="999">
			<view class="popup-center">
				<view class="item-list">操作</view>
				<view class="line"/>
				<view class="item-list" @click="establish">添加宝宝</view>
				<view class="line"/>
				<view class="item-list" @tap.stop="closes">取消</view>
			</view>
		</uni-popup>
		
		<uni-load-more :status="status"></uni-load-more>
		<loading v-model="show"></loading>
		
		<tabBar :pagePath="'/pages/index/index'"></tabBar>
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
		onShow() {
		   //uni.removeStorageSync("userInfo")
		},
		data() {
			return {
			    triggered: false,//下拉刷新
				customLogo:require("../../static/img/babysel.png"),
				customLogoTai:require("../../static/img/taixin.png"),
				backgroundImg:require('../../static/img/banner.jpg'),
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
				babyList:[],//宝宝数组
				apis:"https://api.diewo.cn/",//图片
				page:{
					page:1,//当前页数
					num:10,//当前条数
					total:''//数据总数
				},
				show:true,//全局等待动画
				status: 'more',
				flage:true,
				pull:""
				
				
			}
		},

		onReachBottom() {
			if(this.isShowBaby!="addbaby"){
				if(this.flage) this.babyLists()
				
			}
			
		},
		methods: {
			/**
			 * @param {Object} 自定义下拉刷新部分
			 */
			onPulling(e) {//自定义下拉刷新控件被下拉
				
			},
			onRefresh() {//自定义下拉刷新被触发
				if (this._freshing) return;
				this._freshing = true;
				setTimeout(() => {
					this.triggered = false;
					this._freshing = false;
					
					this.pull="pull"
					this.babyLists()
				}, 1000)
				
			},
			onRestore() {//自定义下拉刷新被复位
				this.triggered = 'restore'; // 需要重置
				
			},
			onAbort() {//自定义下拉刷新被中止
				
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
			 * 添加宝宝
			 */
			establish(){
				uni.navigateTo({
					url:"/pages/index/add_baby/add_baby"
				})
				this.$refs["popup"].close()
			},
			
			/**
			 * 取消
			 */
			closes(){
				this.$refs["popup"].close()
			},
			
			/**
			 * 宝宝详情
			 */
			detail(item){
				this.$store.commit("babyItem",item)
				uni.navigateTo({
					url:"/pages/index/baby_detail"
				})
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
				uni.chooseImage({
				    count: 6, //可以选择图片的张数
				    sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
				    sourceType:['album'], //从相册选择  默认是两个都有
				    success: function (res) {
				        //console.log(JSON.stringify(res.tempFilePaths));
						//返回结果
				    }
				})
			},
			
			/**
			 * @param {Object} opt
			 * 滚动底部事件，无无限加载
			 */
			onReachScollBottom(e){
				if(this.isShowBaby!="addbaby"){
					if(this.flage) this.babyLists()
					
				}
				
				
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
			babyLists(){
				this.status = 'loading'
				uni.showLoading()
				this.http("/app_baby/babyList",{
					page:this.page.page,
					num:this.page.num
				}).then(res=>{
					if(res.code==1){
						
						this.show = false
						
						this.status="more"
						this.page.last_page = res.data.last_page
						this.page.total = res.data.total
						// this.babyList=this.babyList.concat(res.data.data)
						// if(this.babyList.length==res.data.total){
							
						// 	this.status = 'noMore'
						// 	this.flage = false
						// 	this.page.page=1
						// }else{
						// 	this.flage = true
						// }
						if(this.page.last_page==this.page.page){
							this.page.page=1
						}else{
							this.page.page++
						}
						if(this.pull=="pull"){
							this.babyList=res.data.data
							
						}else{
							this.babyList=this.babyList.concat(res.data.data)
							if(this.babyList.length==res.data.total){
								
								this.status = 'noMore'
								this.flage = false
								this.page.page=1
							}else{
								this.flage = true
							}
						}
						
					}else{
						uni.showToast({
							title:res.msg,
							icon:"none"
						})
					}
					uni.hideLoading()
				})
			}
		},
		onLoad(opt) {
			this.height=this.$store.state.system.screenHeight
			this.isShowBaby=opt.type||''
			this.babyLists()
			this._freshing = false;
			setTimeout(() => {
				this.triggered = true;
			}, 1000)
				
		},
		
		onUnload() {
		  this.animationData = {}
		  // 页面关闭后清空数据
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
		 
		
		 
		.item{
			padding:0 20upx;
			margin:20upx 0;
			align-items: center;
			display: flex;
			height:110upx;
			justify-content: space-between;
			position:relative;
			&::after{
				content: '';
				border-bottom: 1upx solid #eee;
				width:80%;
				position: absolute;
				width: 80%;
				position: absolute;
				bottom: 0;
				right: 40upx;
			}
			.item-left{
				width:500upx;
				.img{
					width:80upx;height: 80upx;border-radius: 50%;
				}
				display: flex;
				align-items: center;
				justify-content: flex-start;
				.con{
					margin-left:20upx;
					font-size: 26upx;
					.tips{
						color:#D3D3D3;margin-top:5upx;
					}
				}
			}
			.item-right{
				width:40upx;height:40upx
			}
		}
		.background{
			height:400upx;
			background-image: url("../../static/img/banner.jpg");
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
