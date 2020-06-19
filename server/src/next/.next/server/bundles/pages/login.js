module.exports =
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
/******/ 		var threw = true;
/******/ 		try {
/******/ 			modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete installedModules[moduleId];
/******/ 		}
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
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./components/footer/Footer.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Footer; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_antd__ = __webpack_require__("antd");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_antd___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_antd__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react__ = __webpack_require__("react");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react__);
var _jsxFileName = "/app/server/src/next/components/footer/Footer.js";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }




var Footer =
/*#__PURE__*/
function (_Component) {
  _inherits(Footer, _Component);

  function Footer() {
    _classCallCheck(this, Footer);

    return _possibleConstructorReturn(this, (Footer.__proto__ || Object.getPrototypeOf(Footer)).apply(this, arguments));
  }

  _createClass(Footer, [{
    key: "render",
    value: function render() {
      return __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_0_antd__["Layout"].Footer, {
        style: {
          transition: 'opacity 0.5s',
          background: '#fff',
          marginTop: '24px'
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 7
        }
      }, __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement("div", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 14
        }
      }, "\xA9 2018 University of British Columbia and Microsoft Corporation"), __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement("div", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 17
        }
      }, __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement("a", {
        href: "mailto:videx@ece.ubc.ca",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 18
        }
      }, "Support")), __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement("div", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 20
        }
      }, __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement("a", {
        href: "/consent",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 21
        }
      }, "Consent Form")), __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement("div", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 23
        }
      }, __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement("a", {
        href: "/terms",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 24
        }
      }, "Terms of Use")), __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement("div", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 26
        }
      }, __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement("a", {
        href: "/faq",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 27
        }
      }, "FAQ")));
    }
  }]);

  return Footer;
}(__WEBPACK_IMPORTED_MODULE_1_react__["Component"]);



/***/ }),

/***/ "./components/footer/index.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Footer__ = __webpack_require__("./components/footer/Footer.js");

/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_0__Footer__["a" /* default */]);

/***/ }),

/***/ "./components/getting-startted/GettingStarted.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GettingStarted; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_styled_jsx_style__ = __webpack_require__("styled-jsx/style");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_styled_jsx_style___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_styled_jsx_style__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react__ = __webpack_require__("react");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react__);
var _jsxFileName = "/app/server/src/next/components/getting-startted/GettingStarted.js";


function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }



