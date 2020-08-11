<template>
	<view class="content">
		<custom :back="true" :title="title"  rightText="删除" @click-right="del" v-if="type=='list'" :bg="'#fff'" :statusBarBackground="'#fff'"></custom>
		<custom :back="false" :title="title" leftText="取消" @click-left="left" rightText="保存" @click-right="right" v-else :bg="'#fff'" :statusBarBackground="'#fff'"></custom>
		
		<view class="vacName" v-if="types=='custom'">
			<view class="name">疫苗名称</view>
			<input type="text" placeholder="请输入疫苗名称" placeholder-style="font-size:26upx;color:#aaa;"style="text-align: right;" @blur="input">
		</view>
		
		<view class="vacList">
			<view class="vacName">
				<view class="name">接种状态</view>
				<view class="state" @click="static">
					<text>{{statusName}}</text>
					<image src="../../../static/img/jiantou.png" class="image"></image>
				</view>
			</view>
			<view class="line"></view>
			<view class="menu-item-picker">
				<view class="nowSelect">
					接种日期
				</view>
				<view class="picker">
					<picker mode="date" :value="parame.vero_time" :start="startDate" :end="endDate" @change="bindDateChange" fields="day">
						<view class="" v-if="type!='list'">{{parame.vero_time}}</view>
						<view class="" v-else style="color:#6DD7A9">{{upload.vero_time||age}}</view>
					</picker>
					<image src="../../../static/img/jiantou.png" class="image"></image>
				</view>
			</view>
		</view>
		
		<view class="contenttext">
			<view class="title">疫苗简介</view>
			<textarea class="p-20" placeholder="请输入备注信息"  @blur = "descInput" v-model="parame.remark" placeholder-style="font-size:26upx; " :disabled="upload.vero?true:false" v-if="upload"/>
			<textarea class="p-20" placeholder="请输入备注信息"  @blur = "descInput" v-model="parame.remark" placeholder-style="font-size:26upx; " :disabled="true" v-else/>
		</view>
		
		
		
		<cu-modal ref="quanxian"  @cancel='modalHide'  @Confirm="modalConfirm">
			<!-- :cancelText='cancel' :confirmText='confirmbtn' -->
			<text slot="content">
				确定删除该疫苗?
			</text>
		</cu-modal>
		
		<uni-popup type="center" ref="sex" zIndex="999">
			<view class="popup-center">
				<view class="item-list">接种状态</view>
				<view class="line"/>
				<view class="item-list" style="display: flex;align-items: center;" @click="changeItem(item,index)" v-for="(item,index) in status">
					<radio  class="round red" style="transform: scale(.7);" :value="item.value" :checked="index === current"/>
					<view class="sex">{{item.name}}</view>
				</view>
				
			</view>
		</uni-popup>
	</view>
</template>

