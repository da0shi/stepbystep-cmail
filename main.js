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
  require('open')(uri);

  var code = readline.question('Input returned code: ');
  var params = {
    client_id: config.client_id,
    client_secret: config.client_secret,
    redirect_uri: config.redirect_uris[0],
    grant_type: 'authorization_code',
    code: code
  };
  var options = {
    uri: config.token_uri,
    form: params,
    json: true
  };

  request.post(options, function (error, response, body) {
    if (response.statusCode !== 200) {
      console.log("Error: ", error);
      console.log("HTTP Status Code: ", response.statusCode);
      console.log("Body: ", body);
      return false;
    }
    fs.writeFileSync('./scripts-to-ignore/token.json', JSON.stringify(body));
  });
}

if (process.argv[2] === 'labels') {
  var tokens = require('./scripts-to-ignore/token.json');
  var endpoint = 'https://www.googleapis.com/gmail/v1/users/me/labels';
  var queries = {
    access_token: tokens.access_token,
    prettyPrint: true
  };
  var options = {
    uri: endpoint,
    qs: queries,
    json: true
  };
  request.get(options, function (error, response, body) {
    if (response.statusCode !== 200) {
      console.log("Error: ", error);
      console.log("HTTP Status Code: ", response.statusCode);
      console.log("Body: ", body);
      return false;
    }
    var syslabels = body.labels; /* システムラベルだけの配列を生成 */
    var usrlabels = body.labels; /* ユーザーラベルだけの配列を生成 */

    /**
     * 各要素の id と name プロパティの内容を表示，列挙
     * forEach を使うとシンプルに書けるかも?
     */
    console.log("<System Labels>");
    // システムラベルの列挙
    console.log("<User Labels>");
    // ユーザーラベルの列挙
  });
}