var GettingStarted =
/*#__PURE__*/
function (_Component) {
  _inherits(GettingStarted, _Component);

  function GettingStarted() {
    _classCallCheck(this, GettingStarted);

    return _possibleConstructorReturn(this, (GettingStarted.__proto__ || Object.getPrototypeOf(GettingStarted)).apply(this, arguments));
  }

  _createClass(GettingStarted, [{
    key: "render",
    value: function render() {
      return __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement("div", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 6
        },
        className: "jsx-1002886285"
      }, __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement("p", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 7
        },
        className: "jsx-1002886285"
      }, "You can sign in to ViDeX using a Microsoft account. Signing in will create your unique ViDeX profile. If you are a student who has been invited to ViDeX, please click", ' ', __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement("a", {
        href: "/auth/oauth2/login",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 11
        },
        className: "jsx-1002886285"
      }, __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement("span", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 12
        },
        className: "jsx-1002886285"
      }, "here")), ' ', ". After logging in you can register for your course using the token given by your instructor."), __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement("br", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 17
        },
        className: "jsx-1002886285"
      }), __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement("p", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 18
        },
        className: "jsx-1002886285"
      }, "If you do not have a Microsoft account, you can create one", __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement("a", {
        href: "https://account.microsoft.com/account",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 20
        },
        className: "jsx-1002886285"
      }, __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement("span", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 21
        },
        className: "jsx-1002886285"
      }, " here")), ", or you can create a free Microsoft365 account through UBC IT", __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement("a", {
        href: "https://it.ubc.ca/services/desktop-print-services/software-licensing/office-365-students/install",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 24
        },
        className: "jsx-1002886285"
      }, __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement("span", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 25
        },
        className: "jsx-1002886285"
      }, " here")), "."), __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement("br", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 29
        },
        className: "jsx-1002886285"
      }), __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement("p", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 30
        },
        className: "jsx-1002886285"
      }, "Notes: To use ViDeX, it's not necessary to download and install any Microsoft application."), __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement("br", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 34
        },
        className: "jsx-1002886285"
      }), __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement("p", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 35
        },
        className: "jsx-1002886285"
      }, __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement("a", {
        href: "mailto:videx@ece.ubc.ca?Subject=Help:%20Getting%20Office365%20Account",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 36
        },
        className: "jsx-1002886285"
      }, "Need Help?")), __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_0_styled_jsx_style___default.a, {
        styleId: "1002886285",
        css: "p.jsx-1002886285{font-size:12px;line-height:18px;margin:0em;}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNlcnZlci9zcmMvbmV4dC9jb21wb25lbnRzL2dldHRpbmctc3RhcnR0ZWQvR2V0dGluZ1N0YXJ0ZWQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBdUNvQixBQUc0QixlQUNFLGlCQUNOLFdBQ2IiLCJmaWxlIjoic2VydmVyL3NyYy9uZXh0L2NvbXBvbmVudHMvZ2V0dGluZy1zdGFydHRlZC9HZXR0aW5nU3RhcnRlZC5qcyIsInNvdXJjZVJvb3QiOiIvYXBwIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7IENvbXBvbmVudCB9IGZyb20gJ3JlYWN0JztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR2V0dGluZ1N0YXJ0ZWQgZXh0ZW5kcyBDb21wb25lbnQge1xuICByZW5kZXIoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXY+XG4gICAgICAgIDxwPlxuICAgICAgICAgIFlvdSBjYW4gc2lnbiBpbiB0byBWaURlWCB1c2luZyBhIE1pY3Jvc29mdCBhY2NvdW50LiBTaWduaW5nIGluIHdpbGxcbiAgICAgICAgICBjcmVhdGUgeW91ciB1bmlxdWUgVmlEZVggcHJvZmlsZS4gSWYgeW91IGFyZSBhIHN0dWRlbnQgd2hvIGhhcyBiZWVuXG4gICAgICAgICAgaW52aXRlZCB0byBWaURlWCwgcGxlYXNlIGNsaWNreycgJ31cbiAgICAgICAgICA8YSBocmVmPVwiL2F1dGgvb2F1dGgyL2xvZ2luXCI+XG4gICAgICAgICAgICA8c3Bhbj5oZXJlPC9zcGFuPlxuICAgICAgICAgIDwvYT57JyAnfVxuICAgICAgICAgIC4gQWZ0ZXIgbG9nZ2luZyBpbiB5b3UgY2FuIHJlZ2lzdGVyIGZvciB5b3VyIGNvdXJzZSB1c2luZyB0aGUgdG9rZW5cbiAgICAgICAgICBnaXZlbiBieSB5b3VyIGluc3RydWN0b3IuXG4gICAgICAgIDwvcD5cbiAgICAgICAgPGJyIC8+XG4gICAgICAgIDxwPlxuICAgICAgICAgIElmIHlvdSBkbyBub3QgaGF2ZSBhIE1pY3Jvc29mdCBhY2NvdW50LCB5b3UgY2FuIGNyZWF0ZSBvbmVcbiAgICAgICAgICA8YSBocmVmPVwiaHR0cHM6Ly9hY2NvdW50Lm1pY3Jvc29mdC5jb20vYWNjb3VudFwiPlxuICAgICAgICAgICAgPHNwYW4+IGhlcmU8L3NwYW4+XG4gICAgICAgICAgPC9hPlxuICAgICAgICAgICwgb3IgeW91IGNhbiBjcmVhdGUgYSBmcmVlIE1pY3Jvc29mdDM2NSBhY2NvdW50IHRocm91Z2ggVUJDIElUXG4gICAgICAgICAgPGEgaHJlZj1cImh0dHBzOi8vaXQudWJjLmNhL3NlcnZpY2VzL2Rlc2t0b3AtcHJpbnQtc2VydmljZXMvc29mdHdhcmUtbGljZW5zaW5nL29mZmljZS0zNjUtc3R1ZGVudHMvaW5zdGFsbFwiPlxuICAgICAgICAgICAgPHNwYW4+IGhlcmU8L3NwYW4+XG4gICAgICAgICAgPC9hPlxuICAgICAgICAgIC5cbiAgICAgICAgPC9wPlxuICAgICAgICA8YnIgLz5cbiAgICAgICAgPHA+XG4gICAgICAgICAgTm90ZXM6IFRvIHVzZSBWaURlWCwgaXQncyBub3QgbmVjZXNzYXJ5IHRvIGRvd25sb2FkIGFuZCBpbnN0YWxsIGFueVxuICAgICAgICAgIE1pY3Jvc29mdCBhcHBsaWNhdGlvbi5cbiAgICAgICAgPC9wPlxuICAgICAgICA8YnIgLz5cbiAgICAgICAgPHA+XG4gICAgICAgICAgPGEgaHJlZj1cIm1haWx0bzp2aWRleEBlY2UudWJjLmNhP1N1YmplY3Q9SGVscDolMjBHZXR0aW5nJTIwT2ZmaWNlMzY1JTIwQWNjb3VudFwiPlxuICAgICAgICAgICAgTmVlZCBIZWxwP1xuICAgICAgICAgIDwvYT5cbiAgICAgICAgPC9wPlxuICAgICAgICA8c3R5bGUganN4PntgXG4gICAgICAgICAgcCB7XG4gICAgICAgICAgICBmb250LXNpemU6IDEycHg7XG4gICAgICAgICAgICBsaW5lLWhlaWdodDogMThweDtcbiAgICAgICAgICAgIG1hcmdpbjogMGVtO1xuICAgICAgICAgIH1cbiAgICAgICAgYH08L3N0eWxlPlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuIl19 */\n/*@ sourceURL=server/src/next/components/getting-startted/GettingStarted.js */"
      }));
    }
  }]);

  return GettingStarted;
}(__WEBPACK_IMPORTED_MODULE_1_react__["Component"]);



/***/ }),

/***/ "./components/getting-startted/index.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__GettingStarted__ = __webpack_require__("./components/getting-startted/GettingStarted.js");

/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_0__GettingStarted__["a" /* default */]);

/***/ }),

/***/ "./components/landing-page-buttons/LandingPageButtons.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LandingPageButtons; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_styled_jsx_style__ = __webpack_require__("styled-jsx/style");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_styled_jsx_style___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_styled_jsx_style__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react__ = __webpack_require__("react");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_antd__ = __webpack_require__("antd");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_antd___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_antd__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__getting_startted__ = __webpack_require__("./components/getting-startted/index.js");
var _jsxFileName = "/app/server/src/next/components/landing-page-buttons/LandingPageButtons.js";


function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }




var style = {
  margin: '0.25em'
};

