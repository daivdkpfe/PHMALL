var bundle =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 92);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),

/***/ 1:
/***/ (function(module, exports, __webpack_require__) {

/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
  Modified by Evan You @yyx990803
*/

var hasDocument = typeof document !== 'undefined'

if (typeof DEBUG !== 'undefined' && DEBUG) {
  if (!hasDocument) {
    throw new Error(
    'vue-style-loader cannot be used in a non-browser environment. ' +
    "Use { target: 'node' } in your Webpack config to indicate a server-rendering environment."
  ) }
}

var listToStyles = __webpack_require__(3)

/*
type StyleObject = {
  id: number;
  parts: Array<StyleObjectPart>
}

type StyleObjectPart = {
  css: string;
  media: string;
  sourceMap: ?string
}
*/

var stylesInDom = {/*
  [id: number]: {
    id: number,
    refs: number,
    parts: Array<(obj?: StyleObjectPart) => void>
  }
*/}

var head = hasDocument && (document.head || document.getElementsByTagName('head')[0])
var singletonElement = null
var singletonCounter = 0
var isProduction = false
var noop = function () {}

// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
// tags it will allow on a page
var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\b/.test(navigator.userAgent.toLowerCase())

module.exports = function (parentId, list, _isProduction) {
  isProduction = _isProduction

  var styles = listToStyles(parentId, list)
  addStylesToDom(styles)

  return function update (newList) {
    var mayRemove = []
    for (var i = 0; i < styles.length; i++) {
      var item = styles[i]
      var domStyle = stylesInDom[item.id]
      domStyle.refs--
      mayRemove.push(domStyle)
    }
    if (newList) {
      styles = listToStyles(parentId, newList)
      addStylesToDom(styles)
    } else {
      styles = []
    }
    for (var i = 0; i < mayRemove.length; i++) {
      var domStyle = mayRemove[i]
      if (domStyle.refs === 0) {
        for (var j = 0; j < domStyle.parts.length; j++) {
          domStyle.parts[j]()
        }
        delete stylesInDom[domStyle.id]
      }
    }
  }
}

function addStylesToDom (styles /* Array<StyleObject> */) {
  for (var i = 0; i < styles.length; i++) {
    var item = styles[i]
    var domStyle = stylesInDom[item.id]
    if (domStyle) {
      domStyle.refs++
      for (var j = 0; j < domStyle.parts.length; j++) {
        domStyle.parts[j](item.parts[j])
      }
      for (; j < item.parts.length; j++) {
        domStyle.parts.push(addStyle(item.parts[j]))
      }
      if (domStyle.parts.length > item.parts.length) {
        domStyle.parts.length = item.parts.length
      }
    } else {
      var parts = []
      for (var j = 0; j < item.parts.length; j++) {
        parts.push(addStyle(item.parts[j]))
      }
      stylesInDom[item.id] = { id: item.id, refs: 1, parts: parts }
    }
  }
}

function createStyleElement () {
  var styleElement = document.createElement('style')
  styleElement.type = 'text/css'
  head.appendChild(styleElement)
  return styleElement
}

function addStyle (obj /* StyleObjectPart */) {
  var update, remove
  var styleElement = document.querySelector('style[data-vue-ssr-id~="' + obj.id + '"]')

  if (styleElement) {
    if (isProduction) {
      // has SSR styles and in production mode.
      // simply do nothing.
      return noop
    } else {
      // has SSR styles but in dev mode.
      // for some reason Chrome can't handle source map in server-rendered
      // style tags - source maps in <style> only works if the style tag is
      // created and inserted dynamically. So we remove the server rendered
      // styles and inject new ones.
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  if (isOldIE) {
    // use singleton mode for IE9.
    var styleIndex = singletonCounter++
    styleElement = singletonElement || (singletonElement = createStyleElement())
    update = applyToSingletonTag.bind(null, styleElement, styleIndex, false)
    remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true)
  } else {
    // use multi-style-tag mode in all other cases
    styleElement = createStyleElement()
    update = applyToTag.bind(null, styleElement)
    remove = function () {
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  update(obj)

  return function updateStyle (newObj /* StyleObjectPart */) {
    if (newObj) {
      if (newObj.css === obj.css &&
          newObj.media === obj.media &&
          newObj.sourceMap === obj.sourceMap) {
        return
      }
      update(obj = newObj)
    } else {
      remove()
    }
  }
}

var replaceText = (function () {
  var textStore = []

  return function (index, replacement) {
    textStore[index] = replacement
    return textStore.filter(Boolean).join('\n')
  }
})()

function applyToSingletonTag (styleElement, index, remove, obj) {
  var css = remove ? '' : obj.css

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = replaceText(index, css)
  } else {
    var cssNode = document.createTextNode(css)
    var childNodes = styleElement.childNodes
    if (childNodes[index]) styleElement.removeChild(childNodes[index])
    if (childNodes.length) {
      styleElement.insertBefore(cssNode, childNodes[index])
    } else {
      styleElement.appendChild(cssNode)
    }
  }
}

function applyToTag (styleElement, obj) {
  var css = obj.css
  var media = obj.media
  var sourceMap = obj.sourceMap

  if (media) {
    styleElement.setAttribute('media', media)
  }

  if (sourceMap) {
    // https://developer.chrome.com/devtools/docs/javascript-debugging
    // this makes source maps inside style tags work properly in Chrome
    css += '\n/*# sourceURL=' + sourceMap.sources[0] + ' */'
    // http://stackoverflow.com/a/26603875
    css += '\n/*# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + ' */'
  }

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild)
    }
    styleElement.appendChild(document.createTextNode(css))
  }
}


/***/ }),

