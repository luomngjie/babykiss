<template>
	<view class="content" :style="{'height':height+'px'}">
		<custom :back="false" rightText="保存" leftText="取消" @click-right="save" @click-left="cancal"></custom>
		
		<view class="contenttext">
			<textarea class="p-20" placeholder="请输入备注信息"  @blur = "descInput" v-model="parame.describe" placeholder-style="font-size:26upx; "/>
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
				<view class="list" v-if="tags" v-model="tags">
					<text @click="tipsFun(2)">{{tags.tag}}</text>
					<image src="../../../../static/img/cheng.png" class="img" @click="remove(2)"></image>
				</view>
				<view class="list" v-else>
					<image src="../../../../static/img/jia.png" class="img" ></image>
					<text @click="tipsFun(1)">第一次</text>
				</view>
				
				
				<view class="list" v-for="(item,index) in tips" :key="index"  v-if="tips.length>0" v-model="tips">
					<text @click="tipsClick(item,index)">{{item.tag}}</text>
					<image src="../../../../static/img/cheng.png" class="img" @click="removes(item)"></image>
				</view>
				<view class="list"  v-else>
					<image src="../../../../static/img/jia.png" class="img" @click="tipsFun(item)"></image>
					<text>{{item.tag}}</text>
					
				</view>
				
				<view class="list" v-if="tips.length<2">
					<image src="../../../../static/img/jia.png" class="img"></image>
					<text @click="tipsFun(0)">标签</text>
				</view>
				
			</view>
			<!-- <view class="line"></view>
			<view class="vacName" @click="see">
				<view class="name" >
					<image src="../../../../static/img/time.png" class="image"></image>
					<text>谁可以看</text>
				</view>
				<view class="state">
					<text>所有亲</text>
					<image src="../../../../static/img/jiantou.png" class="image"></image>
				</view>
			</view> -->
			<view class="line"></view>
			<view class="vacName" @click="hrefFun">
				<view class="name">
					<image src="../../../../static/img/location.png" class="image"></image>
					<text>所在位置</text>
				</view>
				<view class="state">
					<text>{{parame.position_name}}</text>
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
				parame:{//大事记上传参数
					date: currentDate,
					describe:'',
					position_name:"重庆",
					longitude:"106.55",
					latitude:"29.57",
					tag:[]
				},
				tags:null,
				startDate:"",
				endDate:'',
				imageList: [],//上传图片
				
				sourceTypeIndex: 2,
				sourceType: ['拍照', '相册', '拍照或相册'],
				sizeTypeIndex: 2,
				sizeType: ['压缩', '原图', '压缩或原图'],
				countIndex: 8,
				count: [1, 2, 3, 4, 5, 6, 7, 8, 9],
				imgAllUrl:[],
				
				imagesList:[],
				imagesAll:[],
				
				apis:"https://api.diewo.cn/",//图片上传
				url:"/pages/index/memorabilia/add/add?tags="+JSON.stringify(this.tags)+"&type="+"echo",//标签点击路径，从回显进入
				urls:"/pages/index/memorabilia/add/add?tags="+JSON.stringify(this.tags),//标签点击路径，不从回显进入
				type:'',//是否是回显的大事记详情
				memorabilia_id:"",//大事记主键id
				tag_id:"",//标签id
				tips:[]
			};
		},
		onLoad(opt) {
			if(opt.type=="echo"){
				this.type = opt.type
				this.memorabilia_id = opt.memorabilia_id
				this.echo(opt.memorabilia_id)
			}
			
			this.height=this.$store.state.system.screenHeight
		},
		onShow() {
			if(uni.getStorageSync("tag")){
				this.tags=uni.getStorageSync("tag")
				let arr = []
				arr.push(this.tags)
				this.parame.tag=JSON.stringify(arr)
			}
			
			if(uni.getStorageSync("tags")){
				this.tips=uni.getStorageSync("tags")
				
			}
			
			if(uni.getStorageSync('img')){
				this.imageList.push(this.apis+uni.getStorageSync('img'))
				this.imagesList.push(uni.getStorageSync('img'))
			}
		},
		methods:{
			/**
			 * @param {Object} 大事记详情编辑回显 type为echo调用
			 * @param {Object} 
			 */
			echo(id){
				let obj = {}
				obj.baby_id=uni.getStorageSync("babyItem").id
				obj.memorabilia_id=id
				this.http("/app_baby/detailsMemorabilia",obj).then(res=>{
					if(res.code==1){
						res.data.data.forEach(item=>{
							this.parame.describe = item.describe
							if(item.file.length!=0){
								this.imageList = item.file
								let obj = {},imgs=[]
								item.file.forEach(item=>{
									obj.file=item
								})
								imgs.push(obj)
								
								this.parame.file = JSON.stringify(imgs)
							}
							this.parame.tag_id = item.tag_id
							if(item.baby_tag_one.length>0){
								let app = item.baby_tag_one.filter(item=>item.is_one==1)
								let apps = item.baby_tag_one.filter(item=>item.is_one==0)
								this.parame.tag = apps
								this.tips = apps
								if(this.parame.tag[0]) this.tags = app[0]
								
							}
							
							
						})
						
						
					}else{
						uni.showToast({
							title:res.msg,
							icon:"none"
						})
					}
				})
			},
			/**
			 *自定义标签点击回显
			 */
			tipsClick(item,index){
				uni.navigateTo({
					url:"/pages/index/memorabilia/add/add?tags="+JSON.stringify(item)
				})
			},
			/**
			 * 谁可以看
			 */
			see(){
				uni.navigateTo({
					url:"/pages/index/memorabilia/next/see"
				})
			},
			/**
			 * 保存
			 */
			save(){
				let url='',objs={}
				
				this.tips = uni.getStorageSync("tags")
				
				let imgs=[],obj={}
				this.parame.baby_id = uni.getStorageSync("babyItem").id
				
				if(this.imagesList.length>0){
					this.imagesList.forEach(item=>{
						obj.file=item
						
					})
					imgs.push(obj)
					this.parame.file = JSON.stringify(imgs)
				}
				
				let arr=[]
				if(uni.getStorageSync("tag")&&this.tips){
					arr.push(uni.getStorageSync("tag"))
					this.parame.tag = JSON.stringify(this.tips.concat(arr))
				}
				if(this.type=="echo"){//修改大事记
					url="/app_baby/updateMemorabilia"
					objs.baby_id = this.parame.baby_id
					objs.memorabilia_id = this.memorabilia_id
					objs.describe = this.parame.describe
					objs.file = this.parame.file
					objs.longitude = this.parame.longitude
					objs.latitude = this.parame.latitude
					objs.position_name = this.parame.position_name
					objs.date = this.parame.date
					objs.tag_id = this.parame.tag_id
				}else{//新增大事记
					url="/app_baby/addMemorabilia"
					objs=this.parame
				}
				if(this.parame.file&&this.parame.baby_id&&this.parame.tag&&this.parame.describe&&this.parame.longitude&&this.parame.date&&this.parame.position_name){
					this.http(url,objs).then(res=>{
						if(res.code==1){
							uni.redirectTo({
								url:"/pages/index/baby_detail"
							})
							uni.removeStorageSync("tags")
							uni.removeStorageSync("tag")
						}else{
							uni.showToast({
								title:res.msg,
								icon:"none"
							})
						}
						
					})
				}else{
					uni.showToast({
						title:"请填写完整信息",
						icon:"none"
					})
				}
				
			},
			/**
			 * 取消
			 */
			cancal(){
				
				if(uni.removeStorageSync("tag")||uni.removeStorageSync("tags")){
					uni.showModal({
						title:"提示",
						content:"宝宝新动态还未发送，是否需要放弃?",
						mask:true,
						success:res=>{
							if (res.confirm) {
								uni.redirectTo({
									url:"/pages/index/baby_detail"
								})
								uni.removeStorageSync("tags")
								uni.removeStorageSync("tag")
							} else if (res.cancel) {
								console.log('用户点击取消');
							}
						}
					})
				}
			},
			
			/**
			 * 文本框信息
			 */
			descInput(e){
				let value = e.detail.value
				this.parame.describe=value
				
			},
			
			/**
			 * @param {Object} imgAll添加图片
			 */
			addPic(imgAll){
				this.imgAllUrl = [];
				this.imagesAll=[];
				let url = "https://api.diewo.cn/index.php";
				var that = this;
				uni.chooseImage({
					sourceType: ['album', 'camera'],
					count: this.imageList.length + this.count[this.countIndex] > 9 ? 9 - this.imageList.length :this.count[this.countIndex],
					success: (res) => {
						this.imageList = this.imageList.concat(res.tempFilePaths);
						
						var imageData = this.imageList
						const tempFilePaths = res.tempFilePaths;
						uni.uploadFile({
							url:url+'/file_upload/upload',
							fileType:'image',
							filePath:res.tempFilePaths[0],
							sizeType: ['compressed'],  
							name:"file",
							formData:{
								token:uni.getStorageSync('userInfo').token
							},
							success:function(data){
								const back = JSON.parse(data.data);
								var imgUrl = back.data.str_url;
								that.imagesList = that.imagesList.concat(imgUrl);
								//将图片路径赋值给imgAllUrl
								that.imgAllUrl.push(imgUrl)
								that.imagesAll.push(imgUrl)
								
							}
						})
						
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
			/** 
			 * @param {Object} index
			 * @param {Object} e 删除图片
			 */
			delect(index,e){
				var that = this;
				uni.showModal({
					title: '提示',
					content: '是否删除该图片？',
					success: (res) =>{
						if (res.confirm) {
							if(uni.getStorageSync("img")) uni.removeStorageSync("img")
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
							var fao = that.imagesAll[index];
							var imageUrl = that.imageList.splice(forImg, 1)
							var imagesUrl = that.imagesList.splice(fao, 1)
							removeByValue(that.imageList, imageUrl);
							removeByValue(that.imagesList, imagesUrl);
							//重新赋值
							that.imgAllUrl = that.imageList
							that.imagesAll = that.imagesList
						} 
					}
				});
			},
			
			/**
			 * tips点击事件
			 */
			tipsFun(item){
				if(item==2){
					uni.navigateTo({
						url:"/pages/index/memorabilia/add/add?tags="+JSON.stringify(this.tags)
					})
				}else{
					this.parame.tag=item
					if(this.type=="echo"){
						uni.navigateTo({
							url:"/pages/index/memorabilia/add/add?custom="+item+"&type="+this.type+"&memorabilia_id="+this.memorabilia_id
						})
					}else{
						uni.navigateTo({
							url:"/pages/index/memorabilia/add/add?custom="+item
						})
					}
					
				}
				
			},
			
			/**
			 * {Object} 移除标签(自定义标签)
			 */
			removes(data){
				let tags = uni.getStorageSync("tags")
				if(tags){
					let obj = tags.splice(tags.findIndex(e => e.tag === data.tag), 1)
					this.$store.commit("removeBaby",tags)
					this.tips = tags
					if(tags.length<=0){
						uni.removeStorageSync("tags")
					}
				}
				
				
			},
			
			/**
			 * @param {Object} 移除标签(第一次)
			 */
			remove(){
				this.tags=null
				uni.removeStorageSync("tag")
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
				return `${year}-${month}-${day}`;
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
					background-color: #eee;
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
