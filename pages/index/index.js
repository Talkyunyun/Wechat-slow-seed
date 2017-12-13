/**
 * 首页
 */

import config from '../../config';
import utils from '../../utils/utils';

var app = getApp();
Page({
      data: {
            data: [],
            isLoading: true // 是否正在加载
      },

      // 初始化
      onLoad: function () {
            var self = this;

            self.getRecommends();
      },

      // 获取推荐列表
      getRecommends: function () {
            var self = this;
            utils.request(config.api.getRecommend, {}, function (res) {
                  self.setData({
                        isLoading: false
                  });
                  if (!res) {
                        return false;
                  }

                  self.setData({
                        data: res
                  });
            });
      },

      // 下拉刷新
      onPullDownRefresh: function () {
            var i = 0;
            var t = setInterval(function () {
                  if (i >= 5) {
                        wx.stopPullDownRefresh();
                  }
                  i++;
            }, 1000);
      },

      // 打开图片
      openImg: function (e) {
            var url = e.currentTarget.dataset.url;
            wx.previewImage({
                  urls: [url]
            });
      }
})
