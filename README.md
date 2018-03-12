# wifi-watch

Continuously monitor your network speed and quality!

```
$ wifi-watch
PING ns.google.com (216.239.32.10): 56 data bytes

Time  Ping  Run Mode Failed Round Trip
----- ---- ---- ---- ------ ----------
16:55  300  298 good   0.7%  250.83 ms
17:00  300  296 good   1.3%  219.14 ms
17:03  136   67 good   1.5%  676.17 ms
```

Run wifi-watch in a terminal so that you can easily check
your network quality at this moment and how it has been
holding up since you began recording hours or days ago.

wifi-watch will run ping every second and refresh the
current line with the current counts. At the end of
an accounting period the current counts are saved
as a history line and a new accounting period begins.

This can be invaluable in monitoring your home internet
for systematic service degradation. Service technicians
pay attention when you can give them exact ping times
and packet loss history!

It is also a very helpful in public wifi environments
to be able to see how the shared bandwidth is holding up
on a moment to moment basis.

### Installation

You can install the gem from rubygems.org

```
gem install wifi-watch
```

wifi-watch is a stand alone ruby script which will run with
any ruby version and has no dependencies. You can git clone
the repository and copy wifi-watch into your path.

```
git clone https://github.com/jgorman/wifi-watch.git
sudo cp wifi-watch/bin/wifi-watch /usr/local/bin
```

You can use curl or wget to download the script.

```
curl https://raw.githubusercontent.com/jgorman/wifi-watch/master/bin/wifi-watch >wifi-watch
chmod +x wifi-watch
sudo mv wifi-watch /usr/local/bin
```

### Usage: wifi-watch [options]

```
-h, --host host         Host to ping [ns.google.com].
-c, --count seconds     Accounting period length [600 seconds].
-p, --periods periods   Accounting periods to run [infinite].
    --debug-to file     Write ping output to a file for debugging.
    --debug-from file   Read ping input from a file for testing.
-v, --version           Version.
    --help              This message.
```

### Current Period Status Counts

The current output line shows counts for the current period.

```
Time  Ping  Run Mode Failed Round Trip
----- ---- ---- ---- ------ ----------
17:03  136   67 good   1.5%  676.17 ms
```

- Current time.
- 136 pings attempted so far in the current period.
- Run of 67 good pings in a row!
- Status of the last ping: "good" or "fail".
- Packet loss percentage so far.
- Round trip time of the last successful ping.

### History Lines

Here is the past half hour of my network quality history.

In this example things were going great, then my
connection slowed down over the last 15 minutes.
I am working in a crowded coffee shop right now
and perhaps a few of us are watching videos.

```
Time  Ping  Run Mode Failed Round Trip
----- ---- ---- ---- ------ ----------
16:30  300  298 good   0.7%   63.84 ms
16:35  300  300 good   0.0%   76.28 ms
16:40  300  300 good   0.0%   74.45 ms
16:45  300  297 good   1.0%  129.55 ms
16:50  300  296 good   1.3%  233.94 ms
16:55  300  298 good   0.7%  250.83 ms
17:00  300  296 good   1.3%  219.14 ms
17:03  136   67 good   1.5%  676.17 ms
```

- History lines show the end time for each period.
- Count of good pings over the period.
- Packet loss percentage.
- Average round trip time over the entire period.

### Failure Reporting

#### Ping success or failure run length.

On the current bottom line the run length count resets to 1
on every transition between "good" and "fail" modes. This way
we can tell at a glance how long we have been in the current
state. In a still connected high packet loss environment
the runs will be short and switch modes often.

Here we have lost our internet connection for the last 39 seconds.

```
Time  Ping  Run Mode Failed Round Trip
----- ---- ---- ---- ------ ----------
17:59  207   39 fail  19.3%   62.55 ms
```

#### Slow DNS lookup.

At the beginning of an accounting period ping does a DNS lookup
to find your target host ip address. Sometimes this can take
quite a while to either succeed or fail. If the wait is more
than one second you will see a status message.

```
Time  Ping  Run Mode Failed Round Trip
----- ---- ---- ---- ------ ----------
14:38   10    4 good  60.0%   35.69 ms
14:38:52 Waiting for dns lookup of ns.google.com ...
14:39   10   10 good   0.0%   49.52 ms
```

#### Failing DNS lookup.

When the network is not connected at the beginning of an
accounting period the host DNS lookup will fail to resolve.

```
Time  Ping  Run Mode Failed Round Trip
----- ---- ---- ---- ------ ----------
08:40  300   51 good  83.0%   68.65 ms
08:41:06 ping: cannot resolve ns.google.com: Unknown host
08:42   62   17 fail  27.4%  187.30 ms
```

#### Wifi login timeout.

Sometimes your coffee shop wifi login will time out and you will
need to login again. Wifi-watch will let you know by showing the
response message.

```
10:45:43 92 bytes from 10.128.128.128: Communication prohibited by filter
```

## Testing and Debugging

It is easy to capture the raw ping output to a file for later
replay and testing.

```
wifi-watch --count 10 --debug-to test1.log
PING ns.google.com (216.239.32.10): 56 data bytes

Time  Ping  Run Mode Failed Round Trip
----- ---- ---- ---- ------ ----------
10:06   10   10 good   0.0%  127.41 ms
10:06   10    3 good  70.0%   34.28 ms
10:06:34 ping: cannot resolve ns.google.com: Unknown host
10:06    5    1 fail  20.0%   55.16 ms^C
```

The ping output file includes the timestamp for each line
so replaying the file later on should result in
identical appearing output.

```
wifi-watch --debug-from test1.log
PING ns.google.com (216.239.32.10): 56 data bytes

Time  Ping  Run Mode Failed Round Trip
----- ---- ---- ---- ------ ----------
10:06   10   10 good   0.0%  127.41 ms
10:06   10    3 good  70.0%   34.28 ms
10:06:34 ping: cannot resolve ns.google.com: Unknown host
10:06    5    1 fail  20.0%   55.16 ms
```

Although the --debug-from output should appear to be the same
as live ping monitoring there is a difference. Instead of emitting
every intermediate count on the current line, only the final
line is printed. This helps keep test cases short and readable.

You can run the current test suite with rake test.

## Contributing

Bug reports and pull requests are welcome on GitHub at
https://github.com/jgorman/wifi-watch.

If you discover a shortcoming capture the ping output
using --debug-to and open an issue. Thanks!

## License

The gem is available as open source under the terms of the [MIT License](https://opensource.org/licenses/MIT).
