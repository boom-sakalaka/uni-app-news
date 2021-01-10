<template>
	<view class="content">
		<!-- 自定义导航栏 -->
		<navbar></navbar>
		<tab :list="tabList" @tabClick="tabClick"></tab>
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
				this.$api.get_label({name: 'get_label'}).then(res => {
					const { data } = res
					this.tabList = data
				})
			},
			tabClick({data,index}){
				
			}
		}
	}
</script>

<style lang="scss">
	.content {
		width: 100%;
	}
</style>
