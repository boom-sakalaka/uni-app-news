<template>
	<view class="icons" @click.stop="likeTap">
		<uni-icons :type="like ? 'heart-filled' : 'heart'" size="20" color="#f07373"></uni-icons>
	</view>
</template>

<script>
	export default {
		props: {
			item: {
				type: Object,
				default () {
					return {}
				}
			}
		},
		data() {
			return {
				like: false
			};
		},
		watch:{
			item(newVal) {
				this.like = this.item.is_like
			}
		},
		created() {
			this.like = this.item.is_like
		},
		methods: {
			likeTap(e) {
				this.like = !this.like
				this.setUpdateLikes()
			},
			setUpdateLikes() {
				uni.showLoading()
				this.$api.update_likes({
					article_id: this.item._id
				}).then(res => {
					uni.hideLoading()
				}).catch(() => {
					uni.hideLoading()
				})
			}
		}
	}
</script>

<style>
	.icons {
		position: absolute;
		right: 0;
		top: 0;
		display: flex;
		justify-content: center;
		width: 20px;
		height: 20px;
	}
</style>
