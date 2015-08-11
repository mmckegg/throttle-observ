module.exports = function throttledWatch (obs, minDelay, listener) {
  var throttling = false
  var lastRefreshAt = 0
  var lastBroadcastValue = obs()
  var lastValueAt = 0
  var throttleTimer = null

  // default delay is 20 ms
  minDelay = minDelay || 20

  listener(obs())

  return obs(function (v) {
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

  function refresh () {
    lastRefreshAt = Date.now()

    if (lastBroadcastValue !== obs()) {
      lastBroadcastValue = obs()
      listener(lastBroadcastValue)
    }

    if (throttling && lastRefreshAt - lastValueAt > minDelay) {
      throttling = false
      clearInterval(throttleTimer)
    }
  }
}
