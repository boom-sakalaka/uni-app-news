<template>
	<view class="detail">
		<view class="detail-title">
			{{formData.title}}
		</view>
		<view class="detail-header">
			<view class="detail-header__logo">
				<image :src="formData.author.avatar" mode="aspectFill"></image>
			</view>
			<view class="detail-header__content">
				<view class="detail-header__content-title">
					{{formData.author.author_name}}
				</view>
				<view class="detail-header__content-info">
					<text>{{formData.create_time}}</text>
					<text>{{formData.browse_count}} 浏览</text>
					<text>{{formData.thumbs_up_count}} 赞</text>
				</view>
			</view>
			<button class="detail-header__button" type="default" @click="follow(formData.author.id)">
				{{formData.is_author_like? '取消关注': '关注'}}
			</button>
		</view>
		<view class="detail-content">
			<view class="detail-html">
				<u-parse :content="formData.content" :noData="noData"></u-parse>
				<!-- 内容 -->
			</view>
			<view class="detail-comment">
				<view class="comment-title">最新评论</view>
				<view class="comment-content" v-for="item in commentsList" :key="item.comment_id">
					<comments-box :comments="item" @reply="reply"></comments-box>
				</view>
			</view>
		</view>
		<view class="detail-bottom">
			<view class="detail-bottom__input" @click="openComment">
				<text>谈谈你的看法</text>
				<uni-icons type="compose" size="16" color="#F07373"></uni-icons>
			</view>
			<view class="detail-bottom__icons">
				<view class="detail-bottom__icons-box">
					<uni-icons type="chat" size="22" color="#F07373" @click="openDetailComments"></uni-icons>
				</view>
				<view class="detail-bottom__icons-box">
					<uni-icons :type="formData.is_like ? 'heart-filled': 'heart'" size="22" color="#F07373" @click="likeTap(formData._id)"></uni-icons>
				</view>
				<view class="detail-bottom__icons-box">
					<uni-icons :type="formData.is_thumbs_up?'hand-thumbsup-filled':'hand-thumbsup'" size="22" color="#F07373" @click="thumbsup(formData._id)"></uni-icons>
				</view>
			</view>
		</view>
		<uni-popup ref="popup" type="bottom" :maskClick="false">
			<view class="popup-wrap">
				<view class="popup-header">
					<text class="popup-header__item" @click="closeComment">取消</text>
					<text class="popup-header__item" @click="submit">发布</text>
				</view>
				<view class="popup-content">
					<textarea v-model="commnetValue" placeholder="请输入评论内容" maxlength="200" fixed class="popup-textarea" />
					<view class="popup-count">{{commnetValue.length}}/200</view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import uParse from '@/components/gaoyia-parse/parse.vue'
	export default {
		components:{
			uParse
		},
		data() {
			return {
				formData : {},
				noData: '<p style="text-align:center;color:#666;">详情加载中......</p>',
				commnetValue: '',
				commentsList : [],
				replyFormData: {},
				page: 1,
				pageSize: 10,
			}
		},
		onLoad(query) {
			this.formData = JSON.parse(query.params)
			this.getDetial()
			this.getComments()
		},
		onReady() {
			//this.$refs.popup.open()
		},
		methods: {
			// 打开详情评论
			openDetailComments () {
				// console.log('打开详情评论')
				uni.navigateTo({
					url: '../detail-comments/detail-comments?id='+ this.formData._id
				})
			},
			// 点赞
			thumbsup(article_id) {
				this.setUpdateThumbs(article_id)
			},
			// 收藏
			likeTap (article_id) {
				// console.log('收藏')
				this.setUpdateLike(article_id)
			},
			// 关注
			follow (author_id) {
				this.setUpdateAuthor(author_id)
			},
			// 获取详情信息
			getDetial() {
				this.$api.get_detail({
					article_id : this.formData._id,
				}).then(res => {
					// console.log(res)
					const {data} = res
					this.formData = data
				})
			},
			// 请求评论信息
			getComments() {
				this.$api.get_comments({
					article_id: this.formData._id,
					page: this.page,
					pageSize: this.pageSize
				}).then(res => {
					//console.log(res)
					const {data} = res
					this.commentsList = data
				})
			},
			setUpdateComment(content) {
				const formData = {
					article_id: this.formData._id,
					...content
				}
				uni.showLoading()
				this.$api.update_comment(formData).then(res => {
					uni.hideLoading()
					uni.showToast({
						title: "评论成功"
					})
					this.getComments()
					this.$refs.popup.close()
					this.replyFormData = {}
					this.commnetValue = ''
					// console.log(res)
				})
			},
			setUpdateAuthor (author_id) {
				uni.showLoading()
				this.$api.update_author({author_id}).then(res => {
					uni.hideLoading()
					this.formData.is_author_like = !this.formData.is_author_like
					uni.$emit('update_author')
					uni.showToast({
						title: this.formData.is_author_like ? '关注成功' : '取消关注成功',
						icon: 'none'
					})
				}).catch(e => {
					uni.hideLoading()
				})
			},
			setUpdateLike (article_id) {
				uni.showLoading()
				this.$api.update_likes({article_id}).then(res => {
					uni.hideLoading()
					this.formData.is_like = !this.formData.is_like
					uni.$emit('update_article', 'follow')
					uni.showToast({
						title: this.formData.is_like ? '收藏成功' : '取消收藏成功',
						icon: 'none'
					})
				}).catch(e => {
					uni.hideLoading()
				})
			},
			setUpdateThumbs(article_id) {
				uni.showLoading()
				this.$api.update_thumbsup({
					article_id
				}).then(res => {
					uni.hideLoading()
					this.formData.is_thumbs_up = true
					this.formData.thumbs_up_count++
					uni.showToast({
						title: res.msg,
						icon: 'none'
					})
					console.log(res)
				}).catch(e => {
					uni.hideLoading()
				})
			},
			reply(e){
				this.replyFormData = {
					"comment_id" : e.comments.comment_id,
					"is_reply": e.is_reply
				}
				if(e.comments.reply_id){
					this.replyFormData.reply_id = e.comments.reply_id
				}
				//console.log(this.replyFormData)
				this.openComment()
			},
			openComment() {
				this.$refs.popup.open()
			},
			closeComment() {
				this.$refs.popup.close()
			},
			submit() {
				// 发布
				if(!this.commnetValue){
					uni.showToast({
						title: '请输入评论内容',
						icon: 'none'
						
					})
					return 
				}
				this.setUpdateComment({content: this.commnetValue,...this.replyFormData})
			}
		}
	}
