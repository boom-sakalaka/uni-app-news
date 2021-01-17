<template>
	<view class="home">
		<navbar :isSearch="true" @input="change"></navbar>
		<view class="home-list">
			<view class="label-box">
				<view class="label-header">
					<text class="label-title">搜索历史</text>
					<text class="label-clear">清空</text>
				</view>
				<view class="label-content" v-if="historyLists.length > 0">
					<view v-for="item in historyLists" class="label-content_item">
						{{item.name}} 内容
					</view>

				</view>
				<view class="no-data" v-else>
					没有搜索历史
				</view>
			</view>
			<button type="default" @click="test">测试</button>
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

			}
		},
		computed: {
			...mapState(['historyLists'])
		},
		methods: {
			change(value) {
				console.log(value)
			},
			test() {
				this.$store.dispatch('set_history', {
					name: 'test'
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
