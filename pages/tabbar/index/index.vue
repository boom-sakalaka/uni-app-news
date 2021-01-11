<template>
	<view class="home">
		<!-- 自定义导航栏 -->
		<navbar></navbar>
		<tab :list="tabList" @tabClick="tabClick"></tab>
		<view class="scroll">
			<scroll-view class="list-scroll" scroll-y @scrolltolower="loadmore">
				<list-card mode="base"></list-card>
				<list-card mode="image"></list-card>
				<list-card mode="column"></list-card>
				<list-card mode="base"></list-card>
				<list-card mode="image"></list-card>
				<list-card mode="column"></list-card>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				tabList: []
			}
		},
		onLoad() {
			this.getLabel()
		},
		methods: {
			getLabel() {
				this.$api.get_label({
					name: 'get_label'
				}).then(res => {
					const {
						data
					} = res
					this.tabList = data
				})
			},
			tabClick({
				data,
				index
			}) {

			}
		}
	}
</script>

<style lang="scss">
	page {
		height: 100%;
		display: flex;
	}

	.home {
		display: flex;
		flex-direction: column;
		flex: 1;
		overflow: hidden;
		.scroll {
			flex: 1;
			height: 100%;
			overflow: hidden;
			box-sizing: border-box;
			.list-scroll {
				height: 100%;
				display: flex;
				flex-direction: column;
			}
		}
	}
</style>
