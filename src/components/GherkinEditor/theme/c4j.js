/* istanbul ignore file */
/* global ace */
ace.define('ace/theme/c4j', ['require', 'exports', 'module', 'ace/lib/dom'], function (acequire, exports, module) {
  exports.isDark = false
  exports.cssClass = 'ace-c4j'
  exports.cssText = `
.ace-c4j .ace_gutter {
  background: #f6f6f6;
  color: #4D4D4C;
}
.ace-c4j .ace_print-margin {
  width: 1px;
  background: #f6f6f6;
}
.ace-c4j {
  background-color: #FFFFFF;
  color: #4D4D4C;
}
.ace-c4j .ace_cursor {
  color: #AEAFAD;
}
.ace-c4j .ace_marker-layer .ace_selection {
  background: #D6D6D6;
}
.ace-c4j.ace_multiselect .ace_selection.ace_start {
  box-shadow: 0 0 3px 0px #FFFFFF;
}
.ace-c4j .ace_marker-layer .ace_step {
  background: rgb(255, 255, 0);
}
.ace-c4j .ace_marker-layer .ace_bracket {
  margin: -1px 0 0 -1px;
  border: 1px solid #D1D1D1;
}
.ace-c4j .ace_marker-layer .ace_active-line {
  background: #EFEFEF;
}
.ace-c4j .ace_gutter-active-line {
  background-color : #dcdcdc;
}
.ace-c4j .ace_marker-layer .ace_selected-word {
  border: 1px solid #D6D6D6;
}
.ace-c4j .ace_invisible {
  color: #D1D1D1;
}
.ace-c4j .ace_keyword,
.ace-c4j .ace_meta,
.ace-c4j .ace_storage,
.ace-c4j .ace_storage.ace_type,
.ace-c4j .ace_support.ace_type {
  color: rgb(25, 144, 184);
  font-weight: bold;
}
.ace-c4j .ace_keyword.ace_operator {
  color: #3E999F;
}
.ace-c4j .ace_constant.ace_character,
.ace-c4j .ace_constant.ace_language,
.ace-c4j .ace_constant.ace_numeric,
.ace-c4j .ace_keyword.ace_other.ace_unit,
.ace-c4j .ace_support.ace_constant,
.ace-c4j .ace_variable.ace_parameter {
  color: #F5871F;
}
.ace-c4j .ace_constant.ace_other {
  color: #666969;
}
.ace-c4j .ace_invalid {
  color: #FFFFFF;
  background-color: #C82829;
}
.ace-c4j .ace_invalid.ace_deprecated {
  color: #FFFFFF;
  background-color: #8959A8;
}
.ace-c4j .ace_fold {
  background-color: #4271AE;
  border-color: #4D4D4C;
}
.ace-c4j .ace_entity.ace_name.ace_function,
.ace-c4j .ace_support.ace_function,
.ace-c4j .ace_variable {
  color: #4271AE;
}
.ace-c4j .ace_support.ace_class,
.ace-c4j .ace_support.ace_type {
  color: #C99E00;
}
.ace-c4j .ace_heading,
.ace-c4j .ace_markup.ace_heading,
.ace-c4j .ace_string {
  color: rgb(47, 156, 10);
}
.ace-c4j .ace_entity.ace_name.ace_tag,
.ace-c4j .ace_entity.ace_other.ace_attribute-name,
.ace-c4j .ace_meta.ace_tag,
.ace-c4j .ace_string.ace_regexp,
.ace-c4j .ace_variable {
  color: #C82829;
}

.ace-c4j .ace_argument {
  color: rgb(166, 127, 89);
}
.ace-c4j .ace_comment {
  color: rgb(125, 139, 153);
}
.ace-c4j .ace_indent-guide {
  background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAACCAYAAACZgbYnAAAAE0lEQVQImWP4////f4bdu3f/BwAlfgctduB85QAAAABJRU5ErkJggg==) right repeat-y;
}`

  var dom = acequire('../lib/dom')
  dom.importCssString(exports.cssText, exports.cssClass)
})
