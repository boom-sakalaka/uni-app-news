<template>
	<view class="navbar">
		<view class="navbar-fixed">
			<view class="navbar-search">
				<view class="navbar-search_icon"></view>
				<view class="navbar-search_text">uni-app vue</view>
			</view>
		</view>
		<view style="height: 45px;"></view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss">
	.navbar{
		.navbar-fixed{
			position: fixed;
			top: 0;
			left: 0;
			z-index: 99;
			display: flex;
			justify-content: center;
			align-items: center;
			padding: 0 15px;
			width: 100%;
			height: 45px;
			box-sizing: border-box;
			background-color: $mk-base-color;
			.navbar-search{
				display: flex;
				align-items: center;
				width: 100%;
				height: 30px;
				padding: 0 10px;
				border-radius: 30px;
				background-color: #fff;
				.navbar-search_icon {
					width: 10px;
					height: 10px;
					border: 1px red solid;
					margin-right: 10px;
				}
				.navbar-search_text {
					font-size: 12px;
					color: #999;
				}
			}
		}
	}
</style>
