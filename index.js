var Observ = require('observ')

module.exports = function ThrottleObserv(obsValue, minDelay) {
  var throttling = false
  var lastRefreshAt = 0
  var lastValueAt = 0
  var throttleTimer = null

  // default delay is 20 ms
  minDelay = minDelay || 20

  var obs = Observ(obsValue())
  obsValue(function(v) {
    if (!throttling) {
      if (Date.now() - lastRefreshAt > minDelay) {
        refresh()
      } else {
        throttling = true
        throttleTimer = setInterval(refresh, minDelay)
      }
    }
    lastValueAt = Date.now()
  })

  return obs

  function refresh() {
    lastRefreshAt = Date.now()

    if (obs() !== obsValue()) {
      obs.set(obsValue())
    }

    if (throttling && lastRefreshAt - lastValueAt > minDelay) {
      throttling = false
      clearInterval(throttleTimer)
    }
  }
}