"use strict";

require("core-js/modules/es.object.keys.js");

require("core-js/modules/es.array.index-of.js");

require("core-js/modules/es.symbol.js");

exports.__esModule = true;
exports.generateMatrix = generateMatrix;

require("core-js/modules/es.array.includes.js");

require("core-js/modules/es.string.includes.js");

var _array = require("../../../helpers/array");

var _utils = require("./utils");

var _excluded = ["crossHiddenColumns"];

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

/**
 * A function that dump a tree structure into multidimensional array. That structure is
 * later processed by header renderers to modify TH elements to achieve a proper
 * DOM structure.
 *
 * That structure contains settings object for every TH element generated by Walkontable.
 * The matrix operates on visual column index.
 *
 * Output example:
 *   [
 *     [
 *       { label: 'A1', colspan: 2, origColspan: 2, isHidden: false, ... },
 *       { label: '', colspan: 1, origColspan: 1, isHidden: true, ... },
 *       { label: '', colspan: 1, origColspan: 1, isHidden: false, ... },
 *     ],
 *     [
 *       { label: 'true', colspan: 1, origColspan: 1, isHidden: false, ... },
 *       { label: 'B2', colspan: 1, origColspan: 1, isHidden: false, ... },
 *       { label: '4', colspan: 1, origColspan: 1, isHidden: false, ... },
 *     ],
 *     [
 *       { label: '', colspan: 1, origColspan: 1, isHidden: false, ... },
 *       { label: '', colspan: 1, origColspan: 1, isHidden: false, ... },
 *       { label: '', colspan: 1, origColspan: 1, isHidden: false, ... },
 *     ],
 *   ]
 *
 * @param {TreeNode[]} headerRoots An array of root nodes.
 * @returns {Array[]}
 */
function generateMatrix(headerRoots) {
  var matrix = [];
  (0, _array.arrayEach)(headerRoots, function (rootNode) {
    rootNode.walkDown(function (node) {
      var nodeData = node.data;
      var origColspan = nodeData.origColspan,
          columnIndex = nodeData.columnIndex,
          headerLevel = nodeData.headerLevel,
          crossHiddenColumns = nodeData.crossHiddenColumns;
      var colspanHeaderLayer = createNestedArrayIfNecessary(matrix, headerLevel);
      var isRootSettingsFound = false;

      for (var i = columnIndex; i < columnIndex + origColspan; i++) {
        var isColumnHidden = crossHiddenColumns.includes(i);

        if (isColumnHidden || isRootSettingsFound) {
          colspanHeaderLayer.push((0, _utils.createPlaceholderHeaderSettings)(nodeData));
        } else {
          var headerRootSettings = createHeaderSettings(nodeData);
          headerRootSettings.isRoot = true;
          colspanHeaderLayer.push(headerRootSettings);
          isRootSettingsFound = true;
        }
      }
    });
  });
  return matrix;
}
/**
 * Creates header settings object.
 *
 * @param {object} nodeData The tree data object.
 * @returns {object}
 */


function createHeaderSettings(nodeData) {
  // For the matrix module we do not need to export "crossHiddenColumns" key. It's redundant here.
  var _createDefaultHeaderS = (0, _utils.createDefaultHeaderSettings)(nodeData),
      crossHiddenColumns = _createDefaultHeaderS.crossHiddenColumns,
      headerRootSettings = _objectWithoutProperties(_createDefaultHeaderS, _excluded);

  return headerRootSettings;
}
/**
 * Internal helper which ensures that subarray exists under specified index.
 *
 * @param {Array[]} array An array to check.
 * @param {number} index An array index under the subarray should be checked.
 * @returns {Array}
 */


function createNestedArrayIfNecessary(array, index) {
  var subArray;

  if (Array.isArray(array[index])) {
    subArray = array[index];
  } else {
    subArray = [];
    array[index] = subArray;
  }

  return subArray;
}