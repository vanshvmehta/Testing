import React, { useRef, useEffect, useState } from 'react';

var useInterval = function useInterval(callback, delay) {
  var savedCallback = useRef();
  var id;
  useEffect(function () {
    savedCallback.current = callback;
  }, [callback]);
  useEffect(function () {
    function tick() {
      savedCallback.current();
    }

    if (delay !== null) {
      id = setInterval(tick, delay);
      return function () {
        return clearInterval(id);
      };
    }
  }, [delay]);
  return [id, function () {
    clearInterval(id);
    id = undefined;
  }];
};

var styles = {"hg-elements-flowContainer":"_2zTGM","hg-elements-loadingContainer":"_1EdHE","hg-elements-flow":"_bXEMi","hg-elements-unlinkedFlow":"_1AIGP","hg-elements-linkedFlow":"_1L7zm","hg-elements-source":"_1d_d3","hg-elements-connected":"_2BH0N","hg-elements-imageContainer":"_10jKO"};

var classes = {"hg-elements-lds-ring":"_oZyBO"};

var Loading = function Loading(_ref) {
  var _ref2;

  var side = _ref.side;
  var styles = side ? (_ref2 = {}, _ref2["margin" + side] = '1rem', _ref2) : {};
  return /*#__PURE__*/React.createElement("div", {
    className: classes['hg-elements-lds-ring'],
    style: styles
  }, /*#__PURE__*/React.createElement("div", null), /*#__PURE__*/React.createElement("div", null), /*#__PURE__*/React.createElement("div", null), /*#__PURE__*/React.createElement("div", null));
};

var Settings = function Settings(_ref) {
  var styleOverrides = _ref.styleOverrides;
  return /*#__PURE__*/React.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    enableBackground: "new 0 0 24 24",
    height: "100%",
    viewBox: "0 0 24 24",
    width: "100%",
    fill: "rgba(85, 90, 100, 0.75)",
    style: styleOverrides.settingsIcon
  }, /*#__PURE__*/React.createElement("g", null, /*#__PURE__*/React.createElement("path", {
    d: "M0,0h24v24H0V0z",
    fill: "none"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M19.14,12.94c0.04-0.3,0.06-0.61,0.06-0.94c0-0.32-0.02-0.64-0.07-0.94l2.03-1.58c0.18-0.14,0.23-0.41,0.12-0.61 l-1.92-3.32c-0.12-0.22-0.37-0.29-0.59-0.22l-2.39,0.96c-0.5-0.38-1.03-0.7-1.62-0.94L14.4,2.81c-0.04-0.24-0.24-0.41-0.48-0.41 h-3.84c-0.24,0-0.43,0.17-0.47,0.41L9.25,5.35C8.66,5.59,8.12,5.92,7.63,6.29L5.24,5.33c-0.22-0.08-0.47,0-0.59,0.22L2.74,8.87 C2.62,9.08,2.66,9.34,2.86,9.48l2.03,1.58C4.84,11.36,4.8,11.69,4.8,12s0.02,0.64,0.07,0.94l-2.03,1.58 c-0.18,0.14-0.23,0.41-0.12,0.61l1.92,3.32c0.12,0.22,0.37,0.29,0.59,0.22l2.39-0.96c0.5,0.38,1.03,0.7,1.62,0.94l0.36,2.54 c0.05,0.24,0.24,0.41,0.48,0.41h3.84c0.24,0,0.44-0.17,0.47-0.41l0.36-2.54c0.59-0.24,1.13-0.56,1.62-0.94l2.39,0.96 c0.22,0.08,0.47,0,0.59-0.22l1.92-3.32c0.12-0.22,0.07-0.47-0.12-0.61L19.14,12.94z M12,15.6c-1.98,0-3.6-1.62-3.6-3.6 s1.62-3.6,3.6-3.6s3.6,1.62,3.6,3.6S13.98,15.6,12,15.6z"
  })));
};

var Done = function Done(_ref) {
  var styleOverrides = _ref.styleOverrides;
  return /*#__PURE__*/React.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    height: "100%",
    viewBox: "0 0 24 24",
    width: "100%",
    fill: "#28ED8F",
    style: styleOverrides.doneIcon
  }, /*#__PURE__*/React.createElement("path", {
    d: "M0 0h24v24H0z",
    fill: "none"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"
  }));
};

