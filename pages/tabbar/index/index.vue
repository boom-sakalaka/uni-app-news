<template>
	<view class="content">
		<!-- 自定义导航栏 -->
		<navbar></navbar>
		<tab :list="tabList"></tab>
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
				uniCloud.callFunction({
					name: 'get_label',
				}).then(res => {
					const { result } = res
					this.tabList = result.data
					console.log(this.tabList)
				})
			}
		}
	}
</script>

<style lang="scss">
	.content {
		width: 100%;
	}
</style>
