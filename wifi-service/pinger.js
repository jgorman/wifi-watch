/*
 * Gather ping logs.
 *
 * import Pinger from "./pinger";
 * pinger = Pinger();
 * pinger.start({ count: 600, logs: 6 });
 * ping_stream = pinger.ping_stream();
 * ping_stream.pipe(process.stdout);
 * pinger.stop();
 *
 */

const { spawn } = require("child_process");
const { Readable } = require('stream');

const Pinger = () => {

  const default_options = {
    host: "ns.google.com",
    count: 600,
    logs:  6
  };
  let options = default_options;
  let ping_proc;
  const ping_logs = [];

  const start = (opts = {}) => {
    if (!ping_proc) {
      options = { ...default_options, ...opts};
      run();
    }
  };

  const stop = () => {
    if (ping_proc) {
      ping_proc.kill();
      ping_proc = undefined;
      ping_logs.splice(0, ping_logs.length);
    }
  };

  const run = () => {
    const ping_log = [];
    let pushed = false;

    // Spawn a ping process.
    ping_proc = spawn("ping", [ "-c", options.count, options.host ]);

    // Catch any errors and exit.
    ping_proc.on("error", (err) => {
      console.error("spawn ping:", err.code, err.path, err.spawnargs);
      process.exit(2);
    });

    // On ping close start a new one.
    ping_proc.on("close", () => {
      ping_log.push("END_OF_PING\n");
      if (ping_proc) {
        run();
      }
    });

    // Capture each new ping line.
    ping_proc.stdout.on("data", (data) => {
      now = Math.round(Date.now() / 1000);
      data_s = data.toString().trim();
      lines = data_s.split("\n");
      lines.forEach( (line) => {
        timed_line = `${now} ${line}\n`;
        ping_log.push(timed_line);
      });

      // Now that we have some data remove old logs and append this log.
      if (!pushed) {
        while (ping_logs.length >= options.logs) {
          ping_logs.shift();
        }
        ping_logs.push(ping_log);
        pushed = true;
      }
    });
  }

  // Create a new ping log stream.
  const pings = () => {
    let next_log = 0;

    const reader = new Readable({
      read(size) {
        // Get the next log.
        ping_log = ping_logs[next_log];
        if (ping_log == undefined) {
          this.push(null);
          return;
        }
        next_log += 1;

        // If there are multiple lines, compact them.
        if (ping_log.length > 0) {
          compacted = ping_log.join('');
          ping_log.splice(0, ping_log.length, compacted);
        }

        // Send out the log.
        this.push(ping_log[0]);
      }
    });

    return reader;
  }

  // Create a new ping summary stream.
  const summary = () => {
    const wifi_watch = spawn("wifi-watch", ["--ping-from=-"]);
    wifi_watch.on("error", (err) => {
      console.error("spawn wifi-watch:", err.code, err.path, err.spawnargs);
      process.exit(2);
    });

    pings().pipe(wifi_watch.stdin);
    return wifi_watch.stdout;
  };

  return {
    start: start,
    stop: stop,
    pings: pings,
    summary: summary
  };
};

module.exports = Pinger;
