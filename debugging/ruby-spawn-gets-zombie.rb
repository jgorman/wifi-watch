#!/usr/bin/env ruby

require 'pty'

# Looping on PTY spawn stdout.gets freezes waiting on a zombie.
# Reproduced with Ruby 2.5.0p0 on OS X 10.13.3.
# This does not happen on Ubuntu 16.4.
#
# Typically one in 10,000 - 20,000 runs will show this problem.
#

def run

  puts
  puts "Running PTY.spawn('date') in a loop."
  puts
  puts "This will freeze with stdout.gets() waiting for output from a zombie."
  puts
  puts "When this freezes see the zombie with: ps -ef | grep '(date)'"
  puts "Then hit ^C to see how many runs it took."
  puts

  runs = 0
  lines = 0
  while true
    cmd = "date"
    stdin, stdout, pid = PTY.spawn(cmd)
    runs += 1
    STDOUT.write('.') if runs % 100 == 0
    while true
      line = stdin.gets rescue nil
      break unless line
      lines += 1
    end
    Process.waitall() # Soak up any zombies.
  end

rescue Interrupt
  puts
  puts
  puts "Runs: #{runs} lines: #{lines}"
  puts
end

run()
