'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /* Spin up a simple express server */


var _express = require('express');

var _express2 = _interopRequireDefault(_express);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Server = function () {
  function Server(baseDir, publicPath, port) {
    _classCallCheck(this, Server);

    var app = (0, _express2.default)();

    app.use(publicPath, _express2.default.static(baseDir, { index: '200.html' }));

    this.start = this.start.bind(this, app, port);
  }

  _createClass(Server, [{
    key: 'start',
    value: function start(app, port) {
      var _this = this;

      return new Promise(function (resolve, reject) {
        _this.instance = app.listen(port, function (err) {
          if (err) {
            return reject(err);
          }

          resolve();
        });
      });
    }
  }, {
    key: 'stop',
    value: function stop() {
      console.log("\nServer stopped.");
      this.instance.close();
      process.exit(); /* fkn dunno why this doesnt work eh */
    }
  }]);

  return Server;
}();

exports.default = Server;
module.exports = exports['default'];