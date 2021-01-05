"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _lodash = require("lodash");

var _gherkinLinter = _interopRequireDefault(require("../../lib/gherkin-linter"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class _default {
  constructor(session) {
    _defineProperty(this, "debouncedAnnotate", (0, _lodash.debounce)(value => {
      this.annotateNow(value);
    }, 250));

    this.session = session;
    this.linter = new _gherkinLinter.default();
    this.language = 'en';
    this.mode = '';
  }

  setSession(session) {
    this.session = session;
  }

  setLanguage(language) {
    this.language = language;
  }

  setMode(mode) {
    switch (mode) {
      case 'gherkin_background_i18n':
        this.mode = 'background';
        break;

      case 'gherkin_scenario_i18n':
        this.mode = 'scenario';
        break;

      default:
        this.mode = '';
    }
  }

  annotate(value) {
    this.debouncedAnnotate(value);
  }

  async annotateNow(value) {
    const errors = await this.lint(value);

    if (!Array.isArray(errors)) {
      return;
    }

    if (errors.length > 0) {
      this.session.setAnnotations(errors);
    } else {
      this.session.clearAnnotations();
    }
  }

  async lint(value) {
    return this.linter.setLanguage(this.language).setSubsetType(this.mode).parse(value).getLintingErrors();
  }

}

exports.default = _default;