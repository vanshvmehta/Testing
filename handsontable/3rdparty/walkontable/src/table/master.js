"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

require("core-js/modules/es.reflect.construct.js");

require("core-js/modules/es.symbol.js");

require("core-js/modules/es.symbol.description.js");

require("core-js/modules/es.object.to-string.js");

require("core-js/modules/es.symbol.iterator.js");

require("core-js/modules/es.array.iterator.js");

require("core-js/modules/es.string.iterator.js");

require("core-js/modules/web.dom-collections.iterator.js");

exports.__esModule = true;
exports.default = void 0;

require("core-js/modules/es.array.includes.js");

require("core-js/modules/es.object.set-prototype-of.js");

require("core-js/modules/es.object.get-prototype-of.js");

var _element = require("./../../../../helpers/dom/element");

var _table = _interopRequireDefault(require("../table"));

var _calculatedRows = _interopRequireDefault(require("./mixin/calculatedRows"));

var _calculatedColumns = _interopRequireDefault(require("./mixin/calculatedColumns"));

var _object = require("./../../../../helpers/object");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

/**
 * Subclass of `Table` that provides the helper methods relevant to the master table (not overlays), implemented through mixins.
 */
var MasterTable = /*#__PURE__*/function (_Table) {
  _inherits(MasterTable, _Table);

  var _super = _createSuper(MasterTable);

  function MasterTable() {
    _classCallCheck(this, MasterTable);

    return _super.apply(this, arguments);
  }

  _createClass(MasterTable, [{
    key: "alignOverlaysWithTrimmingContainer",
    value: function alignOverlaysWithTrimmingContainer() {
      var trimmingElement = (0, _element.getTrimmingContainer)(this.wtRootElement);
      var rootWindow = this.wot.rootWindow;

      if (trimmingElement === rootWindow) {
        var preventOverflow = this.wot.getSetting('preventOverflow');

        if (!preventOverflow) {
          this.holder.style.overflow = 'visible';
          this.wtRootElement.style.overflow = 'visible';
        }
      } else {
        var trimmingElementParent = trimmingElement.parentElement;
        var trimmingHeight = (0, _element.getStyle)(trimmingElement, 'height', rootWindow);
        var trimmingOverflow = (0, _element.getStyle)(trimmingElement, 'overflow', rootWindow);
        var holderStyle = this.holder.style;
        var scrollWidth = trimmingElement.scrollWidth,
            scrollHeight = trimmingElement.scrollHeight;

        var _trimmingElement$getB = trimmingElement.getBoundingClientRect(),
            width = _trimmingElement$getB.width,
            height = _trimmingElement$getB.height;

        var overflow = ['auto', 'hidden', 'scroll'];

        if (trimmingElementParent && overflow.includes(trimmingOverflow)) {
          var cloneNode = trimmingElement.cloneNode(false); // Before calculating the height of the trimming element, set overflow: auto to hide scrollbars.
          // An issue occurred on Firefox, where an empty element with overflow: scroll returns an element height higher than 0px
          // despite an empty content within.

          cloneNode.style.overflow = 'auto';

          if (trimmingElement.nextElementSibling) {
            trimmingElementParent.insertBefore(cloneNode, trimmingElement.nextElementSibling);
          } else {
            trimmingElementParent.appendChild(cloneNode);
          }

          var cloneHeight = parseInt((0, _element.getComputedStyle)(cloneNode, rootWindow).height, 10);
          trimmingElementParent.removeChild(cloneNode);

          if (cloneHeight === 0) {
            height = 0;
          }
        }

        height = Math.min(height, scrollHeight);
        holderStyle.height = trimmingHeight === 'auto' ? 'auto' : "".concat(height, "px");
        width = Math.min(width, scrollWidth);
        holderStyle.width = "".concat(width, "px");
        holderStyle.overflow = '';
        this.hasTableHeight = holderStyle.height === 'auto' ? true : height > 0;
        this.hasTableWidth = width > 0;
      }

      this.isTableVisible = (0, _element.isVisible)(this.TABLE);
    }
  }, {
    key: "markOversizedColumnHeaders",
    value: function markOversizedColumnHeaders() {
      var wot = this.wot;
      var overlayName = wot.getOverlayName();
      var columnHeaders = wot.getSetting('columnHeaders');
      var columnHeadersCount = columnHeaders.length;

      if (columnHeadersCount && !wot.wtViewport.hasOversizedColumnHeadersMarked[overlayName]) {
        var rowHeaders = wot.getSetting('rowHeaders');
        var rowHeaderCount = rowHeaders.length;
        var columnCount = this.getRenderedColumnsCount();

        for (var i = 0; i < columnHeadersCount; i++) {
          for (var renderedColumnIndex = -1 * rowHeaderCount; renderedColumnIndex < columnCount; renderedColumnIndex++) {
            // eslint-disable-line max-len
            this.markIfOversizedColumnHeader(renderedColumnIndex);
          }
        }

        wot.wtViewport.hasOversizedColumnHeadersMarked[overlayName] = true;
      }
    }
  }]);

  return MasterTable;
}(_table.default);

(0, _object.mixin)(MasterTable, _calculatedRows.default);
(0, _object.mixin)(MasterTable, _calculatedColumns.default);
var _default = MasterTable;
exports.default = _default;