/***/ 100:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(undefined);
// imports


// module
exports.push([module.i, "\n.change{\r\n    width: 20px;\r\n    height: 20px;\r\n    margin-top: 12px;\r\n    float: left;\n}\n.header{\r\n    position: fixed;\r\n    z-index: 99;\r\n    height: 44px;\r\n    width: 100vw;\n}\n.mb10{\r\n    margin: 0 10px;\r\n    height: 44px;\n}\n.logo{\r\n    width: 60px;\r\n    float: left;\r\n    margin-top: 7px;\n}\n.search_input{\r\n    float: left;\r\n    width: 255px;\r\n    height: 30px;\r\n    border-radius: 6px;\r\n    border: none;\r\n    margin: 7px 10px;\r\n    text-indent: 10px;\n}\ninput::-webkit-input-placeholder{\r\n    text-indent: 10px;\n}    /* 使用webkit内核的浏览器 */\ninput:-moz-placeholder{\r\n    text-indent: 10px;\n}                  /* Firefox版本4-18 */\ninput::-moz-placeholder{\r\n    text-indent: 10px;\n}                  /* Firefox版本19+ */\ninput:-ms-input-placeholder{\r\n    text-indent: 10px;\n}           /* IE浏览器 */\n.orange{\r\nbackground: linear-gradient(to right,#fe9b0c,#ff8000);\n}\r\n\r\n\r\n", ""]);

// exports


/***/ }),

/***/ 101:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["a"] = ({
  props: ['opcity']
});

/***/ }),

/***/ 102:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "header", class: { orange: _vm.opcity } }, [
    _vm._m(0)
  ])
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "mb10" }, [
      _c("img", {
        staticClass: "logo",
        attrs: { src: "images/default_wap/phmall.png", alt: "" }
      }),
      _vm._v(" "),
      _c("input", {
        staticClass: "search_input",
        attrs: { type: "text", placeholder: "请输入关键字" }
      }),
      _vm._v(" "),
      _c("img", {
        staticClass: "change",
        attrs: { src: "images/default_wap/index_change.png", alt: "" }
      })
    ])
  }
]
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-02b4cfc0", esExports)
  }
}

/***/ }),

/***/ 11:
/***/ (function(module, exports) {

module.exports = {
    email_fromName: "PHMALL",
    email_subject: "PHMALL:My Website,My Decision .Let \'s Create Your Own Online Shop !.Verification code for email modification",
    web_src: "../../phpStudy/WWW/english/xx/",
    img_url: "http://192.168.0.105/english/",
    union_img_url: "http://192.168.0.105/english/union/",
    update_url: "http://127.0.0.1:88/update_cache"
};

/***/ }),

