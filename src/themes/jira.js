/* istanbul ignore file */
/* global ace */
ace.define(
  'ace/theme/jira',
  ['require', 'exports', 'module', 'ace/lib/dom'],
  function (acequire, exports, module) {
    'use strict'

    exports.isDark = false
    exports.cssClass = 'ace-jira'
    exports.cssText = `ace_editor {
  margin: auto;
  width: 100%;
}
.ace-jira .ace_gutter {
  background: rgb(235, 236, 240);
  color: rgb(137, 147, 164);
}

.ace-jira .ace_print-margin {
  width: 1px;
  background: #e8e8e8;
}

.ace-jira .ace_fold {
  background-color: #6B72E6;
}

.ace-jira {
  background: #FFFFFF;
  color: #172B4D;
}

.ace-jira .ace_cursor {
  color: black;
}

.ace-jira .ace_invisible {
  color: rgb(191, 191, 191);
}

.ace-jira .ace_storage, .ace-jira .ace_keyword {
  font-weight: bolder;
}

.ace-jira .ace_constant {
  color: rgb(197, 6, 11);
}

.ace-jira .ace_constant.ace_buildin {
  color: rgb(88, 72, 246);
}

.ace-jira .ace_constant.ace_language {
  color: rgb(88, 92, 246);
}

.ace-jira .ace_constant.ace_library {
  color: rgb(6, 150, 14);
}

.ace-jira .ace_invalid {
  background-color: rgba(255, 0, 0, 0.1);
  color: red;
}

.ace-jira .ace_support.ace_function {
  color: rgb(60, 76, 114);
}

.ace-jira .ace_support.ace_constant {
  color: rgb(6, 150, 14);
}

.ace-jira .ace_support.ace_type,
  .ace-jira .ace_support.ace_class {
  color: rgb(109, 121, 222);
}

.ace-jira .ace_keyword.ace_operator {
  color: rgb(104, 118, 135);
}

.ace-jira .ace_string {
  color: #36B37E;
}

.ace-jira .ace_comment {
  color: rgb(80, 95, 121);
}

.ace-jira .ace_argument {
  color: rgb(101, 84, 192);
}

.ace-jira .ace_comment.ace_doc {
  color: rgb(0, 102, 255);
}

.ace-jira .ace_comment.ace_doc.ace_tag {
  color: rgb(128, 159, 191);
}

.ace-jira .ace_constant.ace_numeric {
  color: rgb(0, 0, 205);
}

.ace-jira .ace_variable {
  color: rgb(49, 132, 149);
}

.ace-jira .ace_xml-pe {
  color: rgb(104, 104, 91);
}

.ace-jira .ace_entity.ace_name.ace_function {
  color: #0000A2;
}

.ace-jira .ace_heading {
  color: rgb(12, 7, 255);
}

.ace-jira .ace_list {
  color: rgb(185, 6, 144);
}

.ace-jira .ace_meta.ace_tag {
  color: rgb(0, 22, 142);
}

.ace-jira .ace_string.ace_regex {
  color: rgb(255, 0, 0);
}

.ace-jira .ace_marker-layer .ace_selection {
  background: rgb(181, 213, 255);
}

.ace-jira.ace_multiselect .ace_selection.ace_start {
  box-shadow: 0 0 3px 0px white;
}

.ace-jira .ace_marker-layer .ace_step {
  background: rgb(252, 255, 0);
}

.ace-jira .ace_marker-layer .ace_stack {
  background: rgb(164, 229, 101);
}

.ace-jira .ace_marker-layer .ace_bracket {
  margin: -1px 0 0 -1px;
  border: 1px solid rgb(192, 192, 192);
}

.ace-jira .ace_marker-layer .ace_active-line {
  background: rgba(0, 0, 0, 0.07);
}

.ace-jira .ace_gutter-active-line {
  background-color: #dcdcdc;
}

.ace-jira .ace_marker-layer .ace_selected-word {
  background: rgb(250, 250, 255);
  border: 1px solid rgb(200, 200, 250);
}

.ace-jira .ace_indent-guide {
  background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAACCAYAAACZgbYnAAAAE0lEQVQImWP4////f4bLly//BwAmVgd1/w11/gAAAABJRU5ErkJggg==") right repeat-y;
}`

    var dom = acequire('../lib/dom')
    dom.importCssString(exports.cssText, exports.cssClass)
  })
