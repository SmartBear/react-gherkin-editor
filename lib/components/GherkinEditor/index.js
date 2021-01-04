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

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactAce = _interopRequireDefault(require("react-ace"));

var _reResizable = require("re-resizable");

var _keywordCompleter = _interopRequireDefault(require("../../modules/keyword-completer"));

var _stepCompleter = _interopRequireDefault(require("../../modules/step-completer"));

var _gherkin_i18n = require("../../modules/dialects/gherkin_i18n");

var _gherkin_background_i18n = require("../../modules/dialects/gherkin_background_i18n");

var _gherkin_scenario_i18n = require("../../modules/dialects/gherkin_scenario_i18n");

var _gherkinAnnotator = _interopRequireDefault(require("../../modules/gherkin-annotator"));

var _Toolbar = _interopRequireDefault(require("./Toolbar"));

var _styled = require("./styled");

require("ace-builds/src-noconflict/ext-language_tools");

require("../../themes/jira");

require("../../themes/cucumber");

require("../../modules/mode/gherkin_i18n");

require("../../modules/mode/gherkin_background_i18n");

require("../../modules/mode/gherkin_scenario_i18n");

var _gherkinLinter = _interopRequireDefault(require("../../lib/gherkin-linter"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

const setGherkinDialectFunctions = {
  gherkin_i18n: _gherkin_i18n.setGherkinDialect,
  gherkin_background_i18n: _gherkin_background_i18n.setGherkinDialect,
  gherkin_scenario_i18n: _gherkin_scenario_i18n.setGherkinDialect
};
const getGherkinDialectFunctions = {
  gherkin_i18n: _gherkin_i18n.getGherkinDialect,
  gherkin_background_i18n: _gherkin_background_i18n.getGherkinDialect,
  gherkin_scenario_i18n: _gherkin_scenario_i18n.getGherkinDialect
};
const defaultOptions = {
  fontFamily: ["'SFMono-Medium'", "'SF Mono'", "'Segoe UI Mono'", "'Roboto Mono'", "'Ubuntu Mono'", 'Menlo', 'Consolas', 'Courier', 'monospace'].join(', '),
  enableBasicAutocompletion: true,
  enableLiveAutocompletion: true,
  showLineNumbers: false,
  displayIndentGuides: false,
  tabSize: 2
};
let gherkinAnnotator = null;

const GherkinEditor = /*#__PURE__*/_react.default.forwardRef((props, ref) => {
  const _useState = (0, _react.useState)(props.language),
        _useState2 = _slicedToArray(_useState, 2),
        currentLanguage = _useState2[0],
        setCurrentLanguage = _useState2[1];

  const _useState3 = (0, _react.useState)(props.initialHeight),
        _useState4 = _slicedToArray(_useState3, 2),
        height = _useState4[0],
        setHeight = _useState4[1];

  const aceEditorRef = (0, _react.useRef)();
  const initialValue = props.initialValue,
        language = props.language,
        hideToolbar = props.hideToolbar,
        readOnly = props.readOnly,
        uniqueId = props.uniqueId,
        toolbarContent = props.toolbarContent,
        onSubmit = props.onSubmit,
        autoCompleteFunction = props.autoCompleteFunction,
        onLanguageChange = props.onLanguageChange,
        autoFocus = props.autoFocus,
        theme = props.theme,
        mode = props.mode,
        showGutter = props.showGutter,
        activateLinter = props.activateLinter,
        setOptions = props.setOptions;
  const setGherkinDialect = setGherkinDialectFunctions[mode] || _gherkin_i18n.setGherkinDialect;
  const getGherkinDialect = getGherkinDialectFunctions[mode] || _gherkin_i18n.getGherkinDialect;
  const isLinterActivated = activateLinter && showGutter;
  (0, _react.useEffect)(() => {
    if (autoFocus) {
      aceEditorRef.current.editor.focus();
    }
  }, [autoFocus]);
  (0, _react.useEffect)(() => {
    const keywordCompleter = new _keywordCompleter.default(getGherkinDialect);
    const stepCompleter = new _stepCompleter.default(autoCompleteFunction, getGherkinDialect);
    const langTools = window.ace.acequire('ace/ext/language_tools');
    langTools.setCompleters([keywordCompleter, stepCompleter]);
  }, [autoCompleteFunction, getGherkinDialect]);
  (0, _react.useEffect)(() => {
    setCurrentLanguage(language);
  }, [language]);
  (0, _react.useEffect)(() => {
    setGherkinDialect(currentLanguage);
    aceEditorRef.current.editor.session.setMode({
      path: "ace/mode/".concat(mode),
      v: Date.now()
    });
  }, [setGherkinDialect, currentLanguage, mode]);
  (0, _react.useEffect)(() => {
    if (!isLinterActivated) {
      gherkinAnnotator = null;
      return;
    }

    const session = aceEditorRef.current.editor.getSession();

    if (!gherkinAnnotator) {
      gherkinAnnotator = new _gherkinAnnotator.default(session);
    } else {
      gherkinAnnotator.setSession(session);
    }
  }, [isLinterActivated]);
  (0, _react.useEffect)(() => {
    if (gherkinAnnotator) {
      gherkinAnnotator.setLanguage(currentLanguage);
      gherkinAnnotator.setMode(mode);
      gherkinAnnotator.annotate(initialValue);
    }
  }, [currentLanguage, mode, initialValue]);
  (0, _react.useImperativeHandle)(ref, () => ({
    editor: aceEditorRef.current.editor
  }));

  if (activateLinter && !showGutter) {
    console.warn('activateLinter requires showGutter to be true');
  }

  const onResizeStop = (_event, _direction, _refToElement, delta) => {
    setHeight(height + delta.height);
  };

  const languageChangeHandler = option => {
    setCurrentLanguage(option.value);
    onLanguageChange(option);
  };

  const onChangeHandler = function (newValue) {
    if (gherkinAnnotator) {
      gherkinAnnotator.annotate(newValue);
    }

    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    return props.onChange.apply(props, [newValue].concat(args));
  };

  const options = _objectSpread(_objectSpread({}, defaultOptions), setOptions);

  return /*#__PURE__*/_react.default.createElement(_styled.EditorWrapper, null, !hideToolbar && /*#__PURE__*/_react.default.createElement(_Toolbar.default, {
    content: toolbarContent,
    language: currentLanguage,
    readOnly: readOnly,
    onLanguageChange: languageChangeHandler
  }), /*#__PURE__*/_react.default.createElement(_reResizable.Resizable, {
    size: {
      width: '100%',
      height: "".concat(height, "px")
    },
    onResizeStop: onResizeStop,
    enable: {
      top: false,
      right: false,
      bottom: true,
      left: false,
      topRight: false,
      bottomRight: false,
      bottomLeft: false,
      topLeft: false
    }
  }, /*#__PURE__*/_react.default.createElement(_reactAce.default, _extends({}, props, {
    onChange: onChangeHandler,
    ref: aceEditorRef,
    theme: theme,
    value: initialValue,
    name: uniqueId,
    editorProps: {
      $blockScrolling: true
    },
    setOptions: options,
    height: "".concat(height, "px"),
    commands: [{
      name: 'test',
      bindKey: {
        win: 'Ctrl-Enter',
        mac: 'Cmd-Enter'
      },
      exec: editor => onSubmit(editor.getValue())
    }]
  }))));
});

GherkinEditor.propTypes = {
  initialValue: _propTypes.default.string,
  language: _propTypes.default.string,
  hideToolbar: _propTypes.default.bool,
  readOnly: _propTypes.default.bool,
  uniqueId: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string]),
  toolbarContent: _propTypes.default.node,
  onChange: _propTypes.default.func,
  onSubmit: _propTypes.default.func,
  autoCompleteFunction: _propTypes.default.func,
  onLanguageChange: _propTypes.default.func,
  autoFocus: _propTypes.default.bool,
  initialHeight: _propTypes.default.number,
  theme: _propTypes.default.string,
  mode: _propTypes.default.oneOf(['gherkin_i18n', 'gherkin_background_i18n', 'gherkin_scenario_i18n']),
  fontSize: _propTypes.default.number,
  width: _propTypes.default.string,
  showPrintMargin: _propTypes.default.bool,
  showGutter: _propTypes.default.bool,
  highlightActiveLine: _propTypes.default.bool,
  activateLinter: _propTypes.default.bool,
  setOptions: _propTypes.default.object
};
GherkinEditor.defaultProps = {
  initialValue: '',
  language: 'en',
  hideToolbar: false,
  readOnly: false,
  uniqueId: Math.random().toString(36).substr(2, 9),
  onChange: () => {},
  onSubmit: () => {},
  autoCompleteFunction: () => Promise.resolve([]),
  onLanguageChange: () => {},
  autoFocus: false,
  initialHeight: 500,
  theme: 'jira',
  mode: 'gherkin_i18n',
  fontSize: 14,
  width: '100%',
  showPrintMargin: false,
  showGutter: false,
  highlightActiveLine: false,
  activateLinter: false,
  setOptions: {}
};
var _default = GherkinEditor;
exports.default = _default;