var LandingPageButtons =
/*#__PURE__*/
function (_Component) {
  _inherits(LandingPageButtons, _Component);

  function LandingPageButtons() {
    _classCallCheck(this, LandingPageButtons);

    return _possibleConstructorReturn(this, (LandingPageButtons.__proto__ || Object.getPrototypeOf(LandingPageButtons)).apply(this, arguments));
  }

  _createClass(LandingPageButtons, [{
    key: "render",
    value: function render() {
      return __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement("div", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 12
        },
        className: "jsx-2352521493" + " " + "buttons"
      }, __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement("div", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 13
        },
        className: "jsx-2352521493"
      }, __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2_antd__["Popover"], {
        content: __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3__getting_startted__["a" /* default */], {
          __source: {
            fileName: _jsxFileName,
            lineNumber: 15
          }
        }),
        title: "Getting Started with ViDeX",
        trigger: "click",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 14
        }
      }, __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2_antd__["Button"], {
        style: style,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 19
        }
      }, "Getting Started"))), __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement("div", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 22
        },
        className: "jsx-2352521493"
      }, __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2_antd__["Button"], {
        style: style,
        onClick: function onClick() {
          return window.open('/research');
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 23
        }
      }, "ViDeX Research")), __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement("div", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 27
        },
        className: "jsx-2352521493"
      }, __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2_antd__["Button"], {
        style: style,
        onClick: function onClick() {
          return window.open('/demo');
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 28
        }
      }, "Demo")), __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement("div", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 32
        },
        className: "jsx-2352521493"
      }, __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2_antd__["Button"], {
        style: style,
        onClick: function onClick() {
          return window.open('/faq');
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 33
        }
      }, "FAQ")), __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement("div", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 37
        },
        className: "jsx-2352521493"
      }, __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2_antd__["Button"], {
        type: "primary",
        style: style,
        onClick: function onClick() {
          location.href = '/auth/oauth2/login';
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 38
        }
      }, "Log In with Microsoft Account")), __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_0_styled_jsx_style___default.a, {
        styleId: "2352521493",
        css: ".buttons.jsx-2352521493{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-flex-direction:row;-ms-flex-direction:row;flex-direction:row;-webkit-flex-wrap:wrap;-ms-flex-wrap:wrap;flex-wrap:wrap;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;margin:0.5em 0em;}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNlcnZlci9zcmMvbmV4dC9jb21wb25lbnRzL2xhbmRpbmctcGFnZS1idXR0b25zL0xhbmRpbmdQYWdlQnV0dG9ucy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUErQ29CLEFBRzBCLDBFQUNNLHFFQUNKLHlEQUNRLG1HQUNOLGlCQUNuQiIsImZpbGUiOiJzZXJ2ZXIvc3JjL25leHQvY29tcG9uZW50cy9sYW5kaW5nLXBhZ2UtYnV0dG9ucy9MYW5kaW5nUGFnZUJ1dHRvbnMuanMiLCJzb3VyY2VSb290IjoiL2FwcCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyBDb21wb25lbnQgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBQb3BvdmVyLCBCdXR0b24gfSBmcm9tICdhbnRkJztcbmltcG9ydCBHZXR0aW5nU3RhcnRlZCBmcm9tICcuLi9nZXR0aW5nLXN0YXJ0dGVkJztcblxuY29uc3Qgc3R5bGUgPSB7XG4gIG1hcmdpbjogJzAuMjVlbSdcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIExhbmRpbmdQYWdlQnV0dG9ucyBleHRlbmRzIENvbXBvbmVudCB7XG4gIHJlbmRlcigpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJidXR0b25zXCI+XG4gICAgICAgIDxkaXY+XG4gICAgICAgICAgPFBvcG92ZXJcbiAgICAgICAgICAgIGNvbnRlbnQ9ezxHZXR0aW5nU3RhcnRlZCAvPn1cbiAgICAgICAgICAgIHRpdGxlPVwiR2V0dGluZyBTdGFydGVkIHdpdGggVmlEZVhcIlxuICAgICAgICAgICAgdHJpZ2dlcj1cImNsaWNrXCJcbiAgICAgICAgICA+XG4gICAgICAgICAgICA8QnV0dG9uIHN0eWxlPXtzdHlsZX0+R2V0dGluZyBTdGFydGVkPC9CdXR0b24+XG4gICAgICAgICAgPC9Qb3BvdmVyPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdj5cbiAgICAgICAgICA8QnV0dG9uIHN0eWxlPXtzdHlsZX0gb25DbGljaz17KCkgPT4gd2luZG93Lm9wZW4oJy9yZXNlYXJjaCcpfT5cbiAgICAgICAgICAgIFZpRGVYIFJlc2VhcmNoXG4gICAgICAgICAgPC9CdXR0b24+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2PlxuICAgICAgICAgIDxCdXR0b24gc3R5bGU9e3N0eWxlfSBvbkNsaWNrPXsoKSA9PiB3aW5kb3cub3BlbignL2RlbW8nKX0+XG4gICAgICAgICAgICBEZW1vXG4gICAgICAgICAgPC9CdXR0b24+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2PlxuICAgICAgICAgIDxCdXR0b24gc3R5bGU9e3N0eWxlfSBvbkNsaWNrPXsoKSA9PiB3aW5kb3cub3BlbignL2ZhcScpfT5cbiAgICAgICAgICAgIEZBUVxuICAgICAgICAgIDwvQnV0dG9uPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdj5cbiAgICAgICAgICA8QnV0dG9uXG4gICAgICAgICAgICB0eXBlPVwicHJpbWFyeVwiXG4gICAgICAgICAgICBzdHlsZT17c3R5bGV9XG4gICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7XG4gICAgICAgICAgICAgIGxvY2F0aW9uLmhyZWYgPSAnL2F1dGgvb2F1dGgyL2xvZ2luJztcbiAgICAgICAgICAgIH19XG4gICAgICAgICAgPlxuICAgICAgICAgICAgTG9nIEluIHdpdGggTWljcm9zb2Z0IEFjY291bnRcbiAgICAgICAgICA8L0J1dHRvbj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxzdHlsZSBqc3g+e2BcbiAgICAgICAgICAuYnV0dG9ucyB7XG4gICAgICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICAgICAgZmxleC1kaXJlY3Rpb246IHJvdztcbiAgICAgICAgICAgIGZsZXgtd3JhcDogd3JhcDtcbiAgICAgICAgICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICAgICAgICAgICAgbWFyZ2luOiAwLjVlbSAwZW07XG4gICAgICAgICAgfVxuICAgICAgICBgfTwvc3R5bGU+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG4iXX0= */\n/*@ sourceURL=server/src/next/components/landing-page-buttons/LandingPageButtons.js */"
      }));
    }
  }]);

  return LandingPageButtons;
}(__WEBPACK_IMPORTED_MODULE_1_react__["Component"]);



/***/ }),

/***/ "./components/landing-page-buttons/index.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__LandingPageButtons__ = __webpack_require__("./components/landing-page-buttons/LandingPageButtons.js");

/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_0__LandingPageButtons__["a" /* default */]);

/***/ }),

/***/ "./components/landing-page-header/LandingPageHeader.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Header; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_styled_jsx_style__ = __webpack_require__("styled-jsx/style");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_styled_jsx_style___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_styled_jsx_style__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_antd__ = __webpack_require__("antd");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_antd___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_antd__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react__ = __webpack_require__("react");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__landing_page_buttons__ = __webpack_require__("./components/landing-page-buttons/index.js");
var _jsxFileName = "/app/server/src/next/components/landing-page-header/LandingPageHeader.js";


function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }





