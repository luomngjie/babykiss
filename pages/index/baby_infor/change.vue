<template>
	<view class="content">
		<custom  :back="false" leftText="取消"
			 @click-left="left" color="#aaa"
			:title="titleCen" :bg="'#fff'" :statusBarBackground="'#fff'">
			<view slot="right" >
				<view class="photo-item" :style="{'borderRadius':'50%'}">
					<view @click="save">保存</view>
				</view>
			</view>
		</custom>
		
		<view class="name" v-if="type=='name'">
			<input type="text" v-model="parame.name" @blur="input">
		</view>
		
		<view class="tabCon">
			<view class="index" v-if="type=='boold'" v-for="(item,index) in boold" :key="index" @click="select(index,item)">
				<view class="left">
					<view class="title">{{item.name}}</view>
				</view>
				<image :src="current==index?img:''" class="img"></image>
			</view>
		</view>
		
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				titleCen:"",
				
				img:require("../../../static/img/gou.png"),
				parame:{blood_type:4},//提交的数据
				current:0,
				boold:[
					{
						name:"O型",
						type:4
					},
					{
						name:"A型",
						type:1
					},
					{
						name:"B型",
						type:2
					},
					{
						name:"AB型",
						type:3
					}],
				type:''//类型
			};
		},
		onLoad(opt) {
			let baby = uni.getStorageSync("babyItem")
			this.type = opt.type
			if(opt.type=="boold"){
				this.parame.type=0
				
			}else if(opt.type="name"){
				
				this.parame.name = baby.name
			}
			this.parame.blood_type=4
			this.parame=baby
			this.titleCen=opt.title
		},
		methods:{
			/**
			 * 输入框失去焦点事件
			 */
			input(e){
				this.name=e.detail.value
				this.parame.name = e.detail.value
			},
			/**
			 * 修改信息的保存
			 */
			save(){
				uni.showLoading({
					title:"加载中..."
				})
				let obj = {}
				obj.baby_id = this.parame.id
				obj.head_portrait = this.parame.head_portrait
				obj.cover = this.parame.cover
				obj.name = this.parame.name
				obj.sex = this.parame.sex
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
			 * 左侧返回
			 */
			left(){
				uni.navigateBack()
			},
			
			/**
			 * 血型选中
			 */
			select(index,item){
				this.current = index
				this.parame.blood_type=item.type
				console.log(item)
				//this.parame = item
				
			}
		}
	}
</script>

<style lang="scss" scoped>
	.content{
		.name{
			width: 100%;
			display: flex;
			background-color: #fff;
			margin: 33upx 0;height: 80upx;
			input{
				width: 90%;
				height: 100%;
				font-size: 26upx;
				color:black;
				padding: 0 33upx;
			}
		}
		.tabCon{
			display: flex;
			flex-direction: column;
			background-color: #fff;
			.index{
				margin: 33upx;
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				align-items: center;
				border-bottom: 1upx solid #eee;
				padding-bottom:20upx;
				.left{
					width:90%;
					.title{
						font-size: 28upx;
					}
					.listCon{
						width:100%;
						color:#aaa;
						margin-top: 10upx;
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
						font-size: 22upx;
					}
				}
				
				.img{
					width:30upx;height:30upx;
				}
			}
			
		}
	}
</style>
