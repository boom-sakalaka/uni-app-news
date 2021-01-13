<template>
	<swiper class="home-swiper" :current="activeIndex" @change="change">
		<swiper-item class="swiper-item" v-for="(item,index) in tab" :key="index">
			<list-item :list="listCatchData[index]"></list-item>
		</swiper-item>
	</swiper>
</template>

<script>
	import listItem from './list-item.vue'
	export default {
		props:{
			tab: {
				type: Array,
				default() {
					return []
				}
			},
			activeIndex: {
				type: Number,
				default: 0
			}
		},
		components:{
			listItem
		},
		data() {
			return {
				list: [],
				// js限制  这种赋值方式listCatchData[index] js认为没有更新
				listCatchData : {}
			};
		},
		watch:{
				tab(newVal){
					if(newVal.length === 0) return
					this.getList(this.activeIndex)
				}
		},
		created() {
			// tab 还没有赋值
			// this.getList(0)
		},
		methods:{
			change(e){
				const { current } = e.detail
				// console.log(this.tab[current])
				this.getList(current)
				this.$emit('change', current)
				
			},
			getList(current) {
				this.$api.get_list({
					name: this.tab[current].name
					}).then(res => {
					const { data } = res
					// this.list = data
					// this.listCatchData[current] = data
					this.$set(this.listCatchData,current,data)
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