var Header =
/*#__PURE__*/
function (_Component) {
  _inherits(Header, _Component);

  function Header() {
    _classCallCheck(this, Header);

    return _possibleConstructorReturn(this, (Header.__proto__ || Object.getPrototypeOf(Header)).apply(this, arguments));
  }

  _createClass(Header, [{
    key: "render",
    value: function render() {
      return __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1_antd__["Layout"].Header, {
        className: "header",
        style: {
          transition: 'opacity 0.5s',
          background: '#fff',
          marginBottom: '24px',
          padding: '0 24px',
          width: '100%'
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 8
        }
      }, __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("div", {
        style: {
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center'
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 18
        },
        className: "jsx-3226345685"
      }, __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("img", {
        alt: "logo",
        src: "/static/logo.png",
        style: {
          height: '31px',
          lineHeight: '31px',
          marginRight: '8px'
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 25
        },
        className: "jsx-3226345685"
      }), __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("span", {
        style: {
          fontSize: '16px',
          fontFamily: "'Raleway', 'Hiragino Sans GB', sans-serif",
          textTransform: 'uppercase'
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 34
        },
        className: "jsx-3226345685"
      }, "ViDeX")), __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3__landing_page_buttons__["a" /* default */], {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 44
        }
      }), __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_0_styled_jsx_style___default.a, {
        styleId: "3226345685",
        css: "@media (min-width:640px){.header{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-flex-direction:row;-ms-flex-direction:row;flex-direction:row;-webkit-align-items:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:justify;-webkit-justify-content:space-between;-ms-flex-pack:justify;justify-content:space-between;}}@media (max-width:640px){.header{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column;-webkit-align-items:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:justify;-webkit-justify-content:space-between;-ms-flex-pack:justify;justify-content:space-between;height:250px;}}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNlcnZlci9zcmMvbmV4dC9jb21wb25lbnRzL2xhbmRpbmctcGFnZS1oZWFkZXIvTGFuZGluZ1BhZ2VIZWFkZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBNEMyQixBQUk0QixBQVFBLDBFQVBNLEFBUUcscUVBUEgsU0FRQSxvRkFQVyxTQVFBLDBHQVBoQyxTQVFlLGFBQ2YiLCJmaWxlIjoic2VydmVyL3NyYy9uZXh0L2NvbXBvbmVudHMvbGFuZGluZy1wYWdlLWhlYWRlci9MYW5kaW5nUGFnZUhlYWRlci5qcyIsInNvdXJjZVJvb3QiOiIvYXBwIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTGF5b3V0IH0gZnJvbSAnYW50ZCc7XG5pbXBvcnQgUmVhY3QsIHsgQ29tcG9uZW50IH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IExhbmRpbmdQYWdlQnV0dG9ucyBmcm9tICcuLi9sYW5kaW5nLXBhZ2UtYnV0dG9ucyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEhlYWRlciBleHRlbmRzIENvbXBvbmVudCB7XG4gIHJlbmRlcigpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPExheW91dC5IZWFkZXJcbiAgICAgICAgY2xhc3NOYW1lPVwiaGVhZGVyXCJcbiAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICB0cmFuc2l0aW9uOiAnb3BhY2l0eSAwLjVzJyxcbiAgICAgICAgICBiYWNrZ3JvdW5kOiAnI2ZmZicsXG4gICAgICAgICAgbWFyZ2luQm90dG9tOiAnMjRweCcsXG4gICAgICAgICAgcGFkZGluZzogJzAgMjRweCcsXG4gICAgICAgICAgd2lkdGg6ICcxMDAlJ1xuICAgICAgICB9fVxuICAgICAgPlxuICAgICAgICA8ZGl2XG4gICAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAgIGRpc3BsYXk6ICdmbGV4JyxcbiAgICAgICAgICAgIGZsZXhEaXJlY3Rpb246ICdyb3cnLFxuICAgICAgICAgICAgYWxpZ25JdGVtczogJ2NlbnRlcidcbiAgICAgICAgICB9fVxuICAgICAgICA+XG4gICAgICAgICAgPGltZ1xuICAgICAgICAgICAgYWx0PVwibG9nb1wiXG4gICAgICAgICAgICBzcmM9XCIvc3RhdGljL2xvZ28ucG5nXCJcbiAgICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICAgIGhlaWdodDogJzMxcHgnLFxuICAgICAgICAgICAgICBsaW5lSGVpZ2h0OiAnMzFweCcsXG4gICAgICAgICAgICAgIG1hcmdpblJpZ2h0OiAnOHB4J1xuICAgICAgICAgICAgfX1cbiAgICAgICAgICAvPlxuICAgICAgICAgIDxzcGFuXG4gICAgICAgICAgICBzdHlsZT17e1xuICAgICAgICAgICAgICBmb250U2l6ZTogJzE2cHgnLFxuICAgICAgICAgICAgICBmb250RmFtaWx5OiBcIidSYWxld2F5JywgJ0hpcmFnaW5vIFNhbnMgR0InLCBzYW5zLXNlcmlmXCIsXG4gICAgICAgICAgICAgIHRleHRUcmFuc2Zvcm06ICd1cHBlcmNhc2UnXG4gICAgICAgICAgICB9fVxuICAgICAgICAgID5cbiAgICAgICAgICAgIFZpRGVYXG4gICAgICAgICAgPC9zcGFuPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPExhbmRpbmdQYWdlQnV0dG9ucyAvPlxuICAgICAgICA8c3R5bGUganN4IGdsb2JhbD57YFxuICAgICAgICAgIEBtZWRpYSAobWluLXdpZHRoOiA2NDBweCkge1xuICAgICAgICAgICAgLmhlYWRlciB7XG4gICAgICAgICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgICAgICAgIGZsZXgtZGlyZWN0aW9uOiByb3c7XG4gICAgICAgICAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgICAgICAgICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgQG1lZGlhIChtYXgtd2lkdGg6IDY0MHB4KSB7XG4gICAgICAgICAgICAuaGVhZGVyIHtcbiAgICAgICAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAgICAgICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgICAgICAgICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICAgICAgICAgICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xuICAgICAgICAgICAgICBoZWlnaHQ6IDI1MHB4O1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgYH08L3N0eWxlPlxuICAgICAgPC9MYXlvdXQuSGVhZGVyPlxuICAgICk7XG4gIH1cbn1cbiJdfQ== */\n/*@ sourceURL=server/src/next/components/landing-page-header/LandingPageHeader.js */"
      }));
    }
  }]);

  return Header;
}(__WEBPACK_IMPORTED_MODULE_2_react__["Component"]);



