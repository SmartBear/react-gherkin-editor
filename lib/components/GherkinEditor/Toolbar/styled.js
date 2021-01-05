"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LanguageDropdownContainer = exports.ToolbarContainer = void 0;

var _styledComponents = _interopRequireDefault(require("styled-components"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _templateObject2() {
  const data = _taggedTemplateLiteral(["\n  min-width: 150px;\n"]);

  _templateObject2 = function () {
    return data;
  };

  return data;
}

function _templateObject() {
  const data = _taggedTemplateLiteral(["\n  display: flex;\n  flex-direction: row;\n  flex-wrap: wrap;\n  align-items: center;\n  justify-content: space-between;\n  padding: 3px;\n  background-color: rgb(235, 236, 240);\n"]);

  _templateObject = function () {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

const ToolbarContainer = _styledComponents.default.div(_templateObject());

exports.ToolbarContainer = ToolbarContainer;

const LanguageDropdownContainer = _styledComponents.default.div(_templateObject2());

exports.LanguageDropdownContainer = LanguageDropdownContainer;