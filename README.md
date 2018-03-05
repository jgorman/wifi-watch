# wifi-watch

Continuously monitor your network quality.

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
git clone xxx
sudo cp wifi-watch/wifi-watch /usr/local/bin
```

Curl and wget work too.

### Sample Output

Here is a sample current bottom line.

```
Time  Tot Run Status Packet loss       Speed
----- --- --- ------ ----------------  ---------
17:03 136  67 good   1.5% packet loss  676.17 ms
```

- Time : Current time.

- Tot: Total pings so far in the current period.
  This will count up to 300, 5 minutes per period.

- Run: Run length for the current ping status.
  In the example above there have been 67 good
  pings in a row.

- Status: Was the last ping a success or a failure?

- Packet loss: Percent over the current period.

- Speed: Ping round trip in milliseconds to ns.google.com.

Here is the past half hour of network quality history.

In this example things were going great, then there
has been a slowdown in the past 15 minutes. I am
working at a coffee shop right now and perhaps someone
is watching videos.

```
Time  Tot Num Good   Packet loss       Speed
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

- Time: History lines show the end time for each period.

- Tot: Total will generally be 300 pings over 5 minutes.

- Num Good: Count of good pings over the period.

- Packet loss: Percent loss over the entire period.

- Speed: Average of ping times over the period.
