/**!
 * wukong - lib/upload.js
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
   * 文件上传
   * 
   * @param {Object} params
   *	- name  filename
   * 	- content  文件内容
   * 	- stream  流方式上传
   * @param {Function} callback
   */
  upload: function (params, callback) {
    this.request({
      resource: '/media/upload',
      name: params.name,
      content: params.content,
      stream: params.stream
    }, callback);
  }
};