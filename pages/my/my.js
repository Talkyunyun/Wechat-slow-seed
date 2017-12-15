/**
 * 个人中心
 * @author: Gene
 */

import { User, Message } from '../../Utils.js';

const app = getApp();
Page({
      data: {
		// 是否登录
		isLogin: false,
		user: null
      },

      onLoad: function() {
           
      },

	onReady: function() {
		let self = this;

		User.login((res) => {
			if (res == true) {
				User.getUser((user) => {
					self.setData({
						isLogin: true,
						user: user
					});
				});
			}
		});
	},


	// 打开我的收藏
	openCollection: function() {
		Message.show('按钮测试');
	},

	// 打开意见反馈
	openFeedback: function() {
		// 未登录，无法进行该操作
		if (this.data.isLogin == false) {
			return Message.show('您未授权登录，无法进行该操作。');
		}

		wx.navigateTo({
			url: '../feedback/feedback'
		});
	},



	// 登录Demo
	testLoginDemo: function() {
		//let token = User.getToken();
		User.login((res) => {
			console.log('登录：', res);
		});

		// 检查是否登录
		User.checkLogin((res) => {
			console.log('是否登录：', res);
		});

		// 获取登录信息
		User.getUser((res) => {
			console.log('用户信息：', res);
		});

		// 获取token
		let token = User.getToken();
		console.log('token:', token);
	}
})
