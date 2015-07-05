/**!
 * wukong - lib/profile.js
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
   * 注册用户
   *
   * ```
   * User对象:
   *
   * {
   *	openid: 123
   *    opensecret: "123",
   *    profile: {
   *		nick: "用户昵称，10个中文字符以内，20个英文字符以内",
   *		avatar: "用户头像，200个字符以内",
   *		mobile: "用户手机号，可带区号，不带区号默认区号86(中国国家码)",
   *		avatar: "用户头像，200个字符以内",
   *		city: "用户地区城市，30中文字符以内",
   *		remark: "用户备注，200个字符以内",
   *		gender: "用户性别，０为默认为未知",
   *		birthday: "long型，用户生日，传时间戳",
   *		extension: "用户自定义字段，可自己控制其y内容，4096个英文字符　，建议存入json对象化数据",
   *	}
   * }
   * ```
   *
   * @param {Array} users
   * @param {Function} callback
   */
  register: function (users, callback) {
    var resource = is.array(users) ? '/user/register/batch' : '/user/register';

    this.request({
      resource: resource,
      data: users
    }, callback);
  },

  /**
   * 更换用户opensecret
   *
   * @param {Object} params
   *  	- openid 用户id
   * 	- opensecret 密码
   * @param {Function} callback
   */
  updateSecret: function (params, callback) {
    this.request({
      resource: '/user/update/secret',
      data: {
        openid: params.openid,
        opensecret: params.opensecret
      }
    }, callback);
  },

  /**
   * 更新用户tag
   * 
   * @param {Object} params
   *  	- openid 用户id
   * 	- tag 通知的用户版本的version
   *	- op 是否创建新记录(不同步openid，opensecret的必写)
   * @param {Function} callback
   */
  updateUserTag: function (params, callback) {
    this.request({
      resource: '/user/update/tag',
      data: {
        openid: params.openid,
        tag: params.tag,
        op: params.op
      }
    }, callback);
  },

  /**
   * 更新用户profile
   *
   * @param {Object} user
   *  	- openid 用户id
   *	- profile
   * @param {Function} callback
   */
  updateProfile: function (user, callback) {
    this.request({
      resource: '/user/profile/update',
      data: user
    }, callback);
  },

  /**
   * 查询用户profile
   *
   * @param {Number} openid
   * @param {Function} callback
   */
  queryProfile: function (openid, callback) {
    this.request({
      resource: '/user/profile',
      data: {
        openid: openid
      }
    }, callback);
  },

  /**
   * 批量查询用户概要信息
   *
   * @param {Array} openids
   * @param {Function} callback
   */
  queryProfiles: function (openids, callback) {
    if (!is.array(openids)) {
      openids = [openids];
    }

    this.request({
      resource: '/user/profile/batch',
      data: {
        openids: openids
      }
    }, callback);
  }
};