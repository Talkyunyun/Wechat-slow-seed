/**
  * 请求工具
  * Created by gene on 2017/11/20.
  * @author Gene
  */




/**
  * 同时指出post和get请求方式
  * @param API
  * @param params
  * @param callback
  */
export function send(API, params, callback) {
	try {
		wx.showNavigationBarLoading();
		wx.request({
			url   : API.url,
			data: params,
			method: API.method,
			header: {
				'content-type': 'application/x-www-form-urlencoded'
			},
			success: function (res) {
				if (res.statusCode != 200) {
					callback(false);
					return false;
				}
				callback(res.data);
			},
			fail: function (res) {
				callback(false);
			},
			complete: function (res) {
				wx.hideNavigationBarLoading();
			}
		});
	} catch (e) {
		callback(false);
	}
}

/**
  * POST请求方式
  * @param url
  * @param params
  * @param callback
  */
export function post(url, params, callback) {
	try {
		wx.showNavigationBarLoading();
		wx.request({
			url: url,
			data: params,
			method: 'POST',
			header: {
				'content-type': 'application/x-www-form-urlencoded'
			},
			success: function (res) {
				if (res.statusCode != 200) {
					callback(false);
					return false;
				}
				callback(res.data);
			},
			fail: function (res) {
				callback(false);
			},
			complete: function (res) {
				wx.hideNavigationBarLoading();
			}
		});
	} catch (e) {
		callback(false);
	}
}


/**
  * GET请求方式
  * @param url
  * @param params
  * @param callback
  */
export function get(url, params, callback) {
	try {
		wx.showNavigationBarLoading();
		wx.request({
			url: url,
			data: params,
			method: 'GET',
			header: {
				'content-type': 'application/x-www-form-urlencoded'
			},
			success: function (res) {
				if (res.statusCode != 200) {
					callback(false);
					return false;
				}
				callback(res.data);
			},
			fail: function (res) {
				callback(false);
			},
			complete: function (res) {
				wx.hideNavigationBarLoading();
			}
		});
	} catch (e) {
		callback(false);
	}
}