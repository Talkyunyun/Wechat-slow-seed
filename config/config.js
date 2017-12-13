/**
 *    系统配置文件
 *    @author: Gene
 */

// 导入环境配置
import env from './env.js';

// 初始化全局配置对象
let config = new Object();

// 全局正则规则
config.regular = {
      phone: /^1[3,4,5,7,8][0-9]{9}$/, // 手机号码
      email: /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/, // 邮箱地址
      wrap: /[\r\n]/g,// 换行
      space: /\s+/g // 空格
};

// 小程序参数配置
config.params = {
      name: '小程序名称'
};

// API接口配置
config.api = require('./api.js');

module.exports = config;