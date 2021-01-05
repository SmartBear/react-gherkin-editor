"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class KeywordCompleter {
  constructor(getGherkinDialect) {
    _defineProperty(this, "getCompletions", async (_editor, session, position, _prefix, callback) => {
      const lineTokens = session.getLine(position.row).trim().split(' ');

      if (lineTokens.length === 1) {
        const keywords = [].concat(_toConsumableArray(this.getGherkinDialect().labels), _toConsumableArray(this.getGherkinDialect().keywords));
        const completions = keywords.map((keyword, index) => ({
          caption: keyword,
          value: keyword,
          score: index,
          meta: 'Keyword'
        }));
        callback(null, completions);
      }
    });

    this.getGherkinDialect = getGherkinDialect;
  }

}

var _default = KeywordCompleter;
exports.default = _default;