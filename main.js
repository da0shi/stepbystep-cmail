#!/usr/bin/env node
'use strict';

var querystring = require('querystring');
var readline = require('readline-sync');
var request = require('request');
var fs = require('fs');

console.log('Hello Cmail!');

console.log(process.argv);

console.log(process.env.HOME);

if (process.argv[2] === 'init') {
  var config = require('./scripts-to-ignore/config.json');
  config = config.installed;
  var params = {
    client_id: config.client_id,
    redirect_uri: config.redirect_uris[0],
    response_type: 'code',
    access_type: 'offline',
    approval_prompt: 'force',
    scope: 'https://www.googleapis.com/auth/gmail.readonly',
    state: 'some random string for security'
  };
  var uri = config.auth_uri +'?'+ querystring.encode(params);
  /**
   * open モジュールは URI を指定すると
   * デフォルトに設定されてるブラウザで URI を開いてくれる
   */
  require('open')(uri);

  var code = readline.question('Input returned code: ');
  var params = {
    client_id: config.client_id,
    client_secret: config.client_secret,
    redirect_uri: config.redirect_uris[0],
    /**
     * ここのパラメータで必要になる残り 2 項目を埋めてください
     * 片方は上で得た変数 `code` を活用します
     */
  };
  var options = {
    uri: config.token_uri,
    /**
     * request モジュールで POST を使ってパラメータを送る場合の
     * option のキーを調べてみよう
     */
    json: true
  };

  request.post(options, function (error, response, body) {
    if (/* レスポンスの HTTP Status Code が OK でなければ */) {
      console.log("Error: ", error);
      console.log("HTTP Status Code: ", response.statusCode);
      console.log("Body: ", body);
      return false;
    }
    fs.writeFileSync('./scripts-to-ignore/token.json', /* body オブジェクトを Json 文字列に変換 */);
  });
}
