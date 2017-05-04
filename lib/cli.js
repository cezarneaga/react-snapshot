'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _url = require('url');

var _url2 = _interopRequireDefault(_url);

var _Server = require('./Server');

var _Server2 = _interopRequireDefault(_Server);

var _Crawler = require('./Crawler');

var _Crawler2 = _interopRequireDefault(_Crawler);

var _Writer = require('./Writer');

var _Writer2 = _interopRequireDefault(_Writer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var pkg = JSON.parse(_fs2.default.readFileSync(_path2.default.join(process.cwd(), 'package.json')));
var publicPath = pkg.homepage ? _url2.default.parse(pkg.homepage).pathname : '/';

exports.default = function () {
  var baseDir = _path2.default.resolve('./build');
  var writer = new _Writer2.default(baseDir);
  writer.move('index.html', '200.html');

  var server = new _Server2.default(baseDir, publicPath, 2999);
  server.start().then(function () {
    var crawler = new _Crawler2.default('http://localhost:2999' + publicPath);
    return crawler.crawl(function (_ref) {
      var path = _ref.path,
          html = _ref.html;

      var filename = path === publicPath ? 'index.html' : '' + path + (path.endsWith('/') ? 'index' : '') + '.html';
      console.log('\u270F\uFE0F   Saving ' + path + ' as ' + filename);
      writer.write(filename, html);
    });
  }).then(function () {
    return server.stop();
  }, function (err) {
    return console.log(err);
  });
};

module.exports = exports['default'];