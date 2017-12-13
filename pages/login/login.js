/**
 * 登录案例操作
 * @author: Gene
 */

import LoginUtils from '../../utils/loginUtils.js';

Page({
      // 数据存储
      data: {},

      // 生命周期函数--监听页面加载
      onLoad: function (options) {

      },

      // 生命周期函数--监听页面初次渲染完成
      onReady: function () {
            // 登录处理
            LoginUtils.login(function (res) {
                  if (res == false) {// 登录失败
                        console.log('登录失败');
                        return false;
                  }

                  // 获取用户信息
                  LoginUtils.getUser(function (res) {
                        console.log(res)
                  });

                  // 获取token值
                  var token = LoginUtils.getToken();
                  console.log('token:', token);
            });
      },




      // 生命周期函数--监听页面显示
      onShow: function () {

      },

      // 生命周期函数--监听页面隐藏
      onHide: function () {

      },

      // 生命周期函数--监听页面卸载
      onUnload: function () {

      },

      // 页面相关事件处理函数--监听用户下拉动作
      onPullDownRefresh: function () {

      },

      // 页面上拉触底事件的处理函数
      onReachBottom: function () {

      },

      // 用户点击右上角分享
      onShareAppMessage: function () {

      }
})