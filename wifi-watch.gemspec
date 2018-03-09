
Gem::Specification.new do |spec|
  spec.name          = "wifi-watch"
  spec.version       = "1.0.0"
  spec.authors       = ["John Gorman"]
  spec.email         = ["johngorman2@gmail.com"]

  spec.summary       = %q{Continuously monitor your network speed and quality!}
  spec.description   = %q{Run wifi-watch in a terminal so that you can easily check your network quality at this moment and how it has been holding up since you began recording hours or days ago.}
  spec.homepage      = "https://github.com/jgorman/wifi-watch"
  spec.license       = "MIT"

  spec.files         = `git ls-files`.split
  spec.bindir        = "bin"
  spec.executables   = ["wifi-watch"]
  spec.require_paths = ["lib"]
end
