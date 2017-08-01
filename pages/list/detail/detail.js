var postsData = require('../../../data/posts-data.js');
Page({
	data: {
		isPlay: false
	},
	onLoad: function(data) {
		var id = data.id;
		this.data.currentId = id;
		var postData = postsData.postList[id];
		this.setData({
			postData: postData
		});
		var postsCollected = wx.getStorageSync('posts_collected');
		if(postsCollected) {
			var postCollected = postsCollected[id];
			this.setData({
				collected: postCollected
			});
		}else{
			var postsCollected = {};
			postsCollected[id] = false;
			wx.setStorageSync('posts_collected',postsCollected);
		}
	},
	onCollectTap: function(event) {
		// var postsCollected = wx.getStorageSync('posts_collected');
  //       var curCollected = postsCollected[this.data.currentId];
  //       postsCollected[this.data.currentId] = !curCollected;
  //       this.showModal(postsCollected,curCollected);
		   this.getPostsCollectionAsync();
	},
	showModal: function(postsCollected,curCollected) {
		var that = this;
		wx.showModal({
        	title:"收藏",
        	content: !curCollected?"是否收藏喜欢的文章":"取消收藏这篇文章",
        	cancelText: "取消",
        	confirmText: "确认",
        	success:function(res) {
        		if(res.confirm){
        			wx.setStorageSync('posts_collected',postsCollected);
			        that.setData({
			        	collected: !curCollected
			        });
        		}
        	}
        });
	},
	showToast: function(postsCollected,curCollected) {
		wx.setStorageSync('posts_collected',postsCollected);
        this.setData({
        	collected: !curCollected
        });
		wx.showToast({
        	title: !curCollected?"收藏成功":"取消成功"
        });
	},
	onShareTap: function() {
		var itemList = [
			"分享给微信好友",
			"分享到朋友圈",
			"分享到QQ",
			"分享到微博"
			];
		wx.showActionSheet({
			itemList: itemList,
			itemColor:"#405f80",
			success:function(res) {
				wx.showModal({
					title: itemList[res.tapIndex],
					content: 'xx'
				});
			}
		});
	},
	getPostsCollectionSync: function() {
		var postsCollected = wx.getStorageSync('posts_collected');
        var curCollected = postsCollected[this.data.currentId];
        postsCollected[this.data.currentId] = !curCollected;
        this.showModal(postsCollected,curCollected);
	},
	getPostsCollectionAsync: function() {
		var that = this;
		wx.getStorage({
			key: 'posts_collected',
			success: function(res) {
				var postsCollected = res.data;
		        var curCollected = postsCollected[that.data.currentId];
		        postsCollected[that.data.currentId] = !curCollected;
		        that.showModal(postsCollected,curCollected);
			}
		})
	},
	onMusicPlay: function() {
		var isPlay = this.data.isPlay;
		if(isPlay) {
			wx.pauseBackgroundAudio();
			this.setData({
				isPlay: false
			});
		}else{
			wx.playBackgroundAudio({
			    dataUrl: this.data.postData.music.url,
			    title: this.data.postData.music.title
			});
			this.setData({
				isPlay: true
			});
		}
	}
})