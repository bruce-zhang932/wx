var postsData = require('../../data/posts-data.js')

Page({
	data: {
		imgUrls: [
			"/images/post/bl.png",
			"/images/post/cat.png",
			"/images/post/vr.png"
		]
	},
	onLoad:function() {
		this.setData({
			posts_key: postsData.postList
		});
	},
	listTap:function(event) {
		var listId = event.currentTarget.dataset.listid;
		wx.navigateTo({
			url: "detail/detail?id="+listId
		});

	}
});