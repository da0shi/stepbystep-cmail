#!/usr/bin/env node
'use strict';

console.log('Hello Cmail!');

console.log(process.argv);

console.log(process.env.HOME);

if (process.argv[2] === 'init') {
  var config = require('./scripts-to-ignore/config.json');
  config = config.installed;
  /**
   * JavaScript はオブジェクトを生成する時に
   * `{ key: value }` の形式で書ける．
   * "Object リテラル" 等で調べてみる理解が進むかも？
   */
  var params = {
    client_id: config.client_id,
    redirect_uri: config.redirect_uris[0],
    /**
     * この他に必要なパラメータを調べてください
     * 必須項目は 4 つあります．
     * ヒント: Gmail API の OAuth に関して調べてみよう
     * 今回のアプリは "Installed Application"
     */
  };
  /**
   * params で定義したオブジェクトを Query 化してください．
   * `key=value` の形式にして複数のパラメータがある場合は `&` で繋げる
   * 自力で実装してもいいし，ライブラリを使うのも OK
   */
  var uri = config.auth_uri +'?'+ '`key1=value1&key2=value2`';
  console.log(uri);
}
