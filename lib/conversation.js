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

module.exports = {

  /**
   * 创建会话
   *
   * @param {Object} params
   * 	- openId  创建会话的用户id
   * 	- type  聊天类型，1 是单聊,2 是群聊
   * 	- icon  图标url地址(可选)
   * 	- title  群名称(可选)
   *	- members  会话的成员列表openId
   * 	- tag  会话tag
   *	- extension  自定义的扩展字段
   * @param {Function} callback
   */
  createConversation: function (params, callback) {
    this.request({
      resource: '/im/conversation/create',
      headers: {
        'Content-Type': 'application/json'
      },
      data: params
    }, callback);
  },

  /**
   * 查询会话概要信息
   *
   * @param {Array} cidList
   * @param {Function} callback
   */
  getConversations: function (cidList, callback) {
    this.request({
      resource: '/im/conversation/profile',
      headers: {
        'Content-Type': 'application/json'
      },
      data: {
        cidList: cidList
      }
    }, callback);
  },

  /**
   * 查询会话成员列表
   *
   * @param {Object} criteria
   * 	- cid  会话的id
   * 	- count  每次拉取的成员个数
   * 	- offset  拉取会话成员的起始位置,第一次取值为0,之后取已经拉取到的成员个数值
   * 	- openId  创建会话的用户id
   * @param {Function} callback
   */
  getConversationMembers: function (criteria, callback) {
    this.request({
      resource: '/im/conversation/list/members',
      method: 'GET',
      data: criteria
    }, callback);
  },

  /**
   * 分页查询用户的会话列表
   *
   * @param {Object} criteria
   * 	- openid  用户id
   * 	- cursor  会话时间戳起始时间，第一次取值为0,之后取最后一个会话的createAt值
   * 	- count  每次拉取的会话个数
   * @param {Function} callback
   */
  getConversationsOfUser: function (criteria, callback) {
    this.request({
      resource: '/im/conversation/list',
      method: 'GET',
      data: criteria
    }, callback);
  },

  /**
   * 增加会话成员
   *
   * @param {Object} params
   * 	- openId  创建会话的用户id
   * 	- conversationId  会话id
   * 	- members  需要增加的成员openId列表
   * 	- message  增加会话成员的消息文案
   * @param {Function} callback
   */
  addConversationMember: function (params, callback) {
    this.request({
      resource: '/im/conversation/member/add',
      headers: {
        'Content-Type': 'application/json'
      },
      data: params
    }, callback);
  },

  /**
   * 删除会话成员
   *
   * @param {Object} params
   * 	- openId  创建会话的用户id
   * 	- conversationId  会话id
   * 	- members  需要增加的成员openId列表
   * 	- message  增加会话成员的消息文案
   * @param {Function} callback
   */
  removeConversationMember: function (params, callback) {
    this.request({
      resource: '/im/conversation/member/remove',
      headers: {
        'Content-Type': 'application/json'
      },
      data: params
    }, callback);
  },

  /**
   * 修改会话tag
   *
   * @param {Object} params
   * 	- openId  用户id
   * 	- conversationId  会话id
   * 	- tag  会话新的版本
   * @param {Function} callback
   */
  updateConversationTag: function (params, callback) {
    this.request({
      resource: '/im/conversation/tag/update',
      headers: {
        'Content-Type': 'application/json'
      },
      data: params
    }, callback);
  },

  /**
   * 修改会话自定义扩展
   *
   * @param {Object} params
   * 	- openId  用户id
   * 	- conversationId  会话id
   * 	- extension  自定义的扩展字段
   * @param {Function} callback
   */
  updateConversationExtension: function (params, callback) {
    this.request({
      resource: '/im/conversation/extension/update',
      headers: {
        'Content-Type': 'application/json'
      },
      data: params
    }, callback);
  }
};