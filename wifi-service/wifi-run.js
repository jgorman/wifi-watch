/*
 * Gather wifi-watch history lines.
 *
 * import WifiRun from "./wifi-run";
 * wifi_run = WifiRun();
 * wifi_run.start({ count: 3600, lines: 24 });
 * wifi_run.summary().pipe(res);
 * wifi_run.stop();
 *
 */

const { spawn } = require("child_process");
const { Readable } = require("stream");

const default_options = {
  host: "ns.google.com",
  count: 600,
  lines: 100
};

const WifiRun = () => {
  let options;
  let wifi_proc;
  const history_lines = [];
  let status_line;
  let header1;
  let header2;

  // Start up wifi-watch.
  const start = (opts = {}) => {
    if (!wifi_proc) {
      options = Object.assign({}, default_options, opts);
      if (options.lines <= 0) {
        options.lines = default_options.lines;
      }
      run();
    }
  };

  // Shut down wifi-watch.
  const stop = () => {
    if (wifi_proc) {
      wifi_proc.kill();
      wifi_proc = undefined;
      history_lines.splice(0, history_lines.length);
      status_line = undefined;
    }
  };

  // Run wifi-watch.
  const run = () => {

    // Spawn a wifi-watch process and catch any errors.
    wifi_proc = spawn("../bin/wifi-watch", ["-c", options.count, "-h", options.host]);
    wifi_proc.on("error", err => {
      const reason = `${err.code} ${err.path} ${err.spawnargs}`;
      history_lines.push(`../bin/wifi-watch spawn error: ${reason}`);
      wifi_proc = undefined;
    });

    // Report on wifi-watch death.
    wifi_proc.on("close", (code, sig) => {
      const reason = code ? `exit: ${code}` : `signal: ${sig}`;
      history_lines.push(`../bin/wifi-watch stopped: ${reason}`);
      wifi_proc = undefined;
    });

    wifi_proc.stdout.on("data", data => {
      data = data.toString();
      let lines = data.split("\n");

      /*
       * Each data chunk may contain multiple "\n" separated lines.
       * We keep the latest "\r" separated status line revision per line.
       */
      lines.forEach((line, index) => {

        // If a line doesn't begin with "\r" it commits the last status.
        if (line.search(/^\r/) !== 0) {
          commit_status();
        }

        // Split on "\r" and keep the latest revision.
        let latest = line.split("\r").pop();
        if (latest.search(/^PING/) === 0) {
          return;
        }
        if (latest.search(/^Time/) === 0) {
          header1 = latest;
          return;
        }
        if (latest.search(/^--/) === 0) {
          header2 = latest;
          return;
        }
        if (latest === "") {
          return;
        }
        status_line = latest;
      });
    });
  };

  const commit_status = () => {
    if (status_line) {
      // This is a committed line. Make room for it.
      while (history_lines.length >= options.lines) {
        history_lines.shift();
      }
      history_lines.push(status_line);
      status_line = undefined;
    }
  };

  // Create a new summary stream.
  const summary = (opts = {}) => {
    const reader = new Readable({
      read() {
        let lines = ~~opts.lines;
        const header = ~~opts.header;

        if (header && header1 && header2) {
          this.push(`${header1}\n${header2}\n`);
        }

        if (lines && status_line) {
          lines -= 1;
        }
        if (history_lines.length > 0) {
          let show_lines = history_lines;
          if (lines && lines < history_lines.length) {
            show_lines = history_lines.slice(-lines);
          }
          this.push(show_lines.join("\n"));
          this.push("\n");
        }

        if (status_line) {
          this.push(status_line);
          this.push("\n");
        }

        this.push(null);
      }
    });
    return reader;
  };

  return {
    start: start,
    stop: stop,
    summary: summary
  };
};

module.exports = WifiRun;
