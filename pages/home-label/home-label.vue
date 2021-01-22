<template>
	<view class="label">
		<view class="label-box">
			<view class="label-header">
				<view class="label-title">我的标签</view>
				<view class="label-edit">编辑</view>
			</view>
			<view class="label-content">
				<view class="label-content__item" v-for="(item,index) in 10">
					{{item}} 标签
					<uni-icons type="clear" size="20" color="red" class="icons-close"></uni-icons>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #f5f5f5;
	}
	.label {
		background-color: #FFFFFF;
		margin-bottom: 10px;
		.label-header {
			display: flex;
			justify-content: space-between;
			padding: 10px 15px;
			font-size: 14px;
			border-bottom: 1px #f5f5f5 solid;
			.label-edit {
				color: #30b33a;
				font-weight: bold;
			}
		}
		.label-content {
			display: flex;
			flex-wrap: wrap;
			padding: 15px;
			padding-top: 0;
			.label-content__item {
				position: relative;
				padding: 2px 5px;
				margin-top: 12px;
				margin-right: 10px;
				border-radius: 5px;
				border: 1px #666 solid;
				font-size: 14px;
				color: #666;
				.icons-close {
					position: absolute;
					right: -8px;
					top: -8px;
					background-color: #fff;
					border-radius: 50%;
				}
			}
		}
	}
</style>