/***/ }),

/***/ "./components/landing-page-header/index.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__LandingPageHeader__ = __webpack_require__("./components/landing-page-header/LandingPageHeader.js");

/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_0__LandingPageHeader__["a" /* default */]);

/***/ }),

/***/ "./components/landing/Landing.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Landing; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_styled_jsx_style__ = __webpack_require__("styled-jsx/style");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_styled_jsx_style___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_styled_jsx_style__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react__ = __webpack_require__("react");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_Head__ = __webpack_require__("./components/landing/components/Head.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_Features__ = __webpack_require__("./components/landing/components/Features.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_Footer__ = __webpack_require__("./components/landing/components/Footer.js");
var _jsxFileName = "/app/server/src/next/components/landing/Landing.js";


function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }






var Landing =
/*#__PURE__*/
function (_Component) {
  _inherits(Landing, _Component);

  function Landing() {
    _classCallCheck(this, Landing);

    return _possibleConstructorReturn(this, (Landing.__proto__ || Object.getPrototypeOf(Landing)).apply(this, arguments));
  }

  _createClass(Landing, [{
    key: "render",
    value: function render() {
      return __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement("div", {
        style: {
          display: 'flex',
          flexFlow: 'column',
          textAlign: 'center'
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 9
        },
        className: "jsx-2779187209"
      }, __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2__components_Head__["a" /* default */], {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 16
        }
      }), __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3__components_Features__["a" /* default */], {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 17
        }
      }), __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_4__components_Footer__["a" /* default */], {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 18
        }
      }), __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_0_styled_jsx_style___default.a, {
        styleId: "2779187209",
        css: "h1{color:#1890ff;font-size:32px;line-height:48pt;margin:0.5em 0em;}h2{color:#1890ff;font-size:24px;line-height:36px;margin:0.5em 0em;}p{font-size:14px;line-height:21px;margin:0.5em 0em;}@media (min-width:1280px){.row{-webkit-align-items:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;background:#fafbfd;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;padding:3em 20em 3em 20em;}.row.white{-webkit-flex-direction:row;-ms-flex-direction:row;flex-direction:row;background:#fff;}}@media (max-width:1280px){.row{background:#fafbfd;padding:2em 1em;}.row.white{background:#fff;}}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNlcnZlci9zcmMvbmV4dC9jb21wb25lbnRzL2xhbmRpbmcvTGFuZGluZy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFrQjJCLEFBRzJCLEFBTUEsQUFNQyxBQU1NLEFBUUEsQUFNQSxBQUlILGNBbkNILEFBTUEsQ0FNRSxDQXdCakIsR0FKa0IsVUEvQkQsQUFNQSxHQU1BLEdBb0JqQixXQS9CaUIsQUFNQSxHQU1uQixjQVhBLEFBTUEsTUFpQm9CLGdCQUNsQixRQVRlLDBFQUNNLG1CQUNHLDhFQUNDLG1HQUNHLDBCQUM1QiIsImZpbGUiOiJzZXJ2ZXIvc3JjL25leHQvY29tcG9uZW50cy9sYW5kaW5nL0xhbmRpbmcuanMiLCJzb3VyY2VSb290IjoiL2FwcCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyBDb21wb25lbnQgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgSGVhZCBmcm9tICcuL2NvbXBvbmVudHMvSGVhZCc7XG5pbXBvcnQgRmVhdHVyZXMgZnJvbSAnLi9jb21wb25lbnRzL0ZlYXR1cmVzJztcbmltcG9ydCBGb290ZXIgZnJvbSAnLi9jb21wb25lbnRzL0Zvb3Rlcic7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIExhbmRpbmcgZXh0ZW5kcyBDb21wb25lbnQge1xuICByZW5kZXIoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXZcbiAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICBkaXNwbGF5OiAnZmxleCcsXG4gICAgICAgICAgZmxleEZsb3c6ICdjb2x1bW4nLFxuICAgICAgICAgIHRleHRBbGlnbjogJ2NlbnRlcidcbiAgICAgICAgfX1cbiAgICAgID5cbiAgICAgICAgPEhlYWQgLz5cbiAgICAgICAgPEZlYXR1cmVzIC8+XG4gICAgICAgIDxGb290ZXIgLz5cbiAgICAgICAgPHN0eWxlIGpzeCBnbG9iYWw+e2BcbiAgICAgICAgICBoMSB7XG4gICAgICAgICAgICBjb2xvcjogIzE4OTBmZjtcbiAgICAgICAgICAgIGZvbnQtc2l6ZTogMzJweDtcbiAgICAgICAgICAgIGxpbmUtaGVpZ2h0OiA0OHB0O1xuICAgICAgICAgICAgbWFyZ2luOiAwLjVlbSAwZW07XG4gICAgICAgICAgfVxuICAgICAgICAgIGgyIHtcbiAgICAgICAgICAgIGNvbG9yOiAjMTg5MGZmO1xuICAgICAgICAgICAgZm9udC1zaXplOiAyNHB4O1xuICAgICAgICAgICAgbGluZS1oZWlnaHQ6IDM2cHg7XG4gICAgICAgICAgICBtYXJnaW46IDAuNWVtIDBlbTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcCB7XG4gICAgICAgICAgICBmb250LXNpemU6IDE0cHg7XG4gICAgICAgICAgICBsaW5lLWhlaWdodDogMjFweDtcbiAgICAgICAgICAgIG1hcmdpbjogMC41ZW0gMGVtO1xuICAgICAgICAgIH1cbiAgICAgICAgICBAbWVkaWEgKG1pbi13aWR0aDogMTI4MHB4KSB7XG4gICAgICAgICAgICAucm93IHtcbiAgICAgICAgICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICAgICAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAgICAgICAgYmFja2dyb3VuZDogI2ZhZmJmZDtcbiAgICAgICAgICAgICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgICAgICAgICAgICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gICAgICAgICAgICAgIHBhZGRpbmc6IDNlbSAyMGVtIDNlbSAyMGVtO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLnJvdy53aGl0ZSB7XG4gICAgICAgICAgICAgIGZsZXgtZGlyZWN0aW9uOiByb3c7XG4gICAgICAgICAgICAgIGJhY2tncm91bmQ6ICNmZmY7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIEBtZWRpYSAobWF4LXdpZHRoOiAxMjgwcHgpIHtcbiAgICAgICAgICAgIC5yb3cge1xuICAgICAgICAgICAgICBiYWNrZ3JvdW5kOiAjZmFmYmZkO1xuICAgICAgICAgICAgICBwYWRkaW5nOiAyZW0gMWVtO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLnJvdy53aGl0ZSB7XG4gICAgICAgICAgICAgIGJhY2tncm91bmQ6ICNmZmY7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICBgfTwvc3R5bGU+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG4iXX0= */\n/*@ sourceURL=server/src/next/components/landing/Landing.js */"
      }));
    }
  }]);

  return Landing;
}(__WEBPACK_IMPORTED_MODULE_1_react__["Component"]);



