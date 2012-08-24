#!/usr/bin/env node

var jsreload = require("jsreload");
var fileName = process.argv[2];
jsreload.runOpen(jsreload.safariAppName, fileName, function () {
    jsreload.watchFile(fileName, jsreload.runReloadSafari);
});
