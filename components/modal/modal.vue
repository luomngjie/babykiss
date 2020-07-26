<template>
	<view class="modal">
		<uni-popup type="center" ref="popup" :zIndex="zIndex">
			<view class="modal-box">
				<view class="modal-title">
					{{title}}
					<slot name="title"></slot>
				</view>
				<view class="modal-content">
					{{content}}
					<slot name="content"></slot>
				</view>
				<view class="modal-btn" :class="btnClass">
					<view class="cancel" @tap.stop="cancel" :style="cancelBgColor">
						{{cancelText}}
					</view>
					<view class="confirm" @tap.stop="confirm" :style="confirmBgColor">
						{{confirmText}}
					</view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	export default {
		props: {
			title: { //modal的标题
				type: [String, Number],
				default: '提示'
			},
			content: { //modal的内容
				type: [String, Number],
				default: ''
			},
			type: { //按钮类型
				type: [String, Number],
				default: '1000'
			},
			zIndex: { //按钮类型
				type: [String, Number],
				default: 9
			},
			cancelBgColor: { //取消按钮颜色背景
				type: [Object, Array],
				default () {
					return {}
				}
			},
			confirmBgColor: { //确认按钮颜色背景
				type: [String, Object, Array],
				default () {
					return {}
				}
			},
			confirmText: {
				type: String,
				default: '确定'
			},
			cancelText: {
				type: String,
				default: '取消'
			}
		},
		data() {
			return {}
		},
		computed: {
			btnClass() {
				let bc;
				switch (this.type) {
					case '1000':
						bc = ""
						break;
					case '2000': //取消确定位置颠倒
						bc = "reverse"
						break;
					case '3000':
						bc = "hide-cancel" //隐藏取消按钮
						break;
					case '4000':
						bc = "hide-confirm" //隐藏确定按钮
						break;
					default:
						bc = ''
						break;
				}
				return bc
			}
		},
		methods: {
			open() {
				this.$refs['popup'].open()
			},
			close() {
				this.$refs['popup'].close()
			},
			confirm() {
				this.$emit('Confirm')
			},
			cancel() {
				this.close()
				this.$emit('cancel')
			}
		}
	}
</script>

<style lang="scss" scoped>
	.modal {
		&-box {
			width: 640upx;
			min-height: 379upx;
			background: rgba(255, 255, 255, 1);
			border-radius: 27upx;
			padding: 35upx 20upx;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			align-items: center;
		}

		&-title {
			font-size: 32upx;
			line-height: 32upx;
			font-family: PingFang SC;
			font-weight: bold;
			color: rgba(51, 51, 51, 1);
		}

		&-content {
			width: 100%;
			font-size: 28upx;
			font-family: PingFang SC;
			font-weight: bold;
			color: rgba(51, 51, 51, 1);
			text-align: center;
		}

		&-btn {
			width: 80%;
			display: flex;
			justify-content: space-between;
			align-items: center;

			view {
				display: flex;
				align-items: center;
				justify-content: center;
				min-width: 213upx;
				height: 80upx;
				box-shadow: 1upx 20upx 33upx 0 rgba(245, 245, 245, 0.11);
				border-radius: 40upx;
				font-size: 32upx;
				font-family: PingFang SC;
				font-weight: 500;

				&.cancel {
					background: rgba(245, 245, 245, 1);
					color: rgba(187, 187, 187, 1);
				}

				&.confirm {
					background: rgba(255, 94, 95, 1);
					color: rgba(255, 255, 255, 1);
				}
			}

			&.reverse {
				flex-flow: row-reverse;
			}

			&.hide-cancel {
				justify-content: center;
				.cancel {
					display: none;
				}

				.confirm {
					width: 513upx;
				}
			}

			&.hide-confirm {
				.confirm {
					display: none;
				}

				.cancel {
					width: 513upx;
				}
			}
		}
	}
</style>