/***/ 2:
/***/ (function(module, exports) {

/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file.
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

module.exports = function normalizeComponent (
  rawScriptExports,
  compiledTemplate,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier /* server only */
) {
  var esModule
  var scriptExports = rawScriptExports = rawScriptExports || {}

  // ES6 modules interop
  var type = typeof rawScriptExports.default
  if (type === 'object' || type === 'function') {
    esModule = rawScriptExports
    scriptExports = rawScriptExports.default
  }

  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (compiledTemplate) {
    options.render = compiledTemplate.render
    options.staticRenderFns = compiledTemplate.staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = injectStyles
  }

  if (hook) {
    var functional = options.functional
    var existing = functional
      ? options.render
      : options.beforeCreate

    if (!functional) {
      // inject component registration as beforeCreate hook
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    } else {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return existing(h, context)
      }
    }
  }

  return {
    esModule: esModule,
    exports: scriptExports,
    options: options
  }
}


/***/ }),

/***/ 3:
/***/ (function(module, exports) {

/**
 * Translates the list format produced by css-loader into something
 * easier to manipulate.
 */
module.exports = function listToStyles (parentId, list) {
  var styles = []
  var newStyles = {}
  for (var i = 0; i < list.length; i++) {
    var item = list[i]
    var id = item[0]
    var css = item[1]
    var media = item[2]
    var sourceMap = item[3]
    var part = {
      id: parentId + ':' + i,
      css: css,
      media: media,
      sourceMap: sourceMap
    }
    if (!newStyles[id]) {
      styles.push(newStyles[id] = { id: id, parts: [part] })
    } else {
      newStyles[id].parts.push(part)
    }
  }
  return styles
}


/***/ }),

/***/ 4:
/***/ (function(module, exports) {

/**
 * Created by Administrator on 2017/9/15.
 */
module.exports = {
    //index.js
    //index
    data_err: "數據錯誤",
    _001: '服装鞋包',
    _002: '美妆护理',
    _003: '珠宝手表',
    _004: '母婴玩具',
    _005: '数码家电',
    _006: '家居装修',
    _007: '户外运动',
    _010: '旅游度假',
    _011: '吃喝玩乐',
    _012: '更多分类',
    _013: '限时秒杀',
    index_ad_title: ['折/扣/区', '精/选/区'],
    //address_add
    _014: '管理收货地址',
    _015: '收货人',
    _016: '手机号码',
    _017: '所属地区',
    _018: '邮政编码',
    _019: '街道地区',
    _020: '保存',
    _021: '添加失败',
    _022: '超过地址数量',
    _023: '添加成功',
    //address
    _024: '管理收货地址',
    _025: '收货人',
    _026: '收货地址',
    _027: '删除',
    _028: '编辑',
    _029: '默认地址',
    _030: '添加新地址',
    _031: '删除成功',
    _032: '删除失败'
};

/***/ }),

/***/ 49:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_product_vue__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_0d007bb9_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_product_vue__ = __webpack_require__(53);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(50)
}
var normalizeComponent = __webpack_require__(2)
/* script */

/* template */

/* template functional */
  var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_product_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_0d007bb9_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_product_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "components\\product.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {  return key !== "default" && key.substr(0, 2) !== "__"})) {  console.error("named exports are not supported in *.vue files.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-0d007bb9", Component.options)
  } else {
    hotAPI.reload("data-v-0d007bb9", Component.options)
' + '  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ 5:
/***/ (function(module, exports) {

/**
 * Created by Administrator on 2017/9/15.
 */
module.exports = {
  data_err: "數據錯誤"
};

/***/ }),

/***/ 50:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(51);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(1)("30b459e9", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../node_modules/css-loader/index.js!../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-0d007bb9\",\"scoped\":false,\"hasInlineConfig\":false}!../node_modules/vue-loader/lib/selector.js?type=styles&index=0&bustCache!./product.vue", function() {
     var newContent = require("!!../node_modules/css-loader/index.js!../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-0d007bb9\",\"scoped\":false,\"hasInlineConfig\":false}!../node_modules/vue-loader/lib/selector.js?type=styles&index=0&bustCache!./product.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 51:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(undefined);
// imports


// module
exports.push([module.i, "\n.ppl {\n    width: 355px;\n    margin: 0 auto;\n}\n.right_top_ad {\n    width: 172px;\n    height: 200px;\n}\n.ppl_goods_div {\n    width: 172px;\n    border-radius: 12px;\n    background: white;\n    overflow: hidden;\n}\n.ppl_goods_div img {\n    width: 172px;\n    height: 172px;\n    float: left;\n}\n.ppl_goods_title {\n    width: 152px;\n    padding-left: 10px;\n    font-size: 13px;\n    color: #454545;\n}\n.ppl_goods_price {\n    width: 152px;\n    padding-left: 10px;\n    font-size: 15px;\n    color: #b80a2f;\n}\n", ""]);

// exports


/***/ }),

/***/ 52:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["a"] = ({
     props: ['productname', 'price', 'url', 'img']
});

/***/ }),

