<template>
	<view class="loading" :style="{height: `calc(${height}px)`}" v-if="value">
		<image src="/static/loading.gif" mode="widthFix"></image>
		<!-- <view class="loader">
			<view class="text">加载中...</view>
			<view class="horizontal">
			  <view class="circlesup">
					<view class="circle"></view>
					<view class="circle"></view>
					<view class="circle"></view>
					<view class="circle"></view>
					<view class="circle"></view>
			  </view>
			 <view class="circlesdwn">
					<view class="circle"></view>
					<view class="circle"></view>
					<view class="circle"></view>
					<view class="circle"></view>
					<view class="circle"></view>
			  </view>
			</view>
			<view class="vertical">
			  <view class="circlesup">
					<view class="circle"></view>
					<view class="circle"></view>
					<view class="circle"></view>
					<view class="circle"></view>
					<view class="circle"></view>
			  </view>
			  <view class="circlesdwn">
					<view class="circle"></view>
					<view class="circle"></view>
					<view class="circle"></view>
					<view class="circle"></view>
					<view class="circle"></view>
			  </view>
			</view>
		</view> -->
	</view>
</template>

<script>
	let windowHeight = uni.getSystemInfoSync()['screenHeight']
	export default {
		props: {
			value: {
				type: Boolean,
				default: false
			},
			height: {
				type: [String, Number],
				default: windowHeight
			},
		},
		created() {
		}
	}
</script>

