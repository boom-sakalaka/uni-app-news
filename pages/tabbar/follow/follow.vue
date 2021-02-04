<template>
	<view class="follow">
		<!-- 导航切换 -->
		<view class="follow-tab">
			<view class="follow-tab__box">
				<view class="follow-tab__item" @click="changeActive(0)" :class="{active: activeIndex === 0}">文章</view>
				<view class="follow-tab__item" @click="changeActive(1)" :class="{active: activeIndex === 1}">作者</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				activeIndex : 0
			}
		},
		methods: {
			changeActive(index) {
				this.activeIndex = index
			}
		}
	}
</script>

<style lang="scss">
	page{
		height: 100%;
		display: flex;
	}
	.follow {
		height: 100%;
		display: flex;
		flex-direction: column;
		flex: 1;	
		box-sizing: border-box;
		.follow-tab {
			height: 30px;
			padding: 10px 20px;
			border: 1px #f5f5f5 solid;
			.follow-tab__box {
				display: flex;
				width: 100%;
				height: 100%;
				border-radius: 5px;
				border: 1px solid $mk-base-color;
				.follow-tab__item {
					width: 100%;
					display: flex;
					justify-content: center;
					align-items: center;
					color: #666;
					font-size: 14px;
					flex: 1;
					&:first-child {
						border-right: 1px solid $mk-base-color;
					}
					&.active {
						color: $mk-base-color
					}
				}
			}
		}
	}
</style>
