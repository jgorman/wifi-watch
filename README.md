# wifi-watch

Continuously monitor your network speed and quality!

```
Time  Tot Run Good Failed Round Trip
----- --- --- ---- ------ ----------
16:55 300 298 good   0.7%  250.83 ms
17:00 300 296 good   1.3%  219.14 ms
17:03 136  67 good   1.5%  676.17 ms
```

Run wifi-watch in a terminal so that you can easily check
your network quality at this second and how it has been
holding up since you began recording hours or days ago.

wifi-watch will run ping every second and refresh the
current line with the current counts. Every 5 minutes the
current counts are saved as a history line and a new
5 minute count period begins.

This can be invaluable in monitoring your home internet
for systematic service degradation. Service technicians
pay attention when you can give them exact ping times
and packet loss history!

It is also a very helpful in public wifi environments
to be able to see how the shared bandwidth is holding up
on a moment to moment basis.

### Installation

wifi-watch will run with any ruby version. Clone the repository and copy wifi-watch into your path.

```
git clone https://github.com/jgorman/wifi-watch.git
sudo cp wifi-watch/wifi-watch /usr/local/bin
```

### Current Period Status Counts

The current output line shows counts for the current period.

```
Time  Tot Run Good Failed Round Trip
----- --- --- ---- ------ ----------
17:03 136  67 good   1.5%  676.17 ms
```

- Current time.
- Pings attempted so far in the current period.
- Run of 67 good pings in a row!
- Status of the last ping: "good" or "fail".
- Packet loss percentage so far.
- Round trip time of the last successful ping to ns.google.com.

### History Lines

Here is the past half hour of my network quality history.

In this example things were going great, then my
connection slowed down over the last 15 minutes.
I am working in a crowded coffee shop right now
and perhaps a few of us are watching videos.

```
Time  Tot Run Good Failed Round Trip
----- --- --- ---- ------ ----------
16:25 300 298 good   0.7%   73.35 ms
16:30 300 298 good   0.7%   63.84 ms
16:35 300 300 good   0.0%   76.28 ms
16:40 300 300 good   0.0%   74.45 ms
16:45 300 297 good   1.0%  129.55 ms
16:50 300 296 good   1.3%  233.94 ms
16:55 300 298 good   0.7%  250.83 ms
17:00 300 296 good   1.3%  219.14 ms
17:03 136  67 good   1.5%  676.17 ms
```

- History lines show the end time for each period.
- Count of good pings over the period.
- Packet loss percentage.
- Average round trip time over the entire period.

### Failure Modes

#### Ping failure or success run length.

On the current bottom line the run length count resets to zero
on every transition between "good" and "fail" modes. This way
we can tell at a glance how long we have been in the current
state. In a still connected high packet loss environment
the runs will be short and switch back and forth.

Here we have lost our internet connection for the last 39 seconds.

```
Time  Tot Run Good Failed Round Trip
----- --- --- ---- ------ ----------
17:59 207  39 fail  19.3%   62.55 ms
```

#### DNS inaccessible.

At the beginning of an accounting period ping does a DNS
lookup on ns.google.com. When the network is not connected
this DNS lookup will fail and you will see the error message
with the current time.

```
Time  Tot Run Good Failed Round Trip
----- --- --- ---- ------ ----------
08:40 300  51 good  83.0%   68.65 ms
08:41 ping: cannot resolve ns.google.com: Unknown host
08:42  62  17 fail  27.4%  187.30 ms
```

#### Wifi login timeout.

Sometimes your coffee shop wifi login will time out and you will
need to login again. Wifi-watch will let you know by showing the
response message.

```
92 bytes from 10.128.128.128: Communication prohibited by filter
```

If you find more failure modes try to capture the ping output
and open an issue. Thanks!
