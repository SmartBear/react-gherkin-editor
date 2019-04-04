(function(a,b){'object'==typeof exports&&'object'==typeof module?module.exports=b():'function'==typeof define&&define.amd?define('GherkinEditor',[],b):'object'==typeof exports?exports.GherkinEditor=b():a.GherkinEditor=b()})('undefined'==typeof self?this:self,function(){return function(a){function b(d){if(c[d])return c[d].exports;var e=c[d]={i:d,l:!1,exports:{}};return a[d].call(e.exports,e,e.exports,b),e.l=!0,e.exports}var c={};return b.m=a,b.c=c,b.d=function(a,c,d){b.o(a,c)||Object.defineProperty(a,c,{configurable:!1,enumerable:!0,get:d})},b.n=function(a){var c=a&&a.__esModule?function(){return a['default']}:function(){return a};return b.d(c,'a',c),c},b.o=function(a,b){return Object.prototype.hasOwnProperty.call(a,b)},b.p='./',b(b.s=1)}([function(a){a.exports=require('react')},function(a,b,c){a.exports=c(2)},function(a,b,c){'use strict';Object.defineProperty(b,'__esModule',{value:!0});var d=c(0),e=c.n(d),f=c(3),g=c.n(f),h=c(4),i=c.n(h),j=c(5),k=c.n(j);const l=['Given','When','Then','And','But'],m=['Feature','Background','Example','Scenario','Scenario Outline','Scenario Template','Examples'].concat(l);var n=class{constructor(){Object.defineProperty(this,'getCompletions',{enumerable:!0,writable:!0,value:(a,b,c,d,e)=>new Promise(function(a){const d=b.getLine(c.row).trim().split(' ');if(1===d.length){const a=m.map((a,b)=>({caption:a,value:a,score:b,meta:'Keyword'}));e(null,a)}return a()})})}},o=c(6),p=c.n(o),q=c(7),r=c.n(q);var s=class{constructor(a){Object.defineProperty(this,'getCompletions',{enumerable:!0,writable:!0,value:(a,b,c,d,e)=>new Promise(function(d,f){function g(){return d()}let h;if(h=b.getLine(c.row).trim().split(' '),1<h.length&&l.includes(h[0])){let b,c;b=h.shift(),c=h.join(' ');var i=function(){try{return g.call(this)}catch(a){return f(a)}}.bind(this),j=function(a){try{throw e(null,[]),a}catch(a){return f(a)}};try{let d;return Promise.resolve(this.autoCompleteFunction(b,c)).then(function(b){try{return d=b,e(null,d),this._resizePopup(a,d),i()}catch(a){return j(a)}}.bind(this),j)}catch(a){j(a)}}return g.call(this)}.bind(this))}),Object.defineProperty(this,'_resizePopup',{enumerable:!0,writable:!0,value:(a,b)=>{if(!p.a.isEmpty(b)){const c=p.a.map(b,'caption'),d=p.a.orderBy(c,'length','desc').shift(),e=this._calculateVisualLength(a,d);a.completer.popup.container.style.width=`${e+50}px`}}}),Object.defineProperty(this,'_calculateVisualLength',{enumerable:!0,writable:!0,value:(a,b)=>{var c=a.getOptions();const d=c.fontFamily,e=c.fontSize;var f=r()(b,{font:d,fontSize:e});const g=f.width;return g}}),this.autoCompleteFunction=a}},t=c(8),u=c.n(t),v=c(9),w=c.n(v),x=c(10),y=c.n(x),z=Object.assign||function(a){for(var b,c=1;c<arguments.length;c++)for(var d in b=arguments[c],b)Object.prototype.hasOwnProperty.call(b,d)&&(a[d]=b[d]);return a};class A extends d.Component{constructor(a){super(a),Object.defineProperty(this,'state',{enumerable:!0,writable:!0,value:{value:this.props.initialValue}}),Object.defineProperty(this,'setAceEditorRef',{enumerable:!0,writable:!0,value:(a)=>{this.AceEditorRef=a}}),Object.defineProperty(this,'onChange',{enumerable:!0,writable:!0,value:(a)=>{this.setState({value:a});const b=this.props.onValueChange,c=this.state.value;b(c)}}),this.AceEditorRef=null}get ace(){return this.AceEditorRef.editor}componentDidMount(){const a=this.props.autoCompleteFunction,b=new n,c=new s(a),d=k.a.acequire('ace/ext/language_tools');d.setCompleters([b,c])}render(){const a=this.props.uniqueId,b=this.state.value;return Object(d.createElement)(i.a,z({},this.props,{ref:this.setAceEditorRef,mode:'gherkin',value:b,name:a,editorProps:{$blockScrolling:!0},onChange:this.onChange}))}}Object.defineProperty(A,'propTypes',{enumerable:!0,writable:!0,value:{initialValue:g.a.string,uniqueId:g.a.oneOfType([g.a.number,g.a.string]),onValueChange:g.a.func,autoCompleteFunction:g.a.func}}),Object.defineProperty(A,'defaultProps',{enumerable:!0,writable:!0,value:{initialValue:'',uniqueId:Math.random().toString(36).substr(2,9),onValueChange:()=>{},autoCompleteFunction:()=>Promise.resolve([]),theme:'jira',width:'100%',fontSize:14,showPrintMargin:!1,showGutter:!0,highlightActiveLine:!0,setOptions:{fontFamily:`'SFMono-Medium', 'SF Mono', 'Segoe UI Mono', 'Roboto Mono', 'Ubuntu Mono', Menlo, Consolas, Courier, monospace`,enableBasicAutocompletion:!0,enableLiveAutocompletion:!0,showLineNumbers:!0,displayIndentGuides:!0,tabSize:2}}});b['default']=A},function(a){a.exports=require('prop-types')},function(a){a.exports=require('react-ace')},function(a){a.exports=require('brace')},function(a){a.exports=require('lodash')},function(a){a.exports=require('calculate-size')},function(){ace.define('ace/theme/jira',['require','exports','module','ace/lib/dom'],function(a,b){'use strict';b.isDark=!1,b.cssClass='ace-jira',b.cssText=`ace_editor {
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
  background: rgb(244, 245, 247);
  color: rgb(23, 43, 77);
}

.ace-jira .ace_cursor {
  color: black;
}

.ace-jira .ace_invisible {
  color: rgb(191, 191, 191);
}

.ace-jira .ace_storage, .ace-jira .ace_keyword {
  color: rgb(0, 82, 204);
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
  color: rgb(54, 179, 126);
}

.ace-jira .ace_comment {
  color: rgb(80, 95, 121);
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
}`;var c=a('../lib/dom');c.importCssString(b.cssText,b.cssClass)})},function(a){a.exports=require('brace/mode/gherkin')},function(a){a.exports=require('brace/ext/language_tools')}])});
//# sourceMappingURL=GherkinEditor.js.map