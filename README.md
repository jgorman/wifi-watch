# wifi-watch

Continuously monitor your network quality!

```
16:55 300 298 good   0.7% packet loss  250.83 ms
17:00 300 296 good   1.3% packet loss  219.14 ms
17:03 136  67 good   1.5% packet loss  676.17 ms
```

Run wifi-watch in a terminal so that you can easily check
your network quality at this second and how it has been
holding up since you began recording hours or days ago.

wifi-watch will run ping every second and refresh the
bottom line with the current counts. Every 5 minutes the
current counts are saved as a history line and a new
5 minute count period begins.

This can be invaluable in monitoring your home internet
for systematic service degradation. Service technicians
pay attention when you can give them exact ping times
and packet loss history!

It is also a very helpful in public wifi environments
to be able to see how the shared bandwidth is holding up.

### Installation

wifi-watch will run with any ruby version. Clone the repository and copy wifi-watch into your path.

```
git clone https://github.com/jgorman/wifi-watch.git
sudo cp wifi-watch/wifi-watch /usr/local/bin
```

### Current Period Status Counts

The bottom output line shows counts for the current period.

```
Time  Tot Run Status Packet loss       Speed
----- --- --- ------ ----------------  ---------
17:03 136  67 good   1.5% packet loss  676.17 ms
```

- Current time.
- Pings so far in the current period.
- 67 good pings in a row!
- Status of the last ping: "good" or "fail".
- Packet loss percentage over the current period.
- Speed of the last successful ping to ns.google.com.

### History Lines

Here is the past half hour of my network quality history.

In this example things were going great, then my
connection slowed down over the last 15 minutes.
I am working in a crowded coffee shop right now
and perhaps a few of us are watching videos.

```
Time  Tot Num Good   Packet loss       Avg Speed
----- --- --- ----   ----------------  ---------
16:25 300 298 good   0.7% packet loss   73.35 ms
16:30 300 298 good   0.7% packet loss   63.84 ms
16:35 300 300 good   0.0% packet loss   76.28 ms
16:40 300 300 good   0.0% packet loss   74.45 ms
16:45 300 297 good   1.0% packet loss  129.55 ms
16:50 300 296 good   1.3% packet loss  233.94 ms
16:55 300 298 good   0.7% packet loss  250.83 ms
17:00 300 296 good   1.3% packet loss  219.14 ms
17:03 136  67 good   1.5% packet loss  676.17 ms
```

- History lines show the end time for each period.
- 300 pings over 5 minutes.
- Count of good pings over the period.
- Packet loss percentage.
- Average speed over the entire period.

### Failure modes

Here we have lost our internet connection for the last 39 seconds.

```
17:59 207  39 fail  19.3% packet loss   62.55 ms
```

wifi-watch will pass a few error messages out from ping.
Here we got our network connection back.

```
18:00 300 167 good  44.3% packet loss  107.41 ms
18:00 ping: cannot resolve ns.google.com: Unknown host
18:04 203 141 good   5.4% packet loss  218.35 ms
```

Sometimes your coffee shop wifi login will time out and you will
need to login again. Here is what wifi-watch will show.

```
92 bytes from 10.128.128.128: Communication prohibited by filter
```
