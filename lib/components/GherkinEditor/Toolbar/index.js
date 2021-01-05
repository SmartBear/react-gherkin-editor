"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactSelect = _interopRequireDefault(require("react-select"));

var _gherkinLanguages = _interopRequireDefault(require("../../../lib/gherkin-languages"));

var _find2 = _interopRequireDefault(require("lodash/find"));

var _styled = require("./styled");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

const availableLanguages = Object.entries(_gherkinLanguages.default).map((_ref) => {
  let _ref2 = _slicedToArray(_ref, 2),
      key = _ref2[0],
      language = _ref2[1];

  return {
    value: key,
    label: language.native
  };
});
const languageSelectStyles = {
  container: styles => _objectSpread(_objectSpread({}, styles), {}, {
    'z-index': 5
  })
};

const Toolbar = (_ref3) => {
  let content = _ref3.content,
      language = _ref3.language,
      readOnly = _ref3.readOnly,
      onLanguageChange = _ref3.onLanguageChange;
  const gherkinLanguage = (0, _find2.default)(availableLanguages, {
    value: language
  });
  return /*#__PURE__*/_react.default.createElement(_styled.ToolbarContainer, {
    "data-testid": "editor-toolbar"
  }, /*#__PURE__*/_react.default.createElement(_styled.LanguageDropdownContainer, null, /*#__PURE__*/_react.default.createElement(_reactSelect.default, {
    value: gherkinLanguage,
    options: availableLanguages,
    onChange: onLanguageChange,
    styles: languageSelectStyles,
    isDisabled: readOnly,
    classNamePrefix: "gherkin-editor-language-select"
  })), content);
};

Toolbar.propTypes = {
  content: _propTypes.default.node,
  language: _propTypes.default.string,
  readOnly: _propTypes.default.bool,
  onLanguageChange: _propTypes.default.func
};
Toolbar.defaultProps = {
  language: 'en',
  readOnly: false,
  onLanguageChange: () => {}
};
var _default = Toolbar;
exports.default = _default;