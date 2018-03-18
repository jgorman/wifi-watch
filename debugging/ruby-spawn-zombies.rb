#!/usr/bin/env ruby

require 'pty'

# Looping through PTY spawn stdout leaves a trail of zombies.
# Tested with Ruby 2.5.0p0 on OS X 10.13.3 and Ubuntu 16.4.

def run

  runs = 0
  lines = 0
  while true
    cmd = "true"
    stdin, stdout, pid = PTY.spawn(cmd)
    runs += 1
    while true
      line = stdin.gets rescue nil
      break unless line
      lines += 1
    end
    break if runs == 10
  end

ensure
  zombies = `ps -ef | grep '[t]rue'`
  zombie_count = zombies.split("\n").length 
  puts
  puts "Runs: #{runs} lines: #{lines} Zombies: #{zombie_count}"
  puts
  puts zombies
  puts
end

run()
