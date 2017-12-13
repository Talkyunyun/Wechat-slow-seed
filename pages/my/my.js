/**
 * 个人中心
 */

const app = getApp();

Page({
      data: {
            arrow: {
                  right: '../../images/arrow_right.png'
            }
      },

      onLoad: function () {
            var self = this;

            wx.getUserInfo({
                  success: function (res) {
                        var userInfo = res.userInfo
                        var nickName = userInfo.nickName
                        var avatarUrl = userInfo.avatarUrl

                        self.setData({
                              'user': userInfo
                        });
                  }
            })
      },

      // 打开收藏页面
      openCollection: function () {
            wx.navigateTo({
                  url: '../collection/collection',
            });
      },

      // 打开意见反馈页面
      openFeedback: function () {
            wx.navigateTo({
                  url: '../feedback/feedback',
            });
      }
})
