<template>
	<view class="content">
		<template v-if="isShowBaby=='addbaby'">
			<custom leftText="宝宝"  :back="false" rightIcon="camera" @click-left="left" leftIcon="0"></custom>
			<view class="background">
				<view class="logo">
					<image src="../../static/img/baby.png" class="img"></image>
					<view class="right">
						<view class="name">哈哈哈</view>
						<view class="name">刚出生<image src="../../static/img/ready.png" class="ready"></image></view>
					</view>
				</view>
				<view class="nav">
					<view class="nav-item" v-for="(item,idnex) in nav" :key="item.id" @tap.stop="baby(item.id)">
						{{item.name}}
					</view>
				</view>
			</view>
			
			<view class="tipse">
				<image src="../../static/img/cao.png" class="img"></image>
				<view class="tips">和宝妈一起见证宝宝的成长吧</view>
			</view>
			
			
				
			<scroll-view scroll-y="true" :style="{'height':height+'upx'}" class="timeLine" @scrolltolower="onReachScollBottom">
				<view class="scroll">
					<view class="item-menu" v-for="index in 5" :key="index" @tap.stop="upload">
						<view class="day">7月12日&nbsp;第1天</view>
						<view class="conten">
							<image src="../../static/img/banner.jpg" class="image"></image>
							<view class="tipsl">有了宝宝的陪伴,每天都是奇妙的体验，从现在开始记录，留住成长的美好.</view>
							<view class="uploat" >上传照片和视频</view>
						</view>
					</view>
					
				</view>
			</scroll-view>
			
			
			
			
		</template>
		<template v-else>
			<custom title="宝宝" rightIcon="jia" @click-right="operation" :back="false"></custom>
			<view class="item" v-for="index in 5" :key="index" @click="detail(index)">
				<view class="item-left">
					<image src="../../static/img/babysel.png" class="img"></image>
					<view class="con">
						<view class="top">何苦</view>
						<view class="tips">第九天，共7条记录</view>
					</view>
				</view>
				<image src="../../static/img/jiantou.png" class="item-right"></image>
			</view>
			<uni-popup type="center" ref="popup" zIndex="999">
				<view class="popup-center">
					<view class="item-list">操作</view>
					<view class="line"/>
					<view class="item-list" @click="establish">添加宝宝</view>
					<view class="line"/>
					<view class="item-list" @tap.stop="close">取消</view>
				</view>
			</uni-popup>
		</template>
		
	</view>
</template>

<script>
	
	export default {
		components:{
			
		},
		data() {
			return {
				isShowBaby:'',
				nav:[
					{
						name:"云相册",
						id:0
					},
					{
						name:"生长记录",
						id:1
					},
					{
						name:"疫苗接种",
						id:2
					},
					{
						name:"大事记",
						id:3
					},
					{
						name:"1位亲",
						id:4
					},
				],
				height:0
			}
		},
		methods: {
			/**
			 * 操作
			 */
			operation(){
				this.$refs["popup"].open()
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
			close(){
				this.$refs["popup"].close()
			},
			
			/**
			 * 宝宝详情
			 */
			detail(index){
				
			},
			
			/**
			 * nav栏目跳转事件
			 */
			baby(id){
				console.log(id)
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
				        console.log(JSON.stringify(res.tempFilePaths));
						//返回结果
				    }
				})
			},
			
			/**
			 * @param {Object} opt
			 * 滚动底部事件，无无限加载
			 */
			onReachScollBottom(){
				uni.showToast({
					title:"到底了",
					icon:"none"
				})
			}
		},
		onLoad(opt) {
			this.height=this.$store.state.system.screenHeight+200
			
			this.isShowBaby=opt.type||''
		}
	}
</script>

<style lang="scss" scoped>
	// page{
	// 	background-color: #fff;
	// }
	.content{
		 background-color: #F5F5F5;
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
					width:80upx;height: 80upx;
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
			top: 0;
			position: fixed;
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
			position: fixed;
			top: 340upx;width:100%;
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
			position:fixed;top:500upx;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			width: 100%;
			.scroll{
				display: flex;
				align-items: center;
				flex-direction: column;
				padding-bottom:200upx;
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
	.popup-center{
		width:600upx;background-color: #fff;
		border-radius: 7upx;
		font-size: 22upx;
		display: flex;
		flex-direction: column;
		.item-list{
			padding:33upx;
		}
		.line{
			border-bottom:1upx solid #eee;
			margin:0 30upx
		}
		
	}
	
	
	
	
	
</style>
