<template>
	<view class="content">
		<custom :back="false" @click-right="save" title="增加生长记录" leftText="取消" @click-left="cancel" rightText="保存" style="background-color: #fff;"></custom>
		
		<view class="menu">
			<view class="menu-item" v-for="(item,index) in list">
				<view class="left">{{item.name}}</view>
				<input :type="item.type" :placeholder="item.placeholder" placeholder-style="font-size:28upx;" v-model="item.value" class="input">
				<view class="company">{{item.com}}</view>
			</view>
			<view class="menu-item-picker">
				<view class="nowSelect">
					日期
				</view>
				<view class="picker">
					<picker mode="date" :value="parame.time" :start="startDate" :end="endDate" @change="bindDateChange" fields="day">
						<view class="">{{parame.time}}</view>
					</picker>
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
				startDate:"2020/07/26",
				endDate:'2020/07/30',
				parame:{
					time: currentDate
				},
				items:null,//修改信息
				flag:true,
				item:null,//身高体重回显数据
				type:"",//回显类型，为echo是回显
				url:"/app_baby/addWeight",//编辑和增加生长记录，通过判断type不同，接口不同
				list:[
					{
						name:"身高",
						com:"cm",
						placeholder:"请输入身高",
						type:"text",
						value:'',
						res:"height"
					},
					{
						name:"体重",
						com:"kg",
						placeholder:"请输入体重",
						type:"number",
						value:'',
						res:"weight"
					},
					{
						name:"头围",
						com:"cm",
						placeholder:"请输入头围",
						type:"number",
						value:'',
						res:"head_width"
					}
				]
			};
		},
		onLoad(opt) {
			if(opt.type=="upload"){
				if(uni.getStorageSync("deletedItem")){
					this.items = uni.getStorageSync("deletedItem")
					this.parame.weight_id = this.items.id
					this.parame.baby_id = this.items.baby_id
					this.list.forEach((item,index)=>{
						if(item.res=="head_width"){
							item["value"] = this.items.head_width
						}else if(item.res=="weight"){
							item["value"] = this.items.weight
						}else if(item.res=="height"){
							item["value"] = this.items.height
						}
					})
					if(this.items.time) this.parame.time = this.items.time
					this.url="/app_baby/updateWeight"
				}
			}
			if(opt.type=="echo"){
				this.type=opt.type;
				this.item = JSON.parse(opt.item)
				this.parame.weight_id = this.item.id
				
				this.url="/app_baby/updateWeight"
				this.echo()
			}
			//console.log(this.item)
		},
		methods:{
			/**
			 * 身高体重回显
			 */
			echo(){
				let obj = {}
				if(this.item){
					obj.baby_id = this.item.baby_id
					obj.weight_id = this.item.id
				}
				
				this.http("/app_baby/detailsWeight",obj).then(res=>{
					if(res.code==1){
						let data = res.data
						
						this.list.forEach((item,index)=>{
							if(item.res=="head_width"){
								item["value"] = data.head_width
							}else if(item.res=="weight"){
								item["value"] = data.weight
							}else if(item.res=="height"){
								item["value"] = data.height
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
			 * 保存生长记录
			 */
			save(){
				let obj={}
				this.list.forEach(item=>{
					if(item.value==''){
						uni.showToast({
							title:"请输入宝宝的身高、体重或者头围信息",
							icon:"none"
						})
						this.flag = false
						return 
					}else{
						this.flag = true
					}
					this.parame[item.res]=item.value
				})
				this.parame.baby_id=uni.getStorageSync("babyItem").id
				if(!this.flag) return
				uni.showLoading({
					title:"处理中..."
				})
				this.http(this.url,this.parame).then(res=>{
					if(res.code==1){
						uni.redirectTo({
							url:"/pages/index/growth_record/growth_record"
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
			 * 取消
			 */
			cancel(){
				uni.navigateBack()
			},
			
			 
			/*
			日期选择*
			 */
			bindDateChange(e){
				this.parame.time = e.target.value
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
				return `${year}-${month}-${day}`;
			}
		}
	}
</script>

<style lang="scss" scoped>
	.content{
		.menu{
			display: flex;
			flex-direction: column;
			justify-content: flex-start;
			background-color: #fff;
			margin-top: 33upx;
			.menu-item{
				font-size: 26upx;
				margin: 33upx;
				padding: 20upx 0;
				display: flex;
				flex-direction: row;
				border-bottom: 1upx solid #eee;
				justify-content: space-around;
				.input{
					border:none;outline:none;
				}
			}
			.menu-item-picker{
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				padding: 20upx 0;
				margin: 0 33upx;
				.nowSelect,.picker{
					font-size: 26upx;
					margin: 0 33upx;
				}
				.picker{
					width: 60%;
				}
			}
		}
	}
</style>
