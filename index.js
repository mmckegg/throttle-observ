var Observ = require('observ')
var throttledWatch = require('./watch')

module.exports = function ThrottleObserv (obsValue, minDelay) {
  var obs = Observ()
  throttledWatch(obsValue, minDelay, obs.set)
  return obs
}
