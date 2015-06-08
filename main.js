#!/usr/bin/env node
'use strict';

console.log('Hello Cmail!');

console.log(process.argv);

console.log(process.env.HOME);

if (process.argv[2] === 'init') {
  var config = require('./scripts-to-ignore/config.json');
  console.log(config);
}