/***/ }),

/***/ "./components/landing/components/Features.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Features; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_styled_jsx_style__ = __webpack_require__("styled-jsx/style");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_styled_jsx_style___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_styled_jsx_style__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react__ = __webpack_require__("react");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react__);
var _jsxFileName = "/app/server/src/next/components/landing/components/Features.js";


function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }



var Features =
/*#__PURE__*/
function (_Component) {
  _inherits(Features, _Component);

  function Features() {
    _classCallCheck(this, Features);

    return _possibleConstructorReturn(this, (Features.__proto__ || Object.getPrototypeOf(Features)).apply(this, arguments));
  }

  _createClass(Features, [{
    key: "render",
    value: function render() {
      return __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement("div", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 6
        },
        className: "jsx-3977982294"
      }, __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement("h1", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 7
        },
        className: "jsx-3977982294"
      }, "Textbook tools for video learning"), __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement("div", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 8
        },
        className: "jsx-3977982294" + " " + "row white"
      }, __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement("div", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 9
        },
        className: "jsx-3977982294" + " " + "col"
      }, __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement("img", {
        src: "/static/preview.png",
        alt: "Preview content",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 10
        },
        className: "jsx-3977982294"
      })), __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement("div", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 12
        },
        className: "jsx-3977982294" + " " + "col text left"
      }, __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement("h2", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 13
        },
        className: "jsx-3977982294"
      }, "Preview content"), __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement("p", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 14
        },
        className: "jsx-3977982294"
      }, "Skim content easily by reading the transcript or scanning the filmstrip"))), __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement("div", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 20
        },
        className: "jsx-3977982294" + " " + "row white"
      }, __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement("div", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 21
        },
        className: "jsx-3977982294" + " " + "col text right"
      }, __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement("h2", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 22
        },
        className: "jsx-3977982294"
      }, "Annotate sections"), __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement("p", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 23
        },
        className: "jsx-3977982294"
      }, "Keep track of important content by annotating sections of videos")), __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement("div", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 27
        },
        className: "jsx-3977982294" + " " + "col"
      }, __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement("img", {
        src: "/static/fre/filmstrip.gif",
        alt: "Annotate sections",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 28
        },
        className: "jsx-3977982294"
      }), __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement("img", {
        src: "/static/fre/transcript.gif",
        alt: "Annotate sections",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 29
        },
        className: "jsx-3977982294"
      }))), __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement("div", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 32
        },
        className: "jsx-3977982294" + " " + "row white"
      }, __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement("div", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 33
        },
        className: "jsx-3977982294" + " " + "col"
      }, __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement("img", {
        src: "/static/fre/export.gif",
        alt: "Play highlights",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 34
        },
        className: "jsx-3977982294"
      })), __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement("div", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 36
        },
        className: "jsx-3977982294" + " " + "col text left"
      }, __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement("h2", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 37
        },
        className: "jsx-3977982294"
      }, "Play and Export Annotations"), __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement("p", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 38
        },
        className: "jsx-3977982294"
      }, "Review important content easily by playing annotated sections. You can also export your annotations to a PDF or OneNote page."))), __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_0_styled_jsx_style___default.a, {
        styleId: "3977982294",
        css: ".col.jsx-3977982294{margin:0 4em;text-align:center;max-width:350px;}.text.jsx-3977982294{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column;}.text.right.jsx-3977982294{text-align:right;}.text.left.jsx-3977982294{text-align:left;}.col.jsx-3977982294 img.jsx-3977982294{max-width:350px;}@media (max-width:1280px){.col.jsx-3977982294{max-width:100%;}.text.left.jsx-3977982294{text-align:center;}.text.right.jsx-3977982294{text-align:center;}.col.jsx-3977982294 img.jsx-3977982294{width:100%;margin:0 1em;}}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNlcnZlci9zcmMvbmV4dC9jb21wb25lbnRzL2xhbmRpbmcvY29tcG9uZW50cy9GZWF0dXJlcy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUEyQ29CLEFBRzBCLEFBS0EsQUFJSSxBQUdELEFBR0EsQUFJQyxBQUdHLEFBR0EsQUFHUCxXQUNFLEVBNUJHLEVBbUJsQixDQVBGLEFBR0EsQ0FOQSxDQWFFLEFBR0EsTUFJQSxPQTVCZ0IsZ0JBQ2xCLDJCQUd3Qiw4RUFDeEIiLCJmaWxlIjoic2VydmVyL3NyYy9uZXh0L2NvbXBvbmVudHMvbGFuZGluZy9jb21wb25lbnRzL0ZlYXR1cmVzLmpzIiwic291cmNlUm9vdCI6Ii9hcHAiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgQ29tcG9uZW50IH0gZnJvbSAncmVhY3QnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBGZWF0dXJlcyBleHRlbmRzIENvbXBvbmVudCB7XG4gIHJlbmRlcigpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdj5cbiAgICAgICAgPGgxPlRleHRib29rIHRvb2xzIGZvciB2aWRlbyBsZWFybmluZzwvaDE+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicm93IHdoaXRlXCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2xcIj5cbiAgICAgICAgICAgIDxpbWcgc3JjPVwiL3N0YXRpYy9wcmV2aWV3LnBuZ1wiIGFsdD1cIlByZXZpZXcgY29udGVudFwiIC8+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wgdGV4dCBsZWZ0XCI+XG4gICAgICAgICAgICA8aDI+UHJldmlldyBjb250ZW50PC9oMj5cbiAgICAgICAgICAgIDxwPlxuICAgICAgICAgICAgICBTa2ltIGNvbnRlbnQgZWFzaWx5IGJ5IHJlYWRpbmcgdGhlIHRyYW5zY3JpcHQgb3Igc2Nhbm5pbmcgdGhlXG4gICAgICAgICAgICAgIGZpbG1zdHJpcFxuICAgICAgICAgICAgPC9wPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyb3cgd2hpdGVcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbCB0ZXh0IHJpZ2h0XCI+XG4gICAgICAgICAgICA8aDI+QW5ub3RhdGUgc2VjdGlvbnM8L2gyPlxuICAgICAgICAgICAgPHA+XG4gICAgICAgICAgICAgIEtlZXAgdHJhY2sgb2YgaW1wb3J0YW50IGNvbnRlbnQgYnkgYW5ub3RhdGluZyBzZWN0aW9ucyBvZiB2aWRlb3NcbiAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbFwiPlxuICAgICAgICAgICAgPGltZyBzcmM9XCIvc3RhdGljL2ZyZS9maWxtc3RyaXAuZ2lmXCIgYWx0PVwiQW5ub3RhdGUgc2VjdGlvbnNcIiAvPlxuICAgICAgICAgICAgPGltZyBzcmM9XCIvc3RhdGljL2ZyZS90cmFuc2NyaXB0LmdpZlwiIGFsdD1cIkFubm90YXRlIHNlY3Rpb25zXCIgLz5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicm93IHdoaXRlXCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2xcIj5cbiAgICAgICAgICAgIDxpbWcgc3JjPVwiL3N0YXRpYy9mcmUvZXhwb3J0LmdpZlwiIGFsdD1cIlBsYXkgaGlnaGxpZ2h0c1wiIC8+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wgdGV4dCBsZWZ0XCI+XG4gICAgICAgICAgICA8aDI+UGxheSBhbmQgRXhwb3J0IEFubm90YXRpb25zPC9oMj5cbiAgICAgICAgICAgIDxwPlxuICAgICAgICAgICAgICBSZXZpZXcgaW1wb3J0YW50IGNvbnRlbnQgZWFzaWx5IGJ5IHBsYXlpbmcgYW5ub3RhdGVkIHNlY3Rpb25zLiBZb3VcbiAgICAgICAgICAgICAgY2FuIGFsc28gZXhwb3J0IHlvdXIgYW5ub3RhdGlvbnMgdG8gYSBQREYgb3IgT25lTm90ZSBwYWdlLlxuICAgICAgICAgICAgPC9wPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPHN0eWxlIGpzeD57YFxuICAgICAgICAgIC5jb2wge1xuICAgICAgICAgICAgbWFyZ2luOiAwIDRlbTtcbiAgICAgICAgICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgICAgICAgICAgIG1heC13aWR0aDogMzUwcHg7XG4gICAgICAgICAgfVxuICAgICAgICAgIC50ZXh0IHtcbiAgICAgICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgICAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICAgICAgICAgIH1cbiAgICAgICAgICAudGV4dC5yaWdodCB7XG4gICAgICAgICAgICB0ZXh0LWFsaWduOiByaWdodDtcbiAgICAgICAgICB9XG4gICAgICAgICAgLnRleHQubGVmdCB7XG4gICAgICAgICAgICB0ZXh0LWFsaWduOiBsZWZ0O1xuICAgICAgICAgIH1cbiAgICAgICAgICAuY29sIGltZyB7XG4gICAgICAgICAgICBtYXgtd2lkdGg6IDM1MHB4O1xuICAgICAgICAgIH1cbiAgICAgICAgICBAbWVkaWEgKG1heC13aWR0aDogMTI4MHB4KSB7XG4gICAgICAgICAgICAuY29sIHtcbiAgICAgICAgICAgICAgbWF4LXdpZHRoOiAxMDAlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLnRleHQubGVmdCB7XG4gICAgICAgICAgICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC50ZXh0LnJpZ2h0IHtcbiAgICAgICAgICAgICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLmNvbCBpbWcge1xuICAgICAgICAgICAgICB3aWR0aDogMTAwJTtcbiAgICAgICAgICAgICAgbWFyZ2luOiAwIDFlbTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIGB9PC9zdHlsZT5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cbiJdfQ== */\n/*@ sourceURL=server/src/next/components/landing/components/Features.js */"
      }));
    }
  }]);

  return Features;
}(__WEBPACK_IMPORTED_MODULE_1_react__["Component"]);



