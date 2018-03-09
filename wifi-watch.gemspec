
Gem::Specification.new do |spec|
  spec.name          = "wifi-watch"
  spec.version       = "1.0.0"
  spec.authors       = ["John Gorman"]
  spec.email         = ["johngorman2@gmail.com"]

  spec.summary       = %q{Continuously monitor your network speed and quality!}
  spec.description   = %q{Run wifi-watch in a terminal so that you can easily check your network quality at this moment and how it has been holding up since you began recording hours or days ago.}
  spec.homepage      = "https://github.com/jgorman/wifi-watch"
  spec.license       = "MIT"

  # Prevent pushing this gem to RubyGems.org. To allow pushes either set the 'allowed_push_host'
  # to allow pushing to a single host or delete this section to allow pushing to any host.
  if spec.respond_to?(:metadata)
    spec.metadata["allowed_push_host"] = "TODO: Set to 'http://mygemserver.com'"
  else
    raise "RubyGems 2.0 or newer is required to protect against " \
      "public gem pushes."
  end

  spec.files         = `git ls-files`.split
  spec.bindir        = "bin"
  spec.executables   = ["wifi-watch"]
  spec.require_paths = ["lib"]

  spec.add_development_dependency "bundler", "~> 1.16"
  spec.add_development_dependency "rake", "~> 10.0"
end
