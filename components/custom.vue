<template>
	<view class="cu-navbar">
		<view :class="{'cu-navbar--fixed': fixed,'cu-navbar--shadow':border,'cu-navbar--border':border}" 
		 class="cu-navbar__content">
		 <!-- :style="{'background': backgroundColorRgba}" -->
			<block v-if="backgroundImg">
				<image class="navbgimg" :src="backgroundImg" mode=""></image>
			</block>

			<view :style="{ height: statusBarHeight ,'background': statusBarBackground}" class="cu-status-bar" v-if="statusBar"></view>
			<view :style="{color:colorInfo,height: height,'line-height':height}" class="hd cu-navbar__header cu-navbar__content_view">
				<view class="cu-navbar__header-btns cu-navbar__content_view" @tap="onClickLeft" v-if="leftSlot" :style="[{'color': colorInfo},{'flex': flex?'1':''}]">
					<block v-if="leftText.length || leftIcon.length || back">
						<view v-if="leftIcon.length || back" :class="back ? 'left_back' : ''" class="cu-navbar__content_view">
							<!-- <uni-icons :type="back ? 'arrowleft' : leftIcon" :color="colorInfo" size="28"/> -->
							<text class="cuIcon-back font-45" :class="{color: colorInfo}"></text>
						</view>
						<view v-if="leftText.length" :class="{'cu-navbar-btn-icon-left':!leftIcon.length}" class="cu-navbar-btn-text cu-navbar__content_view">
							{{ leftText }}
						</view>

					</block>
					<block v-else>
						<slot name="leftAfter" v-if="leftSlidiSwitch && slotSlidiSwitch == 1" />
						<slot name="left" v-else />

					</block>
				</view>


				<view :style="[{'color': colorInfo},{'flex': flex?flex:''},{'padding-left': flex?'':'30upx'}]" class="cu-navbar__header-container cu-navbar__content_view"
				 style="overflow: hidden;">
					<view v-if="title.length" class="cu-navbar__header-container-inner cu-navbar__content_view" style="display: inline-block;">{{ title }}</view>
					<!-- 标题插槽 -->

					<block v-else>
						<slot name="centerAfter" v-if="centerSlidiSwitch && slotSlidiSwitch == 1" />
						<slot v-else />

					</block>
				</view>

				<view :style="[{'flex': flex?'1':''}]" :class="[title.length?'cu-navbar__header-btns-right':'',flex?'':'padding-r-30']"
				 class="cu-navbar__header-btns cu-navbar__content_view" @tap="onClickRight" v-if="rightSlot" style="margin-right: 30upx;display: flex;justify-content: center;">
					<!-- 优先显示图标 -->
					<block v-if="rightIcon.length || rightText.length">
						<view class="cu-navbar__content_view" v-if="rightIcon.length">
							<image src="../static/img/add.png" v-if="rightIcon=='jia'" class="img"></image>
							<image src="../static/img/carame.png" v-else-if="rightIcon=='camera'" class="img"></image>
							<text class="cuIcon-right font-45" :class="{color: colorInfo}" v-else></text>
						</view>
						<view v-if="rightText.length" class="cu-navbar-btn-text cu-navbar__content_view" style="font-size: 13px;">{{ rightText }}</view>
					</block>
					<block v-else>
						<slot name="rightAfter" v-if="rightSlidiSwitch && slotSlidiSwitch == 1" />
						<slot name="right" v-else />
					</block>


				</view>

			</view>
		</view>

		<view v-if="placeholder" class="cu-navbar__placeholder">
			<view :style="{ height: statusBarHeight}" class="cu-status-bar" v-if="statusBar"></view>

			<view :style="{ height: height}" />
		</view>
	</view>

</template>