<script>
	export default {
		data() {
			const currentDate = this.getDate({
				format: true
			})
			return {
				status:[
					{
						name:"未接种",
						value:'0'
					},
					{
						name:"已接种",
						value:'1'
					}
				],
				title:"添加疫苗",
				types:'',//用于区分是否为系统疫苗或者自定义疫苗
				type:'',//与接种信息公用一个也页面，用于区分显示内容
				startDate:"",
				endDate:'',
				statusName:"未接种",
				age:"2月龄请设置接种时间",
				parame:{//自定义疫苗
					vero_time: currentDate,
					remark:'',
					vero_name:'',
					status:0,
				},
				data:null,
				upload:null,
				current:0
			};
		},
		onLoad(opt) {
			if(opt.parame){
				this.upload = JSON.parse(opt.parame)
				this.upload.status==0?this.statusName="未接种":this.upload.status==1?this.statusName="已接种":'';
				if(this.upload.vero){
					this.parame.remark = this.upload.vero?this.upload.vero.vero_introduction:this.upload.remark
				}
				
				
			}
			
			if(opt.types){
				this.data = JSON.parse(opt.types)
				this.types=this.data.type;
				
				if(this.types=='system'){
					this.systemse()
				}
			}
			//this.details()
			this.type=opt.type||''
			
		},
		methods:{
			/**
			 * @param {Object} e疫苗详情
			 */
			details(){
				let obj={}
				obj.baby_id = this.upload.baby_id
				obj.vero_id = this.upload.id
				
				this.http("/app_baby/selectAddVero",obj).then(res=>{
					if(res.code==1){
						
					}else{
						uni.showToast({
							title:res.msg,
							icon:"none"
						})
					}
				})
			},
			/**
			 * 输入框
			 */
			input(e){
				this.parame.vero_name = e.detail.value
			},
			/**
			 * @param {Object} 接种状态选择
			 */
			changeItem(item,e){
				this.current = e
				this.statusName = item.name
				this.parame.status = item.value
				let obj = {}
				if(this.upload){
					if(this.upload.id){
						obj.baby_id = this.upload.baby_id
						obj.status = this.parame.status
						obj.baby_vero_id = this.upload.id
						let url="/app_baby/addMyBabyVero"
						this.upState(url,obj)
					}else{
						obj.baby_id = this.upload.baby_id
						obj.status = this.parame.status
						obj.vero_id = this.upload.vero.id
						let url="/app_baby/addBabyVero"
						this.upState(url,obj)
					}
				}
				
				this.$refs["sex"].close()
			},
			/**
			 * 更新状态
			 */
			upState(url,obj){
				uni.showLoading()
				this.http(url,obj).then(res=>{
					if(res.code==1){
						uni.navigateTo({
							url:"/pages/index/Vaccination/Vaccination"
						})
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
			 * 接种状态
			 */
			static(){
				this.$refs["sex"].open()
			},
			/**
			 * nav取消
			 */
			left(){
				uni.navigateBack()
			},
			
			/**
			 * 系统疫苗展示
			 */
			systemse(){
				let obj={
					app_vero_id:this.data.id,
					baby_id:uni.getStorageSync("babyItem").id
				}
				uni.showLoading()
				this.http("/app_baby/selectAppVero",obj).then(res=>{
					if(res.code==1){
						this.parame.remark = res.data.vero_introduction
						uni.hideLoading()
					}else{
						uni.hideLoading()
						uni.showToast({
							title:res.msg,
							icon:"none"
						})
					}
				})
				
			},
			
			/**
			 * nav保存
			 */
			right(){
				let url="",obj={}
				uni.showLoading({
					title:"加载中..."
				})
				this.parame.baby_id = uni.getStorageSync("babyItem").id
				if(this.types=="system"){//系统疫苗
					url="/app_baby/addBabyVero"  
					obj.baby_id = this.parame.baby_id
					obj.vero_id = this.data.id
					obj.status = this.parame.status
					obj.vero_time = this.parame.vero_time
				}else if(this.types=="custom"){//自定义疫苗
					url="/app_baby/addMyBabyVero"
					obj.baby_id = this.parame.baby_id
					obj.baby_vero_id = ''
					obj.vero_name = this.parame.vero_name
					obj.status = this.parame.status
					obj.vero_time = this.parame.vero_time
					obj.remark = this.parame.remark
					if(!this.parame.vero_name){
						uni.showToast({
							title:"请填写疫苗信息",
							icon:"none"
						})
						return
					}
				}
				this.http(url,obj).then(res=>{
					if(res.code==1){
						uni.redirectTo({
							url:"/pages/index/Vaccination/Vaccination"
						})
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
				let obj={}
				obj.baby_id = this.upload.baby_id
				
				if(this.upload.vero){
					uni.showToast({
						title:"该疫苗为系统疫苗，暂无法删除!",
						icon:"none"
					})
					this.$refs.quanxian.close()
					return
					//obj.baby_vero_id = this.upload.vero.id
				}else{
					obj.baby_vero_id = this.upload.id
				}
				uni.showLoading({
					title:"加载中..."
				})
				this.http("/app_baby/babyVeroDel",obj).then(res=>{
					if(res.code==1){
						uni.showToast({
							title:"删除成功",
							icon:"none"
						})
						setTimeout(()=>{
							uni.redirectTo({
								url:"/pages/index/Vaccination/Vaccination"
							})
						},1200)
					}else{
						uni.showToast({
							title:res.msg,
							icon:"none"
						})
					}
					
				})
				uni.hideLoading()
				this.$refs.quanxian.close()
			},
			
			/*
			日期选择*
			 */
			bindDateChange(e){
				this.parame.vero_time = e.target.value
				this.age = e.target.value
				if(this.upload){
					this.upload.vero_time=e.target.value
					let obj={},url=''
					obj.vero_time = e.target.value
					obj.baby_id = this.upload.baby_id
					if(!this.upload.id){
						obj.vero_id = this.upload.vero.id
						 url="/app_baby/addBabyVero"
					}else{
						obj.baby_vero_id = this.upload.id
						 url="/app_baby/addMyBabyVero"
						
					}
					this.upState(url,obj)
				}
				
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
			 * 文本框信息
			 */
			descInput(e){
				let obj={},url=""
				let value = e.detail.value
				this.parame.remark=value
				obj.remark = value
				if(this.upload){
					obj.baby_id = this.upload.baby_id
					if(this.upload.id){
						obj.baby_vero_id = this.upload.id
						 url="/app_baby/addMyBabyVero"
					}else{
						obj.vero_id = this.upload.vero.id
						 url="/app_baby/addBabyVero"
					}
					this.upState(url,obj)
				}
				
				//console.log(this.parame)
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
