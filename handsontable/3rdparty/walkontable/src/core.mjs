function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

import { addClass, fastInnerText, removeClass } from "./../../../helpers/dom/element.mjs";
import { objectEach } from "./../../../helpers/object.mjs";
import { randomString } from "./../../../helpers/string.mjs";
import Event from "./event.mjs";
import Overlays from "./overlays.mjs";
import Scroll from "./scroll.mjs";
import Settings from "./settings.mjs";
import MasterTable from "./table/master.mjs";
import Viewport from "./viewport.mjs";
/**
 * @class Walkontable
 */

var Walkontable = /*#__PURE__*/function () {
  /**
   * @param {object} settings The Walkontable settings.
   */
  function Walkontable(settings) {
    _classCallCheck(this, Walkontable);

    var originalHeaders = []; // this is the namespace for global events

    this.guid = "wt_".concat(randomString());
    this.rootDocument = settings.table.ownerDocument;
    this.rootWindow = this.rootDocument.defaultView; // bootstrap from settings

    if (settings.cloneSource) {
      this.cloneSource = settings.cloneSource;
      this.cloneOverlay = settings.cloneOverlay;
      this.wtSettings = settings.cloneSource.wtSettings;
      this.wtTable = this.cloneOverlay.createTable(this, settings.table);
      this.wtScroll = new Scroll(this);
      this.wtViewport = settings.cloneSource.wtViewport;
      this.wtEvent = new Event(this);
      this.selections = this.cloneSource.selections;
    } else {
      this.wtSettings = new Settings(this, settings);
      this.wtTable = new MasterTable(this, settings.table);
      this.wtScroll = new Scroll(this);
      this.wtViewport = new Viewport(this);
      this.wtEvent = new Event(this);
      this.selections = this.getSetting('selections');
      this.wtOverlays = new Overlays(this);
      this.exportSettingsAsClassNames();
    } // find original headers


    if (this.wtTable.THEAD.childNodes.length && this.wtTable.THEAD.childNodes[0].childNodes.length) {
      for (var c = 0, clen = this.wtTable.THEAD.childNodes[0].childNodes.length; c < clen; c++) {
        originalHeaders.push(this.wtTable.THEAD.childNodes[0].childNodes[c].innerHTML);
      }

      if (!this.getSetting('columnHeaders').length) {
        this.update('columnHeaders', [function (column, TH) {
          fastInnerText(TH, originalHeaders[column]);
        }]);
      }
    }

    this.drawn = false;
    this.drawInterrupted = false;
  }
  /**
   * Force rerender of Walkontable.
   *
   * @param {boolean} [fastDraw=false] When `true`, try to refresh only the positions of borders without rerendering
   *                                   the data. It will only work if Table.draw() does not force
   *                                   rendering anyway.
   * @returns {Walkontable}
   */


  _createClass(Walkontable, [{
    key: "draw",
    value: function draw() {
      var fastDraw = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      this.drawInterrupted = false;

      if (!fastDraw && !this.wtTable.isVisible()) {
        // draw interrupted because TABLE is not visible
        this.drawInterrupted = true;
      } else {
        this.wtTable.draw(fastDraw);
      }

      return this;
    }
    /**
     * Returns the TD at coords. If topmost is set to true, returns TD from the topmost overlay layer,
     * if not set or set to false, returns TD from the master table.
     *
     * @param {CellCoords} coords The cell coordinates.
     * @param {boolean} [topmost=false] If set to `true`, it returns the TD element from the topmost overlay. For example,
     *                                  if the wanted cell is in the range of fixed rows, it will return a TD element
     *                                  from the top overlay.
     * @returns {HTMLElement}
     */

  }, {
    key: "getCell",
    value: function getCell(coords) {
      var topmost = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      if (!topmost) {
        return this.wtTable.getCell(coords);
      }

      var totalRows = this.wtSettings.getSetting('totalRows');
      var fixedRowsTop = this.wtSettings.getSetting('fixedRowsTop');
      var fixedRowsBottom = this.wtSettings.getSetting('fixedRowsBottom');
      var fixedColumns = this.wtSettings.getSetting('fixedColumnsLeft');

      if (coords.row < fixedRowsTop && coords.col < fixedColumns) {
        return this.wtOverlays.topLeftCornerOverlay.clone.wtTable.getCell(coords);
      } else if (coords.row < fixedRowsTop) {
        return this.wtOverlays.topOverlay.clone.wtTable.getCell(coords);
      } else if (coords.col < fixedColumns && coords.row >= totalRows - fixedRowsBottom) {
        if (this.wtOverlays.bottomLeftCornerOverlay && this.wtOverlays.bottomLeftCornerOverlay.clone) {
          return this.wtOverlays.bottomLeftCornerOverlay.clone.wtTable.getCell(coords);
        }
      } else if (coords.col < fixedColumns) {
        return this.wtOverlays.leftOverlay.clone.wtTable.getCell(coords);
      } else if (coords.row < totalRows && coords.row >= totalRows - fixedRowsBottom) {
        if (this.wtOverlays.bottomOverlay && this.wtOverlays.bottomOverlay.clone) {
          return this.wtOverlays.bottomOverlay.clone.wtTable.getCell(coords);
        }
      }

      return this.wtTable.getCell(coords);
    }
    /**
     * @param {object} settings The singular settings to update or if passed as object to merge with.
     * @param {*} value The value to set if the first argument is passed as string.
     * @returns {Walkontable}
     */

  }, {
    key: "update",
    value: function update(settings, value) {
      return this.wtSettings.update(settings, value);
    }
    /**
     * Scrolls the viewport to a cell (rerenders if needed).
     *
     * @param {CellCoords} coords The cell coordinates to scroll to.
     * @param {boolean} [snapToTop] If `true`, viewport is scrolled to show the cell on the top of the table.
     * @param {boolean} [snapToRight] If `true`, viewport is scrolled to show the cell on the right of the table.
     * @param {boolean} [snapToBottom] If `true`, viewport is scrolled to show the cell on the bottom of the table.
     * @param {boolean} [snapToLeft] If `true`, viewport is scrolled to show the cell on the left of the table.
     * @returns {boolean}
     */

  }, {
    key: "scrollViewport",
    value: function scrollViewport(coords, snapToTop, snapToRight, snapToBottom, snapToLeft) {
      if (coords.col < 0 || coords.row < 0) {
        return false;
      }

      return this.wtScroll.scrollViewport(coords, snapToTop, snapToRight, snapToBottom, snapToLeft);
    }
    /**
     * Scrolls the viewport to a column (rerenders if needed).
     *
     * @param {number} column Visual column index.
     * @param {boolean} [snapToRight] If `true`, viewport is scrolled to show the cell on the right of the table.
     * @param {boolean} [snapToLeft] If `true`, viewport is scrolled to show the cell on the left of the table.
     * @returns {boolean}
     */

  }, {
    key: "scrollViewportHorizontally",
    value: function scrollViewportHorizontally(column, snapToRight, snapToLeft) {
      if (column < 0) {
        return false;
      }

      return this.wtScroll.scrollViewportHorizontally(column, snapToRight, snapToLeft);
    }
    /**
     * Scrolls the viewport to a row (rerenders if needed).
     *
     * @param {number} row Visual row index.
     * @param {boolean} [snapToTop] If `true`, viewport is scrolled to show the cell on the top of the table.
     * @param {boolean} [snapToBottom] If `true`, viewport is scrolled to show the cell on the bottom of the table.
     * @returns {boolean}
     */

  }, {
    key: "scrollViewportVertically",
    value: function scrollViewportVertically(row, snapToTop, snapToBottom) {
      if (row < 0) {
        return false;
      }

      return this.wtScroll.scrollViewportVertically(row, snapToTop, snapToBottom);
    }
    /**
     * @returns {Array}
     */

  }, {
    key: "getViewport",
    value: function getViewport() {
      return [this.wtTable.getFirstVisibleRow(), this.wtTable.getFirstVisibleColumn(), this.wtTable.getLastVisibleRow(), this.wtTable.getLastVisibleColumn()];
    }
    /**
     * Get overlay name.
     *
     * @returns {string}
     */

  }, {
    key: "getOverlayName",
    value: function getOverlayName() {
      return this.cloneOverlay ? this.cloneOverlay.type : 'master';
    }
    /**
     * Export settings as class names added to the parent element of the table.
     */

  }, {
    key: "exportSettingsAsClassNames",
    value: function exportSettingsAsClassNames() {
      var _this = this;

      var toExport = {
        rowHeaders: 'htRowHeaders',
        columnHeaders: 'htColumnHeaders'
      };
      var allClassNames = [];
      var newClassNames = [];
      objectEach(toExport, function (className, key) {
        if (_this.getSetting(key).length) {
          newClassNames.push(className);
        }

        allClassNames.push(className);
      });
      removeClass(this.wtTable.wtRootElement.parentNode, allClassNames);
      addClass(this.wtTable.wtRootElement.parentNode, newClassNames);
    }
    /**
     * Get/Set Walkontable instance setting.
     *
     * @param {string} key The settings key to retrieve.
     * @param {*} [param1] Additional parameter passed to the options defined as function.
     * @param {*} [param2] Additional parameter passed to the options defined as function.
     * @param {*} [param3] Additional parameter passed to the options defined as function.
     * @param {*} [param4] Additional parameter passed to the options defined as function.
     * @returns {*}
     */

  }, {
    key: "getSetting",
    value: function getSetting(key, param1, param2, param3, param4) {
      // this is faster than .apply - https://github.com/handsontable/handsontable/wiki/JavaScript-&-DOM-performance-tips
      return this.wtSettings.getSetting(key, param1, param2, param3, param4);
    }
    /**
     * Checks if setting exists.
     *
     * @param {string} key The settings key to check.
     * @returns {boolean}
     */

  }, {
    key: "hasSetting",
    value: function hasSetting(key) {
      return this.wtSettings.has(key);
    }
    /**
     * Destroy instance.
     */

  }, {
    key: "destroy",
    value: function destroy() {
      this.wtOverlays.destroy();
      this.wtEvent.destroy();
    }
  }]);

  return Walkontable;
}();

export default Walkontable;