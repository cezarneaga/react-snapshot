"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _jsdom = require("jsdom");

var _jsdom2 = _interopRequireDefault(_jsdom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (protocol, host, path) {
  return new Promise(function (resolve, reject) {
    _jsdom2.default.env({
      url: protocol + "//" + host + path,
      resourceLoader: function resourceLoader(resource, callback) {
        if (resource.url.host === host) {
          resource.defaultFetch(callback);
        } else {
          callback();
        }
      },

      features: {
        FetchExternalResources: ["script"],
        ProcessExternalResources: ["script"],
        SkipExternalResources: false
      },
      virtualConsole: _jsdom2.default.createVirtualConsole().sendTo(console),
      done: function done(err, window) {
        if (err) reject(err);
        resolve(window);
      }
    });
  });
}; /* Wraps a jsdom call and returns the full page */

module.exports = exports["default"];