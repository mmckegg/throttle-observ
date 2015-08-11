throttle-observ
===

Throttles [observ](https://github.com/raynos/observ) object broadcast to specified rate.

[![NPM](https://nodei.co/npm/throttle-observ.png)](https://nodei.co/npm/throttle-observ/)

## Example

```js
var Observ = require('observ')
var ThrottleObserv = require('throttle-observ')

var source = Observ()
setInterval(function () {
  // set every 10 ms
  source.value.set(Date.now())
}, 10)

var minDelayMs = 100
var throttled = ThrottleObserv(source, minDelayMs)

throttled(function (value) {
  // only broadcast every 100 ms
  console.log(value)
})
```