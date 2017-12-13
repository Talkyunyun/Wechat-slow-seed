/**
 *    工具类
 *    @author: Gene
 */

class utils {

      /**
       *     网络请求工具
       *     @param obj 请求对象，必须包括url和method
       *     @param params 请求参数对象
       *     @callback 结果回调
       */
      request(obj, params, callback) {
            wx.showNavigationBarLoading();
            wx.request({
                  url: obj.url,
                  data: params,
                  method: obj.method,
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
      }


      /**
       * 删除数组指定下标
       * @param: arr 待删除的数组
       * @param: index 删除索引
       */
      removeArray(arr, index, callback) {
            this.isType(arr, 'object');


            if (typeof arr) { }
            if (index <= (arr.length - 1)) {
                  for (var i = index; i < arr.length; i++) {
                        arr[i] = arr[i + 1];
                  }
            } else {
                  callback(false);
            }
            arr.length = arr.length - 1;

            callback(arr);
      }




      /**
       * 全局消息提示
       * @param   msg 提示语
       * @param   title 提示标题，默认为温馨提示
       * @options 微信showModal接口参数
       */
      showMsg() {
            let msg = arguments[0] ? arguments[0] : '操作失败！！！';
            let title = arguments[2] ? arguments[2] : '温馨提示';
            let options = arguments[1] ? arguments[1] : {};

            // 检查参数
            if (typeof options.showCancel == 'undefined') options.showCancel = false;
            if (typeof options.confirmText == 'undefined') options.confirmText = '我知道了';
            if (typeof options.confirmColor == 'undefined') options.confirmColor = '#3CC51F';
            if (typeof options.cancelText == 'undefined') options.cancelText = '取消';
            if (typeof options.cancelColor == 'undefined') options.cancelColor = '#000000';
            if (typeof options.success == 'undefined') options.success = function (res) { };

            wx.showModal({
                  title: title,
                  content: msg,
                  showCancel: options.showCancel,
                  confirmText: options.confirmText,
                  cancelText: options.cancelText,
                  cancelColor: options.cancelColor,
                  confirmColor: options.confirmColor,
                  success: function (res) {
                        options.success(res);
                  }
            });
      }

      /**
       * 判断数组或者对象是否为空
       * 只支持数据和对象类型
       */
      isEmpty(data) {
            this.isType(data, 'object');// 类型检测

            var num = 0;
            for (var i in data) {
                  num++;
            }

            return num == 0 ? true : false;
      }

      /**
       * 日期时间格式化
       * @param timestamp 待格式化的时间戳
       * @param format 格式
       *  format: yyyy(4位年), MM(2位月), dd(日期), hh(小时), mm(分钟), ss(秒)
       *  yyyy-MM-dd hh:mm:ss => 2017-03-01 22:10:56
       */
      formatDate() {
            var d,
                  timestamp = arguments[0],
                  format = arguments[1] ? arguments[1] : 'yyyy-MM-dd hh:mm:ss';
            if (timestamp != undefined) {
                  // 判断是否秒数时间戳
                  if (timestamp.toString().length == 10) {
                        timestamp = parseInt(timestamp) * 1000;
                  }
                  d = new Date(timestamp);
            } else {
                  d = new Date();
            }

            var date = {
                  "M+": d.getMonth() + 1,
                  "d+": d.getDate(),
                  "h+": d.getHours(),
                  "m+": d.getMinutes(),
                  "s+": d.getSeconds(),
                  "q+": Math.floor((d.getMonth() + 3) / 3),
                  "S+": d.getMilliseconds()
            };

            if (/(y+)/i.test(format)) {
                  format = format.replace(RegExp.$1, (d.getFullYear() + '').substr(4 - RegExp.$1.length));
            }

            for (var k in date) {
                  if (new RegExp("(" + k + ")").test(format)) {
                        format = format.replace(RegExp.$1, RegExp.$1.length == 1
                              ? date[k] : ("00" + date[k]).substr(("" + date[k]).length));
                  }
            }

            return format;
      }


      /**
       * 判断类型，便于统一输出
       * @param variable 待检测的变量
       * @param string typeName 匹配类型，支持string  function  object  number
       */
      isType() {
            var variable = arguments[0] ? arguments[0] : false,
                  typeName = arguments[1] ? arguments[1] : 'string',
                  res = '';

            switch (typeName) {
                  case 'string':
                        res = 'Parameter is not a string';
                        break;
                  case 'function':
                        res = 'Parameter is not a function';
                        break;
                  case 'object':
                        res = 'Parameter is not a object or a array';
                        break;
                  case 'number':
                        res = 'Parameter is not a number';
                        break;
                  default:
                        throw new Error('This type is not supported');
                        break;
            }

            if (typeof variable != typeName) {
                  throw new Error(res);
            }
      }


      /**
       *    根据日期格式获取时间戳
       *    @param string 需要转换的时间字符串  2017-11-12 12:22:00
       *    @return 返回秒
       */
      dateStrToTime(str = '') {
            var time = Date.parse(new Date(str));

            return time / 1000;
      }


      // 获取当前时间戳(秒级别)
      getNowTime() {
            var date = new Date();

            return parseInt(date.getTime() / 1000);
      }
}


module.exports = new utils();