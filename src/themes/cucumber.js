/* istanbul ignore file */
/* global ace */
ace.define(
  'ace/theme/cucumber',
  ['require', 'exports', 'module', 'ace/lib/dom'],
  function (acequire, exports) {
    exports.isDark = false
    exports.cssClass = 'ace-cucumber'
    exports.cssText = `
.ace-cucumber .ace_gutter {
  background: #f6f6f6;
  color: #4D4D4C;
}
.ace-cucumber .ace_print-margin {
  width: 1px;
  background: #f6f6f6;
}
.ace-cucumber {
  background-color: #FFFFFF;
  color: #4D4D4C;
}
.ace-cucumber .ace_cursor {
  color: #AEAFAD;
}
.ace-cucumber .ace_marker-layer .ace_selection {
  background: #D6D6D6;
}
.ace-cucumber.ace_multiselect .ace_selection.ace_start {
  box-shadow: 0 0 3px 0px #FFFFFF;
}
.ace-cucumber .ace_marker-layer .ace_step {
  background: rgb(255, 255, 0);
}
.ace-cucumber .ace_marker-layer .ace_bracket {
  margin: -1px 0 0 -1px;
  border: 1px solid #D1D1D1;
}
.ace-cucumber .ace_marker-layer .ace_active-line {
  background: #EFEFEF;
}
.ace-cucumber .ace_gutter-active-line {
  background-color : #dcdcdc;
}
.ace-cucumber .ace_marker-layer .ace_selected-word {
  border: 1px solid #D6D6D6;
}
.ace-cucumber .ace_invisible {
  color: #D1D1D1;
}
.ace-cucumber .ace_keyword,
.ace-cucumber .ace_meta,
.ace-cucumber .ace_storage,
.ace-cucumber .ace_storage.ace_type,
.ace-cucumber .ace_support.ace_type {
  color: rgb(25, 144, 184);
  font-weight: bold;
}
.ace-cucumber .ace_keyword.ace_operator {
  color: #3E999F;
}
.ace-cucumber .ace_constant.ace_character,
.ace-cucumber .ace_constant.ace_language,
.ace-cucumber .ace_constant.ace_numeric,
.ace-cucumber .ace_keyword.ace_other.ace_unit,
.ace-cucumber .ace_support.ace_constant,
.ace-cucumber .ace_variable.ace_parameter {
  color: #F5871F;
}
.ace-cucumber .ace_constant.ace_other {
  color: #666969;
}
.ace-cucumber .ace_invalid {
  color: #FFFFFF;
  background-color: #C82829;
}
.ace-cucumber .ace_invalid.ace_deprecated {
  color: #FFFFFF;
  background-color: #8959A8;
}
.ace-cucumber .ace_fold {
  background-color: #4271AE;
  border-color: #4D4D4C;
}
.ace-cucumber .ace_entity.ace_name.ace_function,
.ace-cucumber .ace_support.ace_function,
.ace-cucumber .ace_variable {
  color: #4271AE;
}
.ace-cucumber .ace_support.ace_class,
.ace-cucumber .ace_support.ace_type {
  color: #C99E00;
}
.ace-cucumber .ace_heading,
.ace-cucumber .ace_markup.ace_heading,
.ace-cucumber .ace_string {
  color: rgb(47, 156, 10);
}
.ace-cucumber .ace_entity.ace_name.ace_tag,
.ace-cucumber .ace_entity.ace_other.ace_attribute-name,
.ace-cucumber .ace_meta.ace_tag,
.ace-cucumber .ace_string.ace_regexp,
.ace-cucumber .ace_variable {
  color: #C82829;
}

.ace-cucumber .ace_argument {
  color: rgb(166, 127, 89);
}
.ace-cucumber .ace_comment {
  color: rgb(125, 139, 153);
}
.ace-cucumber .ace_indent-guide {
  background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAACCAYAAACZgbYnAAAAE0lEQVQImWP4////f4bdu3f/BwAlfgctduB85QAAAABJRU5ErkJggg==) right repeat-y;
}
.ace-cucumber .ace_tooltip {
  max-width: 400px;
  white-space: pre-wrap;
  overflow-wrap: break-word;
  word-wrap: break-word;
}`

    const dom = acequire('../lib/dom')
    dom.importCssString(exports.cssText, exports.cssClass)
  }
)
