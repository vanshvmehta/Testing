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
exports.MultipleSelectionHandles = exports.PLUGIN_PRIORITY = exports.PLUGIN_KEY = void 0;

require("core-js/modules/es.array.splice.js");

require("core-js/modules/es.array.index-of.js");

require("core-js/modules/es.array.slice.js");

require("core-js/modules/es.object.set-prototype-of.js");

require("core-js/modules/es.object.get-prototype-of.js");

var _element = require("../../helpers/dom/element");

var _browser = require("../../helpers/browser");

var _base = require("../base");

var _eventManager = _interopRequireDefault(require("../../eventManager"));

var _src = require("../../3rdparty/walkontable/src");

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

var PLUGIN_KEY = 'multipleSelectionHandles';
exports.PLUGIN_KEY = PLUGIN_KEY;
var PLUGIN_PRIORITY = 160;
/**
 * @private
 * @plugin MultipleSelectionHandles
 * @class MultipleSelectionHandles
 */

exports.PLUGIN_PRIORITY = PLUGIN_PRIORITY;

var MultipleSelectionHandles = /*#__PURE__*/function (_BasePlugin) {
  _inherits(MultipleSelectionHandles, _BasePlugin);

  var _super = _createSuper(MultipleSelectionHandles);

  /**
   * @param {object} hotInstance The handsontable instance.
   */
  function MultipleSelectionHandles(hotInstance) {
    var _this2;

    _classCallCheck(this, MultipleSelectionHandles);

    _this2 = _super.call(this, hotInstance);
    /**
     * @type {Array}
     */

    _this2.dragged = [];
    /**
     * Instance of EventManager.
     *
     * @type {EventManager}
     */

    _this2.eventManager = null;
    /**
     * @type {null}
     */

    _this2.lastSetCell = null;
    return _this2;
  }
  /**
   * Check if the plugin is enabled in the handsontable settings.
   *
   * @returns {boolean}
   */


  _createClass(MultipleSelectionHandles, [{
    key: "isEnabled",
    value: function isEnabled() {
      return (0, _browser.isMobileBrowser)();
    }
    /**
     * Enable plugin for this Handsontable instance.
     */

  }, {
    key: "enablePlugin",
    value: function enablePlugin() {
      if (this.enabled) {
        return;
      }

      if (!this.eventManager) {
        this.eventManager = new _eventManager.default(this);
      }

      this.registerListeners();

      _get(_getPrototypeOf(MultipleSelectionHandles.prototype), "enablePlugin", this).call(this);
    }
    /**
     * Bind the touch events.
     *
     * @private
     */

  }, {
    key: "registerListeners",
    value: function registerListeners() {
      var _this3 = this;

      var _this = this;

      var rootElement = this.hot.rootElement;
      /**
       * @param {string} query Query for the position.
       * @returns {boolean}
       */

      function removeFromDragged(query) {
        if (_this.dragged.length === 1) {
          // clear array
          _this.dragged.splice(0, _this.dragged.length);

          return true;
        }

        var entryPosition = _this.dragged.indexOf(query);

        if (entryPosition === -1) {
          return false;
        } else if (entryPosition === 0) {
          _this.dragged = _this.dragged.slice(0, 1);
        } else if (entryPosition === 1) {
          _this.dragged = _this.dragged.slice(-1);
        }
      }

      this.eventManager.addEventListener(rootElement, 'touchstart', function (event) {
        var selectedRange;

        if ((0, _element.hasClass)(event.target, 'topLeftSelectionHandle-HitArea')) {
          selectedRange = _this.hot.getSelectedRangeLast();

          _this.dragged.push('topLeft');

          _this.touchStartRange = {
            width: selectedRange.getWidth(),
            height: selectedRange.getHeight(),
            direction: selectedRange.getDirection()
          };
          event.preventDefault();
          return false;
        } else if ((0, _element.hasClass)(event.target, 'bottomRightSelectionHandle-HitArea')) {
          selectedRange = _this.hot.getSelectedRangeLast();

          _this.dragged.push('bottomRight');

          _this.touchStartRange = {
            width: selectedRange.getWidth(),
            height: selectedRange.getHeight(),
            direction: selectedRange.getDirection()
          };
          event.preventDefault();
          return false;
        }
      });
      this.eventManager.addEventListener(rootElement, 'touchend', function (event) {
        if ((0, _element.hasClass)(event.target, 'topLeftSelectionHandle-HitArea')) {
          removeFromDragged.call(_this, 'topLeft');
          _this.touchStartRange = void 0;
          event.preventDefault();
          return false;
        } else if ((0, _element.hasClass)(event.target, 'bottomRightSelectionHandle-HitArea')) {
          removeFromDragged.call(_this, 'bottomRight');
          _this.touchStartRange = void 0;
          event.preventDefault();
          return false;
        }
      });
      this.eventManager.addEventListener(rootElement, 'touchmove', function (event) {
        var _this3$hot = _this3.hot,
            rootWindow = _this3$hot.rootWindow,
            rootDocument = _this3$hot.rootDocument;
        var scrollTop = (0, _element.getWindowScrollTop)(rootWindow);
        var scrollLeft = (0, _element.getWindowScrollLeft)(rootWindow);
        var targetCoords;
        var selectedRange;
        var rangeWidth;
        var rangeHeight;
        var rangeDirection;
        var newRangeCoords;

        if (_this.dragged.length === 0) {
          return;
        }

        var endTarget = rootDocument.elementFromPoint(event.touches[0].screenX - scrollLeft, event.touches[0].screenY - scrollTop);

        if (!endTarget || endTarget === _this.lastSetCell) {
          return;
        }

        if (endTarget.nodeName === 'TD' || endTarget.nodeName === 'TH') {
          targetCoords = _this.hot.getCoords(endTarget);

          if (targetCoords.col === -1) {
            targetCoords.col = 0;
          }

          selectedRange = _this.hot.getSelectedRangeLast();
          rangeWidth = selectedRange.getWidth();
          rangeHeight = selectedRange.getHeight();
          rangeDirection = selectedRange.getDirection();

          if (rangeWidth === 1 && rangeHeight === 1) {
            _this.hot.selection.setRangeEnd(targetCoords);
          }

          newRangeCoords = _this.getCurrentRangeCoords(selectedRange, targetCoords, _this.touchStartRange.direction, rangeDirection, _this.dragged[0]);

          if (newRangeCoords.start !== null) {
            _this.hot.selection.setRangeStart(newRangeCoords.start);
          }

          _this.hot.selection.setRangeEnd(newRangeCoords.end);

          _this.lastSetCell = endTarget;
        }

        event.preventDefault();
      });
    }
  }, {
    key: "getCurrentRangeCoords",
    value: function getCurrentRangeCoords(selectedRange, currentTouch, touchStartDirection, currentDirection, draggedHandle) {
      var topLeftCorner = selectedRange.getTopLeftCorner();
      var bottomRightCorner = selectedRange.getBottomRightCorner();
      var bottomLeftCorner = selectedRange.getBottomLeftCorner();
      var topRightCorner = selectedRange.getTopRightCorner();
      var newCoords = {
        start: null,
        end: null
      };

      switch (touchStartDirection) {
        case 'NE-SW':
          switch (currentDirection) {
            case 'NE-SW':
            case 'NW-SE':
              if (draggedHandle === 'topLeft') {
                newCoords = {
                  start: new _src.CellCoords(currentTouch.row, selectedRange.highlight.col),
                  end: new _src.CellCoords(bottomLeftCorner.row, currentTouch.col)
                };
              } else {
                newCoords = {
                  start: new _src.CellCoords(selectedRange.highlight.row, currentTouch.col),
                  end: new _src.CellCoords(currentTouch.row, topLeftCorner.col)
                };
              }

              break;

            case 'SE-NW':
              if (draggedHandle === 'bottomRight') {
                newCoords = {
                  start: new _src.CellCoords(bottomRightCorner.row, currentTouch.col),
                  end: new _src.CellCoords(currentTouch.row, topLeftCorner.col)
                };
              }

              break;

            default:
              break;
          }

          break;

        case 'NW-SE':
          switch (currentDirection) {
            case 'NE-SW':
              if (draggedHandle === 'topLeft') {
                newCoords = {
                  start: currentTouch,
                  end: bottomLeftCorner
                };
              } else {
                newCoords.end = currentTouch;
              }

              break;

            case 'NW-SE':
              if (draggedHandle === 'topLeft') {
                newCoords = {
                  start: currentTouch,
                  end: bottomRightCorner
                };
              } else {
                newCoords.end = currentTouch;
              }

              break;

            case 'SE-NW':
              if (draggedHandle === 'topLeft') {
                newCoords = {
                  start: currentTouch,
                  end: topLeftCorner
                };
              } else {
                newCoords.end = currentTouch;
              }

              break;

            case 'SW-NE':
              if (draggedHandle === 'topLeft') {
                newCoords = {
                  start: currentTouch,
                  end: topRightCorner
                };
              } else {
                newCoords.end = currentTouch;
              }

              break;

            default:
              break;
          }

          break;

        case 'SW-NE':
          switch (currentDirection) {
            case 'NW-SE':
              if (draggedHandle === 'bottomRight') {
                newCoords = {
                  start: new _src.CellCoords(currentTouch.row, topLeftCorner.col),
                  end: new _src.CellCoords(bottomLeftCorner.row, currentTouch.col)
                };
              } else {
                newCoords = {
                  start: new _src.CellCoords(topLeftCorner.row, currentTouch.col),
                  end: new _src.CellCoords(currentTouch.row, bottomRightCorner.col)
                };
              }

              break;
            // case 'NE-SW':
            //
            //  break;

            case 'SW-NE':
              if (draggedHandle === 'topLeft') {
                newCoords = {
                  start: new _src.CellCoords(selectedRange.highlight.row, currentTouch.col),
                  end: new _src.CellCoords(currentTouch.row, bottomRightCorner.col)
                };
              } else {
                newCoords = {
                  start: new _src.CellCoords(currentTouch.row, topLeftCorner.col),
                  end: new _src.CellCoords(topLeftCorner.row, currentTouch.col)
                };
              }

              break;

            case 'SE-NW':
              if (draggedHandle === 'bottomRight') {
                newCoords = {
                  start: new _src.CellCoords(currentTouch.row, topRightCorner.col),
                  end: new _src.CellCoords(topLeftCorner.row, currentTouch.col)
                };
              } else if (draggedHandle === 'topLeft') {
                newCoords = {
                  start: bottomLeftCorner,
                  end: currentTouch
                };
              }

              break;

            default:
              break;
          }

          break;

        case 'SE-NW':
          switch (currentDirection) {
            case 'NW-SE':
            case 'NE-SW':
            case 'SW-NE':
              if (draggedHandle === 'topLeft') {
                newCoords.end = currentTouch;
              }

              break;

            case 'SE-NW':
              if (draggedHandle === 'topLeft') {
                newCoords.end = currentTouch;
              } else {
                newCoords = {
                  start: currentTouch,
                  end: topLeftCorner
                };
              }

              break;

            default:
              break;
          }

          break;

        default:
          break;
      }

      return newCoords;
    }
    /**
     * Check if user is currently dragging the handle.
     *
     * @returns {boolean} Dragging state.
     */

  }, {
    key: "isDragged",
    value: function isDragged() {
      return this.dragged.length > 0;
    }
  }], [{
    key: "PLUGIN_KEY",
    get: function get() {
      return PLUGIN_KEY;
    }
  }, {
    key: "PLUGIN_PRIORITY",
    get: function get() {
      return PLUGIN_PRIORITY;
    }
  }]);

  return MultipleSelectionHandles;
}(_base.BasePlugin);

exports.MultipleSelectionHandles = MultipleSelectionHandles;