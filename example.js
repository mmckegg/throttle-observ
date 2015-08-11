var Observ = require('observ')
var ThrottleObserv = require('./')

var source = Observ()

setTimeout(incr, 20)
setTimeout(function () {
  blast(10, 5000)
}, 500)
setTimeout(incr, 7000)
setTimeout(incr, 7600)
setTimeout(function () {
  blast(10, 3000)
}, 8000)

var minDelayMs = 500
var throttled = ThrottleObserv(source, minDelayMs)

throttled(function (value) {
  // only broadcast every 500 ms
  console.log(value)
})

function incr () {
  source.set(source() + 1)
}

function blast (delay, duration) {
  console.log('blast', duration)
  var timer = setInterval(incr, delay)
  setTimeout(function () {
    clearInterval(timer)
  }, duration)
}
