"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.annotate = exports.setMode = exports.setLanguage = exports.setSession = exports.default = void 0;
const setSession = jest.fn();
exports.setSession = setSession;
const setLanguage = jest.fn();
exports.setLanguage = setLanguage;
const setMode = jest.fn();
exports.setMode = setMode;
const annotate = jest.fn();
exports.annotate = annotate;
const GherkinAnnotator = jest.fn().mockImplementation(() => {
  return {
    setSession: setSession,
    setLanguage: setLanguage,
    setMode: setMode,
    annotate: annotate
  };
});
var _default = GherkinAnnotator;
exports.default = _default;