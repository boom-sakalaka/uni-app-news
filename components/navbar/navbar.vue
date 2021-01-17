<template>
	<view class="navbar">
		<view class="navbar-fixed">
			<view :style="{height: statusBarHeight + 'px'}"></view>
			<view class="navbar-content" :class="{search:isSearch}" :style="{height: navBarHeight + 'px',width: windowWidth + 'px'}"
			 @click.stop="open">
				<view class="navbar-content_search-icons">
					<uni-icons type="back" size="22" color="#fff"></uni-icons>
				</view>
				<!-- 非搜索页显示 -->
				<view class="navbar-search" v-if="!isSearch">
					<view class="navbar-search_icon">
						<text class="iconfont icon-search"></text>
					</view>
					<view class="navbar-search_text">uni-app vue</view>
				</view>
				<!-- 搜索页显示 -->
				<view class="navbar-search" v-else>
					<input class="navbar-search_text" type="text" v-model="val" placeholder="请输入您要搜索的内容"  @input="inputChange"/>
				</view>
			</view>
		</view>
		<view :style="{height: statusBarHeight+navBarHeight+'px'}"></view>
	</view>
</template>

<script>
	export default {
		props: {
			isSearch: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				statusBarHeight: 20,
				navBarHeight: 45,
				windowWidth: 375,
				val: ''
			};
		},
		created() {
			const info = uni.getSystemInfoSync()
			this.statusBarHeight = info.statusBarHeight
			this.windowWidth = info.windowWidth
			// console.log(info)
			// #ifndef H5 || APP-NVUE || MP-ALIPAY
			//获取胶囊的位置
			const menuButtonInfo = uni.getMenuButtonBoundingClientRect()
			console.log(menuButtonInfo)

			// (胶囊底部高度 - 状态栏高度) + (胶囊顶部高度 - 状态栏内的高度) = 导航栏的高度
			this.navBarHeight = (menuButtonInfo.bottom - info.statusBarHeight) +
				(menuButtonInfo.top - info.statusBarHeight)
			this.windowWidth = menuButtonInfo.left
			// #endif
		},
		methods: {
			open() {
				if (this.isSearch) return
				uni.navigateTo({
					url: "/pages/home-search/home-search"
				})
			},
			inputChange(e) {
				const { value } = e.detail
				this.$emit('input',value)
			}
		}
	}
</script>

<style lang="scss">
	@import '../../common/css/icons.css';

	.navbar {
		.navbar-fixed {
			position: fixed;
			top: 0;
			left: 0;
			z-index: 99;
			width: 100%;
			background-color: $mk-base-color;

			.navbar-content {
				display: flex;
				justify-content: center;
				align-items: center;
				padding: 0 15px;
				box-sizing: border-box;

				.navbar-search {
					display: flex;
					align-items: center;
					width: 100%;
					height: 30px;
					padding: 0 10px;
					border-radius: 30px;
					background-color: #fff;

					.navbar-search_icon {
						margin-right: 10px;
					}

					.navbar-search_text {
						font-size: 14px;
						color: #999;
					}
				}

				&.search {
					padding-left: 0;

					.navbar-content_search-icons {
						margin-left: 10px;
						margin: 10px;
					}

					.navbar-search {
						border-radius: 5px
					}
				}
			}
		}
	}
</style>
