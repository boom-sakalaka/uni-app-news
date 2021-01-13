<template>
	<view class="home">
		<!-- 自定义导航栏 -->
		<navbar></navbar>
		<tab :list="tabList" :tabIndex="tabIndex" @tabClick="tabClick"></tab>
		<view class="home-list">
			<list :tab="tabList" :activeIndex="activeIndex" @change="change"></list>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				tabList: [],
				tabIndex: 0,
				activeIndex: 0,
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
				this.activeIndex = index
			},
			change(current) {
				this.tabIndex = current
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

		.home-list {
			flex: 1;
			box-sizing: border-box;
		}
	}
</style>
