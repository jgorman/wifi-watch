#!/usr/bin/env ruby

require 'pty'

# PTY spawn stdout throws Errno::EIO at EOF.
# Reproduced with Ruby 2.5.0p0 on Ubuntu 16.4.
# This does not happen on OS X 10.13.3.
#
# This is documented in ruby/ext/pty/pty.c:
#  * rescue Errno::EIO # GNU/Linux raises EIO.

def run

  cmd = "true"
  stdin, stdout, pid = PTY.spawn(cmd)
  line = stdin.gets
  puts "Success"

rescue Errno::EIO => e
  puts "Fail #{e.inspect}"
  # Fail #<Errno::EIO: Input/output error @ io_fillbuf - fd:7 /dev/pts/1>
end

run()