<style lang="scss" scoped>
	.loading{
		position: fixed;
		left: 0;
		top: 0;
		z-index: 90;
		width: 100%;
		background-color: #fff;
		display: flex;
		align-items: center;
		justify-content: center;
		image{
			width: 320upx;
		}
	}
	page { 
		-webkit-tap-highlight-color: rgba(0, 0, 0, 0);
		background: #403833;
		color:#f2f2f2;
		font-size:100%;
		margin:0em;
		padding:0em;
	}
	
	/* Start the loader code, first, let's align it the center of screen */
	.loader {
		position: absolute;
		top: 50%;
		left: 50%;
		-webkit-transform: translate(-50%, -50%) scale(.5);
		-moz-transform: translate(-50%, -50%) scale(.5);
		-mos-transform: translate(-50%, -50%) scale(.5);
		-o-transform: translate(-50%, -50%) scale(.5);
		transform: translate(-50%, -50%) scale(.5);
		text-align:center;
	/* disable selection and cursor changes */
		-webkit-touch-callout: none;
	    -webkit-user-select: none;
	    -khtml-user-select: none;
	    -moz-user-select: none;
	    -ms-user-select: none;
	    user-select: none;
	    cursor:default;
	}
		
	
	/* Text align it the center of screen and connect the looped animation for 2 seconds */
	.text{
		width: 4em;
		position: absolute;
		left: -1.8em;
		top: -1em;
		-webkit-animation: text 1.5s infinite;
		-moz-animation: text 1.5s infinite;
		-moz-animation: text 1.5s infinite;
		-ms-animation: text 1.5s infinite;
		-o-animation: text 1.5s infinite;
		animation: text 1.5s infinite;
		font-size: 60upx;
		color: #ccc;
	}
	
	/* Set for the first layer vertical position */
	.vertical{
		position:absolute;
		top: -1.84em;
		left: -0.4em;
		-webkit-transform: rotate(90deg);
		-moz-transform: rotate(90deg);
		-ms-transform: rotate(90deg);
		-o-transform: rotate(90deg);
		transform: rotate(90deg);
	}
	
	/* Set for the second layer horizontal position */
	.horizontal{
		position:absolute;
		top:-8em;
		left:0em;
		-webkit-transform: rotate(0deg);
		-moz-transform: rotate(0deg);
		-ms-transform: rotate(0deg);
		-o-transform: rotate(0deg);
		transform: rotate(0deg);
	}
	
	/* The next two classes do mirror for animation */
	.circlesup{
		position:absolute;
		top: 0em;
		left: -7.5em;
	}
	
	.circlesdwn{
		position:absolute;
		top:2.5em;
		right:-13.5em;
		-webkit-transform: rotate(180deg);
		-moz-transform: rotate(180deg);
		-ms-transform: rotate(180deg);
		-o-transform: rotate(180deg);
		transform: rotate(180deg);
	}
	
	/* Create a container for our circles, rotate it 45 degrees and set animation*/
	.circle {
		position: absolute;
		width: 15em;
		height: 15em;
		-webkit-transform: rotate(45deg);
		-moz-transform: rotate(45deg);
		-ms-transform: rotate(45deg);
		-o-transform: rotate(45deg);
		transform: rotate(45deg);
		-webkit-animation: orbit 1.5s infinite;
		-moz-animation: orbit 1.5s infinite;
		-moz-animation: orbit 1.5s infinite;
		-ms-animation: orbit 1.5s infinite;
		-o-animation: orbit 1.5s infinite;
		animation: orbit 1.5s infinite;
		z-index:5;
	} 
	
	/* Style's of our circles */
	.circle:after {
		content: '';
		position: absolute;
		width: 2em;
		height: 2em;
		-webkit-border-radius: 100%;
		-moz-border-radius: 100%;
		-ms-border-radius: 100%;
		-o-border-radius: 100%;
		border-radius: 100%;
		background: #3BE3E2; /* Pick a color 1*/
	}
	
	.circle:nth-child(2) {
		-webkit-animation-delay: 100ms; 
		-moz-animation-delay: 100ms; 
		-ms-animation-delay: 100ms; 
		-o-animation-delay: 100ms; 
		animation-delay: 100ms;
		z-index:4;
	}
	
	.circle:nth-child(2):after  {
		background: #FF5E5F; /* Pick a color 2*/
		-webkit-transform: scale(0.8,0.8);
		-moz-transform: scale(0.8,0.8);
		-ms-transform: scale(0.8,0.8);
		-o-transform: scale(0.8,0.8);
		transform: scale(0.8,0.8);
	}
	
	.circle:nth-child(3) {
		-webkit-animation-delay: 225ms; 
		-moz-animation-delay: 225ms; 
		-ms-animation-delay: 225ms; 
		-o-animation-delay: 225ms; 
		animation-delay: 225ms; 
		z-index:3;
	}
	
	.circle:nth-child(3):after  {
		background: #ffa489; /* Pick a color 3*/
		-webkit-transform: scale(0.6,0.6);
		-moz-transform: scale(0.6,0.6);
		-ms-transform: scale(0.6,0.6);
		-o-transform: scale(0.6,0.6);
		transform: scale(0.6,0.6);
	}
	
	.circle:nth-child(4) {
		-webkit-animation-delay: 350ms; 
		-moz-animation-delay: 350ms; 
		-ms-animation-delay: 350ms; 
		-o-animation-delay: 350ms; 
		animation-delay: 350ms; 
		z-index:2;
	}
	
	.circle:nth-child(4):after  {
		background: #ff6d37; /* Pick a color 4*/
		-webkit-transform: scale(0.4,0.4);
		-moz-transform: scale(0.4,0.4);
		-ms-transform: scale(0.4,0.4);
		-o-transform: scale(0.4,0.4);
		transform: scale(0.4,0.4);
	}
	
	
	.circle:nth-child(5) {
		-webkit-animation-delay: 475ms; 
		-moz-animation-delay: 475ms; 
		-ms-animation-delay: 475ms; 
		-o-animation-delay: 475ms; 
		animation-delay: 475ms; 
		z-index:1;
	}
	
	.circle:nth-child(5):after  {
		background: #DB2F00; /* Pick a color 5*/
		-webkit-transform: scale(0.3,0.3);
		-moz-transform: scale(0.3,0.3);
		-ms-transform: scale(0.3,0.3);
		-o-transform: scale(0.3,0.3);
		transform: scale(0.3,0.3);
	}
	
	/* Animation keys */
	@-webkit-keyframes orbit {
		0%		{ -webkit-transform:rotate(45deg); } 
	
		5%		{ -webkit-transform:rotate(45deg);
				  -webkit-animation-timing-function: ease-out; } 
	
		70%		{ -webkit-transform:rotate(405deg); 
				  -webkit-animation-timing-function: ease-in; }
	
		100%	{ -webkit-transform:rotate(405deg); } 
	}
	
	@-moz-keyframes orbit {
		0%		{ -moz-transform:rotate(45deg); } 
	
		5%		{ -moz-transform:rotate(45deg);
				  -moz-animation-timing-function: ease-out; } 
	
		70%		{ -moz-transform:rotate(405deg); 
				  -moz-animation-timing-function: ease-in; }
	
		100%	{ -moz-transform:rotate(405deg); } 
	}
	@-ms-keyframes orbit {
		0%		{ -ms-transform:rotate(45deg); } 
	
		5%		{ -ms-transform:rotate(45deg);
				  -ms-animation-timing-function: ease-out; } 
	
		70%		{ -ms-transform:rotate(405deg); 
				  -ms-animation-timing-function: ease-in; }
	
		100%	{ -ms-transform:rotate(405deg); } 
	}
	
	@-o-keyframes orbit {
		0%		{ -o-transform:rotate(45deg); } 
	
		5%		{ -o-transform:rotate(45deg);
				  -o-animation-timing-function: ease-out; } 
	
		70%		{ -o-transform:rotate(405deg); 
				  -o-animation-timing-function: ease-in; }
	
		100%	{ -o-transform:rotate(405deg); } 
	}
	
	@keyframes orbit { 
		0%		{ transform:rotate(45deg); } 
		
		5%		{ transform:rotate(45deg);
				  animation-timing-function: ease-out; } 
	
		70% 	{ transform:rotate(405deg); 
				  animation-timing-function: ease-in; }
	
		100%	{ transform:rotate(405deg); } 
	}
	
	
	@-webkit-keyframes text {
		0%		{-webkit-transform:scale(0.7,0.7);
				 -webkit-animation-timing-function: ease-out; } 
	
		40%,60%{ -webkit-transform:scale(1,1); 
				  -webkit-animation-timing-function: ease-out;  }
	
		70%,100%{ -webkit-transform:scale(0.7,0.7);  } 
	}
	
	@-moz-keyframes text {
		0%		{-moz-transform:scale(0.7,0.7);
				 -moz-animation-timing-function: ease-out; } 
	
		50%		{ -moz-transform:scale(1,1); 
				  -moz-animation-timing-function: ease-out;  }
	
		60%		{ -moz-transform:scale(1,1); 
				-moz-animation-timing-function: ease-out;  }
	
		100%	{ -moz-transform:scale(0.7,0.7);  } 	
	}
	
	@-mos-keyframes text {
		0%		{-mos-transform:scale(0.7,0.7);
				 -mos-animation-timing-function: ease-out; } 
	
		50%		{ -mos-transform:scale(1,1); 
				  -mos-animation-timing-function: ease-out;  }
	
		60%		{ -mos-transform:scale(1,1); 
				  -mos-animation-timing-function: ease-out;  }
	
		100%	{ -mos-transform:scale(0.7,0.7);} 
	}
	
	@-o-keyframes text {
		0%		{ -o-transform:scale(0.7,0.7);
				  -o-animation-timing-function: ease-out; } 
	
		50%		{ -o-transform:scale(1,1); 
				  -o-animation-timing-function: ease-out;  }
	
		60%		{ -o-transform:scale(1,1); 
				  -o-animation-timing-function: ease-out;  }
	
		100%	{ -o-transform:scale(0.7,0.7);} 
	}
	
	@keyframes text {
		0%		{ transform:scale(0.7,0.7);
				  animation-timing-function: ease-out; } 
	
		50%		{ transform:scale(1,1); 
				  animation-timing-function: ease-out;  }
	
		60%		{ transform:scale(1,1); 
				  animation-timing-function: ease-out;  }
	
		100%	{ transform:scale(0.7,0.7);} 
	}

</style>
