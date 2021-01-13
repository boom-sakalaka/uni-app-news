<template>
	<swiper class="home-swiper" :current="activeIndex" @change="change">
		<swiper-item class="swiper-item" v-for="(item,index) in tab" :key="index">
			<list-item :list="list"></list-item>
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
				list: []
			};
		},
		created() {
			this.getList()
		},
		methods:{
			change(e){
				const { current } = e.detail
				this.$emit('change', current)
			},
			getList() {
				this.$api.get_list().then(res => {
					const { data } = res
					console.log(res)
					this.list = data
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
