#!/usr/bin/env node

const http = require("http");
const WifiRun = require("./wifi-run");

let opts = { count: 1 };
const wifi_run = WifiRun();
wifi_run.start(opts);

const server = http.createServer();
server.on("request", (req, res) => {
  const start_time = Date.now();

  if (req.url.search(/^\/summary/) === 0) {
    wifi_run.summary(getUrlParams(req.url)).pipe(res);

  } else if (req.url.search(/^\/stop/) === 0) {
    wifi_run.stop();
    res.end("Stopped\n");

  } else if (req.url.search(/^\/start/) === 0) {
    wifi_run.start(opts);
    res.end("Started\n");

  } else {
    res.end("Okay\n");
  }

  const end_time = Date.now();
  console.log(`Ran ${req.url} in ${end_time - start_time} ms.`);
});

function getUrlParams(url) {
  const idx = url.indexOf("?");
  if (idx < 0) return {};
  return getSearchParams(url.slice(idx + 1));
}

function getSearchParams(search) {
  const hashes = search.slice(search.indexOf("?") + 1).split("&");
  let params ={};
  hashes.forEach( (hash) => {
    let [key, val] = hash.split("=");
    if (key && val !== undefined) params[key] = decodeURIComponent(val);
  });
  return params;
}

server.listen(3000);
console.log("Serving on http://localhost:3000/summary");
