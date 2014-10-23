var wd = require('wd'),
    chai = require('chai'),
    expect = chai.expect,
    _ = require('underscore'),
    fs = require('fs'),
    path = require('path'),
    uuid = require('uuid-js');

var VARS = {};

// This assumes that selenium is running at http://127.0.0.1:4444/wd/hub/
var noop = function() {},
    b = wd.remote();

describe('Selenium Test Case', function() {

  this.timeout(60000);

  it('should execute test case without errors', function(done) {

    b.chain(function(err) {
      done(err);
    })
    .init({
      browserName: 'chrome'
    })
    .get("http://localhost:3000/index.html")
    .elementByXPath("//span[.=\"Bugs\"]", function(err, el) {
      b.next('clickElement', el, noop);
    })
    .elementByXPath("//span[.='List Bugs']", function(err, el) {
      b.next('clickElement', el, noop);
    })
    .elementByCssSelector(".x-tbar-page-next", function(err, el) {
      b.next('clickElement', el, noop);
    })
    .elementByCssSelector("x-tbar-page-next", function(err, el) {
      b.next('clickElement', el, noop);
    })
    .elementByCssSelector("table.x-tbar-page-number td > input", function(err, el) {
      b.getAttribute(el, 'value', function(err, value) {
        expect("" + value).to.contain("" + "3");
      });
    })
    .close(function(err) {
      done(err);
    });

  });
});

afterEach(function() {
  b.quit();
});
