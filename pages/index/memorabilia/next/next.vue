<template>
	<view class="content" :style="{'height':height+'px'}">
		<custom :back="false" rightText="保存" leftText="取消" @click-right="save" @click-left="cancal"></custom>
		
		<view class="contenttext">
			<textarea class="p-20" placeholder="请输入备注信息"  @blur = "descInput" v-model="parame.desc" placeholder-style="font-size:26upx; "/>
			<view class="imagelist">
				<view class="uni-upload-img uni-flex uni-row" >
					<view class="flex-item preview_img" v-for="(image,index) in imageList" :key="index" v-if="imageList.length>0">
						<image class="uni-uploader__img" :src="image" :data-src="image" @tap="previewImage"></image>
						<uni-icons type="clear" size="15" class="img_icon" @tap="delect(index)"></uni-icons>
					</view>
					<view class="upload" @tap="addPic">
						<image src="../../../../static/img/up.png" class="image"></image>
					</view>
				</view>
				
			</view>
			
		</view>
		
		<view class="lists">
			<view class="nav">
				<view class="list" v-for="(item,index) in tips" :key="index" @click="tipsFun(item)">
					<text>{{item.name}}</text>
					<image src="../../../../static/img/cheng.png" class="img"></image>
				</view>
				<view class="list"  @click="tipsFun(item)">
					<image src="../../../../static/img/jia.png" class="img"></image>
					<text>标签</text>
				</view>
			</view>
			<view class="line"></view>
			<view class="vacName">
				<view class="name">
					<image src="../../../../static/img/time.png" class="image"></image>
					<text>谁可以看</text>
				</view>
				<view class="state">
					<text>所有亲</text>
					<image src="../../../../static/img/jiantou.png" class="image"></image>
				</view>
			</view>
			<view class="line"></view>
			<view class="vacName" @click="hrefFun">
				<view class="name">
					<image src="../../../../static/img/location.png" class="image"></image>
					<text>所在位置</text>
				</view>
				<view class="state">
					<text>重庆</text>
					<image src="../../../../static/img/jiantou.png" class="image"></image>
				</view>
			</view>
			<view class="line"></view>
			<view class="menu-item-picker">
				<view class="nowSelect">
					<image src="../../../../static/img/time.png" class="image"></image>
					<text>记录时间</text>
				</view>
				<view class="picker">
					<picker mode="date" :value="parame.date" :start="startDate" :end="endDate" @change="bindDateChange" fields="day">
						<view class="" >{{parame.date}}</view>
						
					</picker>
					<image src="../../../../static/img/jiantou.png" class="image"></image>
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
				parame:{
					date: currentDate,
					desc:''
				},
				startDate:"",
				endDate:'',
				imageList: [],
				sourceTypeIndex: 2,
				sourceType: ['拍照', '相册', '拍照或相册'],
				sizeTypeIndex: 2,
				sizeType: ['压缩', '原图', '压缩或原图'],
				countIndex: 8,
				count: [1, 2, 3, 4, 5, 6, 7, 8, 9],
				imgAllUrl:[],
				tips:[
					{
						name:"第一次啊"
					},
					{
						name:"第一次敢撒谎啊"
					},
					{
						name:"第一次敢撒谎啊"
					},
				]
			};
		},
		onLoad() {
			this.height=this.$store.state.system.screenHeight
		},
		methods:{
			/**
			 * 保存
			 */
			save(){
				uni.navigateTo({
					url:"/pages/index/memorabilia/memorabilia"
				})
			},
			/**
			 * 取消
			 */
			cancal(){
				uni.navigateBack()
			},
			
			/**
			 * 文本框信息
			 */
			descInput(e){
				let value = e.detail.value
				this.parame.desc=value
				console.log(this.parame)
			},
			
			addPic(imgAll){
				this.imgAllUrl = [];
				let url = "路径";
				var that = this;
				uni.chooseImage({
					sourceType: ['album', 'camera'],
					count: this.imageList.length + this.count[this.countIndex] > 9 ? 9 - this.imageList.length :this.count[this.countIndex],
					success: (res) => {
						this.imageList = this.imageList.concat(res.tempFilePaths);
						var imageData = this.imageList
						const tempFilePaths = res.tempFilePaths;
						//上传个数循环拿到每一个照片的路径，然后放到一个数组中
						for(var i=0;i<imageData.length;i++){
							//图片上传
							const uploadTask = uni.uploadFile({
								url:url,
								filePath:tempFilePaths[0],
								name:"pic_name",
								success:function(data){
									const back = JSON.parse(data.data);
									var imgUrl = back.data[0].repair_pic_url;
									//将图片路径赋值给imgAllUrl
									that.imgAllUrl.push(imgUrl)
								}
							})
						}
					  },
				})
			},
			//图片预览
			previewImage(e) {
				var current = e.target.dataset.src
				uni.previewImage({
					current: current,
					urls: this.imageList
				})
			},
			delect(index,e){
				var that = this;
				uni.showModal({
					title: '提示',
					content: '是否删除该图片？',
					success: (res) =>{
						if (res.confirm) {
							//删除数组中指定项
							function removeByValue(arr, val) {
								for(var i=0; i<arr.length; i++) {
									if(arr[i] == val) {
										arr.splice(i, 1);
										break;
									}
								}
							}
							var forImg = that.imgAllUrl[index];
							var imageUrl = that.imageList.splice(forImg, 1)
							removeByValue(that.imageList, imageUrl);
							//重新赋值
							that.imgAllUrl = that.imageList
						} 
					}
				});
			},
			
			/**
			 * tips点击事件
			 */
			tipsFun(item){
				uni.navigateTo({
					url:"/pages/index/memorabilia/add/add"
				})
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
				return `${year}-${month}-${day}-`;
			},
			
			/**
			 * 列表事件
			 */
			hrefFun(){
				uni.navigateTo({
					url:"/pages/index/memorabilia/next/location"
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.content{
		background-color: #fff;
		.contenttext{
			display: flex;
			flex-direction: column;
			justify-content: flex-start;
			background-color: #fff;
			font-size: 26upx;
			padding: 33upx;
			.p-20{
				height: 200upx;
				width: 100%;
			}
			.imagelist{
				display: flex;
				flex-direction: row;
				flex-wrap: wrap;
				justify-content: flex-start;
				align-items: center;
				.uni-upload-img{
					
					display: flex;
					flex-direction: row;
					flex-wrap: wrap;
					justify-content: flex-start;
					align-items: center;
					
					
					.flex-item{
						position: relative;
						margin: 20upx 35upx;
						.img_icon{
							position: absolute;
							top: -16upx;
							right: -10upx;
						}
						.uni-uploader__img{
							width: 100upx;height: 100upx;
						}
					}
					.upload{
						width: 100upx;
						height: 100upx;
						background-color: #eee;
						display: flex;
						justify-content: center;
						align-items: center;
						border-radius: 5upx;
						.image{
							width:60upx;height: 60upx;
						}
					}
				}
				
			}
			
			
		}
		.lists{
			display: flex;
			flex-direction: column;
			.vacName{
				display: flex;
				justify-content: space-between;
				padding:20upx 33upx;
				font-size: 28upx;
				
				.name{
					display: flex;
					flex-direction: row;
					justify-content: flex-start;
					align-items: center;
					.image{
						width: 40upx;
						height: 40upx;
						margin-right: 13upx;
					}
				}
				.state{
					display: flex;
					align-items: center;
					flex-direction: row;
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
				.nowSelect{
					display: flex;
					align-items: center;
					.image{
						width: 40upx;
						height: 40upx;margin-right: 13upx;
					}
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
			.nav{
				display: flex;
				flex-direction: row;
				flex-wrap: wrap;
				justify-content: flex-start;
				background-color: #fff;
				padding: 20upx 10upx;
				
				.list{
					padding:10upx 20upx;height:30upx;
					background-color: #aaa;
					font-size: 26upx;
					border-radius: 30upx;
					margin: 10upx 20upx;
					display: flex;
					align-items: center;
					justify-content: center;
					.img{
						width: 30upx;height: 30upx;
						margin:0 5upx;
					}
				}
			}
			.line{
				width: 90%;margin: 0 auto;
				border-bottom: 1px solid #eee;
			}
		}
	}
</style>
