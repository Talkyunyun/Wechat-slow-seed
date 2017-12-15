/*** 消息提示组件 */



/**
  * 全局消息提示
  * @param   msg 提示语
  * @param   title 提示标题，默认为温馨提示
  * @options 微信showModal接口参数
  */
export function show() {
	let msg      = arguments[0] ? arguments[0] : '操作失败！！！';
	let title       = arguments[2] ? arguments[2] : '温馨提示';
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