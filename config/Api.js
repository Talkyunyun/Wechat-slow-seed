/**
 *    接口请求地址
 *    @author: Gene
 */

// 导入环境配置
import env from './Env.js';


let api = {
	// 登录接口
	login: {
		method: 'POST',
		url: env.host + 'login'
	}
};



module.exports = api;