;(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined'
    ? (module.exports = factory())
    : typeof define === 'function' && define.amd
    ? define(factory)
    : (global.__lq = factory())
})(this, function () {
  return {
    _: {},
    debug: false,
    baseURL: '/api', // baseUrl
    timeout: 15000
  }
})
