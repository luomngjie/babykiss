<template>
	<view class="container">
		<view class="set_box" >
			<!-- 步骤条 -->
			<view class="set-1">
				
				<view class="set-2" v-for="(item,index) in talk" :key="index">
					<!-- <view class="quan" ></view> -->
					<view style="font-size: 32upx;">{{item.MMDD}}<text style="font-size: 20upx;margin-left: 10upx;color:black;">第{{item.diff_day}}天</text></view>
					<template v-if="type=='index'">
						<view class="tlak_o" @click="detail(item)">
							<!-- v-for="(cItem,index_) in item.data" -->
							<view class="menu" v-if="item.type==1">
								<view class="list">身高<text style="margin-left:10upx;">{{item.morph_to_model.height}}</text></view>
								<view class="list">体重<text style="margin-left:10upx;">{{item.morph_to_model.weight}}</text></view>
								<view class="list">头围<text style="margin-left:10upx;">{{item.morph_to_model.head_width}}</text></view>
							</view>
							<!-- <view class="menu" v-if="item.id==2">
								<view class="" style="font-size: 12px;"><text style="margin-left:10upx;">{{cItem.user.talk}}</text></view>
								
							</view> -->
							<view class="col-img" v-if="item.type==2" >
								<image :src="item.morph_to_model.file[0]?item.morph_to_model.file[0]:backgroundImg" class="menu-image"></image>
								<view class="conten" v-if="item.morph_to_model.describe">{{item.morph_to_model.describe}}</view>
								<view class="conten first" v-if="item.morph_to_model.tag">{{item.morph_to_model.tag}}</view>
							</view>
							<view class="tabbar">
								<view class="name">
									<text>爸爸,{{item.morph_to_model.date?item.morph_to_model.date:item.morph_to_model.time}}</text>
								</view>
								<image src="../../static/img/mess.png" class="image"></image>
							</view>
						</view>
					</template>
					
					<template v-if="type=='note'">
						<view class="note" @click="detail(item)" v-if="item.describe">
							<view class="tip">第一次{{item.baby_tag_one[0].tag}}</view>
							<view class="tip con">{{item.describe}}</view>
						</view>
						<view class="note" @click="upload" v-else>
							<view class="tip">第一次{{item.tag}}</view>
							<view class="tip con">
								<image src="../../static/img/jia.png" style="width:50upx;height:50upx"></image>
							</view>
						</view>
					</template>
					
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		props:{
			talk:{
				type:Array,
				default:''
			},
			type:{
				type:String,
				default:""
			}
		},
		data() {
			return {
				backgroundImg:require('../../static/img/banner.jpg'),
			}
		},
		onLoad() {
			
		},
		methods: {
			/**
			 * 宝宝大事记时间线的点击事件
			 */
			detail(item){
				this.$emit("fun",item)
			},
			
			/**
			 * 第一次，没数据
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
		}
	}
</script>

<style lang="scss" scoped>
	.set_box {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: row;
	}

	/* 左侧时间 */
	.set_time {
		width: 10%;
		position: relative;

		view {
			width: 120%;
			position: absolute;
			margin-top: 60upx;
			right: -40rpx;
			color: #999999;
		}

	}


	/* 右侧内容 */


	.set-1 {
		width: 90%;
	}

	.set-2 {
		// .quan{//白点样式
		// 	width: 10px;
		// 	height: 10px;
		// 	border-radius: 50%;
		// 	background-color: rgb(255, 255, 255);
		// 	position: absolute;
		// 	top: -10px;
		// 	left: -27.5px;
		// 	z-index: 10;
		// }
		// min-height: 300upx;
		border-radius: 10upx;
		// width: 84%;
		margin-left: 80upx;
		margin-top: 60upx;
		padding-right: 10rpx;
		position: relative;

		.tlak_o {
			width:610upx;
			// min-height: 150upx;
			background: #fff;
			border-radius: 10px;
			margin-top: 20upx;
			display: flex;
			padding-bottom: 20upx;
			flex-direction: column;
			.menu{
				display: flex;
				flex-direction: row;
				flex-wrap: wrap;
				justify-content: flex-start;
				padding:20upx 26upx;
				
				.list{
					font-size: 24upx;
					width: 50%;height:40upx;
				}
			}
			.col-img{
				display: flex;
				flex-direction: column;
				justify-content: flex-start;
				.conten{
					font-size: 24upx;margin:10upx;
				}
				.first{
					width:180upx;height:30upx;background-color: #EFEFEF;
					text-align: center;line-height: 30upx;
					color:#6D7588;border-radius: 20upx;
					
				}
				.menu-image{
					width:100%;
					height:305upx;
				}
			}
			.tabbar{
				display: flex;
				justify-content: space-between;
				padding:0 26upx;
				margin-top: 20upx;
				.name{
					font-size: 22upx;coloe:#EFEFEF;
				}
				.image{
					width:30upx;height: 30upx;
				}
			}
			
		}
		.note{
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			align-items: center;
			font-size: 26upx;
			background-color: #fff;
			height:180upx;
			width:640upx;
			border-radius: 5px;
			margin-top: 13upx;
			.con{
				background-color: #eee;
				width: 160upx;
				height: 160upx;
				border-radius: 5px;
			}
			.tip{
				display: flex;
				align-items: center;
				justify-content: center;
				margin: 0 33upx;
				text-align: center;
			}
		}
	}

	.set-2::after {
		z-index: 1;
		content: '';
		/* 必须存在如果没有图标就留空 */
		top: -20upx;
		/* 定位 距离*/
		border-left: #c6c6c6 1px solid;
		/* 横线颜色 */
		left: -44upx;
		/* 定位 距离*/
		height: 120%;
		/* 高度 */
		position: absolute;
		/* 定位 */
	}

	.set-2::before {
		content: "\e64d";
		/* 必须存在如果没有图标就留空 */
		color: #FFC227;
		/* 设置颜色 */
		position: absolute;
		/* 定位 */
		left: -70upx;
		top: -40upx;
		/* 移动到左边 */
		font-weight: bold;
		/* 图标样式在复制的图标文件中复制相对应的图标样式必须存在 */
		font-family: "iconfont" !important;
		/* 图标样式在复制的图标文件中复制相对应的图标样式必须存在 */
		font-size: 54upx;
		/* 图标大小 */
		font-style: normal;
		/* 图标样式在复制的图标文件中复制相对应的图标样式必须存在 */
		-webkit-font-smoothing: antialiased;
		/* 图标样式在复制的图标文件中复制相对应的图标样式必须存在 */
		-moz-osx-font-smoothing: grayscale;
		/* 图标样式在复制的图标文件中复制相对应的图标样式必须存在 */
		z-index: 10;
	}

	@font-face {
		font-family: "iconfont";
		src: url('//at.alicdn.com/t/font_1337773_f06f5a7las.eot?t=1565581133395');
		/* IE9 */
		src: url('//at.alicdn.com/t/font_1337773_f06f5a7las.eot?t=1565581133395#iefix') format('embedded-opentype'),
			/* IE6-IE8 */
			url('data:application/x-font-woff2;charset=utf-8;base64,d09GMgABAAAAAAOIAAsAAAAAB8QAAAM7AAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHEIGVgCDMgqCRIIjATYCJAMUCwwABCAFhG0HZhvNBsiemjwJqJERRCC3tX4YOM4iqNbCnr29uw8wKGBUsUAKqDyCjY5HcEzCALron1wr8wDk8hKBFpIc5yaXfWZJoIBIQkF1KlvVqWuFfZ3c/CBw0p8fcMJJsQY6uIuEMk8188LgXgfHTJceiXlrm0tGajTgaMCz2T6yyf5BXh+Ef9BdxMSIS9cTaKmvYGbzFhRXA1sZ2C0QO7cRAdhadnmkNTSEqufYLM4qNdKx9AJn+M/Hb2OiQVIWwL6rNufIIP1bj29voaZspAiK/byITqLAaEAmdvX6d7KQ+dEstCw2tjQL0FJDkvZald8e//3y+WglCIaW0E/e5R8vERWvuTWY5RYy3/ywXBtKXBEF395EBN++FCQ8V5CWsmEt4CBgHMz1Ad8rde7s2LbD7oUhT3l+eWHbhxwOB+LFrfkVL7I3FIAWdpdWvfHiYt8FltYWdzy1Pz/WfPhQ/elT7efPvUJiVlRsIj8+18X3az7+5Wb48vVrbnvo7OndVe1cPc55k2ebWG7OmMgYX01bT3vJnNlJWtemes0mn3vI/PJl80NQQqVErfcH/Ys5Fy3evrVoyyZNDLSq/cp5EyYsKTbb69bD/+5fmPs/cFwxG9ABoCNdTY+AKrwdi2npHk0Xu4vMH/Q7Wl+4+Yftkv83kMHXTiVutOlsnh68ZYPZit+hmDmRSxVwlDnvxvI8WOq3gz4VCy3xE8Id/d7H2GV2M6Ghi4ak1gcKDYORGTsaSq2Mg0rDTGhplLyTW+mEsRC5BUYadyC0dwpJWw+h0N53ZMb+glJX/6DSPgpoaUN4nLOVobGtZdYuJHAkQ7EbqiVqwMjF7UVrJSKKTmCmitNrETOpUzAiNLxZykMGxPY4wNRBIjnHEDOqh7nOzZBOR6GRUQ2SeKiKc2NiWBju+6JQieqBvbkYRMAhMkjUDVKTUAaYzufsW99fCSEUOgI20rMQr4UwJurloQihwmcg8/SGWT3v8hKTDkQkjsMgjKH0oFzHi+hgnoKM/VtpIBIulGpF1ihRmDcLz9WHnm/Uv0BZNAD40zJSFJGjjEq77dsEg1ahKoF2qbupYvP0KNS2e69WbmucSNZAOpEa5XpUagAAAA==') format('woff2'),
			url('//at.alicdn.com/t/font_1337773_f06f5a7las.woff?t=1565581133395') format('woff'),
			url('//at.alicdn.com/t/font_1337773_f06f5a7las.ttf?t=1565581133395') format('truetype'),
			/* chrome, firefox, opera, Safari, Android, iOS 4.2+ */
			url('//at.alicdn.com/t/font_1337773_f06f5a7las.svg?t=1565581133395#iconfont') format('svg');
		/* iOS 4.1- */
	}

	
</style>
