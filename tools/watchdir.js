#!/usr/bin/env node

var jsreload = require("jsreload");

var dirname = process.argv[2];
jsreload.watchDir(dirname, jsreload.runReloadSafari);
