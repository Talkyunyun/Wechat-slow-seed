/**
 *    登录工具 类
 *    @author: Gene
 */

import utils from './utils.js';
import config from '../config/config.js';

class LoginUtils {

      constructor() {
            this.key = 'token';
      }


      /**
       *    检查登录是否过期、公有方法
       *    @param function callback 回调函数
       *    @return 登录返回true  登录失效返回false
       */
      checkLogin(callback) {
            let self = this;

            // 检查用户微信登录态是否过期
            wx.checkSession({
                  success: function () {// 登录有效
                        self.getUser(function (res) {
                              if (res == false) {// 没有登录信息
                                    callback(false);
                              }

                              let nowTime = utils.getNowTime();
                              let expire = utils.dateStrToTime(res.expire);
                              if (expire <= nowTime) {// 过期，移除会话
                                    wx.removeStorage({ key: self.key });
                                    callback(false);
                                    return false;
                              }

                              callback(true);
                        });
                  },
                  fail: function () {// 登录失效
                        callback(false);
                  }
            });
      }

      // 登录操作、公有方法
      login(callback) {
            let self = this;

            // 检查登录是否过期
            self.checkLogin(function (res) {
                  if (res == true) {
                        callback(true);
                  } else {
                        wx.login({
                              success: function (res) {
                                    if (res.code) {
                                          self.getUserInfo(res.code, callback);
                                    } else {
                                          console.log('获取用户登录态失败', res.errMsg);
                                          callback(false);
                                    }
                              },
                              fail: function (err) {
                                    console.log('您取消了授权', err);
                                    callback(false);
                              }
                        });
                  }
            });
      }


      // 同步获取token值，公有方法
      getToken() {
            let self = this;

            let user = wx.getStorageSync(self.key);
            if (user == false || user == null) {
                  return false;
            }

            return user.token;
      }

      /**
       *    获取用户信息、公有方法
       *    @param function callback 回调函数
       *    @return 成功返回用户信息，失败返回false
       */
      getUser(callback) {
            let self = this;
            wx.getStorage({
                  key: self.key,
                  success: function (res) {
                        callback(res.data);
                  },
                  fail: function () {
                        callback(false);
                  }
            });
      }

      /**
       *    获取微信用户信息、私有方法
       *    @param string code 微信login返回的code
       *    @param function callback 回调函数
       *    @return 失败返回false,成功不进行返回，该方法是私有方法
       */
      getUserInfo(code, callback) {
            let self = this;
            wx.getUserInfo({
                  lang: 'zh_CN',
                  success: function (res) {
                        self.loginRequest(code, res, callback);
                  },
                  fail: function (err) {
                        callback(false);
                  }
            });
      }


      /**
       *    登录请求接口、私有方法
       *    @param string code 调用微信login返回的code
       *    @param user 获取的微信用户信息
       *    @param function callback 回调函数
       *    @return 成功返回true，失败返回false
       */
      loginRequest(code, user, callback) {
            let self = this;
            utils.request(config.api.login, {
                  code: code,
                  rawData: user.rawData,
                  signature: user.signature,
                  encryptedData: user.encryptedData,
                  iv: user.iv
            }, function (res) {
                  if (res.code == 0) {
                        wx.setStorage({
                              key: self.key,
                              data: res.data,
                              success: function (res) {
                                    callback(true);
                              },
                              fail: function () {
                                    callback(false);
                              }
                        });
                  } else {
                        callback(false);
                  }
            });
      }
}


module.exports = new LoginUtils();