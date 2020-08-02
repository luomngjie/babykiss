<template>
	<view class="content" :style="{'height':height+'px'}">
		<custom :back="false" :title="title"  rightText="下一步" leftText="取消" @click-right="next" @click-left="cancal" style="background-color: #fff;"></custom>
		<view class="top">
			<view class="share_choice"  >
				<view class="con" @click="selectShow" :class="select?'':'showClass'">
					<uni-icons type="checkmarkempty" size="20" color="#fff" v-if="select"></uni-icons>
				</view>
				<text  class="shar_time">第一次</text>
			</view>
			<view class="input">
				<input type="text" placeholder="请输入" placeholder-style="font-size:22upx;color:#aaa" v-model="tag.tag" @input="input">
			</view>
		</view>
		
		<view class="nav">
			<view class="list" v-for="(item,index) in tips" :key="index" @click="tipsFun(item)">{{item.tag}}</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title:"大事记",
				check:'0',
				height:0,
				select:true,
				tag:{
					tag:"",
					is_one:"",//1是第一次标签0不是第一次
					id:""
				},
				custom:'',
				tips:[],
				tags:[]
			};
		},
		onLoad(opt) {
			this.custom = opt.custom
			if(opt.custom!=1){
				this.select = false
			}
			
			this.select?this.tag.is_one=1:this.tag.is_one=0
			this.height=this.$store.state.system.screenHeight
			this.tagListOne()
			if(opt.tags){
				this.ta = JSON.parse(opt.tags)
				this.tag.is_one=this.ta.is_one
				this.ta.is_one==1?this.select=true:this.select=false
				this.tag.tag = this.ta.tag
				this.tag.id=this.ta.id
				
			}
		},
		methods:{
			/**
			 * 表单输入事件
			 */
			input(e){
				this.tag.id=0
			},
			/**
			 * 下一步
			 */
			next(){
				if(this.tag.tag==''){
					uni.showToast({
						title:"请选择标签",
						icon:"none"
					})
					return
				}
				uni.navigateTo({
					url:"/pages/index/memorabilia/next/next",
					success:()=>{
						if(this.custom==1){
							uni.setStorageSync("tag",this.tag)
						}else{
							this.$store.commit("baby",this.tag||'')
							//uni.setStorageSync("tags",this.tag)
						}
						
					}
				})
			},
			
			/**
			 * 取消
			 */
			cancal(){
				uni.navigateBack()
			},
			
			/**
			 * tips点击事件
			 */
			tipsFun(item){
				//this.tag=item
				this.tag.id=item.id
				this.tag.is_one=item.is_one
				this.tag.tag = item.tag
			},
			
			/**
			 * 复选框事件
			 */
			selectShow(){
				this.select=!this.select
				this.select?this.tag.is_one=1:this.tag.is_one=0
			},
			
			/**
			 * 标签回显
			 */
			tagListOne(){
				this.http("/app_baby/tagListOne").then(res=>{
					if(res.code==1){
						this.tips = res.data
					}else{
						uni.showToast({
							title:"暂无信息",
							icon:"none"
						})
					}
					
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.showClass{
		background:transparent !important;
		border: 1upx solid #eee;
		
	}
	.content{
		background: #fff;
		
		.top{
			.share_choice{
				display: flex;
				align-items: center;
				margin: 0 40upx;
				.con{
					width:35upx;height:35upx;
					border-radius: 3px;
					background-color: #FFBF29;
					display: flex;
					align-items: center;
					justify-content: center;
					margin-right: 10upx;
				}
				.shar_time{
					font-size: 22upx;
				}
			}
			.input{
				width:90%;
				background-color: #eee;
				height:60upx;border-radius: 10upx;
				margin: 23upx auto;
				
				input{
					height: 100%;width: 100%;
					padding-left: 33upx;
					font-size: 22upx;
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
			}
		}
	}
</style>
