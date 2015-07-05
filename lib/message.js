/**!
 * wukong - lib/conversation.js
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

var is = require('is-type-of');

module.exports = {

  /**
   * 发送消息
   *
   * @param {Object} params
   * 	- senderId  发送消息的用户id
   * 	- conversationId  会话id
   * 	- content  消息内容,取值包括下面定义的TextMsg(文字消息)、PictureMsg(图片消息)、AudioMsg(语音消息)、AudioImageMsg(语音图片消息)
   * 	- extension  自定义的扩展字段
   * 	- tag  消息tag
   * 	- XpnParam  可选，自定义移动端的消息提醒参数，适用于ios
   * 		- incrbadge  app角标的数字增加值
   * 		- alertContent  提醒内容
   * 		- XpnOff  是否关闭自定义消息提醒参数开关, 1 关闭;0 打开
   * 		- params  自定义传输参数，key-value列表,key和value都为字符串类型
   * @param {Function} callback
   *
   * TextMsg
   * 	- contentType  取值TEXT
   * 	- text  文字消息内容
   *
   * PictureMsg
   * 	- contentType  取值IMAGE
   * 	- imageContent  图片内容
   * 		- mediaId
   * 		- mediaSize
   *
   * AudioMsg
   * 	- contentType  取值AUDIO
   * 	- audioContent  语音内容
   * 		- mediaId
   * 		- duration
   * 		- audioVolumns
   *
   * AudioImageMsg
   * 	- contentType  取值AUDIO_IMAGE
   * 	- imageContent  图片内容
   * 		- mediaId
   * 		- mediaSize
   * 	- audioContent  语音内容
   * 		- mediaId
   * 		- duration
   * 		- audioVolumns
   */
  sendMessage: function (params, callback) {
    if (is.string(params.content)) {
      params.content = {
        contentType: 'TEXT',
        text: params.content
      };
    }

    this.request({
      resource: '/im/message/send',
      headers: {
        'Content-Type': 'application/json'
      },
      data: params
    }, callback);
  },

  /**
   * 查询消息
   *
   * @param {Object} params
   *	- openId  拉取消息的用户id
   * 	- messageId  消息id
   * @param {Function} callback
   */
  getMessage: function (params, callback) {
    this.request({
      resource: '/im/message',
      method: 'GET',
      data: params
    }, callback);
  },

  /**
   * 查询会话的消息
   *
   * @param {Object} params
   *	- openId  拉取消息的用户id
   * 	- conversationId  会话id
   *	- cursor  起始时间戳,单位毫秒
   *	- forward  true拉取cursor这个时间点之后的数据 false拉取这个时间点之前的数据
   *	- count  最大消息数量
   * @param {Function} callback
   */
  getMessagesOfConveration: function (params, callback) {
    this.request({
      resource: '/im/message/list',
      method: 'GET',
      data: params
    }, callback);
  },

  /**
   * 设置消息为已读状态
   *
   * @param {Object} params
   * 	- openId  设置消息状态的用户id
   * 	- messageIds  消息id列表
   * @param {Function} callback
   */
  markAsRead: function (params, callback) {
    this.request({
      resource: '/im/message/set/read',
      headers: {
        'Content-Type': 'application/json'
      },
      data: params
    }, callback);
  }
};