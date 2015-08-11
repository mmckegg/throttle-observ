throttle-observ
===

Throttles [observ](https://github.com/raynos/observ) object broadcast to specified rate.

[![NPM](https://nodei.co/npm/throttle-observ.png)](https://nodei.co/npm/throttle-observ/)

## Example

```js
var Observ = require('observ')
var source = Observ()
setInterval(function () {
  // set every 10 ms
  source.value.set(Date.now())
}, 10)

var minDelayMs = 100

// create sub observable
var ThrottleObserv = require('throttle-observ')
var throttled = ThrottleObserv(source, minDelayMs)
throttled(function (value) {
  // only broadcast every 100 ms
  console.log(value)
})

// or watch
var throttledWatch = require('throttle-observ/watch')
var release = throttledWatch(source, minDelayMs, function (value) {
  // only broadcast every 100 ms
  console.log(value)
})
```