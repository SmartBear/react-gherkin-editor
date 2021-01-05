"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _isEmpty2 = _interopRequireDefault(require("lodash/isEmpty"));

var _map2 = _interopRequireDefault(require("lodash/map"));

var _orderBy2 = _interopRequireDefault(require("lodash/orderBy"));

var _calculateSize2 = _interopRequireDefault(require("calculate-size"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class StepCompleter {
  constructor(autoCompleteFunction, getGherkinDialect) {
    _defineProperty(this, "getCompletions", async (editor, session, position, _prefix, callback) => {
      const lineTokens = session.getLine(position.row).trim().split(' ');

      if (lineTokens.length > 1 && this.getGherkinDialect().keywords.includes(lineTokens[0])) {
        const keyword = lineTokens.shift();
        const text = lineTokens.join(' ');

        try {
          const completions = await this.autoCompleteFunction(keyword, text);
          callback(null, completions);

          this._resizePopup(editor, completions);
        } catch (error) {
          callback(null, []);
          throw error;
        }
      }
    });

    _defineProperty(this, "_resizePopup", (editor, completions) => {
      if ((0, _isEmpty2.default)(completions)) {
        return;
      }

      const strings = (0, _map2.default)(completions, 'caption');
      const longestString = (0, _orderBy2.default)(strings, 'length', 'desc').shift();

      const width = this._calculateVisualLength(editor, longestString);

      editor.completer.popup.container.style.width = "".concat(width + 50, "px");
    });

    _defineProperty(this, "_calculateVisualLength", (editor, string) => {
      const _editor$getOptions = editor.getOptions(),
            fontFamily = _editor$getOptions.fontFamily,
            fontSize = _editor$getOptions.fontSize;

      const _calculateSize = (0, _calculateSize2.default)(string, {
        font: fontFamily,
        fontSize: fontSize
      }),
            width = _calculateSize.width;

      return width;
    });

    this.autoCompleteFunction = autoCompleteFunction;
    this.getGherkinDialect = getGherkinDialect;
  }

}

var _default = StepCompleter;
exports.default = _default;