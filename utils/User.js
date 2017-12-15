/**
  * 用户登录信息相关操作工具
  * Created by gene on 2017/12/7.
  * @author Gene
  */


import { Params, Api } from '../Config.js';
import { getNowTime, dateStrToTime } from './Date.js';
import { send } from './Request.js';



/**
  *    检查登录是否过期
  *    @param function callback 回调函数
  *    @return 登录返回true  登录失效返回false
  */
export function checkLogin(callback) {
	// 检查用户微信登录态是否过期
	wx.checkSession({
		success: function () {// 登录有效
			getUser(function (res) {
				if (res == false) {// 没有登录信息
					callback(false);return;
				}

				let expire = dateStrToTime(res.expire);
				if (expire <= getNowTime()) {// 过期，移除会话
					wx.removeStorage({ key: Params.tokenKey });
					callback(false);return;
				}

				callback(true);return;
			});
		},
		fail: function () {// 登录失效
			callback(false);return;
		}
	});
}



/** 获取用户信息 */
export function getUser(callback) {
	wx.getStorage({
		key: Params.tokenKey,
		success: function (res) {
			callback(res.data.user);return;
		},
		fail: function () {
			callback(false);return;
		}
	});
}

/** 获取token值  */
export function getToken() {
	let user = wx.getStorageSync(Params.tokenKey);
	if (user == false || user == null) {
		return false;
	}

	return user.token;
}

/** 登录操作  */
export function login(callback) {
	// 检查登录是否过期
	checkLogin((isLogin) => {
		if (isLogin == true) {
			return callback(true);
		}
		
		wx.login({
			success: (codeInfo) => {
				if (codeInfo.code) {
					return getWechatUserInfoAndSend(codeInfo.code, callback);
				} else {
					console.log('获取用户登录态失败', res.errMsg);
					return callback(false);
				}
			},
			fail: (err) => {
				console.log('您取消了授权', err);
				return callback(false);
			}
		});
	});
}


/**
  *    获取微信用户信息、私有方法
  *    @param string code 微信login返回的code
  *    @param function callback 回调函数
  *    @return 失败返回false,成功不进行返回，该方法是私有方法
  */
function getWechatUserInfoAndSend(code, callback) {
	wx.getUserInfo({
		lang  :  'zh_CN',
		withCredentials: true,
		success: (user) => {
			loginRequest(code, user, callback);
		},
		fail: (err) => {
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
function loginRequest(code, user, callback) {
	send(Api.login, {
		code        : code,
		iv             : user.iv,
		rawData : user.rawData,
		signature: user.signature,
		encryptedData: user.encryptedData
	},  (res) => {
		if (res.code == 0) {
			wx.setStorage({
				key: Params.tokenKey,
				data: res.data,
				success: () => {
					callback(true);return;
				},
				fail: (err) => {
					callback(false);return;
				}
			});
		} else {
			callback(false);return;
		}
	});
}