</script>

<style lang="scss">
	.detail {
		padding: 15px 0;
		padding-bottom: 54px;
	}

	.detail-title {
		padding: 0 15px;
		font-size: 18px;
		font-weight: bold;
		color: #333;
	}

	.detail-header {
		display: flex;
		align-items: center;
		margin-top: 10px;
		padding: 0 15px;

		.detail-header__logo {
			flex-shrink: 0;
			width: 40px;
			height: 40px;
			border-radius: 50%;
			overflow: hidden;

			image {
				width: 100%;
				height: 100%;
			}
		}

		.detail-header__content {
			padding-left: 10px;
			width: 100%;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			font-size: 12px;

			.detail-header__content-title {
				font-size: 14px;
				color: #333;
			}

			.detail-header__content-info {
				color: #999;

				text {
					margin-right: 10px;
				}
			}
		}
		.detail-header__button {
			flex-shrink: 0;
			height: 30px;
			font-size: 12px;
			color: #fff;
			background-color: $mk-base-color;
		}
	}

	.detail-content {
		margin-top: 20px;
		.detail-html {
			padding: 0 15px;
		}
		.detail-comment {
			margin-top: 30px;
			.comment-title {
				padding: 0 15px;
				font-size: 14px;
				color: #666;
				border-bottom: 1px solid #f5f5f5;
			}
			.comment-content {
				padding: 0 15px;
				border-top: 1px solid #eee;
			}
		}
	}

	.detail-bottom {
		position: fixed;
		bottom: 0;
		left: 0;
		display: flex;
		align-items: center;
		width: 100%;
		height: 44px;
		border-top: 1px #f5f5f5 solid;
		background-color: #fff;
		box-sizing: border-box;

		.detail-bottom__input {
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-left: 10px;
			padding: 0 10px;
			width: 100%;
			height: 30px;
			border: 1px #ddd solid;
			border-radius: 5px;

			text {
				font-size: 14px;
				color: #999;
			}
		}

		.detail-bottom__icons {
			display: flex;
			flex-shrink: 0;
			padding: 0 10px;

			.detail-bottom__icons-box {
				justify-content: center;
				position: relative;
				display: flex;
				align-items: center;
				width: 44px;
			}
		}
	}
	.popup-wrap {
		background-color: #FFFFFF;
		.popup-header {
			display: flex;
			justify-content: space-between;
			font-size: 14px;
			color: #666;
			border-bottom: 1px solid #F5F5F5;
			.popup-header__item{
				height: 50px;
				line-height: 50px;
				padding: 0 15px;
			}
		}
		.popup-content{
			width: 100%;
			padding: 15px;
			box-sizing: border-box;
			.popup-textarea {
				width: 100%;
				height: 200px;
			}
			.popup-count {
				display: flex;
				justify-content: flex-end;
				font-size: 12px;
				color: #999;
			}
		}
	}
</style>