/***/ }),

/***/ "./components/landing/components/Footer.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Footer; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__("react");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__landing_page_buttons__ = __webpack_require__("./components/landing-page-buttons/index.js");
var _jsxFileName = "/app/server/src/next/components/landing/components/Footer.js";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }




var Footer =
/*#__PURE__*/
function (_Component) {
  _inherits(Footer, _Component);

  function Footer() {
    _classCallCheck(this, Footer);

    return _possibleConstructorReturn(this, (Footer.__proto__ || Object.getPrototypeOf(Footer)).apply(this, arguments));
  }

  _createClass(Footer, [{
    key: "render",
    value: function render() {
      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("div", {
        className: "row",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 7
        }
      }, __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("h1", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 8
        }
      }, "Invited to a ViDeX course?"), __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("p", {
        style: {
          fontSize: '14px'
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 9
        }
      }, "You can create a profile by signing in with your Microsoft account and register for a course using the course registration token. ViDeX can only be accessed by students using a course registration token. If you do not have a registration token, please ask your instructor to provide you with one."), __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1__landing_page_buttons__["a" /* default */], {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 16
        }
      }));
    }
  }]);

  return Footer;
}(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]);



/***/ }),

/***/ "./components/landing/components/Head.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Head; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_styled_jsx_style__ = __webpack_require__("styled-jsx/style");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_styled_jsx_style___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_styled_jsx_style__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react__ = __webpack_require__("react");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react__);
var _jsxFileName = "/app/server/src/next/components/landing/components/Head.js";


