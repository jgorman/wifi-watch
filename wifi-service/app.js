#!/usr/bin/env node

const http = require("http");
const WifiRun = require("./wifi-run");

let opts = { count: 3600, lines: 1000 };
const wifi_run = WifiRun();
wifi_run.start(opts);

const server = http.createServer();
server.on("request", (req, res) => {
  if (req.url.search(/^\/summary/) === 0) {
    wifi_run.summary(getUrlParams(req.url)).pipe(res);
  } else {
    res.end(`Okay ${req.url}\n`);
  }
});

function getUrlParams(url) {
  const idx = url.indexOf("?");
  if (idx < 0) return {};
  return getSearchParams(url.slice(idx + 1));
}

function getSearchParams(search) {
  const hashes = search.slice(search.indexOf("?") + 1).split("&");
  let params = {};
  hashes.forEach(hash => {
    let [key, val] = hash.split("=");
    if (key && val !== undefined) params[key] = decodeURIComponent(val);
  });
  return params;
}

server.listen(3000);