var Source = function Source(_ref) {
  var _ref$linked = _ref.linked,
      linked = _ref$linked === void 0 ? false : _ref$linked,
      icon = _ref.icon,
      label = _ref.label,
      tenant = _ref.tenant,
      flow = _ref.flow,
      tap = _ref.tap,
      setOpening = _ref.setOpening,
      styleOverrides = _ref.styleOverrides;
  var hotglue = window && window.HotGlue;

  var onClickSource = function onClickSource(e) {
    e.preventDefault();
    setOpening(true);
    hotglue.link(tenant, flow, tap);
  };

  return /*#__PURE__*/React.createElement("div", {
    className: styles['hg-elements-source'],
    onClick: onClickSource,
    style: Object.assign({
      cursor: 'pointer'
    }, linked ? styleOverrides.linkedSource : styleOverrides.unlinkedSource)
  }, /*#__PURE__*/React.createElement("div", {
    className: styles['hg-elements-imageContainer'],
    style: styleOverrides.imageContainer
  }, /*#__PURE__*/React.createElement("img", {
    src: icon
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", null, label), linked ? /*#__PURE__*/React.createElement("div", {
    className: styles['hg-elements-connected'],
    style: styleOverrides.connected
  }, /*#__PURE__*/React.createElement("span", null, "Connected"), /*#__PURE__*/React.createElement(Done, {
    styleOverrides: styleOverrides
  })) : null), linked && /*#__PURE__*/React.createElement("button", {
    onClick: function onClick() {
      return hotglue.link(tenant, flow, tap);
    }
  }, /*#__PURE__*/React.createElement(Settings, {
    styleOverrides: styleOverrides
  })));
};

var Target = function Target(_ref) {
  var _ref$linked = _ref.linked,
      linked = _ref$linked === void 0 ? false : _ref$linked,
      icon = _ref.icon,
      label = _ref.label,
      tenant = _ref.tenant,
      flow = _ref.flow,
      target = _ref.target,
      setOpening = _ref.setOpening,
      styleOverrides = _ref.styleOverrides;
  var hotglue = window && window.HotGlue;

  var onClickSource = function onClickSource(e) {
    e.preventDefault();
    setOpening(true);
    hotglue.link(tenant, flow, target, false, {
      isTarget: true
    });
  };

  return /*#__PURE__*/React.createElement("div", {
    className: styles['hg-elements-source'],
    onClick: onClickSource,
    style: Object.assign({
      cursor: 'pointer'
    }, linked ? styleOverrides.linkedSource : styleOverrides.unlinkedSource)
  }, /*#__PURE__*/React.createElement("div", {
    className: styles['hg-elements-imageContainer'],
    style: styleOverrides.imageContainer
  }, /*#__PURE__*/React.createElement("img", {
    src: icon
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", null, label), linked ? /*#__PURE__*/React.createElement("div", {
    className: styles['hg-elements-connected'],
    style: styleOverrides.connected
  }, /*#__PURE__*/React.createElement("span", null, "Connected"), /*#__PURE__*/React.createElement(Done, {
    styleOverrides: styleOverrides
  })) : null), linked && /*#__PURE__*/React.createElement("button", {
    onClick: function onClick() {
      return hotglue.link(tenant, flow, target, false, {
        isTarget: true
      });
    }
  }, /*#__PURE__*/React.createElement(Settings, {
    styleOverrides: styleOverrides
  })));
};