/***/ 53:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "ppl_goods_div" }, [
    _c("a", { attrs: { href: _vm.url } }, [
      _c("img", {
        staticClass: "right_top_ad",
        attrs: {
          src: "images/default_wap/load.png",
          "data-src": _vm.img,
          alt: ""
        }
      }),
      _vm._v(" "),
      _c("p", { staticClass: "ppl_goods_title" }, [
        _vm._v(" " + _vm._s(_vm.productname))
      ]),
      _vm._v(" "),
      _c("p", { staticClass: "ppl_goods_price" }, [
        _vm._v(" " + _vm._s(_vm.price) + " ")
      ])
    ])
  ])
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-0d007bb9", esExports)
  }
}

/***/ }),

/***/ 92:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (immutable) */ __webpack_exports__["install"] = install;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_product_vue__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_index_ad_vue__ = __webpack_require__(93);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_index_header_vue__ = __webpack_require__(98);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__lanuage_lanuage_ch__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__lanuage_lanuage_ch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__lanuage_lanuage_ch__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__lanuage_lanuage_en__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__lanuage_lanuage_en___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__lanuage_lanuage_en__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__include_global__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__include_global___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5__include_global__);








var lang = __WEBPACK_IMPORTED_MODULE_3__lanuage_lanuage_ch___default.a;

