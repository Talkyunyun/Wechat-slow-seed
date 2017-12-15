/**
 *    环境参数配置
 *    @author: Gene
 */

let env = new Object();

// 设置运行环境  local、prod
env.mode = 'local';

// 设置接口请求地址
switch (env.mode) {
      case 'prod':
            env.host = 'http://slow.seed.com/';
            break;
      default:
		env.host = 'http://slow.senior.yii.com/';
}

module.exports = env;