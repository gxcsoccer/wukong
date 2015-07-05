/**!
 * wukong - lib/notification.js
 *
 * Copyright(c) wukong and other contributors.
 * MIT Licensed
 *
 * Authors:
 *   gxcsoccer <gxcsoccer@126.com>
 */

'use strict';

/**
 * Module dependencies.
 */

module.exports = {

  /**
   * 用户消息推送
   *
   * @param {Object} params
   *	- content  透传消息，由第三方应用自己定义并解析消息内容。例如开发者定义成如下格式："{\"title\":\"标题\",\"msgid\": \“123456\”,\"description\":\"推送内容xxx\"}"
   * 	- persist  是否持久化保存,用户断线重连后重新推送。
   *	- toWeb  可选，是否只推送到web。默认是false,推送到所有终端，包括web。
   *	- receiverid  接收消息的openid。
   *	- type  业务自定义消息类型。
   *	- binary  可选，默认为false。content是否是二进制字符串内容。如果是，第三方应用发送前需对二进制进行base64 编码。推送系统会base64解码为二进制后推送给客户端。
   * 	- alert  可选，推送的内容,适用于iphone。
   * 	- badge  可选，app角标的数字，适用于iphone。
   * 	- param  可选, 自定义传输参数， key-value列表,key和value都为字符串类型，适用于iphone
   *  	- sound  可选，推送消息提醒声音，应用中的音频资源名，支持aiff、wav、caf格式，适用于iphone。
   * 	- timeToLive  可选，APNs保持持续时间，单位秒，适用于iphone。
   * @param {Function} callback
   */
  notify: function (params, callback) {
    this.request({
      resource: '/notification/user',
      headers: {
        'Content-Type': 'application/json'
      },
      data: params
    }, callback);
  }
};