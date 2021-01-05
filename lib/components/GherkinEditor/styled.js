"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EditorWrapper = void 0;

var _styledComponents = _interopRequireDefault(require("styled-components"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _templateObject() {
  const data = _taggedTemplateLiteral(["\n  border-width: 1px;\n  border-style: solid;\n  border-color: rgb(223, 225, 230);\n  border-radius: 3px;\n"]);

  _templateObject = function () {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

const EditorWrapper = _styledComponents.default.div(_templateObject());

exports.EditorWrapper = EditorWrapper;