#!/usr/bin/env node
'use strict';

var querystring = require('querystring');

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
  console.log(uri);
}