function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }



var Head =
/*#__PURE__*/
function (_Component) {
  _inherits(Head, _Component);

  function Head() {
    _classCallCheck(this, Head);

    return _possibleConstructorReturn(this, (Head.__proto__ || Object.getPrototypeOf(Head)).apply(this, arguments));
  }

  _createClass(Head, [{
    key: "render",
    value: function render() {
      return __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement("div", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 6
        },
        className: "jsx-2707078543" + " " + "row"
      }, __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement("h1", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 7
        },
        className: "jsx-2707078543"
      }, "The smarter way to learn with videos"), __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement("p", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 8
        },
        className: "jsx-2707078543"
      }, "ViDeX brings traditional textbook tools to video learning. This is in closed preview with invited students at the University of British Columbia."), __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement("img", {
        src: "/static/web.png",
        alt: "Screenshot",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 13
        },
        className: "jsx-2707078543"
      }), __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_0_styled_jsx_style___default.a, {
        styleId: "2707078543",
        css: "img.jsx-2707078543{width:100%;margin:2em 0em;}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNlcnZlci9zcmMvbmV4dC9jb21wb25lbnRzL2xhbmRpbmcvY29tcG9uZW50cy9IZWFkLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQWFvQixBQUd3QixXQUNJLGVBQ2pCIiwiZmlsZSI6InNlcnZlci9zcmMvbmV4dC9jb21wb25lbnRzL2xhbmRpbmcvY29tcG9uZW50cy9IZWFkLmpzIiwic291cmNlUm9vdCI6Ii9hcHAiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgQ29tcG9uZW50IH0gZnJvbSAncmVhY3QnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBIZWFkIGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cInJvd1wiPlxuICAgICAgICA8aDE+VGhlIHNtYXJ0ZXIgd2F5IHRvIGxlYXJuIHdpdGggdmlkZW9zPC9oMT5cbiAgICAgICAgPHA+XG4gICAgICAgICAgVmlEZVggYnJpbmdzIHRyYWRpdGlvbmFsIHRleHRib29rIHRvb2xzIHRvIHZpZGVvIGxlYXJuaW5nLiBUaGlzIGlzIGluXG4gICAgICAgICAgY2xvc2VkIHByZXZpZXcgd2l0aCBpbnZpdGVkIHN0dWRlbnRzIGF0IHRoZSBVbml2ZXJzaXR5IG9mIEJyaXRpc2hcbiAgICAgICAgICBDb2x1bWJpYS5cbiAgICAgICAgPC9wPlxuICAgICAgICA8aW1nIHNyYz1cIi9zdGF0aWMvd2ViLnBuZ1wiIGFsdD1cIlNjcmVlbnNob3RcIiAvPlxuICAgICAgICA8c3R5bGUganN4PntgXG4gICAgICAgICAgaW1nIHtcbiAgICAgICAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgICAgICAgbWFyZ2luOiAyZW0gMGVtO1xuICAgICAgICAgIH1cbiAgICAgICAgYH08L3N0eWxlPlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuIl19 */\n/*@ sourceURL=server/src/next/components/landing/components/Head.js */"
      }));
    }
  }]);

  return Head;
}(__WEBPACK_IMPORTED_MODULE_1_react__["Component"]);



/***/ }),

/***/ "./components/landing/index.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Landing__ = __webpack_require__("./components/landing/Landing.js");

/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_0__Landing__["a" /* default */]);

/***/ }),

/***/ "./index.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__("react");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_next_head__ = __webpack_require__("next/head");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_next_head___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_next_head__);
var _jsxFileName = "/app/server/src/next/index.js";


/* harmony default export */ __webpack_exports__["a"] = (function (_ref) {
  var children = _ref.children;
  return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("div", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 4
    }
  }, __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1_next_head___default.a, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 5
    }
  }, __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("meta", {
    name: "viewport",
    content: "width=device-width, initial-scale=1",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 6
    }
  }), __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("meta", {
    charSet: "utf-8",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 7
    }
  }), __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("link", {
    rel: "stylesheet",
    href: "//cdnjs.cloudflare.com/ajax/libs/antd/3.10.1/antd.min.css",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 8
    }
  }), __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("link", {
    rel: "stylesheet",
    href: "//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.3.3/semantic.min.css",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 12
    }
  }), __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("title", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 16
    }
  }, "ViDeX")), children);
});

/***/ }),

/***/ "./pages/login.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return login; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_antd__ = __webpack_require__("antd");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_antd___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_antd__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__index__ = __webpack_require__("./index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react__ = __webpack_require__("react");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_landing_page_header__ = __webpack_require__("./components/landing-page-header/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_landing__ = __webpack_require__("./components/landing/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__components_footer__ = __webpack_require__("./components/footer/index.js");
var _jsxFileName = "/app/server/src/next/pages/login.js";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }








var login =
/*#__PURE__*/
function (_Component) {
  _inherits(login, _Component);

  function login() {
    _classCallCheck(this, login);

    return _possibleConstructorReturn(this, (login.__proto__ || Object.getPrototypeOf(login)).apply(this, arguments));
  }

  _createClass(login, [{
    key: "render",
    value: function render() {
      return __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1__index__["a" /* default */], {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 11
        }
      }, __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_0_antd__["Layout"], {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 12
        }
      }, __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3__components_landing_page_header__["a" /* default */], {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 13
        }
      }), __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_0_antd__["Layout"].Content, {
        style: {
          background: '#fff'
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 14
        }
      }, __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_4__components_landing__["a" /* default */], {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 19
        }
      })), __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_5__components_footer__["a" /* default */], {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 21
        }
      })));
    }
  }]);

  return login;
}(__WEBPACK_IMPORTED_MODULE_2_react__["Component"]);



/***/ }),

/***/ 3:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("./pages/login.js");


/***/ }),

/***/ "antd":
/***/ (function(module, exports) {

module.exports = require("antd");

/***/ }),

/***/ "next/head":
/***/ (function(module, exports) {

module.exports = require("next/head");

/***/ }),

/***/ "react":
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),

/***/ "styled-jsx/style":
/***/ (function(module, exports) {

module.exports = require("styled-jsx/style");

/***/ })

/******/ });
//# sourceMappingURL=login.js.map