<script>
	//获取系统状态栏高度
	var statusBarHeight = uni.getSystemInfoSync().statusBarHeight + 'px';
	export default {
		name: "navbar",
		data() {
			return {
				statusBarHeight: statusBarHeight,
				transparentValue: 0,
				navTransparentFixedFontColor: '#fff',
				statusBarFontColorInfo: [],
				backgroundColorRgba: 'rgba(255,255,255,1)',
				backgroundColorRgb: 'rgb(222,222,222)',
				colorInfo: '#000000',
				placeholder: false,
				colorContainer: null,
				slotSlidiSwitch: 0

			};
		},
		props: {
			flex: {
				type: [String,Number],
				default: ""
			},
			height: {
				type: String,
				default: "80upx"
			},
			//导航栏占位符 显示（show） ，隐藏（hidden），自动（auto：如果头部为固定fiexd ，则显示占位符）
			barPlaceholder: {
				type: String,
				default: "auto"
			},
			//返回上一页
			back: {
				type: [Boolean, String],
				default: true
			},
			//标题
			title: {
				type: String,
				default: ''
			},
			//是否开启左插槽
			leftSlot: {
				type: [Boolean, String],
				default: true
			},
			//是否开启右插槽
			rightSlot: {
				type: [Boolean, String],
				default: true
			},

			//左边文字
			leftText: {
				type: String,
				default: ''
			},
			//右插槽文字
			rightText: {
				type: String,
				default: ''
			},
			//左插槽图标
			leftIcon: {
				type: String,
				default: ''
			},
			//右插槽图标
			rightIcon: {
				type: String,
				default: ''
			},
			//是否固定头
			fixed: {
				type: [Boolean, String],
				default: true
			},
			//文字颜色
			color: {
				type: [Array, String],
				default: "#2A2A2A"
			},
			//导航栏背景颜色
			backgroundColor: {
				type: Array,
				default: function() {
					return new Array([255, 255, 255], [255, 255, 255]);
				}
			},
			//线性渐变角度
			backgroundColorLinearDeg: {
				type: String,
				default: '45'
			},
			//背景图片
			backgroundImg: {
				type: String,
				default: ''
			},
			//背景透明（show,hidden,auto）
			transparent: {
				type: String,
				default: 'show'
			},
			//状态栏字体颜色，只支持黑（#000000）和白（#FFFFFF）两种颜色。（,）
			statusBarFontColor: {
				type: [Array, String],
				default: function() {
					return new Array("#000000", "#000000");
				}
			},
			//是否包含状态栏
			statusBar: {
				type: [Boolean, String],
				default: true
			},
			//状态栏背景颜色
			statusBarBackground: {
				type: String,
				default: ''
			},
			//导航栏阴影
			shadow: {
				type: [String, Boolean],
				default: false
			},
			//导航栏边框
			border: {
				type: [String, Boolean],
				default: true
			},
			//跳至普通页面
			defaultBackUrl: {
				type: String,
				default: ''
			},
			//跳至tabber页面
			backTabbarUrl: {
				type: String,
				default: '/pages/index/index'
			},
			//滑动后切换左插槽
			leftSlidiSwitch: {
				type: [Boolean, String],
				default: false,
			},
			//滑动后切换中间插槽
			centerSlidiSwitch: {
				type: [Boolean, String],
				default: false
			},
			//滑动后切换右插槽
			rightSlidiSwitch: {
				type: [Boolean, String],
				default: false
			},
			scrollFlag: {
				type: [Boolean, String],
				default: false
			}

		},
		created() {
			var that = this;
			//是否添加占位符
			switch (that.barPlaceholder) {
				case 'show':
					that.placeholder = true;
					break;
				case 'hidden':
					that.placeholder = false;
					break;
				case 'auto':
					if (that.fixed) {
						that.placeholder = true;
					}
					break;
			}

			//设置状态栏文字颜色
			that.setStatusBarFontColor();

			//文字颜色
			that.colorContainer = typeof that.color == 'object' ? that.color : [that.color, that.color];
			that.colorInfo = that.colorContainer[0];
			//导航栏透明设置 及监听滚动
			switch (that.transparent) {
				case 'show':
					that.transparentValue = 1;
					break;
				case 'hidden':
					that.transparentValue = 0;
					break;
				case 'auto':
					//获取所有活动页面
					let currentPages = getCurrentPages();
					//监听当前页滚动条
					// #ifndef H5
					currentPages[currentPages.length - 1].onPageScroll = function(e) {
						that.$emit('scroll', e);
						if (e.scrollTop > 100) {
							that.transparentValue = 1;
							that.colorInfo = that.colorContainer[1];
						} else {
							that.transparentValue = e.scrollTop / 100;
							that.colorInfo = that.colorContainer[0];
						}
						that.setBgColor();
					};
					// #endif
					// #ifdef H5
					window.onscroll = function(e) {
						let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
						that.$emit('scroll', {
							scrollTop: scrollTop
						});
						if (scrollTop > 100) {
							that.transparentValue = 1;
							that.colorInfo = that.colorContainer[1];
						} else {
							that.transparentValue = scrollTop / 100;
							that.colorInfo = that.colorContainer[0];
						}
						//返回更新的字体颜色
						that.$emit('updateNavColor', {
							color: that.colorInfo
						})
						that.setBgColor();
					};
					// #endif
					break;
			}
			that.setBgColor();

			//滑动切换
			if (that.fixed && (that.leftSlidiSwitch || that.centerSlidiSwitch || that.rightSlidiSwitch)) {
				//获取所有活动页面
				let currentPages = getCurrentPages();
				//监听当前页滚动条
				// #ifndef H5
				currentPages[currentPages.length - 1].onPageScroll = function(e) {
					that.$emit('scroll', e);
					if (e.scrollTop > 100) {
						that.slotSlidiSwitch = 1;
					} else {
						that.slotSlidiSwitch = 0
					}
				};
				// #endif
				// #ifdef H5
				window.onscroll = function(e) {
					let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
					that.$emit('scroll', {
						scrollTop: scrollTop
					});
					if (scrollTop > 100) {
						that.slotSlidiSwitch = 1;
					} else {
						that.slotSlidiSwitch = 0
					}
				};
				// #endif
			}

		},
		watch: {
			//监控透明度变化 
			transparentValue(val, oldVal) {
				var that = this;
				//this.settingColor();

				//头条小程序不支持setNavigationBarColor方法
				// #ifndef MP-TOUTIAO || H5
				if (oldVal > 0.8) {
					uni.setNavigationBarColor({
						frontColor: that.statusBarFontColorInfo[1],
						backgroundColor: that.backgroundColorRgb
					});
				} else if (oldVal < 0.2) {
					uni.setNavigationBarColor({
						frontColor: that.statusBarFontColorInfo[0],
						backgroundColor: that.backgroundColorRgb
					});
				}
				// #endif

				// #ifdef MP-TOUTIAO
				if (tt.setNavigationBarColor) {
					if (oldVal > 0.8) {
						tt.setNavigationBarColor({
							frontColor: that.statusBarFontColorInfo[1],
							backgroundColor: that.backgroundColorRgb,
							success(res) {},
							fail(res) {}
						});
					} else if (oldVal < 0.2) {
						tt.setNavigationBarColor({
							frontColor: that.statusBarFontColorInfo[0],
							backgroundColor: that.backgroundColorRgb,
							success(res) {},
							fail(res) {}
						});
					}
				} else {
					console.log("提示：当前客户端版本过低，无法使用状态栏颜色修改功能，请升级（基础库1.40+）。")
				}
				// #endif


			},
			//监听背景颜色
			backgroundColor(val, old) {
				var that = this;
				that.setBgColor()
			},
			color(val, old) {
				var that = this;
				//文字颜色
				that.colorContainer = typeof val == 'object' ? val : [val, val];
				that.colorInfo = that.colorContainer[0];
			},
			transparent(val) {
				// #ifndef H5
				if (this.scrollFlag) {
					if (val == 'hidden') {
						this.transparentValue = 1
						this.setBgColor()
					}
				} else {
					if (val == 'auto') {
						this.transparentValue = 0
						this.setBgColor()
					}
				}
				// #endif
			}
		},
		methods: {
			onClickLeft() {
				let sess=uni.getStorageSync("business_mobile")
				if(this.title=="选择商家"){
					uni.removeStorageSync('businessSession')
				}
				if (this.back) {
					
					if (getCurrentPages().length > 1) {
						
						uni.navigateBack();
					} else {
						
						if (this.defaultBackUrl) {
							
							uni.redirectTo({
								url: this.defaultBackUrl
							})
						} else {
							
							if (this.backTabbarUrl) {
								
								uni.reLaunch({
									url: this.backTabbarUrl
								});
								
							}
						}
					}
				} else {
					this.$emit('click-left')
				}
			},
			onClickRight() {
				this.$emit('click-right')
			},
			//背景颜色
			setBgColor() {
				var that = this;
				//如果存在背景图片则背景颜色失效
				// if(that.backgroundImg){
				// 	that.backgroundColorRgba = "url(" + that.backgroundImg + ")";
				// 	return;
				// }

				//背景颜色
				if (typeof that.backgroundColor[0] == 'object') {
					let l = that.backgroundColor.length;
					if (l >= 2) {
						let rgbStr = "linear-gradient(" + that.backgroundColorLinearDeg + "deg,";
						let c = null;
						for (var i in that.backgroundColor) {
							c = that.backgroundColor[i];
							rgbStr += "rgba(" + c[0] + "," + c[1] + "," + c[2] + "," + that.transparentValue + ")";

							if (l != (i * 1) + 1) {
								rgbStr += ",";
							}
						}
						rgbStr += ")";
						that.backgroundColorRgba = rgbStr;
					}

				} else {
					let rgbStr = that.backgroundColor[0] + ',' + that.backgroundColor[1] + ',' + that.backgroundColor[2];
					that.backgroundColorRgb = 'rgb(' + rgbStr + ')';
					that.backgroundColorRgba = 'rgba(' + rgbStr + ',' + that.transparentValue + ')';
				}
			},
			setStatusBarFontColor() {
				var that = this;
				if (typeof that.statusBarFontColor == 'string') {
					that.statusBarFontColorInfo = [that.statusBarFontColor, that.statusBarFontColor];
				} else if (typeof that.statusBarFontColor == 'object') {
					if (that.statusBarFontColor.length == 1) {
						that.statusBarFontColorInfo = [that.statusBarFontColor[0], that.statusBarFontColor[0]];
					} else if (that.statusBarFontColor.length >= 2) {
						that.statusBarFontColorInfo = [that.statusBarFontColor[0], that.statusBarFontColor[1]];
					}
				}
				// #ifndef MP-TOUTIAO || H5
				uni.setNavigationBarColor({
					frontColor: that.statusBarFontColorInfo[0],
					backgroundColor: that.backgroundColorRgb
				});
				// #endif

				// #ifdef MP-TOUTIAO
				if (tt.setNavigationBarColor) {
					tt.setNavigationBarColor({
						frontColor: that.statusBarFontColorInfo[0],
						backgroundColor: that.backgroundColorRgb
					});
				} else {
					console.log("cu-custom 提示：当前客户端版本过低，无法使用状态栏颜色修改功能，请升级（基础库1.40+）。")
				}
				// #endif
			}

		},
		destroyed() {

		}


	}