var Flow = function Flow(_ref) {
  var name = _ref.name,
      description = _ref.description,
      flow = _ref.flow,
      tenant = _ref.tenant,
      setOpening = _ref.setOpening,
      hotglue = _ref.hotglue,
      styleOverrides = _ref.styleOverrides,
      isLinked = _ref.isLinked,
      type = _ref.type;

  var _useState = useState(),
      supportedSources = _useState[0],
      setSupportedSources = _useState[1];

  var _useState2 = useState(),
      supportedTargets = _useState2[0],
      setSupportedTargets = _useState2[1];

  var _useState3 = useState(),
      linkedSources = _useState3[0],
      setLinkedSources = _useState3[1];

  var _useState4 = useState(),
      linkedTargets = _useState4[0],
      setLinkedTargets = _useState4[1];

  var _useState5 = useState(),
      sources = _useState5[0],
      setSources = _useState5[1];

  useEffect(function () {

    (function () {
      try {
        var _temp2 = function () {
          if (!type) {
            return Promise.resolve(hotglue.getLinkedSources(flow, tenant)).then(function (_hotglue$getLinkedSou) {
              setLinkedSources(_hotglue$getLinkedSou);
              return Promise.resolve(hotglue.getSupportedSources(flow)).then(function (_hotglue$getSupported) {
                setSupportedSources(_hotglue$getSupported);
              });
            });
          } else {
            return Promise.resolve(hotglue.getLinkedTargets(flow, tenant)).then(function (_hotglue$getLinkedTar) {
              setLinkedTargets(_hotglue$getLinkedTar);
              return Promise.resolve(hotglue.getSupportedTargets(flow)).then(function (_hotglue$getSupported2) {
                setSupportedTargets(_hotglue$getSupported2);
              });
            });
          }
        }();

        return _temp2 && _temp2.then ? _temp2.then(function () {}) : void 0;
      } catch (e) {
        Promise.reject(e);
      }
    })();
  }, []);

  if (isLinked) {
    useEffect(function () {
      if (linkedSources && !type) {
        var _sources = linkedSources.map(function (_ref2) {
          var icon = _ref2.icon,
              tap = _ref2.tap,
              label = _ref2.label;
          return /*#__PURE__*/React.createElement(Source, {
            key: tap,
            linked: isLinked,
            icon: icon,
            label: label,
            tap: tap,
            tenant: tenant,
            flow: flow,
            setOpening: setOpening,
            styleOverrides: styleOverrides
          });
        });

        setSources(_sources);
      } else if (linkedTargets && type) {
        var _sources2 = linkedTargets.map(function (_ref3) {
          var icon = _ref3.icon,
              target = _ref3.target,
              label = _ref3.label;
          return /*#__PURE__*/React.createElement(Target, {
            key: target,
            linked: isLinked,
            icon: icon,
            label: label,
            target: target,
            tenant: tenant,
            flow: flow,
            setOpening: setOpening,
            styleOverrides: styleOverrides
          });
        });

        setSources(_sources2);
      }
    }, [linkedSources, linkedTargets]);
  } else {
    useEffect(function () {
      if (supportedSources && !type) {
        var _sources = supportedSources.map(function (_ref4) {
          var icon = _ref4.icon,
              tap = _ref4.tap,
              label = _ref4.label;
          return /*#__PURE__*/React.createElement(Source, {
            icon: icon,
            label: label,
            key: tap,
            tap: tap,
            tenant: tenant,
            flow: flow,
            setOpening: setOpening,
            styleOverrides: styleOverrides
          });
        });

        setSources(_sources);
      } else if (supportedTargets && type) {
        var _sources3 = supportedTargets.map(function (_ref5) {
          var icon = _ref5.icon,
              target = _ref5.target,
              label = _ref5.label;
          return /*#__PURE__*/React.createElement(Target, {
            icon: icon,
            label: label,
            key: target,
            target: target,
            tenant: tenant,
            flow: flow,
            setOpening: setOpening,
            styleOverrides: styleOverrides
          });
        });

        setSources(_sources3);
      }
    }, [supportedSources, supportedTargets]);
  }

  return /*#__PURE__*/React.createElement("div", {
    className: isLinked ? styles['hg-elements-flow'] + " " + styles['hg-elements-linkedFlow'] : styles['hg-elements-flow'] + " " + styles['hg-elements-unlinkedFlow'],
    style: isLinked ? styleOverrides.linkedFlow : styleOverrides.unlinkedFlow
  }, /*#__PURE__*/React.createElement("h4", null, name, " data"), /*#__PURE__*/React.createElement("p", null, description), /*#__PURE__*/React.createElement("div", null, sources || /*#__PURE__*/React.createElement(Loading, null)));
};

