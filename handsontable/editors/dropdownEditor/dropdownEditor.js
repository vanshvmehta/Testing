"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

require("core-js/modules/es.reflect.construct.js");

require("core-js/modules/es.reflect.get.js");

require("core-js/modules/es.object.get-own-property-descriptor.js");

require("core-js/modules/es.symbol.js");

require("core-js/modules/es.symbol.description.js");

require("core-js/modules/es.object.to-string.js");

require("core-js/modules/es.symbol.iterator.js");

require("core-js/modules/es.array.iterator.js");

require("core-js/modules/es.string.iterator.js");

require("core-js/modules/web.dom-collections.iterator.js");

exports.__esModule = true;
exports.DropdownEditor = exports.EDITOR_TYPE = void 0;

require("core-js/modules/es.array.filter.js");

require("core-js/modules/es.object.set-prototype-of.js");

require("core-js/modules/es.object.get-prototype-of.js");

var _autocompleteEditor = require("../autocompleteEditor");

var _pluginHooks = _interopRequireDefault(require("../../pluginHooks"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var EDITOR_TYPE = 'dropdown';
/**
 * @private
 * @class DropdownEditor
 */

exports.EDITOR_TYPE = EDITOR_TYPE;

var DropdownEditor = /*#__PURE__*/function (_AutocompleteEditor) {
  _inherits(DropdownEditor, _AutocompleteEditor);

  var _super = _createSuper(DropdownEditor);

  function DropdownEditor() {
    _classCallCheck(this, DropdownEditor);

    return _super.apply(this, arguments);
  }

  _createClass(DropdownEditor, [{
    key: "prepare",
    value:
    /**
     * @param {number} row The visual row index.
     * @param {number} col The visual column index.
     * @param {number|string} prop The column property (passed when datasource is an array of objects).
     * @param {HTMLTableCellElement} td The rendered cell element.
     * @param {*} value The rendered value.
     * @param {object} cellProperties The cell meta object ({@see Core#getCellMeta}).
     */
    function prepare(row, col, prop, td, value, cellProperties) {
      _get(_getPrototypeOf(DropdownEditor.prototype), "prepare", this).call(this, row, col, prop, td, value, cellProperties);

      this.cellProperties.filter = false;
      this.cellProperties.strict = true;
    }
  }], [{
    key: "EDITOR_TYPE",
    get: function get() {
      return EDITOR_TYPE;
    }
  }]);

  return DropdownEditor;
}(_autocompleteEditor.AutocompleteEditor);

exports.DropdownEditor = DropdownEditor;

_pluginHooks.default.getSingleton().add('beforeValidate', function (value, row, col) {
  var cellMeta = this.getCellMeta(row, this.propToCol(col));

  if (cellMeta.editor === DropdownEditor) {
    if (cellMeta.strict === void 0) {
      cellMeta.filter = false;
      cellMeta.strict = true;
    }
  }
});