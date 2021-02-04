<template>
	<view class="follow">
		<!-- 导航切换 -->
		<view class="follow-tab">
			<view class="follow-tab__box">
				<view class="follow-tab__item" @click="changeActive(0)" :class="{active: activeIndex === 0}">文章</view>
				<view class="follow-tab__item" @click="changeActive(1)" :class="{active: activeIndex === 1}">作者</view>
			</view>
		</view>
		<view class="follow-list">
			<swiper class="follow-list__swiper">
				<swiper-item>
					<list-scroll>
						<uni-load-more status="loading" v-if="list.length === 0 && !articleShow "></uni-load-more>
						<list-card v-for="item in list" :key="item._id" types="follow" :item="item"></list-card>
						<view v-if="articleShow" class="no-data">没有数据</view>
					</list-scroll>
				</swiper-item>
				<swiper-item>
					<list-scroll></list-scroll>
				</swiper-item>
			</swiper>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				activeIndex: 0,
				list: [],
				articleShow: false
			}
		},
		onLoad() {
			this.getFollowData()
			uni.$on('update_article', () => {
				this.getFollowData()
			})
		},
		methods: {
			changeActive(index) {
				this.activeIndex = index
			},
			getFollowData() {
				this.$api.get_follow().then(res => {
					console.log(res)
					const {
						data
					} = res
					this.list = data
					this.articleShow = this.list.length === 0
				})
			}
		}
	}
</script>

<style lang="scss">
	page {
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

		.follow-list {
			flex: 1;

			.follow-list__swiper {
				height: 100%;

				.swiper-item {
					height: 100%;
				}
			}
		}
	}
	.no-data {
		padding: 50px;
		font-size: 14px;
		color: #999;
		text-align: center;
	}
</style>
