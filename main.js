#!/usr/bin/env node
'use strict';

console.log('Hello Cmail!');

console.log(process.argv);

console.log(process.env.HOME);

if (/* 引数が init だったら*/) {
  var config = /* 'scripts-to-ignore/config.json' を読み込み*/;
  console.log(config);
}
