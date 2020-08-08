<template>
	<view class="content" :style="{'height':height-80+'px'}">
		<custom  :back="true"
			class="custom" @click-left="left"
			:title="title"  :bg="'#fff'"
			:statusBarBackground="'#fff'">
			<view slot="right" >
				<view class="photo-item" >
					<image src="../../../../static/img/more.png" class="pahoto" @click="right" ></image>
				</view>
			</view>
		</custom>
		
		<scroll-view  :style="{'height':height-90+'px'}"  @scrolltolower="onReachScollBottom" @scroll="scroll" scroll-y="true" class="scroller" scroll-with-animation="true">
			<view class="tlak_o" v-for="(item,index) in data" :key="index" v-if="data">
				<view class="date">
					<view class="day" v-if="item.date">{{item.date}}</view>
					<view class="dayNumber">第{{item.day}}天</view>
				</view>
				
				<image :src="item.file[0]?item.file[0]:backgroundImg" class="menu-image" ></image>
				
				<view class="date">
					<view class="dayNumber" v-if="item.describe">{{item.describe}}</view>
				</view>
				
				<view class="first" v-if="item.baby_tag_one.length>0">
					<view class="list" @click="firstFun" v-for="(items,index) in item.baby_tag_one">{{items.tag}}</view>
				</view>
				
				
				<view class="tabbar">
					<view class="name">
						<text>爸爸,1小时前</text>
					</view>
					<image src="../../../../static/img/mess.png" class="image"></image>
				</view>
				
				<view class="tabbar">
					<view class="name">
						<text>爸爸被萌化了</text>
					</view>
				</view>
			</view>
			
			<view class="tlak_o" v-if="weight">
				<view class="date">
					<view class="day" v-if="weight.time">{{weight.time}}</view>
					<view class="dayNumber">第{{weight.day||0}}天</view>
				</view>
				
				<view class="con" style="display: flex;flex-direction: row;flex-wrap: wrap;width:550upx;">
					<view class="name" style="font-size:26upx;color:black;margin:15upx 30upx;">身高&nbsp;&nbsp;{{weight.height}}</view>
					<view class="name" style="font-size:26upx;color:black;margin:15upx 30upx;">体重&nbsp;&nbsp;{{weight.weight}}</view>
					<view class="name" style="font-size:26upx;color:black;margin:15upx 30upx;">头围&nbsp;&nbsp;{{weight.head_width}}</view>
				</view>
				
				<view class="tabbar">
					<view class="name">
						<text>爸爸,1小时前</text>
					</view>
					<image src="../../../../static/img/mess.png" class="image"></image>
				</view>
				
				<view class="tabbar">
					<view class="name">
						<text>爸爸被萌化了</text>
					</view>
				</view>
			</view>
		</scroll-view>
		
		<uni-popup type="center" ref="popup" zIndex="999">
			<view class="popup-center">
				<view class="item-list">更多操作</view>
				<view class="line"/>
				<view class="item-list" >分享</view>
				<view class="line"/>
				<view class="item-list" @click="edit">编辑</view>
				<view class="line"/>
				<view class="item-list" @tap.stop="deleted">删除</view>
				<view class="item-list" @tap.stop="cancel">取消</view>
			</view>
		</uni-popup>
		
		<cu-modal ref="quanxian"  @cancel='modalHide'  @Confirm="modalConfirm">
			<!-- :cancelText='cancel' :confirmText='confirmbtn' -->
			<text slot="content">
				删除后其他亲友也将无法查看这条记录，确定继续吗?
			</text>
		</cu-modal>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				height:0,
				title:"何苦",
				parame:null,
				backgroundImg:require('../../../../static/img/banner.jpg'),
				data:null,//展示的数据
				weight:null,//体重详情
				obj:{}//详情请求参数
			};
		},
		onLoad(opt) {
			if(opt.item){
				this.parame = JSON.parse(opt.item)
				
				this.obj.baby_id = this.parame.baby_id
				if(this.parame.type==2){
					this.obj.memorabilia_id=this.parame.morph_to_model.id
					this.detailsMemorabilia()
				}else if(this.parame.type==1){
					this.obj.weight_id=this.parame.morph_to_model.id
					this.detailsWeight()
				}
				
			}
			
			
			this.height=this.$store.state.system.screenHeight
		},
		methods:{
			/**
			 * 编辑
			 */
			edit(){
				if(this.parame.type==2){
					uni.navigateTo({
						url:"/pages/index/memorabilia/next/next?type="+"echo"+"&memorabilia_id="+this.parame.morph_to_model.id
					})
					
				}else if(this.parame.type==1){
					uni.navigateTo({
						url:"/pages/index/growth_record/add?type="+"echo"+"&item="+JSON.stringify(this.parame.morph_to_model)
					})
				}
				this.$refs["popup"].close()
			},
			/**
			 * 大事记详情
			 */
			detailsMemorabilia(){
				uni.showLoading({
					title:"加载中..."
				})
				this.http("/app_baby/detailsMemorabilia",this.obj).then(res=>{
					if(res.code==1){
						this.data = res.data.data
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
			 * 体重详情
			 */
			detailsWeight(){
				uni.showLoading({
					title:"加载中..."
				})
				this.http("/app_baby/detailsWeight",this.obj).then(res=>{
					if(res.code==1){
						this.weight = res.data
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
			 * nav左侧返回
			 */
			left(){
				uni.navigateBack()
			},
			
			/**
			 * @param {Object} index右侧三点点击事件
			 */
			right(){
				this.$refs["popup"].open()
			},
			
			/**
			 * 删除
			 */
			deleted(index){
				// uni.showModal({
				// 	title: '提示',
				// })
				this.$refs["popup"].close()
				this.$refs.quanxian.open()
			},
			
			/**
			 * 第一次事件（tips）
			 */
			firstFun(){
				uni.navigateTo({
					url:"/pages/index/memorabilia/memorabilia"
				})
			},
			
			
			/**
			 * prop框取消按钮
			 */
			cancel(){
				this.$refs["popup"].close()
			},
			
			
			/**
			 * modal取消按钮
			 */
			modalHide(){
				this.$refs.quanxian.close()
			},
			
			/**
			 * modal确定按钮
			 */
			modalConfirm(){
				if(this.parame.type==2){
					let url="/app_baby/babyMemorabiliaDel";
					let obj={
						baby_id:this.obj.baby_id,
						memorabilia_id:this.parame.morph_to_model.id
					}
					this.del(url,obj)
				}else if(this.parame.type==1){
					let url="/app_baby/deleteWeight";
					let obj={
						baby_id:this.obj.baby_id,
						weight_id:this.parame.morph_to_model.id
					}
					this.del(url,obj)
				}
				
				this.$refs.quanxian.close()
			},
			
			del(url,obj){//删除
				this.http(url,obj).then(res=>{
					if(res.code==1){
						uni.redirectTo({
							url:"/pages/index/baby_detail"
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
			 * @param {Object} opt
			 * 滚动底部事件，无无限加载
			 */
			onReachScollBottom(e){
				uni.showToast({
					title:"到底了",
					icon:"none"
				})
				
			},
			
			
			/**
			 * @param {Object} e滚动事件
			 */
			scroll(e){
				this.scrollTop=e.detail.scrollTop
			},
		}
	}
</script>

<style lang="scss" scoped>
	.content{
		.photo-item{
			height:60upx;
			 // border-radius: 50%;
			 display: flex;
			 align-items: center;
			 justify-content: center;
			 //background-color: #FFC227;
			 margin:0 40upx;
			 .pahoto{
				 width:40upx;height:40upx;
				 margin:0 10upx;
			 }
		}
		
		.tlak_o {
			background: #fff;
			display: flex;
			padding-bottom: 20upx;
			flex-direction: column;
			margin-bottom: 33upx;
			.menu-image{
				width:100%;
				height:305upx;
			}
			.date{
				display: flex;
				flex-direction: row;
				justify-content: flex-start;
				align-items: center;
				padding: 0 26upx;
				margin: 15upx 0;
				.day{
					font-size: 38upx;
					margin-right: 15upx;
				}
				.dayNumber{
					font-size: 22upx;
				}
			}
			.first{
				display: flex;
				flex-direction: row;
				flex-wrap: wrap;
				justify-content: flex-start;
				padding: 0 26upx;
				.list{
					background-color: #aaa;
					color:#2C405A;
					font-size: 22upx;
					padding: 10upx 20upx;
					border-radius: 25upx;
					margin:10upx;
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
	}
</style>
