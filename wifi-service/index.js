#!/usr/bin/env node

const http = require("http");
const WifiRun = require("./wifi-run");

const wifi_run = WifiRun();
wifi_run.start();

const server = http.createServer();
server.on("request", (req, res) => {
  if (req.url.search(/^\/summary/) === 0) {
    wifi_run.summary(getUrlParams(req.url)).pipe(res);
  } else {
    res.end("Okay\n");
  }
});

function getUrlParams(search) {
  let hashes = search.slice(search.indexOf("?") + 1).split("&");
  return hashes.reduce((params, hash) => {
    let [key, val] = hash.split("=");
    return Object.assign(params, { [key]: decodeURIComponent(val) });
  }, {});
}

server.listen(3000);