function install(Vue) {
	Vue.component("product", __WEBPACK_IMPORTED_MODULE_0__components_product_vue__["a" /* default */]);
	Vue.component("ad", __WEBPACK_IMPORTED_MODULE_1__components_index_ad_vue__["a" /* default */]);
	Vue.component("top", __WEBPACK_IMPORTED_MODULE_2__components_index_header_vue__["a" /* default */]);
	var left = 0;
	var right = 1;

	function add_to_ppl(str) {
		if (left < right) {
			page.left_product.push(str);
			left++;
		} else {
			page.right_product.push(str);
			right++;
		}
	}
	var page = new Vue({
		el: '.big_div',
		data: {
			flashs: [],
			coupon: "",
			left: '',
			right: "",
			flash_sales: [],
			goods_num: 0,
			ad1: '',
			ad2s: [],
			ad3: '',
			ad4: '',
			cate1: '',
			cate2: '',
			cate3: '',
			cate4: '',
			cate5: '',
			cate6: '',
			cate7: '',
			cate8: '',
			cate9: '',
			cate10: '',
			cate11: '',
			cate12: '',
			config: __WEBPACK_IMPORTED_MODULE_5__include_global___default.a,
			left_product: [],
			right_product: [],
			right_top_ad_url: '',
			right_top_ad_img: '',
			scrolled: false,
			lang: {}
		},
		mounted: function () {

			if (this.getsetcookie('lang') != 'en') {
				this.lang = __WEBPACK_IMPORTED_MODULE_3__lanuage_lanuage_ch___default.a;
			} else {
				this.lang = __WEBPACK_IMPORTED_MODULE_4__lanuage_lanuage_en___default.a;
			}

			window.addEventListener('scroll', this.handleScroll);
		},
		methods: {
			handleScroll() {
				this.scrolled = window.scrollY > 215;
			},

			setcookie: function (name, value, days) {

				var d = new Date();

				d.setTime(d.getTime() + 24 * 60 * 60 * 1000 * days);

				window.document.cookie = name + "=" + value + ";path=/;expires=" + d.toGMTString();
			},

			getsetcookie: function (name) {

				var v = window.document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');

				return v ? v[2] : null;
			},

			deletesetcookie: function (name) {

				this.set(name, '', -1);
			}
		}

	});
	/*開始處理數據*/
	console.log('xxx');
	$.post("./index", {}, function (result) {
		console.log(result);
		result = result.data;
		page.flashs = result.default_wap_flash;
		/* 		page.coupon = result.default_wap_coupon["0"]; */

		/* 		page.cate1 = result.default_wap_categroy_1["0"];
  		page.cate2 = result.default_wap_categroy_2["0"];
  		page.cate3 = result.default_wap_categroy_3["0"];
  		page.cate4 = result.default_wap_categroy_4["0"];
  		page.cate5 = result.default_wap_categroy_5["0"];
  		page.cate6 = result.default_wap_categroy_6["0"];
  		page.cate7 = result.default_wap_categroy_7["0"];
  		page.cate8 = result.default_wap_categroy_8["0"];
  		page.cate9 = result.default_wap_categroy_9["0"];
  		page.cate10 = result.default_wap_categroy_10["0"];
  		page.cate11 = result.default_wap_categroy_11["0"];
  		page.cate12 = result.default_wap_categroy_12["0"]; */

		var list = {};
		result.default_wap_ad_2.forEach(function (item, index) {

			if (index % 4 == 0) {
				list = {};
				list.left = item;
			} else if (index % 4 == 1) {
				list.right_top = item;
			} else if (index % 4 == 2) {
				list.right_bottom1 = item;
			} else if (index % 4 == 3) {
				list.right_bottom2 = item;
				item.title = lang.index_ad_title[(index + 1) / 4 - 1];
				page.ad2s.push(list);
			}
		});

		page.right_top_ad_url = page.config.img_url + result.default_wap_ad_5['0'].url;
		page.right_top_ad_img = page.config.img_url + result.default_wap_ad_5['0'].pic;
		result.default_wap_hot_shop.forEach(function (item, index) {
			add_to_ppl(item);
		});
	});
	$.post("./index/get_onsale", {}, function (result) {
		result = result.data;
		page.flash_sales = result;
		page.goods_num = result.length * 110 + 20 * 2;
	});

	$(".weui-tabbar").find("a").eq(0).addClass('weui-bar__item--on').find('img').attr('src', './images/default_wap/index1.png');
	/*開始處理數據*/

	$(document).ready(function () {
		$(".swiper-container").swiper({
			loop: true,
			autoplay: 3000,
			//        observer: true,//修改swiper自己或子元素时，自动初始化swiper
			//        observeParents: true//修改swiper的父元素时，自动初始化swiper
			observer: true, //修改swiper自己或子元素时，自动初始化swiper
			observeParents: false, //修改swiper的父元素时，自动初始化swiper
			onSlideChangeEnd: function (swiper) {
				swiper.update();
			}
		});
	});
}

/***/ }),

/***/ 93:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_index_ad_vue__ = __webpack_require__(96);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_653403d6_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_index_ad_vue__ = __webpack_require__(97);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(94)
}
var normalizeComponent = __webpack_require__(2)
/* script */

/* template */

