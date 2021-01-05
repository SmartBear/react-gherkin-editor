"use strict";

var _gherkin_background_i18n = require("../dialects/gherkin_background_i18n");

var _escapeStringRegexp = _interopRequireDefault(require("escape-string-regexp"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* istanbul ignore file */

/* global ace */
ace.define('ace/mode/gherkin_background_highlight_rules', ['require', 'exports', 'module', 'ace/lib/oop', 'ace/mode/text_highlight_rules'], function (acequire, exports, module) {
  const oop = acequire('../lib/oop');
  const TextHighlightRules = acequire('./text_highlight_rules').TextHighlightRules;
  const stringEscape = '\\\\(x[0-9A-Fa-f]{2}|[0-7]{3}|[\\\\abfnrtv\'"]|U[0-9A-Fa-f]{8}|u[0-9A-Fa-f]{4})';

  const GherkinHighlightRules = function () {
    const keywords = (0, _gherkin_background_i18n.getGherkinDialect)().keywords;
    this.$rules = {
      start: [{
        token: 'constant.numeric',
        regex: '(?:(?:[1-9]\\d*)|(?:0))'
      }, {
        token: 'comment',
        regex: '#.*$'
      }, {
        token: 'keyword',
        regex: '(?:' + keywords.map(_escapeStringRegexp.default).join('|') + ')\\b'
      }, {
        token: 'string',
        // multi line """ string start
        regex: '"{3}',
        next: 'qqstring3'
      }, {
        token: 'string',
        // " string
        regex: '"',
        next: 'qqstring'
      }, {
        token: 'text',
        regex: '^\\s*(?=@[\\w])',
        next: [{
          token: 'text',
          regex: '\\s+'
        }, {
          token: 'variable.parameter',
          regex: '@[\\w]+'
        }, {
          token: 'empty',
          regex: '',
          next: 'start'
        }]
      }, {
        token: 'argument',
        regex: '<[^>]+>'
      }, {
        token: 'comment',
        regex: '\\|(?=.)',
        next: 'table-item'
      }, {
        token: 'comment',
        regex: '\\|$',
        next: 'start'
      }],
      qqstring3: [{
        token: 'constant.language.escape',
        regex: stringEscape
      }, {
        token: 'string',
        // multi line """ string end
        regex: '"{3}',
        next: 'start'
      }, {
        defaultToken: 'string'
      }],
      qqstring: [{
        token: 'constant.language.escape',
        regex: stringEscape
      }, {
        token: 'string',
        regex: '\\\\$',
        next: 'qqstring'
      }, {
        token: 'string',
        regex: '"|$',
        next: 'start'
      }, {
        defaultToken: 'string'
      }],
      'table-item': [{
        token: 'comment',
        regex: /$/,
        next: 'start'
      }, {
        token: 'comment',
        regex: /\|/
      }, {
        token: 'string',
        regex: /\\./
      }, {
        defaultToken: 'string'
      }]
    };
    this.normalizeRules();
  };

  oop.inherits(GherkinHighlightRules, TextHighlightRules);
  exports.GherkinHighlightRules = GherkinHighlightRules;
});
ace.define('ace/mode/gherkin_background_i18n', ['require', 'exports', 'module', 'ace/lib/oop', 'ace/mode/text', 'ace/mode/gherkin_background_highlight_rules'], function (acequire, exports, module) {
  const oop = acequire('../lib/oop');
  const TextMode = acequire('./text').Mode;
  const GherkinHighlightRules = acequire('./gherkin_background_highlight_rules').GherkinHighlightRules;

  const Mode = function () {
    this.HighlightRules = GherkinHighlightRules;
    this.$behaviour = this.$defaultBehaviour;
  };

  oop.inherits(Mode, TextMode);
  (function () {
    this.lineCommentStart = '#';
    this.$id = 'ace/mode/gherkin_background_i18n';

    this.getNextLineIndent = function (state, line, tab) {
      const labels = (0, _gherkin_background_i18n.getGherkinDialect)().labels;
      const keywords = (0, _gherkin_background_i18n.getGherkinDialect)().keywords;
      let indent = this.$getIndent(line);
      const space2 = '  ';
      const tokenizedLine = this.getTokenizer().getLineTokens(line, state);
      const tokens = tokenizedLine.tokens;

      if (line.match('[ ]*\\|')) {
        indent += '| ';
      }

      if (tokens.length && tokens[tokens.length - 1].type === 'comment') {
        return indent;
      }

      if (state === 'start') {
        if (line.match(labels.map(_escapeStringRegexp.default).join(':|') + ':')) {
          indent += space2;
        } else if (line.match('(' + keywords.map(_escapeStringRegexp.default).join('|') + ').+(:)$|Examples:')) {
          indent += space2;
        } else if (line.match('\\*.+')) {
          indent += '* ';
        }
      }

      return indent;
    };
  }).call(Mode.prototype);
  exports.Mode = Mode;
});