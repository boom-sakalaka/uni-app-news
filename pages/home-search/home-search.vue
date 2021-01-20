<template>
	<view class="home">
		<navbar :isSearch="true" v-model="value" @input="change"></navbar>
		<view class="home-list">
			<view v-if="is_histroy" class="label-box">
				<view class="label-header">
					<text class="label-title">搜索历史</text>
					<text class="label-clear" @click="clear">清空</text>
				</view>
				<view class="label-content" v-if="historyLists.length > 0">
					<view v-for="(item,index) in historyLists" class="label-content_item" key="index" @click="openHistroy(item)">
						{{item.name}}
					</view>
				</view>
				<view class="no-data" v-else>
					没有搜索历史
				</view>
			</view>
			<list-scroll v-else class="list-scroll">
				<uni-load-more status="loading" iconType="snow" v-if="loading"></uni-load-more>
				<view v-if="searchList.length">
					<list-card mode="base" :item="item" v-for="item in searchList" :key="item._id" @click="setHistory"></list-card>
				</view>
				<view v-if="searchList.len === 0 && !loading"  class="no-data">没有搜索到相关数据</view>
			</list-scroll>
		</view>
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex'
	export default {
		data() {
			return {
				value: '',
				is_histroy: true,
				searchList: [],
				loading:false
			}
		},
		computed: {
			...mapState(['historyLists'])
		},
		methods: {
			change(value) {	
				if (!value) {
					clearTimeout(this.timer)
					this.mark = false
					this.getSearch()
					return
				}
				if (!this.mark) {
					this.mark = true
					this.timer = setTimeout(() => {
						this.mark = false
						this.getSearch(value)
					}, 1000)
				}
			},
			getSearch(value) {
				this.loading = true
				if (!value) {
					this.searchList = []
					this.is_histroy = true
					return
				}
				this.is_histroy = false
				this.$api.get_search({
					value
				}).then(res => {
					const {
						data
					} = res
					console.log(data)
					this.loading = false
					this.searchList = data
				}).catch(e => {
					this.loading = false
				})
			},
			setHistory() {
				this.$store.dispatch('set_history', {
					name: this.value
				})
			},
			openHistroy(item){
				this.value = item.name
				this.getSearch(this.value)
			},
			clear () {
				this.$store.dispatch('clear_history')
				uni.showToast({
					title: '清除成功'
				})
			}
		}
	}
</script>

<style lang="scss">
	page {
		height: 100%;
		display: flex;
		background-color: #f5f5f5;
	}

	.home {
		display: flex;
		flex-direction: column;
		flex: 1;

		.label-box {
			background-color: #fff;
			margin-bottm: 10px;

			.label-header {
				display: flex;
				justify-content: space-between;
				font-size: 14px;
				color: #666;
				padding: 10px 15px;
				border-bottom: 1px #f5f5f5 solid;

				.label-title {
					color: $mk-base-color;
				}

				.label-clear {
					color: #30b33a;
					font-weight: bold;
				}
			}

			.label-content {
				display: flex;
				flex-wrap: wrap;
				padding: 15px;
				padding-top: 0;

				.label-content_item {
					padding: 2px 10px;
					margin-top: 12px;
					margin-right: 10px;
					border-radius: 5px;
					border: 1px #666 solid;
					font-size: 14px;
					color: #666;
				}
			}

			.no-data {
				height: 200px;
				line-height: 200px;
				width: 100%;
				font-size: 14px;
				color: #666;
				text-align: center;
			}
		}
	}
</style>
