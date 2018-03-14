#!/usr/bin/env node

const http = require("http");
const Pinger = require("./pinger");

const pinger = Pinger();
pinger.start();

const server = http.createServer();
server.on("request", (req, res) => {
  const start_time = Date.now();
  if (req.url === "/summary") {
    pinger.summary().pipe(res);
  } else if (req.url === "/pings") {
    pinger.pings().pipe(res);
  } else if (req.url === "/stop") {
    pinger.stop();
    res.end("Stopped\n");
  } else if (req.url === "/start") {
    pinger.start();
    res.end("Started\n");
  } else {
    res.end("Okay\n");
  }
  const end_time = Date.now();
  console.log(`Ran ${req.url} in ${end_time - start_time} ms.`);
});

server.listen(3000);
