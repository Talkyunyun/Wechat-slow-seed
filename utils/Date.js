


/** 获取当前时间戳(秒级别) */
export function getNowTime() {
	let date = new Date();

	return parseInt(date.getTime() / 1000);
}

/**
  *    根据日期格式获取时间戳
  *    @param string 需要转换的时间字符串  2017-11-12 12:22:00
  *    @return 返回秒
  */
export function dateStrToTime(str) {
	let time = Date.parse(new Date(str));

	return time / 1000;
}