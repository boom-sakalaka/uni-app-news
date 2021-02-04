<template>
	<swiper class="home-swiper" :current="activeIndex" @change="change">
		<swiper-item class="swiper-item" v-for="(item,index) in tab" :key="item._id">
			<list-item :list="listCatchData[index]" @loadmore="loadmore" :load="load[index]"></list-item>
		</swiper-item>
	</swiper>
</template>

<script>
	import listItem from './list-item.vue'
	export default {
		props: {
			tab: {
				type: Array,
				default () {
					return []
				}
			},
			activeIndex: {
				type: Number,
				default: 0
			}
		},
		components: {
			listItem
		},
		data() {
			return {
				list: [],
				// js限制  这种赋值方式listCatchData[index] js认为没有更新
				listCatchData: {},
				load: {},
				pageSize: 10,
			};
		},
		watch: {
			tab(newVal) {
				if (newVal.length === 0) return
				this.listCatchData = {}
				this.load = {}
				this.getList(this.activeIndex)
			}
		},
		created() {
			// tab 还没有赋值
			// this.getList(0)
			uni.$on('update_article', (e) => {
				if(e === 'follow'){
					this.listCatchData = {}
					this.load = {}
					this.getList(this.activeIndex)
				}
			})
		},
		methods: {
			loadmore() {
				this.load[this.activeIndex].page++
				if(this.load[this.activeIndex].loading === 'noMore') return
				this.getList(this.activeIndex)
			},
			change(e) {
				const {
					current
				} = e.detail
				// console.log(this.tab[current])
				this.$emit('change', current)
				if (!this.listCatchData[current] || this.listCatchData[current].length === 0) {
					this.getList(current)
				}
			},
			getList(current) {
				if(!this.load[current]){
					this.load[current] = {
						page : 1,
						loading: 'loading'
					}
				}
				console.log(this.load[current].page)
				this.$api.get_list({
					name: this.tab[current].name,
					page: this.load[current].page,
					pageSize: this.pageSize,
				}).then(res => {
					const {
						data
					} = res
					console.log(data)
					if(data.length === 0){
						let oldLoad = {}
						oldLoad.loading = 'noMore'
						oldLoad.page = this.load[current].page
						this.$set(this.load, current ,oldLoad)
						//强制渲染页面
						this.$forceUpdate()
						return 
					}
					// this.list = data
					// this.listCatchData[current] = data
					let oldList = this.listCatchData[current] || []
					oldList.push(...data)
					this.$set(this.listCatchData, current, oldList)
				})
			}
		}
	}
</script>

<style lang="scss">
	.home-swiper {
		height: 100%;

		.swiper-item {
			height: 100%;
			overflow: hidden;
		}

		.list-scroll {
			height: 100%;
		}
	}
</style>
