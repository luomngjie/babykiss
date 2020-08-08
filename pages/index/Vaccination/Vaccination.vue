<template>
	<view class='content'>
		<custom :back="true" @click-right="add" title="接种信息列表" rightText="添加" :bg="'#fff'" :statusBarBackground="'#fff'"></custom>
		<scroll-view class="swiper-one-list" scroll-y="true" :style="{'height':height-105+'px'}" @scrolltolower="onReachScollBottom">
			<view class="menu" v-for="(item,index) in list" :key="index" @click="detail(item)">
				<view class="left" >
					<view class="item">{{(item.vero||{}).title||item.vero_name}}</view>
					<view class="item font">
						<image src="../../../static/img/yuer.png" class="image" v-if="item.status==0"></image>
						<text class="color">{{(item.vero||{}).vero_introduction||item.remark}}</text>
					</view>
				</view>
				
				<view :class="item.status==1?'okState':'state'">{{item.status==0?'未接种':item.status==1?"已接种":''}}</view>
			</view>
		
		</scroll-view>
		
		<uni-load-more :status="status"></uni-load-more>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				height:0,
				flag:true,
				status: 'more',
				page:{
					page:1,//当前页数
					num:5,//当前条数
					total:''//数据总数
				},
				list:[]
			};
		}, 
		onLoad() {
			this.height=this.$store.state.system.screenHeight
			this.selectAddVero()
		},
		methods:{
			/**
			 * 疫苗数据查询
			 */
			selectAddVero(){
				uni.showLoading({
					title:"加载中..."
				})
				this.http("/app_baby/selectAddVero",{baby_id:uni.getStorageSync("babyItem").id,num:this.page.num,page:this.page.page}).then(res=>{
					if(res.code==1){
						this.page.page++
						this.page.total = res.data.length
						this.status="more"
						this.list = this.list.concat(res.data)
						if(this.list.length==res.data.length){
							this.flage = false
							this.status = 'noMore'
						}else{
							this.flage = true
						}
						//console.log(res)
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
			 * 添加
			 */
			add(){
				uni.navigateTo({
					url:"/pages/index/Vaccination/add"
				})
				//this.$refs["popup"].open()
			},
			
			/**
			 * @param {Object} opt
			 * 滚动底部事件，无无限加载
			 */
			onReachScollBottom(){
				if(this.flage) this.selectAddVero()
				
			},
			
			/**
			 * 详情
			 */
			detail(item){
				uni.navigateTo({//list参数，与疫苗接种添加详情共用一个页面，用来区分
					url:"/pages/index/Vaccination/detail?type="+'list'+"&parame="+JSON.stringify(item)
				})
			}
		}
	}
</script>

<style lang="scss">
	.content{
		.menu{
			display: flex;
			justify-content: space-between;
			font-size: 26upx;
			align-items: center;
			border-bottom: 1px solid #eee;
			padding:16upx 20upx;
			background-color: #fff;
			.left{
				display: flex;
				flex-direction: column;
				justify-content: flex-start;
				.item{
					margin: 5upx 0;
					display: flex;
					align-items: center;
					.color{
						color:#6DD7A9;
						font-size:20upx;
						
					}
					.image{
						width:30upx;height:30upx;
					}
				}
			}
			.state{
				padding:5upx;
				border: 1upx solid #6DD7A9;
				border-radius: 10upx;
				font-size: 22upx;color: #6DD7A9 ;
			}
			.okState{
				padding:5upx;
				border: 1upx solid red;
				border-radius: 10upx;
				font-size: 22upx;color:red ;
			}
		}
	}
</style>