var Connections = function Connections(_ref) {
  var tenant = _ref.tenant,
      onLink = _ref.onLink,
      onUnlink = _ref.onUnlink,
      _onWidgetClose = _ref.onWidgetClose,
      _onPopupClose = _ref.onPopupClose,
      loadingComponent = _ref.loadingComponent,
      _ref$styleOverrides = _ref.styleOverrides,
      styleOverrides = _ref$styleOverrides === void 0 ? {} : _ref$styleOverrides;

  var _useState = useState(),
      supportedFlows = _useState[0],
      setSupportedFlows = _useState[1];

  var _useState2 = useState(),
      linkedFlows = _useState2[0],
      setLinkedFlows = _useState2[1];

  var _useState3 = useState(true),
      isLoading = _useState3[0],
      setLoading = _useState3[1];

  var _useState4 = useState(false),
      isOpening = _useState4[0],
      setOpening = _useState4[1];

  var _useState5 = useState(false),
      isRefreshing = _useState5[0],
      setRefreshing = _useState5[1];

  var _useState6 = useState(false),
      listenerMounted = _useState6[0],
      setListenerMounted = _useState6[1];

  var hotglue = window && window.HotGlue;

  var _useInterval = useInterval(function () {
    try {
      var _temp2 = function () {
        if (typeof supportedFlows === 'undefined' && hotglue !== null && hotglue !== void 0 && hotglue.hasMounted()) {
          return Promise.resolve(hotglue === null || hotglue === void 0 ? void 0 : hotglue.getSupportedFlows()).then(function (_hotglue$getSupported) {
            setSupportedFlows(_hotglue$getSupported);
          });
        }
      }();

      return Promise.resolve(_temp2 && _temp2.then ? _temp2.then(function () {}) : void 0);
    } catch (e) {
      return Promise.reject(e);
    }
  }, 1000),
      supportedFlowsLoader = _useInterval[0],
      stopSupportedFlowsLoader = _useInterval[1];

  useEffect(function () {
    if (supportedFlows && supportedFlowsLoader) stopSupportedFlowsLoader();
  }, [supportedFlows]);

  var loadingCompleted = function loadingCompleted() {
    if (!isLoading || isRefreshing) return false;
    return supportedFlows && linkedFlows;
  };

  var fetchLinkedFlows = function fetchLinkedFlows(_) {
    if (linkedFlows) return;

    if (hotglue && hotglue.hasMounted()) {
      hotglue.getLinkedFlows(tenant).then(function (_linkedFlows) {
        setLinkedFlows(_linkedFlows);
      });
    } else {
      setTimeout(function () {
        return fetchLinkedFlows();
      }, 1000);
    }
  };

  var refreshData = function refreshData() {
    setLinkedFlows(undefined);
    setSupportedFlows(undefined);
    setRefreshing(false);
  };

  var triggerRefresh = function triggerRefresh() {
    setRefreshing(true);
    setLoading(true);
  };

  useEffect(function (_) {
    if (loadingCompleted()) {
      setLoading(false);
    }

    if (hotglue && hotglue.hasMounted() && !listenerMounted) {
      setListenerMounted(true);
      hotglue.setListener({
        onPopupClose: function onPopupClose(id, flowId) {
          setOpening(false);
          _onPopupClose && _onPopupClose(id, flowId);
        },
        onWidgetClose: function onWidgetClose() {
          setOpening(false);
          _onWidgetClose && _onWidgetClose();
        },
        onSourceLinked: function onSourceLinked(source, flowId) {
          triggerRefresh();
          onLink && onLink(source, flowId);
        },
        onSourceUnlinked: function onSourceUnlinked(source, flowId) {
          triggerRefresh();
          onUnlink && onUnlink(source, flowId);
        },
        onTargetLinked: function onTargetLinked(target, flowId) {
          triggerRefresh();
          onLink && onLink(target, flowId);
        },
        onTargetUnlinked: function onTargetUnlinked(target, flowId) {
          triggerRefresh();
          onUnlink && onUnlink(target, flowId);
        }
      });
    }
  });
  useEffect(function () {
    if (isLoading && isRefreshing) {
      refreshData();
    }
  }, [isLoading, isRefreshing]);
  useEffect(function () {
    if (!linkedFlows) {
      fetchLinkedFlows();
    }
  }, [linkedFlows]);

  if (isLoading || isOpening) {
    return /*#__PURE__*/React.createElement("div", {
      className: styles['hg-elements-loadingContainer'],
      style: styleOverrides.loadingContainer
    }, loadingComponent || /*#__PURE__*/React.createElement(Loading, null));
  }

  var createFlow = function createFlow(sentFlow) {
    var flow = sentFlow.id,
        name = sentFlow.name,
        description = sentFlow.description,
        isLinked = sentFlow.isLinked,
        type = sentFlow.type,
        targets = sentFlow.targets,
        taps = sentFlow.taps;
    return {
      flow: flow,
      name: name,
      description: description,
      isLinked: isLinked,
      type: type,
      targets: targets,
      taps: taps
    };
  };

  var flows = supportedFlows.map(function (supportedFlow) {
    var linkedFlow = linkedFlows.find(function (flow) {
      return flow.id === supportedFlow.id;
    });

    if (linkedFlow) {
      linkedFlow.isLinked = true;
      return createFlow(linkedFlow);
    }

    supportedFlow.isLinked = false;
    return createFlow(supportedFlow);
  });
  flows.sort(function (a, b) {
    if (a.name < b.name) return -1;
    if (a.name > b.name) return 1;
    return 0;
  });
  var flowElements = flows.map(function (_flow) {
    var name = _flow.name,
        description = _flow.description,
        flow = _flow.flow,
        type = _flow.type,
        targets = _flow.targets,
        taps = _flow.taps,
        isLinked = _flow.isLinked;
    return /*#__PURE__*/React.createElement(Flow, {
      name: name,
      description: description,
      tenant: tenant,
      flow: flow,
      hotglue: hotglue,
      key: flow,
      setOpening: setOpening,
      styleOverrides: styleOverrides,
      type: type,
      targets: targets,
      taps: taps,
      isLinked: isLinked
    });
  });
  return /*#__PURE__*/React.createElement("div", {
    className: styles['hg-elements-flowContainer'],
    style: styleOverrides.flowContainer
  }, flowElements);
};

export { Connections };
//# sourceMappingURL=index.modern.js.map