</script>

<style lang="scss" scoped>
	$nav-height: 44px;

	.hd {
		overflow: hidden;
	}

	//防止其他ui影响
	.cu-navbar uni-view,
	.cu-navbar uni-scroll-view,
	.cu-navbar uni-swiper,
	.cu-navbar uni-button,
	.cu-navbar uni-input,
	.cu-navbar uni-textarea,
	.cu-navbar uni-label,
	.cu-navbar uni-navigator,
	.cu-navbar uni-image {
		box-sizing: unset;
	}

	.cu-navbar {
		position: relative;
		padding-top: 0;
		overflow: hidden;

		&__content {
			display: block;
			position: relative;
			width: 100%;
			/*background-color: $uni-bg-color*/
			;
			overflow: hidden;

			.navbgimg {
				position: absolute;
				top: 0;
				left: 0;
				z-index: 0;
				width: 100%;
			}

			.cu-navbar__content_view {
				// line-height: $nav-height;
				display: flex;
				align-items: center;
				font-size: 36upx;
				font-family: PingFang SC;
				font-weight: bold;

			}

			.cu-status-bar {
				display: block;
				width: 100%;
				height: 20px;
				height: var(--status-bar-height);
				position: relative;
				z-index: 1;
			}
		}

		&__header {
			position: relative;
			z-index: 1;
			display: flex;
			flex-direction: row;
			width: 100%;
			height: $nav-height;
			line-height: $nav-height;
			font-size: 36upx;
			transition: color 0.5s ease 0s;

			&-btns {
				display: inline-flex;
				flex-wrap: nowrap;
				flex-shrink: 0;
				min-width: 120upx;

				&:first-child {
					padding-left: 0;
				}

				&:last-child {
					// min-width: 108upx;
				}

				&-right:last-child {
					// width: 120rpx;
					text-align: right;
					flex-direction: row-reverse;
				}
			}

			&-container {
				width: 100%;
				margin: 0 10upx;

				&-inner {
					width: 100%;
					display: inline-block;
					justify-content: center;
					font-size: 36upx;

					text-overflow: ellipsis;
					white-space: nowrap;
					overflow: hidden;
					text-align: center;
					// padding-right: 60upx;
				}
			}
		}

		&__placeholder {
			&-view {
				height: $nav-height;
			}
		}

		&--fixed {
			position: fixed;
			top: 0;
			z-index: 998;
		}

		&--shadow {
			box-shadow: 0 1upx 1upx #f5f5f5;
		}

		&--border:after {
			position: absolute;
			z-index: 3;
			bottom: 0;
			left: 0;
			right: 0;
			height: 2upx;
			content: '';
			-webkit-transform: scaleY(.5);
			transform: scaleY(.5);
			background-color: #f5f5f5;
		}
	}

	.left_back {
		padding-left: 12upx;
		padding-right: 12upx;
	}
	.img{
		width:40upx;height:40upx;
	}
</style>
