/**!
 * wukong - lib/client.js
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

var debug = require('debug')('wukong');
var path = require('path');
var mime = require('mime');
var copy = require('copy-to');
var is = require('is-type-of');
var assert = require('assert');
var urllib = require('urllib');
var crypto = require('crypto');
var fmt = require('util').format;
var querystring = require('querystring');
var merge = require('merge-descriptors');
var AgentKeepalive = require('agentkeepalive');

var HOST = 'https://sandbox-wkapi.laiwang.com/v1';
var agent = new AgentKeepalive();
var noop = function () {};

var httpCode = {
  '200': '应答成功',
  '400': '请求参数',
  '401': '验签失败',
  '404': '未找到',
  '500': '系统错误'
};

// exports
module.exports = Client;

function Client(options) {
  if (!(this instanceof Client)) {
    return new Client(options);
  }

  assert(is.object(options) && options.appDomain, 'appDomain is required.');
  assert(is.object(options) && options.appToken, 'appToken is required.');
  assert(is.object(options) && options.appSecret, 'appSecret is required.');

  this.appDomain = options.appDomain;
  this.appToken = options.appToken;
  this.appSecret = options.appSecret;
  this.defaultHeaders = {
    'Content-Type': 'application/x-www-form-urlencoded'
  };
  this.timeout = options.timeout || 60 * 1000;
}

merge(Client.prototype, {

  authorization: function () {
    var timestamp = String(Math.floor(Date.now() / 1000));
    var nonce = String(Math.floor(Math.random() * 32) + 1);
    var params = [
      this.appToken,
      timestamp,
      nonce
    ];
    params.sort(); // sort the params
    var stringToSign = params.join('');
    debug('authorization stringToSign: %s', stringToSign);

    var signature = crypto.createHash('sha1');
    signature = signature.update(stringToSign).digest('hex');

    return fmt('Wukong nonce="%s", domain="%s", timestamp="%s", signature_method="sha1", version="1.0", signature="%s"',
      nonce, this.appDomain, timestamp, signature);
  },

  request: function (params, callback) {
    callback = callback || noop;

    var headers = {};
    copy(params.headers).and(this.defaultHeaders).to(headers);
    headers['Authorization'] = this.authorization();

    debug('authorization: %s', headers['Authorization']);

    if (params.content || params.stream) {
      headers['Content-Type'] = mime.lookup(params.mime || path.extname(params.name));
      if (params.content) {
        headers['Content-Md5'] = crypto
          .createHash('md5')
          .update(params.content)
          .digest('base64');
        if (!headers['Content-Length']) {
          headers['Content-Length'] = params.content.length;
        }
      }
    }

    var url = HOST + params.resource;
    if (params.query) {
      url += '?' + querystring.stringify(params.query);
    }

    var reqParams = {
      agent: agent,
      method: params.method || 'POST',
      data: params.data,
      content: params.content,
      stream: params.stream,
      headers: headers,
      timeout: params.timeout || this.timeout
    };

    urllib.request(url, reqParams, function (err, data, res) {
      if (err) {
        return callback(err);
      }
      if (res.statusCode !== 200) {
        err = new Error(httpCode[res.statusCode + ''] || '未知错误');
        err.code = res.statusCode;
        return callback(err);
      }

      callback(null, JSON.parse(data.toString()));
    });
  }
});

merge(Client.prototype, require('./profile'));
merge(Client.prototype, require('./conversation'));
merge(Client.prototype, require('./message'));
merge(Client.prototype, require('./notification'));
merge(Client.prototype, require('./upload'));