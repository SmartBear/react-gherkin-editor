"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "GherkinLinter", {
  enumerable: true,
  get: function () {
    return _gherkinLinter.default;
  }
});
exports.default = void 0;

var _GherkinEditor = _interopRequireDefault(require("./components/GherkinEditor"));

var _gherkinLinter = _interopRequireDefault(require("./lib/gherkin-linter"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = _GherkinEditor.default;
exports.default = _default;