/* template functional */
  var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_index_ad_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_653403d6_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_index_ad_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "components\\index_ad.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {  return key !== "default" && key.substr(0, 2) !== "__"})) {  console.error("named exports are not supported in *.vue files.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-653403d6", Component.options)
  } else {
    hotAPI.reload("data-v-653403d6", Component.options)
' + '  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ 94:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(95);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(1)("401aa66d", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../node_modules/css-loader/index.js!../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-653403d6\",\"scoped\":false,\"hasInlineConfig\":false}!../node_modules/vue-loader/lib/selector.js?type=styles&index=0&bustCache!./index_ad.vue", function() {
     var newContent = require("!!../node_modules/css-loader/index.js!../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-653403d6\",\"scoped\":false,\"hasInlineConfig\":false}!../node_modules/vue-loader/lib/selector.js?type=styles&index=0&bustCache!./index_ad.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 95:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(undefined);
// imports


// module
exports.push([module.i, "\n.ad_img_left{\n    width: 160px;\n    height: 230px;\n    float: left;\n}\n.ad_img_right_top{\n    width: 215px;\n    height: 110px;\n    float: left;\n}\n.ad_img_right_bottom{\n    width: 107px;\n    height: 119px;\n    float: left;\n}\n.mar {\n    margin: 0 auto;\n    height: 44px;\n    display: inline-block;\n    text-align: center;\n    width: 100%;\n    overflow: hidden;\n}\n.title_div {\n    width: 100vw;\n    height: 44px;\n    float: left;\n}\n.title_txt {\n    font-size: 15px;\n    color: #454545;\n    line-height: 44px;\n    text-align: center;\n    display: inline-block;\n    position: relative;\n}\n.title_txt::before {\n    content: \"\";\n    display: block;\n    width: 60px;\n    height: 1px;\n    background: black;\n    line-height: 44px;\n    position: absolute;\n    top: 22px;\n    left: 70px;\n}\n.title_txt::after {\n    content: \"\";\n    display: block;\n    width: 60px;\n    height: 1px;\n    background: black;\n    line-height: 44px;\n    position: absolute;\n    right: 70px;\n    top: 22px;\n}\n.ad_div {\n    width: 100vw;\n    height: 253px;\n}\n", ""]);

// exports


/***/ }),

/***/ 96:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["a"] = ({
    props: ['val', 'imgurl']
});

/***/ }),

/***/ 97:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "fl" }, [
    _c("div", { staticClass: "title_div" }, [
      _c("div", { staticClass: "mar" }, [
        _c("p", { staticClass: "title_txt" }, [
          _vm._v(_vm._s(_vm.val.right_bottom2.title))
        ])
      ])
    ]),
    _vm._v(" "),
    _c("div", { staticClass: "ad_div" }, [
      _c("a", { attrs: { href: _vm.val.left.url } }, [
        _c("img", {
          staticClass: "ad_img_left",
          attrs: {
            src: "images/default_wap/load.png",
            alt: "",
            "data-src": _vm.imgurl + _vm.val.left.pic
          }
        })
      ]),
      _vm._v(" "),
      _c("a", { attrs: { href: _vm.val.left.url } }, [
        _c("img", {
          staticClass: "ad_img_right_top",
          attrs: {
            src: "images/default_wap/load.png",
            alt: "",
            "data-src": _vm.imgurl + _vm.val.right_top.pic
          }
        })
      ]),
      _vm._v(" "),
      _c("a", { attrs: { href: _vm.val.left.url } }, [
        _c("img", {
          staticClass: "ad_img_right_bottom",
          attrs: {
            src: "images/default_wap/load.png",
            alt: "",
            "data-src": _vm.imgurl + _vm.val.right_bottom1.pic
          }
        })
      ]),
      _vm._v(" "),
      _c("a", { attrs: { href: _vm.val.left.url } }, [
        _c("img", {
          staticClass: "ad_img_right_bottom",
          attrs: {
            src: "images/default_wap/load.png",
            alt: "",
            "data-src": _vm.imgurl + _vm.val.right_bottom2.pic
          }
        })
      ])
    ])
  ])
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-653403d6", esExports)
  }
}

/***/ }),

/***/ 98:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_index_header_vue__ = __webpack_require__(101);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_02b4cfc0_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_index_header_vue__ = __webpack_require__(102);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(99)
}
var normalizeComponent = __webpack_require__(2)
/* script */

/* template */

/* template functional */
  var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_index_header_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_02b4cfc0_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_index_header_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "components\\index_header.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {  return key !== "default" && key.substr(0, 2) !== "__"})) {  console.error("named exports are not supported in *.vue files.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-02b4cfc0", Component.options)
  } else {
    hotAPI.reload("data-v-02b4cfc0", Component.options)
' + '  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ 99:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(100);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(1)("639aef74", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../node_modules/css-loader/index.js!../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-02b4cfc0\",\"scoped\":false,\"hasInlineConfig\":false}!../node_modules/vue-loader/lib/selector.js?type=styles&index=0&bustCache!./index_header.vue", function() {
     var newContent = require("!!../node_modules/css-loader/index.js!../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-02b4cfc0\",\"scoped\":false,\"hasInlineConfig\":false}!../node_modules/vue-loader/lib/selector.js?type=styles&index=0&bustCache!./index_header.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ })

/******/ });