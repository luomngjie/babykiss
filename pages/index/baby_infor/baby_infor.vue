<template>
	<view class="content">
		<custom title="宝宝信息"  rightText="下一步" @click-right="next" ></custom>
		<view class="logo" @click="imgClick">
			<image src="../../../static/img/baby.png" class="img"></image>
		</view>
		<view class="sess">
			<view class="item">
				<view class="list">
					<view class="name">小名</view>
					<input type="text" placeholder="请输入宝宝的小名" placeholder-style="color:#DCDCDC;font-size:24upx" class="inp" v-model="userInfo.name">
				</view>
			</view>
			<view class="item">
				<view class="list">
					<view class="name">{{userInfo.type==1?"预产期":"生日"}}</view>
					<picker mode="date" :value="userInfo.date" :start="startDate" :end="endDate" @change="dateChange" class="inp" style="width:45%;" fields="day">
						<view style="font-size: 24upx;">{{userInfo.type==1?userInfo.due_date:userInfo.birth_date}}</view>
					</picker>
				</view>
			</view>
			<view class="item">
				<view class="list">
					<view class="name">性别</view>
					<radio-group @change="radioChange" style="width:45%;" data-lei="sex">
						<label class="uni-list-cell" v-for="(item, index) in sex" :key="item.value" style="margin:0 20upx;">
							<radio :value="item.value" :checked="item.checked" /><span>{{item.label}}</span>
						</label>
					</radio-group>
				</view>
			</view>
		</view>
		
		<view class="bot" v-if="false">
			<text class="tips">你与宝宝的关系</text>
			<view class="select">
				<radio-group @change="radioChange" class="select-group" data-lei="relative">
					<label class="uni-list-cell" v-for="(item, index) in relative" :key="item.value" style="margin:0 20upx;">
						<radio :value="item.value" :checked="item.checked" /><span>{{item.label}}</span>
					</label>
				</radio-group>
			</view>
		</view>
		
		<uni-popup type="center" ref="popup" zIndex="999">
			<view class="popup-center">
				<view class="item-list">设置头像</view>
				<view class="line"/>
				<view class="item-list" @click="photograph('camera')">拍照</view>
				<view class="line"/>
				<view class="item-list" @tap.stop="photograph('album ')">本地相册</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	export default {
		computed: {
			startDate() {
				return this.getDate('start');
			},
			endDate() {
				return this.getDate('end');
			}
		},
		data() {
			// 设置日期
			const currentDate = this.getDate({
				format: true
			})
			return {
				userInfo:{
					type:"",//1已怀孕 2已出生
					name:"",//小名
					due_date:"请选择预产期",//预产期(已怀孕)
					birth_date: currentDate,//生日
					//relativeName:'0',
					sex: 0,
				},
				sex: [
					{
						label: "男",
						value: '0',
						checked: true
					}, 
					{
						label: "女",
						value: '1'
					}
				],
				relative:[
					{
						label:"妈妈",
						value:"0",
						checked: true
					},
					{
						label:"爸爸",
						value:"1"
					},
					{
						label:"其他",
						value:"2"
					},
				],
				
			};
		},
		onLoad(opt) {
			this.userInfo.type=opt.type
		},
		methods:{
			// 选择日期
			dateChange(e) {
				this.userInfo.birth_date = e.target.value
				this.userInfo.due_date = e.target.value
			},
			
			// 获取年月日信息
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
			},
			/**
			 * 下一步
			 */
			next(){
				if(!this.userInfo.name){
					uni.showToast({
						title:"请输入宝宝小名",
						icon:"none"
					})
					return 
				}
				if(!this.userInfo.birth_date){
					uni.showToast({
						title:"请输入宝宝生日",
						icon:"none"
					})
					return 
				}
				if(this.userInfo.type==1){
					if(this.userInfo.due_date=="请选择预产期"){
						uni.showToast({
							title:"请输入预产期",
							icon:"none"
						})
						return 
					}
				}
				
				let obj = {}
				if(this.userInfo.type==2){
					this.userInfo.due_date=''
				}
				if(this.userInfo.type==1){
					this.userInfo.birth_date=''
				}
				let type="addbaby"
				this.http("/app_baby/add",this.userInfo).then(res=>{
					if(res.code==1){
						uni.showToast({
							title:"添加成功",
							icon:"none"
						})
						setTimeout(()=>{
							uni.reLaunch({
								url:"/pages/index/index"
							})
						},1200)
						console.log(res)
					}else{
						uni.showToast({
							title:res.msg,
							icon:"none"
						})
					}
				})
				// uni.reLaunch({
				// 	url:"/pages/index/index?type="+type
				// })
				
			},
			
			/**
			 * 性别选择
			 */
			radioChange(e) {
				let type=e.currentTarget.dataset.lei
				if(type=="sex"){
					this.userInfo.sex =  e.detail.value
				}
				if(type=="relative"){
					this.userInfo.relativeName=e.detail.value
				}
				
			},
			
			/**
			 * 头像点击事件
			 */
			imgClick(){
				this.$refs["popup"].open()
			},
			
			/**
			 * 拍照或者本地相册
			 */
			photograph(type){
				uni.chooseImage({
				    count: 6, //可以选择图片的张数
				    sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
				    sourceType:type=='camera'?['camera']:['album'], //从相册选择  默认是两个都有
				    success: function (res) {
				        console.log(JSON.stringify(res.tempFilePaths));
						//返回结果
				    }
				})
				this.$refs["popup"].close()
			}
		}
	}
</script>

<style lang="scss">
	.content{
		background-color: #F5F5F5;
		.logo{
			height: 220upx;background-color: #fff;
			display: flex;justify-content: center;
			align-items: center;
			.img{
				width:100upx;height:100upx;
			}
		}
		
		.sess{
			margin:33upx 0;
			background-color: #fff;
			.item{
				border-bottom: 1upx solid #eee;
				padding: 10px 0;
				.list{
					align-items: center;
					display: flex;
					flex-direction: row;
					justify-content: space-around;
					.name{
						font-size: 26upx;
						
					}
					.inp{
						
					}
				}
			}
		}
		.bot{
			.tips{
				font-size: 24upx;margin-left: 60upx;
				
			}
			.select{
				margin: 33upx 0;
				background: #fff;
				padding: 30upx 0;
				.select-group{
					display: flex;
					justify-content: space-around;
					width: 100%;
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
	}
</style>
