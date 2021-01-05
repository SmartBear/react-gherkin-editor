"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _gherkin = require("@cucumber/gherkin");

var _gherkinLanguages = _interopRequireDefault(require("../gherkin-languages"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class GherkinLinter {
  constructor() {
    this.options = {
      includeGherkinDocument: true,
      newId: () => Math.random().toString()
    };
    this.offset = 0;
    this.isSubset = false;
    this.subsetType = '';
    this.language = 'en';
    this.featureKeyword = 'Feature';
    this.lastParsedGherkin = '';
    this.lintingErrors = [];
  }

  setLanguage(language) {
    language || (language = 'en');

    if (this.language === language) {
      return this;
    }

    if (!_gherkinLanguages.default[language]) {
      return this;
    }

    this.language = language;
    this.featureKeyword = _gherkinLanguages.default[this.language].feature[0];
    this.lastParsedGherkin = '';
    return this;
  }

  setSubsetType(type) {
    if (type === this.subsetType) {
      return this;
    }

    if (type === 'scenario' || type === 'background') {
      this.subsetType = type;
      this.isSubset = true;
    } else {
      this.subsetType = '';
      this.isSubset = false;
    }

    this.lastParsedGherkin = '';
    return this;
  }

  parse(gherkin) {
    if (gherkin === this.lastParsedGherkin) {
      return this;
    }

    this._parseGherkin(gherkin);

    this.lastParsedGherkin = gherkin;
    return this;
  }

  getLintingErrors() {
    return this.lintingErrors;
  }

  _parseGherkin(gherkin) {
    const messages = (0, _gherkin.generateMessages)(this._getContentToLint(gherkin), '', this.options);
    this.lintingErrors = messages.filter(message => message.parseError).map(message => ({
      line: message.parseError.source.location.line - this.offset,
      row: message.parseError.source.location.line - 1 - this.offset,
      character: message.parseError.source.location.column,
      column: message.parseError.source.location.column - 1,
      text: this._removeLineNumber(message.parseError.message),
      type: 'warning'
    }));
  }

  _getContentToLint(gherkin) {
    let featurePrefix = '';
    this.offset = 0;

    if (this.language !== 'en') {
      this.offset += 1;
      featurePrefix = "# language: ".concat(this.language, "\n");
    }

    if (this.isSubset) {
      const subsetKeyword = _gherkinLanguages.default[this.language][this.subsetType][0];
      featurePrefix = "".concat(featurePrefix).concat(this.featureKeyword, ":\n").concat(subsetKeyword, ":\n");
      this.offset += 2;
    }

    return "".concat(featurePrefix).concat(gherkin);
  }

  _removeLineNumber(errorMessage) {
    return errorMessage.split(' ').slice(1).join(' ');
  }

}

exports.default = GherkinLinter;