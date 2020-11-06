'use strict';Object.defineProperty(exports,'__esModule',{value:true});function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function (obj) {
      return typeof obj;
    };
  } else {
    _typeof = function (obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;

  try {
    Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _possibleConstructorReturn(self, call) {
  if (call && (typeof call === "object" || typeof call === "function")) {
    return call;
  }

  return _assertThisInitialized(self);
}

function _createSuper(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct();

  return function _createSuperInternal() {
    var Super = _getPrototypeOf(Derived),
        result;

    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf(this).constructor;

      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }

    return _possibleConstructorReturn(this, result);
  };
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _createForOfIteratorHelper(o, allowArrayLike) {
  var it;

  if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) {
    if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
      if (it) o = it;
      var i = 0;

      var F = function () {};

      return {
        s: F,
        n: function () {
          if (i >= o.length) return {
            done: true
          };
          return {
            done: false,
            value: o[i++]
          };
        },
        e: function (e) {
          throw e;
        },
        f: F
      };
    }

    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  var normalCompletion = true,
      didErr = false,
      err;
  return {
    s: function () {
      it = o[Symbol.iterator]();
    },
    n: function () {
      var step = it.next();
      normalCompletion = step.done;
      return step;
    },
    e: function (e) {
      didErr = true;
      err = e;
    },
    f: function () {
      try {
        if (!normalCompletion && it.return != null) it.return();
      } finally {
        if (didErr) throw err;
      }
    }
  };
}var SelectionContext = /*#__PURE__*/function () {
  function SelectionContext(value) {
    _classCallCheck(this, SelectionContext);

    this.selection = {};
    this.count = 0;
    this._lastActiveKeyword = null;
    this._lastActiveKeywordIndex = -1;
    this.value = [];
    this.setValue(value);
  }

  _createClass(SelectionContext, [{
    key: "getIndexOfKeyword",
    value: function getIndexOfKeyword(keyword) {
      return this.value.indexOf(keyword);
    }
  }, {
    key: "getFirstSelectedIndex",
    value: function getFirstSelectedIndex() {
      if (!this.value) return -1;

      for (var index = 0; index < this.value.length; index++) {
        var v = this.value[index];

        if (this.selection.hasOwnProperty(v) && this.selection[v]) {
          return index;
        }
      }

      return -1;
    }
  }, {
    key: "getLastSelectedIndex",
    value: function getLastSelectedIndex() {
      if (!this.value) return -1;

      for (var index = this.value.length - 1; index >= 0; index--) {
        var v = this.value[index];

        if (this.selection.hasOwnProperty(v) && this.selection[v]) {
          return index;
        }
      }

      return -1;
    }
  }, {
    key: "setValue",
    value: function setValue(value) {
      var _this = this;

      this.value = value ? value : [];
      if (!value) return;
      var new_selection = {};
      var new_count = 0;
      value.forEach(function (v, i) {
        if (_this.selection.hasOwnProperty(v) && _this.selection[v]) {
          new_selection[v] = true;
          new_count++;
        }
      });
      this.selection = new_selection;
      this.count = new_count;
    }
  }, {
    key: "isSelected",
    value: function isSelected(title_keyword) {
      return this.selection.hasOwnProperty(title_keyword) && this.selection[title_keyword];
    }
  }, {
    key: "isSelectedByIndex",
    value: function isSelectedByIndex(index) {
      if (index >= this.value.length || index < 0) return false;
      return this.isSelected(this.value[index]);
    }
  }, {
    key: "selectKeyword",
    value: function selectKeyword(title_keyword) {
      var append = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      if (!title_keyword) return;
      var new_selection = append ? _objectSpread2({}, this.selection) : {};
      new_selection[title_keyword] = true;
      this.selection = new_selection;
      this.count = append ? this.count + 1 : 1;
    }
  }, {
    key: "selectKeywordsArray",
    value: function selectKeywordsArray(keywords) {
      var _this2 = this;

      var append = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      if (keywords.length === 0) return;
      var new_selection = append ? _objectSpread2({}, this.selection) : {};
      if (!append) this.count = 0;
      keywords.forEach(function (kwd) {
        if (!new_selection[kwd]) {
          new_selection[kwd] = true;
          _this2.count++;
        }
      });
      this.selection = new_selection;
    }
  }, {
    key: "clear",
    value: function clear() {
      if (this.count === 0) return;
      this.selection = {};
      this.count = 0;
    }
  }, {
    key: "selectAll",
    value: function selectAll() {
      var new_selection = {};

      var _iterator = _createForOfIteratorHelper(this.value),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var v = _step.value;
          new_selection[v] = true;
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      this.selection = new_selection;
      this.count = this.value.length;
    }
  }, {
    key: "deselectKeyword",
    value: function deselectKeyword(title_keyword) {
      var append = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      if (!title_keyword) return;

      if (!append) {
        this.selection = {};
        this.count = 0;
      } else {
        if (this.selection.hasOwnProperty(title_keyword) && this.selection[title_keyword]) {
          this.selection = _objectSpread2(_objectSpread2({}, this.selection), {}, _defineProperty({}, title_keyword, false));
          this.count--;
        }
      }
    }
  }, {
    key: "setSelectedState",
    value: function setSelectedState(title_keyword, selected) {
      var append = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      if (selected) this.selectKeyword(title_keyword, append);else this.deselectKeyword(title_keyword, append);
    }
  }, {
    key: "setSelectedStateByIndex",
    value: function setSelectedStateByIndex(index, selected) {
      var append = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      if (index >= this.value.length || index < 0) return;
      if (selected) this.selectKeyword(this.value[index], append);else this.deselectKeyword(this.value[index], append);
    }
  }, {
    key: "selectRangeByIndexes",
    value: function selectRangeByIndexes(start_index, end_index) {
      var append = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

      if (start_index > end_index) {
        var tmp = start_index;
        start_index = end_index;
        end_index = tmp;
      }

      var new_selection = append ? _objectSpread2({}, this.selection) : {};
      var new_count = append ? this.count : 0;

      for (var i = Math.max(start_index, 0); i <= Math.min(end_index, this.value.length - 1); i++) {
        if (!new_selection.hasOwnProperty(this.value[i]) || !new_selection[this.value[i]]) {
          new_selection[this.value[i]] = true;
          new_count++;
        }
      }

      this.selection = new_selection;
      this.count = new_count;
    }
  }, {
    key: "getSiblingKeyword",
    value: function getSiblingKeyword(index, dir) {
      if (dir === 0) return index < this.value.length && index >= 0 ? this.value[index] : null;else if (dir > 0) return index < this.value.length - 1 ? this.value[index + 1] : null;else return index > 0 ? this.value[index - 1] : null;
    }
  }, {
    key: "getActiveSiblingKeyword",
    value: function getActiveSiblingKeyword(dir) {
      return this.getSiblingKeyword(this.lastActiveKeywordIndex, dir);
    }
  }, {
    key: "getSelectionAsArray",
    value: function getSelectionAsArray() {
      var _this3 = this;

      if (this.count === 0) return [];
      return this.value.filter(function (v) {
        return _this3.selection.hasOwnProperty(v) && _this3.selection[v];
      });
    }
  }, {
    key: "lastActiveKeyword",
    get: function get() {
      return this._lastActiveKeyword;
    },
    set: function set(keyword) {
      this._lastActiveKeyword = keyword;

      if (keyword) {
        this._lastActiveKeywordIndex = this.getIndexOfKeyword(keyword);
        if (this._lastActiveKeywordIndex < 0) this._lastActiveKeyword = null;
      } else this._lastActiveKeywordIndex = -1;
    }
  }, {
    key: "lastActiveKeywordIndex",
    get: function get() {
      return this._lastActiveKeywordIndex;
    },
    set: function set(index) {
      if (this.value.length > 0) {
        if (index < 0) index = 0;else if (index > this.value.length - 1) index = this.value.length - 1;
        this._lastActiveKeywordIndex = index;
        this._lastActiveKeyword = this.value[index];
      } else {
        this._lastActiveKeywordIndex = -1;
        this._lastActiveKeyword = null;
      }
    }
  }]);

  return SelectionContext;
}();function nodeHasClass(node, class_name) {
  if (!node) return false;

  if (node.classList !== undefined) {
    if (node.classList.contains(class_name)) return true;
  } else if (node.className === undefined) return false;else if (node.className === class_name) return true;else {
    // check all classes
    var classes = node.className.split(/\s/);

    if (classes.some(function (c) {
      return c.trim() === class_name;
    })) {
      return true;
    }
  }

  return false;
}
function getClosestNodeByClass(node, class_name) {
  if (typeof window === 'undefined') return null;

  while (node) {
    if (node === document) return null;
    if (nodeHasClass(node, class_name)) return node;
    node = node.parentNode;
  }

  return null;
}
function removeNodeFromDOM(node) {
  if (!node) return;
  if (node.remove !== undefined) node.remove();else node.parentNode.removeChild(node);
}var computedPlatforms = null;
function isPlatform(name) {
  if (!window || !window.navigator) return false;

  if (!computedPlatforms) {
    var ua = window.navigator.userAgent;
    var ie = /Edge\/|Trident\/|MSIE /.test(ua);
    var ios = !ie && /AppleWebKit/.test(ua) && /Mobile\/\w+/.test(ua);
    var mac = ios || /mac/i.test(window.navigator.platform);
    var safari = /apple/i.test(window.navigator.vendor);
    var mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(window.navigator.userAgent);
    computedPlatforms = {
      ie: ie,
      mac: mac,
      safari: safari,
      ios: ios,
      mobile: mobile
    };
  }

  return computedPlatforms[name];
}
function isPlatformCtrlClick(e) {
  var flip = isPlatform('mac');
  return flip ? e.metaKey : e.ctrlKey;
}var InteractionContext = /*#__PURE__*/function () {
  function InteractionContext(component, event, destroyed, is_dragging) {
    _classCallCheck(this, InteractionContext);

    if (!component.$el) throw new Error('ImsKeywordBox interaction context: Master component is not mounted');
    this.isDragging = is_dragging;
    this.component = component;
    this.startTime = Date.now();
    this.startElement = event.target;
    this.destroyed = destroyed;
    this.draggingMyKeywords = [];
    this.draggingCanvas = null;
    this.invalidateCache();
    this.resetEventHandlers(this.isDragging, false);
    this.startPoint = this.getMousePointInfo(event);
    this.curPoint = this.startPoint;
  }

  _createClass(InteractionContext, [{
    key: "invalidateCache",
    value: function invalidateCache() {
      this._cacheKeywordsElems = null;
      this._cacheKeywordsBounds = {};
    }
  }, {
    key: "onMouseEnd",
    value: function onMouseEnd(e) {
      if (this.component.isMobile) e.preventDefault();
      this.curPoint = this.getMousePointInfo(e);

      if (this.isDragging) {
        if (e.dataTransfer.dropEffect === 'move') {
          this.deleteDraggingMyKeywords();
        }
      } else {
        if (this.startElement === e.target) {
          this.keywordClick(this.curPoint, e);
        }
      }

      this.destroy();
    }
  }, {
    key: "onMouseUpdate",
    value: function onMouseUpdate(e) {
      if (this.component.isMobile) return;
      var is_ctrl = isPlatformCtrlClick(e);
      this.curPoint = this.getMousePointInfo(e);

      if (this.isDragging) {
        var isText = e.dataTransfer.types.includes("text/plain");
        if (isText) e.preventDefault();
        this.component.dragKeywordPosition = this.curPoint.kwdIndex;
        this.component.dragKeywordIsBegin = false;

        if (this.curPoint.hoverKwdElement) {
          var kwd_bounds = this._getKeywordBounds(this.curPoint.kwdIndex);

          if (kwd_bounds && kwd_bounds.left + kwd_bounds.width / 2 > e.clientX) {
            this.component.dragKeywordIsBegin = true;
          }
        }
      } else {
        if (!this.startPoint.hoverKwdElement) {
          var start_index = this.startPoint.kwdIndex + this.startPoint.offset;

          if (this.startPoint.kwdIndex === this.curPoint.kwdIndex) {
            if (!is_ctrl) {
              if (this.component.selectedKeywords.count > 0) this.component.selectedKeywords.clear();
              this.component.cursorPosition = start_index;
            }
          } else {
            this.component.cursorPosition = -1;
            if (start_index > this.curPoint.kwdIndex) start_index--;
            var end_index = this.curPoint.kwdIndex;
            if (this.curPoint.outside !== 0) end_index++;
            this.component.selectedKeywords.lastActiveKeywordIndex = start_index;
            this.component.selectedKeywords.selectRangeByIndexes(start_index, end_index, is_ctrl);
          }
        }
      }
    }
  }, {
    key: "keywordClick",
    value: function keywordClick(point_info, e) {
      if (point_info.delButton) return;
      var is_ctrl = isPlatformCtrlClick(e);
      var clicked_keyword_index = point_info.kwdIndex;
      var clicked_separator_pos = -1;
      var last_active_index = this.component.cursorPosition === -1 ? this.component.selectedKeywords.lastActiveKeywordIndex : this.component.cursorPosition;

      if (!point_info.hoverKwdElement) {
        if (!e.shiftKey && is_ctrl) {
          return; // ignore
        }

        if (e.shiftKey) {
          if (last_active_index > point_info.kwdIndex) {
            clicked_keyword_index++;
          }
        } else {
          clicked_keyword_index = -1;
          clicked_separator_pos = point_info.kwdIndex + point_info.offset;
        }
      }

      var button_allowed = e.button === 0;
      if (e.button === 2) button_allowed = this.component.selectedKeywords.count > 0;

      if (clicked_keyword_index >= 0 && button_allowed) {
        if (e.shiftKey) {
          if (this.component.cursorPosition !== -1) {
            if (clicked_keyword_index < last_active_index) last_active_index--;
            this.component.selectedKeywords.lastActiveKeywordIndex = last_active_index;
          }

          this.component.selectedKeywords.selectRangeByIndexes(last_active_index, clicked_keyword_index, is_ctrl);
        } else {
          var already_selected = this.component.selectedKeywords.isSelectedByIndex(clicked_keyword_index);

          if (is_ctrl) {
            this.component.selectedKeywords.setSelectedStateByIndex(clicked_keyword_index, !already_selected, true);
          } else {
            if (!already_selected) {
              this.component.selectedKeywords.setSelectedStateByIndex(clicked_keyword_index, true);
            } else if (e.button === 0) {
              var click_info = {
                x: e.clientX,
                y: e.clientY,
                kwdIndex: this.curPoint ? this.curPoint.kwdIndex : null,
                kwdElement: null,
                kwdBounds: null
              };

              if (click_info.kwdIndex >= 0) {
                click_info.kwdElement = this._getHoverKwdElement(click_info.kwdIndex);
                click_info.kwdBounds = this._getKeywordBounds(click_info.kwdIndex);
              }

              this.component.openEditor({
                click: click_info
              });
            }
          }

          this.component.selectedKeywords.lastActiveKeywordIndex = clicked_keyword_index;
        }

        this.component.cursorPosition = -1;
      } else if (clicked_separator_pos !== -1) {
        this.component.setCursorPosition(clicked_separator_pos, point_info.outside === 1);
        this.component.selectedKeywords.clear();
      }
    }
  }, {
    key: "getMousePointInfo",
    value: function getMousePointInfo(e) {
      var res = {
        kwdIndex: -1,
        offset: 1,
        hoverKwdElement: null,
        outside: 0,
        delButton: false
      };
      if (!this.component.value || this.component.value.length === 0) return res;
      var target = e.target;
      res.delButton = nodeHasClass(target, 'ImsKeywordBox-keyword-delete');

      if (res.delButton || nodeHasClass(target, 'ImsKeywordBox-separator-inside')) {
        target = getClosestNodeByClass(target, 'ImsKeywordBox-keyword');
        if (!target) target = e.target;
      }

      if (nodeHasClass(target, 'ImsKeywordBox-keyword')) {
        target = getClosestNodeByClass(target, 'ImsKeywordBox-keyword-wrapper');
        if (!target) target = e.target;
      }

      var target_is_kwd = nodeHasClass(target, 'ImsKeywordBox-keyword-wrapper');
      var target_is_separartor = nodeHasClass(target, 'ImsKeywordBox-separator');

      if (target_is_kwd || target_is_separartor) {
        res.kwdIndex = parseInt(target.dataset.kwdInd);

        if (target_is_kwd) {
          res.hoverKwdElement = target_is_kwd;
          res.offset = 0;
        } else {
          res.offset = 1;
        }

        return res;
      } // Поиск элемента по позиции клика


      return this._findMousePointInfoByCoords(e.clientX, e.clientY);
    }
  }, {
    key: "_findMousePointInfoByCoords",
    value: function _findMousePointInfoByCoords(x, y) {
      var res = {
        kwdIndex: this.component.value ? this.component.value.length - 1 : -1,
        offset: 1,
        hoverKwdElement: null,
        outside: 1
      };

      var last_bound = this._getLastKeywordBounds();

      if (!last_bound) return res;

      if (y > last_bound.bottom || y > last_bound.top && x > last_bound.right) {
        return res;
      }

      var first_bound = this._getFirstKeywordBounds();

      if (!first_bound) return res;
      var is_begin_line = x < last_bound.left;

      if (y < first_bound.bottom && is_begin_line) {
        res.kwdIndex = -1;
        res.offset = 1;
        res.outside = -1;
        return res;
      }

      var rel_y = y - first_bound.top;
      var line = Math.floor(rel_y / first_bound.height);
      res.kwdIndex = this._findKeywordEdgeIndex(line, is_begin_line ? -1 : 1, first_bound.top, first_bound.height) + (is_begin_line ? -1 : 0);
      res.offset = 1;
      res.outside = is_begin_line ? -1 : 1;
      return res;
    }
  }, {
    key: "_findKeywordEdgeIndex",
    value: function _findKeywordEdgeIndex(line, which, canvas_top, line_height) {
      var begin = 0;
      var end = this.component.value ? this.component.value.length - 1 : -1;

      while (begin <= end) {
        var middle = Math.floor((end + begin) / 2);

        var middle_bound = this._getKeywordBounds(middle);

        var middle_line = middle_bound ? Math.round((middle_bound.top - canvas_top) / line_height) : 0;

        var shift_bound = this._getKeywordBounds(middle + which);

        var shift_line = shift_bound ? Math.round((shift_bound.top - canvas_top) / line_height) : middle_line + which;

        if (middle_line === line && shift_line === line + which) {
          return middle;
        } else if (line < middle_line || line === middle_line && which === -1) {
          end = middle - 1;
        } else {
          begin = middle + 1;
        }
      }

      return begin;
    }
  }, {
    key: "_getHoverKwdElement",
    value: function _getHoverKwdElement(keyword_index) {
      if (!this._cacheKeywordsElems) {
        if (!this.component.$refs['canvas']) return null;
        this._cacheKeywordsElems = this.component.$refs['canvas'].querySelectorAll('.ImsKeywordBox-keyword-wrapper');
      }

      if (keyword_index < 0 || keyword_index >= this._cacheKeywordsElems.length) return null;
      return this._cacheKeywordsElems[keyword_index];
    }
  }, {
    key: "_getKeywordBounds",
    value: function _getKeywordBounds(keyword_index) {
      if (!this._cacheKeywordsBounds.hasOwnProperty(keyword_index)) {
        var element = this._getHoverKwdElement(keyword_index);

        if (!element) return null;
        this._cacheKeywordsBounds[keyword_index] = element.getBoundingClientRect();
      }

      return this._cacheKeywordsBounds[keyword_index];
    }
  }, {
    key: "_getLastKeywordBounds",
    value: function _getLastKeywordBounds() {
      return this._getKeywordBounds(this.component.value ? this.component.value.length - 1 : -1);
    }
  }, {
    key: "_getFirstKeywordBounds",
    value: function _getFirstKeywordBounds() {
      return this._getKeywordBounds(0);
    }
  }, {
    key: "destroy",
    value: function destroy() {
      this.component.dragKeywordPosition = null;
      this.component.dragKeywordIsBegin = false;
      this.resetEventHandlers(this.isDragging, true);
      removeNodeFromDOM(this.draggingCanvas);
      if (this.destroyed) this.destroyed();
    }
  }, {
    key: "makeDragging",
    value: function makeDragging() {
      if (this.isDragging) return;
      this.isDragging = true;
      this.resetEventHandlers(false, false);
    }
  }, {
    key: "onDragLeave",
    value: function onDragLeave() {
      this.component.dragKeywordPosition = null;
      this.component.dragKeywordIsBegin = false;
    }
  }, {
    key: "resetEventHandlers",
    value: function resetEventHandlers(was_dragging, remove_only) {
      var _this = this;

      if (this._onMouseEndHandler) {
        window.removeEventListener(was_dragging ? 'dragend' : 'mouseup', this._onMouseEndHandler);
        this._onMouseEndHandler = null;
      }

      if (this._onMouseUpdateHandler) {
        if (this.component.$el) this.component.$el.removeEventListener(was_dragging ? 'dragover' : 'mousemove', this._onMouseUpdateHandler);
        this._onMouseUpdateHandler = null;
      }

      if (this._invalidateCacheHandler) {
        window.removeEventListener('resize', this._invalidateCacheHandler, {
          passive: true
        });
        window.removeEventListener('scroll', this._invalidateCacheHandler, {
          passive: true
        });
        if (this.component.$refs['scroller']) this.component.$refs['scroller'].removeEventListener('scroll', this._invalidateCacheHandler);
        this._invalidateCacheHandler = null;
      }

      if (was_dragging) {
        this.component.$el.removeEventListener('dragleave', this._onDragLeaveHandler);
        this._onDragLeaveHandler = null;
      }

      if (!remove_only) {
        this._onMouseEndHandler = function (e) {
          return _this.onMouseEnd(e);
        };

        this._onMouseUpdateHandler = function (e) {
          return _this.onMouseUpdate(e);
        };

        this._invalidateCacheHandler = function (e) {
          return _this.invalidateCache();
        };

        window.addEventListener(this.isDragging ? 'dragend' : 'mouseup', this._onMouseEndHandler);
        this.component.$el.addEventListener(this.isDragging ? 'dragover' : 'mousemove', this._onMouseUpdateHandler);
        window.addEventListener('resize', this._invalidateCacheHandler, {
          passive: true
        });
        window.addEventListener('scroll', this._invalidateCacheHandler, {
          passive: true
        });
        this.component.$refs['scroller'].addEventListener('scroll', this._invalidateCacheHandler);

        if (this.isDragging) {
          this._onDragLeaveHandler = function (e) {
            return _this.onDragLeave(e);
          };

          this.component.$el.addEventListener('dragleave', this._onDragLeaveHandler);
        }
      }
    }
  }, {
    key: "deleteDraggingMyKeywords",
    value: function deleteDraggingMyKeywords() {
      var emit = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
      var cur_value = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
      cur_value = cur_value !== undefined ? cur_value : this.component.value;
      if (!cur_value) cur_value = [];
      var new_value = cur_value;

      if (this.draggingMyKeywords.length > 0) {
        var first_selected_index = -1;
        new_value = [];

        for (var index = 0; index < cur_value.length; index++) {
          var v = cur_value[index];

          if (this.draggingMyKeywords.indexOf(v) >= 0) {
            if (first_selected_index === -1) first_selected_index = index;
          } else new_value.push(v);
        }

        this.draggingMyKeywords = [];
        this.component.cursorPosition = first_selected_index;
        if (emit) this.component.$emit('change', new_value);
      }

      return new_value;
    }
  }]);

  return InteractionContext;
}();var SHOW_TEXTBOX_TIME = 100;
var SELECT_ALL_DETECT_PERIOD = 500;
var SELECT_ALL_DETECT_TRIES = 10;

var MenuContext = /*#__PURE__*/function () {
  function MenuContext(component, event, destroyed) {
    _classCallCheck(this, MenuContext);

    this.component = component;
    this.destroyed = destroyed;

    this._moveTextareaToCursor(event);

    this.selectAllDetectTimeout = null;
    this.selectAllTry = 0;

    this._runHideTimeout();
  }

  _createClass(MenuContext, [{
    key: "_runHideTimeout",
    value: function _runHideTimeout() {
      var _this = this;

      this._hideTimeout = setTimeout(function () {
        _this._hideTimeout = null;

        _this._hideTextarea();
      }, SHOW_TEXTBOX_TIME);
    }
  }, {
    key: "_moveTextareaToCursor",
    value: function _moveTextareaToCursor(e) {
      if (!this.component.$refs['textArea']) return;
      var bounds = this.component.$el.getBoundingClientRect();
      this.component.$refs['textArea'].style.left = e.clientX - bounds.left - 5 + 'px';
      this.component.$refs['textArea'].style.top = e.clientY - bounds.top - 5 + 'px';
      this.component.$refs['textArea'].style.width = '10px';
      this.component.$refs['textArea'].style.height = '10px';
      this.component.$refs['textArea'].style.zIndex = 10000;
      this.component.$refs['textArea'].focus();
      this.component.$refs['textArea'].value = '';
      var kwds = this.component.getSelectionsAsJoinedString();
      this.component.$refs['textArea'].value = kwds + ' ';
      this.component.$refs['textArea'].setSelectionRange(0, kwds.length);
      this.selectAllTry = 0;

      this._detectSelectAll();
    }
  }, {
    key: "_detectSelectAll",
    value: function _detectSelectAll() {
      var _this2 = this;

      if (this.selectAllTry >= SELECT_ALL_DETECT_TRIES) return;
      this.selectAllTry++;
      setTimeout(function () {
        if (!_this2.component.$refs['textArea']) return;

        if (_this2.component.$refs['textArea'].selectionEnd === _this2.component.$refs['textArea'].value.length) {
          _this2.component.selectAll();
        } else _this2._detectSelectAll();
      }, SELECT_ALL_DETECT_PERIOD);
    }
  }, {
    key: "_hideTextarea",
    value: function _hideTextarea() {
      if (!this.component.$refs['textArea']) return;
      this.component.$refs['textArea'].style.left = 0;
      this.component.$refs['textArea'].style.top = 0;
      this.component.$refs['textArea'].style.width = 0;
      this.component.$refs['textArea'].style.height = 0;
      this.component.$refs['textArea'].style.zIndex = -2;
    }
  }, {
    key: "destroy",
    value: function destroy() {
      if (this._hideTimeout) clearTimeout(this._hideTimeout);
      if (this.selectAllDetectTimeout) clearTimeout(this.selectAllDetectTimeout);
      if (this.destroyed) this.destroyed();
      if (this.component.$refs['textArea']) this.component.$refs['textArea'].value = '';
    }
  }]);

  return MenuContext;
}();function getCharacterFromKeyboardEvent(event) {
  if (!event.key || event.altKey || event.ctrlKey || event.metaKey) return null;else if (event.key === 'Spacebar') return ' ';else if (event.key.length === 1 || event.key.length > 1 && /[^a-zA-Z0-9]/.test(event.key)) {
    return event.key;
  } else return null;
}
function getCodeFromKeyboardEvent(event) {
  if (event.code !== undefined) return event.code;
  var code_map = {
    65: 'KeyA',
    67: 'KeyC',
    86: 'KeyV',
    88: 'KeyX',
    89: 'KeyY',
    90: 'KeyZ'
  };
  return code_map.hasOwnProperty(event.which) ? code_map[event.which] : null;
}function clipboardCopyPlainText(str) {
  return navigator.clipboard.writeText(str).then(null, function (err) {
    // Fallback method
    var fallback_area = document.createElement("textarea");
    fallback_area.style.position = "fixed";
    fallback_area.style.top = "0";
    fallback_area.style.left = "0";
    fallback_area.style.width = "10px";
    fallback_area.style.height = "10px";
    document.body.appendChild(fallback_area);
    fallback_area.value = str;
    fallback_area.focus();
    fallback_area.setSelectionRange(0, fallback_area.value.length);
    document.execCommand("copy");
    document.body.removeChild(fallback_area);
  });
}//
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
var script = {
  name: "ImsKeywordBoxEditor",
  props: {
    value: {}
  },
  data: function data() {
    return {
      rawVal: this.value
    };
  },
  methods: {
    _updateSize: function _updateSize() {
      if (!this.$refs['hidden'] || !this.$refs['input']) return;
      this.$refs['hidden'].textContent = this.rawVal;
      var bounds = this.$refs['hidden'].getBoundingClientRect();
      this.$refs['input'].style.width = bounds.width + "px";
    },
    _setValue: function _setValue(val) {
      if (this.rawVal !== val) {
        this.rawVal = val;

        this._updateSize();

        this.$emit('input', val);
      }
    },
    _onBlur: function _onBlur() {
      this.$emit('blur');
    },
    setCursor: function setCursor(pos) {
      if (!this.$refs['input']) return;
      this.$refs['input'].setSelectionRange(pos, pos);
    },
    focus: function focus() {
      if (!this.$refs['input']) return;
      this.$refs['input'].focus();
    },
    blur: function blur() {
      if (!this.$refs['blur']) return;
      this.$refs['blur'].blur();
    },
    isSelectionAtFirst: function isSelectionAtFirst() {
      return this.$refs['input'].selectionStart === this.$refs['input'].selectionEnd && this.$refs['input'].selectionStart === 0;
    },
    isSelectionAtEnd: function isSelectionAtEnd() {
      return this.$refs['input'].selectionStart === this.$refs['input'].selectionEnd && this.$refs['input'].selectionStart === this.rawVal.length;
    },
    _onKeyDown: function _onKeyDown(event) {
      if (!this.$refs['input']) return;

      switch (event.key) {
        case 'Enter':
        case 'Escape':
          event.preventDefault();
          this.$emit('command', {
            command: 'commit'
          });
          break;

        case 'Tab':
          event.preventDefault();
          this.$emit('command', {
            command: 'move',
            dir: event.shiftKey ? -1 : 1,
            cursorAt: 0
          });
          break;

        case 'ArrowLeft':
        case 'ArrowRight':
          {
            var check_left = event.key === 'ArrowLeft' && this.isSelectionAtFirst();
            var check_right = event.key === 'ArrowRight' && this.isSelectionAtEnd();

            if (check_left || check_right) {
              event.preventDefault();
              this.$emit('command', {
                command: 'move',
                dir: check_left ? -1 : 1,
                cursorAt: check_right ? 0 : null
              });
            }

            break;
          }

        case 'Backspace':
        case 'Delete':
          {
            var _check_left = event.key === 'Backspace' && this.isSelectionAtFirst();

            var _check_right = event.key === 'Delete' && this.isSelectionAtEnd();

            if (_check_left || _check_right) {
              event.preventDefault();
              this.$emit('command', {
                command: 'delSep',
                dir: _check_left ? -1 : 1
              });
            }

            break;
          }
      }
    }
  },
  mounted: function mounted() {
    this._updateSize();
  },
  watch: {
    value: function value() {
      if (this.rawVal !== this.value) {
        this.rawVal = this.value;

        this._updateSize();
      }
    }
  }
};function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
    if (typeof shadowMode !== 'boolean') {
        createInjectorSSR = createInjector;
        createInjector = shadowMode;
        shadowMode = false;
    }
    // Vue.extend constructor export interop.
    const options = typeof script === 'function' ? script.options : script;
    // render functions
    if (template && template.render) {
        options.render = template.render;
        options.staticRenderFns = template.staticRenderFns;
        options._compiled = true;
        // functional template
        if (isFunctionalTemplate) {
            options.functional = true;
        }
    }
    // scopedId
    if (scopeId) {
        options._scopeId = scopeId;
    }
    let hook;
    if (moduleIdentifier) {
        // server build
        hook = function (context) {
            // 2.3 injection
            context =
                context || // cached call
                    (this.$vnode && this.$vnode.ssrContext) || // stateful
                    (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
            // 2.2 with runInNewContext: true
            if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
                context = __VUE_SSR_CONTEXT__;
            }
            // inject component styles
            if (style) {
                style.call(this, createInjectorSSR(context));
            }
            // register component module identifier for async chunk inference
            if (context && context._registeredComponents) {
                context._registeredComponents.add(moduleIdentifier);
            }
        };
        // used by ssr in case component is cached and beforeCreate
        // never gets called
        options._ssrRegister = hook;
    }
    else if (style) {
        hook = shadowMode
            ? function (context) {
                style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
            }
            : function (context) {
                style.call(this, createInjector(context));
            };
    }
    if (hook) {
        if (options.functional) {
            // register for functional component in vue file
            const originalRender = options.render;
            options.render = function renderWithStyleInjection(h, context) {
                hook.call(context);
                return originalRender(h, context);
            };
        }
        else {
            // inject component registration as beforeCreate hook
            const existing = options.beforeCreate;
            options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
    }
    return script;
}function createInjectorSSR(context) {
    if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__;
    }
    if (!context)
        return () => { };
    if (!('styles' in context)) {
        context._styles = context._styles || {};
        Object.defineProperty(context, 'styles', {
            enumerable: true,
            get: () => context._renderStyles(context._styles)
        });
        context._renderStyles = context._renderStyles || renderStyles;
    }
    return (id, style) => addStyle(id, style, context);
}
function addStyle(id, css, context) {
    const group =  css.media || 'default' ;
    const style = context._styles[group] || (context._styles[group] = { ids: [], css: '' });
    if (!style.ids.includes(id)) {
        style.media = css.media;
        style.ids.push(id);
        let code = css.source;
        style.css += code + '\n';
    }
}
function renderStyles(styles) {
    let css = '';
    for (const key in styles) {
        const style = styles[key];
        css +=
            '<style data-vue-ssr-id="' +
                Array.from(style.ids).join(' ') +
                '"' +
                (style.media ? ' media="' + style.media + '"' : '') +
                '>' +
                style.css +
                '</style>';
    }
    return css;
}/* script */
var __vue_script__ = script;
/* template */

var __vue_render__ = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('span', {
    staticClass: "ImsKeywordBoxEditor"
  }, [_vm._ssrNode("<input type=\"text\"" + _vm._ssrAttr("value", _vm.rawVal) + " class=\"ImsKeywordBoxEditor-input\"> <span class=\"ImsKeywordBoxEditor-hidden\"></span>")]);
};

var __vue_staticRenderFns__ = [];
/* style */

var __vue_inject_styles__ = function __vue_inject_styles__(inject) {
  if (!inject) return;
  inject("data-v-207ef990_0", {
    source: ".ImsKeywordBoxEditor{position:relative;display:inline-block}.ImsKeywordBoxEditor-hidden,.ImsKeywordBoxEditor-input{outline:0;border:none;font-size:inherit;font-family:inherit;line-height:inherit;white-space:pre;display:block;padding:0;background:0 0}.ImsKeywordBoxEditor-hidden{position:absolute;top:0;left:0;visibility:hidden;box-sizing:content-box;padding-right:5px}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


var __vue_scope_id__ = undefined;
/* module identifier */

var __vue_module_identifier__ = "data-v-207ef990";
/* functional template */

var __vue_is_functional_template__ = false;
/* style inject shadow dom */

var __vue_component__ = /*#__PURE__*/normalizeComponent({
  render: __vue_render__,
  staticRenderFns: __vue_staticRenderFns__
}, __vue_inject_styles__, __vue_script__, __vue_scope_id__, __vue_is_functional_template__, __vue_module_identifier__, false, undefined, createInjectorSSR, undefined);var HistoryController = /*#__PURE__*/function () {
  function HistoryController() {
    _classCallCheck(this, HistoryController);
  }

  _createClass(HistoryController, [{
    key: "init",

    /**
     * Init
     * @param component
     * @param value
     */
    value: function init(component, value) {}
    /***
     * Add new state to history
     * @param value - adding keywords
     */

  }, {
    key: "push",
    value: function push(value) {}
    /**
     * Undo
     */

  }, {
    key: "undo",
    value: function undo() {}
    /**
     * Redo
     */

  }, {
    key: "redo",
    value: function redo() {}
  }]);

  return HistoryController;
}();var StackHistoryController = /*#__PURE__*/function (_HistoryController) {
  _inherits(StackHistoryController, _HistoryController);

  var _super = _createSuper(StackHistoryController);

  function StackHistoryController() {
    var _this;

    var size = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 25;

    _classCallCheck(this, StackHistoryController);

    _this = _super.call(this);
    _this.size = size;
    _this.history = [];
    _this.pointer = 0;
    return _this;
  }
  /**
   * Init
   * @param component
   * @param value
   */


  _createClass(StackHistoryController, [{
    key: "init",
    value: function init(component, value) {
      this.component = component;
      this.history = [value];
    }
    /***
     * Add new state to history
     * @param value - adding keywords
     */

  }, {
    key: "push",
    value: function push(value) {
      this.history = [value].concat(_toConsumableArray(this.history.slice(this.pointer, this.pointer + this.size)));
      this.pointer = 0;
    }
    /**
     * Undo
     */

  }, {
    key: "undo",
    value: function undo() {
      if (this.pointer < this.history.length - 1) {
        this.pointer++;
        this.component.emitValue(this.history[this.pointer], false);
      }
    }
    /**
     * Redo
     */

  }, {
    key: "redo",
    value: function redo() {
      if (this.pointer > 0) {
        this.pointer--;
        this.component.emitValue(this.history[this.pointer], false);
      }
    }
  }]);

  return StackHistoryController;
}(HistoryController);var MUTE_NATIVE_EVENTS_DELAY = 100;
var DUPLICATE_REMOVE_HIGHLIGHT_TIME = 600;
var DUPLICATE_REMOVE_HIGHLIGHT_CHECK = 200;
var script$1 = {
  name: "ImsKeywordBox",
  components: {
    ImsKeywordBoxEditor: __vue_component__
  },
  props: {
    value: {},
    showDeleteButton: {
      type: Boolean,
      default: true
    },
    separator: {
      type: [String, Object],
      default: ', '
    },
    splittingRegexp: {
      type: RegExp,
      default: function _default() {
        return /[;,\r\n#]/;
      }
    },
    preprocessKeyword: {
      type: Function,
      default: null
    },
    getKeywordClasses: {
      type: Function,
      default: null
    },
    scrollY: {
      type: Number,
      default: 0
    },
    handleExceptions: {
      type: Function,
      default: null
    },
    emitValueEvent: {
      type: String,
      default: 'input'
    },
    customizeMultiKeywordDraggingCanvas: {
      type: Function,
      default: null
    },
    historyController: {
      type: Object,
      default: function _default() {
        return new StackHistoryController();
      }
    }
  },
  data: function data() {
    return {
      selectedKeywords: new SelectionContext(this.value),
      cursorPositionRaw: -1,
      cursorPositionAfter: false,
      interactionContext: null,
      contextMenuContext: null,
      highlightDuplicated: null,
      dragKeywordPosition: null,
      dragKeywordIsBegin: false,
      muteNativeClipboardEventsTime: Date.now() - MUTE_NATIVE_EVENTS_DELAY,
      focused: false,
      editorPosition: -1,
      editorInstead: false,
      editorValue: null,
      isMobile: false,
      confirmDeleteIndex: null
    };
  },
  computed: {
    cursorPosition: {
      get: function get() {
        return this.cursorPositionRaw;
      },
      set: function set(val) {
        this.cursorPositionRaw = val;
        this.cursorPositionAfter = false;
      }
    },
    separatorComp: function separatorComp() {
      var res = {
        isNewLine: false,
        text: this.separator,
        inside: false,
        before: false,
        first: null,
        between: null
      };

      if (this.separator && _typeof(this.separator) === 'object') {
        Object.assign(res, this.separator);
      }

      if (res.between === null || !res.inside) {
        res.between = res.inside ? ' ' : res.text;
      }

      res.isNewLine = res.text === '\r\n';

      if (res.first === null) {
        res.first = res.text;
        if (res.isNewLine) res.first = '';else if (res.before) res.first = res.first.replace(/^\s+/, '');
      }

      return res;
    }
  },
  methods: {
    /**
     * Set position of cursor
     * @param {number} val - index of keyword
     * @param {boolean} after - show cursor after this keyword
     */
    setCursorPosition: function setCursorPosition(keyword_index, after) {
      this.cursorPositionRaw = keyword_index;
      this.cursorPositionAfter = after;
    },

    /**
     * Delete keywords which are currently selected
     * @param {boolean} emit - if true, emit new value
     * @returns {string[]} - new value
     */
    deleteSelectedKeywords: function deleteSelectedKeywords() {
      var emit = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
      var cur_value = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
      cur_value = cur_value !== undefined ? cur_value : this.value;
      if (!cur_value) cur_value = [];
      var new_value = cur_value;

      if (this.selectedKeywords.count > 0) {
        var first_selected_index = -1;
        new_value = [];

        for (var index = 0; index < cur_value.length; index++) {
          var v = cur_value[index];

          if (this.selectedKeywords.isSelected(v)) {
            if (first_selected_index === -1) first_selected_index = index;
          } else new_value.push(v);
        }

        this.selectedKeywords.clear();
        this.cursorPosition = first_selected_index;
        if (emit) this.emitValue(new_value);
      }

      return new_value;
    },

    /**
     * Command "Erase to End of Field": Deletes all characters from the current cursor position to the end of the current field.
     */
    eraseEofCommand: function eraseEofCommand() {
      var remove_from = this.selectedKeywords.count > 0 ? this.selectedKeywords.getFirstSelectedIndex() : this.cursorPosition;
      if (remove_from < 0) remove_from = 0;
      var new_val = this.value ? this.value.slice(0, remove_from) : [];
      this.cursorPosition = new_val.length;
      this.selectedKeywords.clear();
      this.emitValue(new_val);
    },

    /**
     * Command "clear": Clear value
     */
    clearCommand: function clearCommand() {
      this.selectedKeywords.clear();
      this.cursorPosition = -1;
      this.emitValue([]);
    },

    /**
     * Delete one word based on cursor position
     * @param {number} dir - additional offset for cursor position
     */
    deleteWordFromCursor: function deleteWordFromCursor(dir) {
      if (this.cursorPosition >= 0) {
        var new_val = this.value ? _toConsumableArray(this.value) : [];
        new_val.splice(this.cursorPosition + dir, 1);
        this.cursorPosition = Math.max(this.cursorPosition + dir, 0);
        this.selectedKeywords.clear();
        this.emitValue(new_val);
      }
    },

    /**
     *  Get selected keywords as joined string
     *  @returns {string} joined string
     */
    getSelectionsAsJoinedString: function getSelectionsAsJoinedString() {
      var sel_arr = this.selectedKeywords.getSelectionAsArray();
      var glue = this.separatorComp.text;

      if (this.separatorComp.inside) {
        if (this.separatorComp.before) glue = this.separatorComp.between + glue;else glue = glue + this.separatorComp.between;
      }

      var res = sel_arr.join(glue);
      if (this.separatorComp.before) res = this.separatorComp.first + res;
      return res;
    },

    /**
     *  Command "Copy": copies selected keywords to clipboard
     */
    copyCommand: function copyCommand() {
      var _this = this;

      if (this.selectedKeywords.count > 0) {
        return clipboardCopyPlainText(this.getSelectionsAsJoinedString()).then(null, function (err) {
          if (!_this.handleExceptions || !_this.handleExceptions(err)) {
            throw err;
          }
        });
      } else return Promise.resolve();
    },

    /**
     *  Command "Cut": copies selected keywords to clipboard
     */
    cutCommand: function cutCommand() {
      var _this2 = this;

      if (this.selectedKeywords.count > 0) {
        return this.copyCommand().then(function () {
          _this2.deleteSelectedKeywords();
        });
      } else return Promise.resolve();
    },

    /**
     *  Command "Paste": paste text instead of selected keywords
     *  @param {string} text - pasting text
     *  @param {string[]} editor_value - current value before paste
     *  @param {function} emit_callback - if provided then this function called instead of emitting value
     */
    pasteCommand: function pasteCommand(text) {
      var cur_value = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
      var emit_callback = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      cur_value = cur_value !== undefined ? cur_value : this.value;

      if (this.selectedKeywords.count > 0) {
        cur_value = this.deleteSelectedKeywords(false);
      }

      if (text) this._pasteCommandImpl(this.cursorPosition, cur_value, text, emit_callback);else {
        if (emit_callback) emit_callback(cur_value);else this.emitValue(cur_value);
      }
    },

    /**
     * Select all keywords
     */
    selectAll: function selectAll() {
      this.cursorPosition = -1;
      this.selectedKeywords.selectAll();
    },

    /**
     * Make component focused
     */
    focus: function focus() {
      if (this.$refs['textArea']) this.$refs['textArea'].focus();
    },

    /**
     *  Notify about scrollY change
     */
    emitScroll: function emitScroll() {
      if (this.$refs['scroller']) this.$emit('update:scrollY', this.$refs['scroller'].scrollTop);
    },

    /**
     * Implementation of "Paste" command
     * @param {number} cursor - where paste
     * @param {string[]} cur_value - current component's value before paste
     * @param {string} text - what paste
     * @param {function} emit_callback - if provided, call this function instead of emit
     * @returns {string[]} pasted keywords
     */
    _pasteCommandImpl: function _pasteCommandImpl(cursor, cur_value, text) {
      var _this3 = this;

      var emit_callback = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
      if (!text) return;
      if (cursor < 0) cursor = 0;
      if (!cur_value) cur_value = [];
      var original_value = cur_value;
      var split = this.splittingRegexp ? text.split(this.splittingRegexp) : [text]; // Preprocess keywords

      var split_preproc = split;

      if (this.preprocessKeyword) {
        split_preproc = [];

        for (var e = 0; e < split.length; e++) {
          var e_norm_val = this.preprocessKeyword(split[e]);

          if (e_norm_val) {
            if (Array.isArray(e_norm_val)) split_preproc = split_preproc.concat(e_norm_val);else split_preproc.push(e_norm_val);
          }
        }
      } // Check duplication


      var exist_set = new Set(original_value);
      var ins_repeat_check = new Set();
      var split_norm = [];
      var duplicated = null;

      for (var _e = 0; _e < split_preproc.length; _e++) {
        var _e_norm_val = this.preprocessKeyword ? split_preproc[_e] : split_preproc[_e].trim();

        if (!_e_norm_val) continue;
        if (ins_repeat_check.has(_e_norm_val)) continue;
        ins_repeat_check.add(_e_norm_val);

        if (exist_set.has(_e_norm_val)) {
          if (!duplicated) duplicated = {};
          duplicated[_e_norm_val] = Date.now();
          var index_of_exist = cur_value.indexOf(_e_norm_val);
          if (index_of_exist < cursor) continue;else {
            cur_value = cur_value !== original_value ? cur_value : _toConsumableArray(cur_value);
            cur_value.splice(index_of_exist, 1);
          }
        }

        split_norm.push(_e_norm_val);
      } // Set value


      this.selectedKeywords.clear();
      this.cursorPosition = cursor + split_norm.length;
      this.selectedKeywords.lastActiveKeywordIndex = this.cursorPosition;

      if (split_norm.length !== 0 || cur_value !== original_value) {
        var new_value = _toConsumableArray(cur_value);

        new_value.splice.apply(new_value, [cursor, 0].concat(split_norm));
        if (emit_callback) emit_callback(new_value);else this.emitValue(new_value);
      } // Highlight duplicated


      if (duplicated) {
        if (!this.highlightDuplicated) {
          this.highlightDuplicated = duplicated;

          var remove_highlight = function remove_highlight() {
            if (!_this3.highlightDuplicated) return;
            var new_highlighting_duplicate = null;
            var delete_time = Date.now() - DUPLICATE_REMOVE_HIGHLIGHT_TIME;

            for (var kwd in _this3.highlightDuplicated) {
              if (!_this3.highlightDuplicated.hasOwnProperty(kwd)) continue;

              if (_this3.highlightDuplicated[kwd] > delete_time) {
                if (!new_highlighting_duplicate) new_highlighting_duplicate = {};
                new_highlighting_duplicate[kwd] = _this3.highlightDuplicated[kwd];
              }
            }

            _this3.highlightDuplicated = new_highlighting_duplicate;
            if (_this3.highlightDuplicated) setTimeout(remove_highlight, DUPLICATE_REMOVE_HIGHLIGHT_CHECK);
          };

          setTimeout(remove_highlight, DUPLICATE_REMOVE_HIGHLIGHT_CHECK);
        } else this.highlightDuplicated = _objectSpread2(_objectSpread2({}, this.highlightDuplicated), duplicated);
      }

      return split_norm;
    },
    _onMouseDown: function _onMouseDown(e) {
      var _this4 = this;

      var editor = getClosestNodeByClass(e.target, 'ImsKeywordBox-editor');
      if (editor) return;

      if (this.$refs['textArea']) {
        if (this.isMobile) {
          this.$refs['textArea'].focus(); // Focus immediately for iOS

          e.preventDefault();
        } else {
          setTimeout(function () {
            if (_this4.$refs['textArea']) _this4.$refs['textArea'].focus();
          }, 10);
        }
      }

      if (this.interactionContext) return;
      this.interactionContext = new InteractionContext(this, e, function () {
        return _this4.interactionContext = null;
      }, false);
    },
    _onTextareaFocus: function _onTextareaFocus() {
      var _this5 = this;

      this.focused = true;
      setTimeout(function () {
        if (document.activeElement !== _this5.$refs['textArea']) return;
        if (!_this5.focused) _this5.$emit('focus');
      }, 100);
    },
    _onTextareaBlur: function _onTextareaBlur() {
      var _this6 = this;

      if (this.isMobile && this.interactionContext) {
        this.$refs['textArea'].focus();
        return;
      }

      this.focused = false;
      setTimeout(function () {
        if (document.activeElement === _this6.$refs['textArea']) return;
        if (_this6.focused) _this6.$emit('blur');
      }, 100);
    },
    _onDragStart: function _onDragStart(e) {
      var _this7 = this;

      var kwd_index = e.target.dataset.kwdInd;
      if (kwd_index === undefined) return;

      if (!this.selectedKeywords.isSelectedByIndex(kwd_index)) {
        this.cursorPosition = -1;
        this.selectedKeywords.setSelectedStateByIndex(kwd_index, true, false);
      }

      e.dataTransfer.setData("text/plain", this.getSelectionsAsJoinedString());

      if (this.interactionContext) {
        if (!this.interactionContext.isDragging) this.interactionContext.makeDragging();
      } else this.interactionContext = new InteractionContext(this, e, function () {
        return _this7.interactionContext = null;
      }, true);

      this.interactionContext.draggingMyKeywords = this.selectedKeywords.getSelectionAsArray();

      if (this.selectedKeywords.count > 1) {
        var dragging_canvas = document.createElement('canvas');
        dragging_canvas.style.position = "absolute";
        dragging_canvas.style.left = '-100%';
        document.body.append(dragging_canvas);

        if (this.customizeMultiKeywordDraggingCanvas) {
          this.customizeMultiKeywordDraggingCanvas(dragging_canvas, this.selectedKeywords);
        } else {
          var context = dragging_canvas.getContext('2d');
          dragging_canvas.width = 24;
          dragging_canvas.height = 15;
          context.fillStyle = '#d7d4f0';
          context.fillRect(0, 0, dragging_canvas.width, dragging_canvas.height);
          context.fillStyle = '#000';
          context.font = '12px ' + getComputedStyle(this.$el).fontFamily;
          context.textBaseline = 'top';
          context.textAlign = 'center';
          context.fillText(this.selectedKeywords.count, 12, 3);
        }

        e.dataTransfer.setDragImage(dragging_canvas, -20, -10);
        this.interactionContext.draggingCanvas = dragging_canvas;
      }
    },
    _onDragEnter: function _onDragEnter(e) {
      var _this8 = this;

      if (getClosestNodeByClass(e.target, 'ImsKeywordBox-editor')) {
        return;
      }

      var isText = e.dataTransfer.types.includes("text/plain");
      if (isText) e.preventDefault();

      if (this.interactionContext) {
        if (!this.interactionContext.isDragging) this.interactionContext.makeDragging();
      } else this.interactionContext = new InteractionContext(this, e, function () {
        return _this8.interactionContext = null;
      }, true);
    },
    _onDrop: function _onDrop(e) {
      if (getClosestNodeByClass(e.target, 'ImsKeywordBox-editor')) {
        return;
      }

      var text = e.dataTransfer.getData("text/plain");
      e.preventDefault();
      var cur_value = this.value ? this.value : [];
      var drop_anchor = cur_value[this.dragKeywordPosition];

      if (this.editorPosition >= 0) {
        if (this.editorInstead) {
          cur_value = _toConsumableArray(cur_value);
          cur_value.splice(this.editorPosition, 1);
        }

        this.editorPosition = -1;
      }

      if (this.interactionContext) {
        if (this.interactionContext.draggingMyKeywords.indexOf(drop_anchor) >= 0) {
          // Check if selected keywords are in different parts of field
          // If true - move elements to begining of section where cursor points to
          // If false- do nothing
          var dragging_keywords_set = new Set();
          this.interactionContext.draggingMyKeywords.forEach(function (kwd, kwd_index) {
            dragging_keywords_set.add(kwd);
          });
          var cur_sect_begin = null;
          var sect_count = 0;
          var sect_anchor_found = false;

          for (var i = 0; i < cur_value.length; i++) {
            if (dragging_keywords_set.has(cur_value[i])) {
              if (cur_sect_begin === null) {
                cur_sect_begin = i;
                sect_count++;
              }

              if (!sect_anchor_found && cur_value[i] === drop_anchor) {
                this.dragKeywordPosition = cur_sect_begin - 1;
                this.dragKeywordIsBegin = false;
                drop_anchor = this.dragKeywordPosition >= 0 ? this.value[this.dragKeywordPosition] : null;
                sect_anchor_found = true;
              }
            } else {
              cur_sect_begin = null;
            }
          }

          if (sect_count === 1) {
            // Drag to itself
            this.interactionContext.destroy();
            return;
          }
        }

        cur_value = this.interactionContext.deleteDraggingMyKeywords(false, cur_value);
      }

      var drop_anchor_index = drop_anchor ? cur_value.indexOf(drop_anchor) : this.dragKeywordPosition;
      if (drop_anchor_index < 0) drop_anchor_index = this.dragKeywordPosition;

      var pasted_keywords = this._pasteCommandImpl(drop_anchor_index + (this.dragKeywordIsBegin ? 0 : 1), cur_value, text);

      this.cursorPosition = -1;
      this.selectedKeywords.selectKeywordsArray(pasted_keywords);
      if (this.interactionContext) this.interactionContext.destroy();
    },
    _onTextareaKeyDown: function _onTextareaKeyDown(e) {
      var _this9 = this;

      var handled = false;
      var print_key = getCharacterFromKeyboardEvent(e);
      var can_open_editor = !!print_key;
      var is_ctrl = isPlatformCtrlClick(e);
      var cur_value = this.value ? this.value : [];

      switch (e.key) {
        case 'Shift':
        case 'Alt':
        case 'AltGraph':
        case 'Control':
        case 'Tab':
        case 'CapsLock':
        case 'Fn':
        case 'FnLock':
        case 'Hyper':
        case 'Meta':
        case 'OS':
        case 'NumLock':
        case 'ScrollLock':
        case 'Scroll':
        case 'Super':
        case 'Symbol':
        case 'SymbolLock':
          return;

        case 'PageUp':
        case 'PageDown':
        case 'Insert':
          can_open_editor = true;
          break;

        case 'ArrowUp':
        case 'ArrowDown':
          {
            if (this.selectedKeywords.count > 0 && !e.shiftKey) {
              var dir = e.key === 'ArrowDown' ? 1 : -1;
              if (dir > 0) this.cursorPosition = this.selectedKeywords.getLastSelectedIndex() + 1;else this.cursorPosition = this.selectedKeywords.getFirstSelectedIndex();
              this.selectedKeywords.clear();
              handled = true;
            }

            break;
          }

        case 'ArrowLeft':
        case 'ArrowRight':
          {
            can_open_editor = true;

            var _dir = e.key === 'ArrowRight' ? 1 : -1;

            if (this.selectedKeywords.count > 0) {
              if (is_ctrl || e.shiftKey) {
                var append = e.shiftKey;
                var sibling_keyword = this.selectedKeywords.getActiveSiblingKeyword(_dir);

                if (sibling_keyword) {
                  if (append && this.selectedKeywords.isSelected(sibling_keyword)) {
                    this.selectedKeywords.deselectKeyword(this.selectedKeywords.lastActiveKeyword, true);
                  } else this.selectedKeywords.selectKeyword(sibling_keyword, append);

                  this.selectedKeywords.lastActiveKeywordIndex += _dir;
                }
              } else {
                if (_dir > 0) this.cursorPosition = this.selectedKeywords.getLastSelectedIndex() + 1;else this.cursorPosition = this.selectedKeywords.getFirstSelectedIndex();
                this.selectedKeywords.clear();
              }

              handled = true;
            } else if (is_ctrl) {
              if (e.shiftKey) {
                var _sibling_keyword = this.selectedKeywords.getSiblingKeyword(this.cursorPosition, _dir < 0 ? -1 : 0);

                if (_sibling_keyword) {
                  this.selectedKeywords.selectKeyword(_sibling_keyword);
                  this.selectedKeywords.lastActiveKeywordIndex = this.cursorPosition + (_dir < 0 ? -1 : 0);
                  this.cursorPosition = -1;
                }
              } else {
                this.cursorPosition = Math.min(Math.max(this.cursorPosition + _dir, 0), cur_value.length);
              }

              handled = true;
            } else {
              if (_dir < 0 && this.cursorPosition === 0 || _dir > 0 && this.cursorPosition === cur_value.length) {
                handled = true;
              }
            }

            break;
          }

        case 'Clear':
          this.clearCommand();
          handled = true;
          break;

        case 'eraseEofCommand':
          this.eraseEofCommand();
          handled = true;
          break;

        case 'End':
        case 'Home':
          {
            var to_pos = e.key === 'Home' ? 0 : cur_value.length;

            if (e.shiftKey) {
              var act_ind = this.selectedKeywords.count > 0 ? this.selectedKeywords.lastActiveKeywordIndex : this.cursorPosition;
              if (act_ind > to_pos && to_pos === 0 && this.selectedKeywords.count === 0) act_ind--;
              this.selectedKeywords.selectRangeByIndexes(act_ind, to_pos, true);
              this.selectedKeywords.lastActiveKeywordIndex = to_pos;
              this.cursorPosition = -1;
            } else {
              this.selectedKeywords.clear();
              this.cursorPosition = to_pos;
            }

            handled = true;
            break;
          }

        case 'Delete':
        case 'Backspace':
          can_open_editor = true;

          if (this.selectedKeywords.count > 0 && this.cursorPosition === -1) {
            this.deleteSelectedKeywords();
            handled = true;
          } else if (is_ctrl) {
            this.deleteWordFromCursor(e.key === 'Delete' ? 0 : -1);
            handled = true;
          }

          break;

        default:
          var e_code = getCodeFromKeyboardEvent(e);

          if (e.key === "Copy" || e_code === 'KeyC' && is_ctrl) {
            this.muteNativeClipboardEventsTime = Date.now(); // for Edge

            this.copyCommand();
            handled = true;
          } else if (e.key === "Cut" || e_code === 'KeyX' && is_ctrl) {
            this.muteNativeClipboardEventsTime = Date.now(); // for Edge

            this.cutCommand();
            handled = true;
          } else if (e.key === "Paste" || e_code === 'KeyV' && is_ctrl) {
            if (this.$refs['textArea']) this.$refs['textArea'].value = '';
            return; // Will be handled by _onTextareaPaste
          } else if (e.key === "Redo" || e_code === 'KeyY' && is_ctrl || e_code === 'KeyZ' && is_ctrl && e.shiftKey) {
            if (this.historyController) this.historyController.redo();
            handled = true;
          } else if (e.key === "Undo" || e_code === 'KeyZ' && is_ctrl) {
            if (this.historyController) this.historyController.undo();
            handled = true;
          } else if (e_code === 'KeyA' && is_ctrl) {
            this.selectAll();
            handled = true;
          }

      }

      if (handled) {
        e.preventDefault();
        this.$nextTick(function () {
          var act_ind = _this9.selectedKeywords.count > 0 ? _this9.selectedKeywords.lastActiveKeywordIndex : _this9.cursorPosition;
          if (act_ind < 0 || !_this9.$el) return;

          var kwd_elem = _this9.$el.querySelector('.ImsKeywordBox-keyword-wrapper[data-kwd-ind="' + act_ind + '"]');

          if (!kwd_elem) return;

          if (isPlatform('ie') || isPlatform('safari') || isPlatform('ios')) {
            if (!_this9.$refs['scroller']) return;

            var scroller_bounds = _this9.$refs['scroller'].getBoundingClientRect();

            var kwd_bounds = kwd_elem.getBoundingClientRect();

            if (kwd_bounds.bottom < scroller_bounds.top + 10) {
              _this9.$refs['scroller'].scrollTop -= scroller_bounds.top - kwd_bounds.bottom + kwd_bounds.height;

              _this9.emitScroll();
            } else if (kwd_bounds.top > scroller_bounds.bottom - 10) {
              _this9.$refs['scroller'].scrollTop += kwd_bounds.top - scroller_bounds.bottom + kwd_bounds.height;

              _this9.emitScroll();
            }
          } else kwd_elem.scrollIntoView({
            block: "nearest"
          });
        });
      } else if (can_open_editor) {
        var _cur_value = this.value ? this.value : [];

        if (print_key && this.selectedKeywords.count > 0) {
          _cur_value = this.deleteSelectedKeywords();
        }

        var open_editor_args = {
          keyDownEvent: e
        };

        if (print_key && this.cursorPosition === _cur_value.length && _cur_value.length > 0) {
          if (!this.splittingRegexp || !this.splittingRegexp.test(print_key)) {
            open_editor_args.appendSeparator = this.separatorComp.text;
          }
        }

        this.openEditor(open_editor_args);
      }
    },
    _onTextareaPaste: function _onTextareaPaste(e) {
      e.preventDefault();

      if (this.muteNativeClipboardEventsTime + MUTE_NATIVE_EVENTS_DELAY > Date.now()) {
        return;
      }

      this.muteNativeClipboardEventsTime = Date.now(); // for Edge

      var text = (e.originalEvent || e).clipboardData.getData('text/plain');
      this.pasteCommand(text);
    },
    _onTextareaCopy: function _onTextareaCopy(e) {
      e.preventDefault();

      if (this.muteNativeClipboardEventsTime + MUTE_NATIVE_EVENTS_DELAY > Date.now()) {
        return;
      }

      this.muteNativeClipboardEventsTime = Date.now(); // for Edge

      this.copyCommand();
    },
    _onTextareaCut: function _onTextareaCut(e) {
      e.preventDefault();

      if (this.muteNativeClipboardEventsTime + MUTE_NATIVE_EVENTS_DELAY > Date.now()) {
        return;
      }

      this.muteNativeClipboardEventsTime = Date.now(); // for Edge

      this.cutCommand();
    },
    _onTextareaInput: function _onTextareaInput(e) {
      e.preventDefault();

      if (this.selectedKeywords.count > 0) {
        this.deleteSelectedKeywords();
      }

      this.openEditor({
        put: e.data
      });
    },
    deleteKeywordByIndex: function deleteKeywordByIndex(keyword_index) {
      if (!this.value || this.value.length <= keyword_index) return;

      var new_val = _toConsumableArray(this.value);

      new_val.splice(keyword_index, 1);
      this.emitValue(new_val);
    },
    openEditor: function openEditor(args) {
      var _this10 = this;

      this.editorPosition = this.cursorPosition;
      this.editorValue = null;
      this.editorInstead = !!args.instead;
      var set_cursor = args.cursorAt !== null && args.cursorAt !== undefined ? args.cursorAt : null;
      if (args.put) this.editorValue = args.put;

      if (args.keyDownEvent) {
        switch (args.keyDownEvent.key) {
          case "ArrowLeft":
            this.editorInstead = true;
            this.editorPosition--;
            args.keyDownEvent.preventDefault();
            break;

          case "ArrowRight":
            this.editorInstead = true;
            args.keyDownEvent.preventDefault();
            set_cursor = 0;
            break;

          case 'Delete':
            this.editorInstead = true;
            set_cursor = 0;
            break;

          case 'Backspace':
            this.editorInstead = true;
            this.editorPosition--;
            break;
        }
      }

      if (args.click && args.click.kwdIndex >= 0) {
        this.editorPosition = args.click.kwdIndex;
        this.editorInstead = true;
        set_cursor = this._getClickedSymbolPos(args.click);
      }

      if (this.editorInstead && this.value && this.editorPosition < this.value.length) {
        this.editorValue = this.value[this.editorPosition];
      }

      this.selectedKeywords.clear();
      this.$nextTick(function () {
        var editor = Array.isArray(_this10.$refs['editor']) ? _this10.$refs['editor'][0] : _this10.$refs['editor'];
        if (!editor) return;
        editor.focus();
        if (set_cursor !== null) editor.setCursor(set_cursor);
      });
    },
    _getClickedSymbolPos: function _getClickedSymbolPos(click_info) {
      if (!click_info.kwdElement) return 0;
      if (!click_info.kwdElement.cloneNode) return 0;
      if (!this.$refs['canvas']) return 0;
      var clone = click_info.kwdElement.cloneNode(true);
      var clone_kwd = clone.querySelector('.ImsKeywordBox-keyword');
      if (!clone_kwd) return 0;
      var rel_x = click_info.x - click_info.kwdBounds.left;
      var kwd_text_chars = clone_kwd.textContent.split('');
      clone_kwd.innerHTML = '';
      this.$refs['canvas'].appendChild(clone);
      var clone_bounds = clone.getBoundingClientRect();
      var res_pos = 0;
      var char_index = 0;

      var _iterator = _createForOfIteratorHelper(kwd_text_chars),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var char = _step.value;
          var span = window.document.createElement('span');
          span.textContent = char;
          clone_kwd.appendChild(span);
          var span_bounds = span.getBoundingClientRect();
          if (span_bounds.left + span_bounds.width / 2 - clone_bounds.left > rel_x) break;

          if (!this.separatorComp.inside || !this.separatorComp.before || char_index >= this.separatorComp.text.length) {
            res_pos++;
          }

          char_index++;
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      removeNodeFromDOM(clone);
      return res_pos;
    },
    _onContextMenu: function _onContextMenu(e) {
      var _this11 = this;

      if (this.contextMenuContext) this.contextMenuContext.destroy();
      this.contextMenuContext = new MenuContext(this, e, function () {
        return _this11.contextMenuContext = null;
      });
    },

    /**
     * Get CSS-classes for specified keyword
     * @private
     */
    _getKeywordClasses: function _getKeywordClasses(keyword, keyword_index) {
      var is_regular_cursor = this.dragKeywordPosition === null && this.focused;
      var is_cursor_before = is_regular_cursor && this.cursorPositionRaw === keyword_index && !this.cursorPositionAfter || this.dragKeywordPosition === keyword_index && this.dragKeywordIsBegin || this.dragKeywordPosition === -1 && keyword_index === 0;
      var is_cursor_after = is_regular_cursor && this.cursorPositionRaw === keyword_index + 1 && (this.value && keyword_index === this.value.length - 1 || this.cursorPositionAfter) || this.dragKeywordPosition === keyword_index && !this.dragKeywordIsBegin;
      var is_duplicated = this.highlightDuplicated && this.highlightDuplicated.hasOwnProperty(keyword);
      var classes = {
        'state-cursor-before': is_cursor_before,
        'state-cursor-after': is_cursor_after,
        'state-cursor-blink': (is_cursor_before || is_cursor_after) && is_regular_cursor,
        'state-duplicate': is_duplicated,
        'state-confirm-delete': this.confirmDeleteIndex === keyword_index
      };

      if (this.getKeywordClasses) {
        var user_classes = this.getKeywordClasses(keyword, keyword_index);

        if (user_classes) {
          if (typeof user_classes === 'string') classes[user_classes] = true;else if (Array.isArray(user_classes)) user_classes.forEach(function (cl) {
            return classes[cl] = true;
          });else Object.assign(classes, user_classes);
        }
      }

      return classes;
    },
    emitValue: function emitValue(value) {
      var record = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

      if (record && this.historyController) {
        this.historyController.push(value);
      }

      this.$emit(this.emitValueEvent, value);
    },
    _editorCommit: function _editorCommit() {
      var cur_value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : undefined;
      var emit_callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      if (this.editorPosition < 0) return;
      var editor_value = this.editorValue ? this.editorValue.trim() : '';
      this.cursorPosition = this.editorPosition;
      if (this.editorInstead) this.selectedKeywords.setSelectedStateByIndex(this.editorPosition, true, false);
      this.pasteCommand(editor_value, cur_value, emit_callback);
      this.focus();
      this.editorPosition = -1;
      return editor_value;
    },
    _editorCommand: function _editorCommand(cmd) {
      var _this12 = this;

      switch (cmd.command) {
        case 'commit':
          this._editorCommit();

          break;

        case 'move':
          {
            var new_cursor_position = this.editorPosition;

            if (cmd.dir < 0) {
              if (this.editorPosition <= 0) return;
              new_cursor_position--;
            } else {
              if (!this.value || this.editorPosition >= this.value.length) return;
              new_cursor_position++;
            }

            this._editorCommit();

            this.cursorPosition = new_cursor_position;
            this.openEditor({
              instead: true,
              cursorAt: cmd.cursorAt
            });
            break;
          }

        case 'delSep':
          {
            if (!this.value) return;
            var _new_cursor_position = this.editorPosition;

            if (cmd.dir < 0) {
              if (this.editorPosition <= 0) return;
              _new_cursor_position--;
            } else {
              if (!this.value || this.editorPosition >= this.value.length) return;
            }

            var cur_value = this.value;

            var editor_val = this._editorCommit(cur_value, function (val) {
              return cur_value = val;
            });

            var left_part = cur_value[_new_cursor_position];
            var right_part = editor_val ? cur_value[_new_cursor_position + 1] : '';
            var set_cursor = editor_val || cmd.dir < 0 ? left_part.length : 0;
            this.cursorPosition = _new_cursor_position;

            var new_val = _toConsumableArray(cur_value);

            if (editor_val) new_val.splice(_new_cursor_position + 1, 1);
            new_val[_new_cursor_position] = left_part + right_part;
            this.emitValue(new_val);
            this.$nextTick(function () {
              _this12.openEditor({
                instead: true,
                cursorAt: set_cursor
              });
            });
            break;
          }
      }
    },
    _showBetweenSeparatorBefore: function _showBetweenSeparatorBefore(keyword_index) {
      if (!this.value) return false;
      if (this.separatorComp.isNewLine) return false;
      if (!this.separatorComp.before || keyword_index === 0 && this.separatorComp.inside) return false;
      return true;
    },
    _showBetweenSeparatorAfter: function _showBetweenSeparatorAfter(keyword_index) {
      if (!this.value) return false;
      if (this.separatorComp.isNewLine) return false;
      var last_is_editing = this.editorPosition === this.value.length;
      if (this.separatorComp.before && !(last_is_editing && keyword_index === this.value.length - 1)) return false;
      return keyword_index < this.value.length - 1 || last_is_editing;
    },
    _showInsideSeparatorBefore: function _showInsideSeparatorBefore(keyword_index) {
      if (!this.value) return false;
      if (this.separatorComp.isNewLine) return false;
      if (!this.separatorComp.inside) return false;
      if (!this.separatorComp.before) return false;
      return true;
    },
    _showInsideSeparatorAfter: function _showInsideSeparatorAfter(keyword_index) {
      if (!this.value) return false;
      if (this.separatorComp.isNewLine) return false;
      if (!this.separatorComp.inside) return false;
      if (this.separatorComp.before) return false;
      return true;
    },
    _onDeleteKeywordButtonClick: function _onDeleteKeywordButtonClick(keyword_index) {
      if (!this.isMobile || this.confirmDeleteIndex === keyword_index) {
        this.deleteKeywordByIndex(keyword_index);
        this.confirmDeleteIndex = null;
      } else {
        this.confirmDeleteIndex = keyword_index;
        this.selectedKeywords.setSelectedStateByIndex(keyword_index, true);
      }
    }
  },
  created: function created() {
    if (this.historyController) this.historyController.init(this, this.value);
  },
  mounted: function mounted() {
    if (this.$refs['scroller']) this.$refs['scroller'].scrollTop = this.scrollY;
    this.cursorPosition = this.value ? this.value.length : 0;
    this.isMobile = isPlatform('mobile');
  },
  destroyed: function destroyed() {
    if (this.interactionContext) this.interactionContext.destroy();
    if (this.contextMenuContext) this.contextMenuContext.destroy();
  },
  watch: {
    value: function value() {
      this.selectedKeywords.setValue(this.value);
      if (this.interactionContext) this.interactionContext.invalidateCache();
    },
    historyController: function historyController() {
      if (this.historyController) this.historyController.init(this, this.value);
    },
    scrollY: function scrollY() {
      if (this.$refs['scroller']) this.$refs['scroller'].scrollTop = this.scrollY;
    }
  }
};/* script */
var __vue_script__$1 = script$1;
/* template */

var __vue_render__$1 = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    staticClass: "ImsKeywordBox",
    class: {
      'state-focus': _vm.focused
    },
    on: {
      "mousedown": _vm._onMouseDown,
      "dragstart": _vm._onDragStart,
      "dragenter": _vm._onDragEnter,
      "drop": _vm._onDrop,
      "contextmenu": _vm._onContextMenu
    }
  }, [_vm._ssrNode("<textarea autocorrect=\"off\" autocapitalize=\"off\" spellcheck=\"false\" class=\"ImsKeywordBox-textarea\"></textarea> "), _vm._ssrNode("<div class=\"ImsKeywordBox-scroller\">", "</div>", [_vm._ssrNode("<div class=\"ImsKeywordBox-canvas\">", "</div>", [_vm.value && _vm.value.length > 0 ? [_vm._ssrNode("<span style=\"padding-right: 0.1px\">", "</span>", [_vm._l(_vm.value, function (keyword, keyword_index) {
    return [_vm._ssrNode("<span" + _vm._ssrClass(null, _vm.separatorComp.isNewLine ? 'ImsKeywordBox-line' : 'ImsKeywordBox-inline') + ">", "</span>", [_vm._ssrNode(_vm._showBetweenSeparatorBefore(keyword_index) ? "<span" + _vm._ssrAttr("data-kwd-ind", keyword_index - 1) + " class=\"ImsKeywordBox-separator\">" + _vm._ssrEscape(_vm._s(keyword_index === 0 && !_vm.separatorComp.inside ? _vm.separatorComp.first : _vm.separatorComp.between)) + "</span>" : "<!---->"), _vm.editorPosition === keyword_index ? [_c('ims-keyword-box-editor', {
      ref: "editor",
      refInFor: true,
      staticClass: "ImsKeywordBox-editor",
      on: {
        "blur": _vm._editorCommit,
        "command": _vm._editorCommand
      },
      model: {
        value: _vm.editorValue,
        callback: function callback($$v) {
          _vm.editorValue = $$v;
        },
        expression: "editorValue"
      }
    }), _vm._ssrNode(!_vm.separatorComp.isNewLine && !_vm.editorInstead ? "<span" + _vm._ssrAttr("data-kwd-ind", keyword_index) + " class=\"ImsKeywordBox-separator\">" + _vm._ssrEscape(_vm._s(keyword_index === 0 && !_vm.separatorComp.inside && !_vm.separatorComp.before ? _vm.separatorComp.first : _vm.separatorComp.between)) + "</span>" : "<!---->")] : _vm._e(), _vm._ssrNode((_vm.editorPosition !== keyword_index || !_vm.editorInstead ? "<span" + _vm._ssrAttr("draggable", !_vm.isMobile) + _vm._ssrAttr("data-kwd-ind", keyword_index) + _vm._ssrClass("ImsKeywordBox-keyword-wrapper", {
      'state-highlighted': _vm.selectedKeywords.isSelected(keyword)
    }) + "><span" + _vm._ssrClass("ImsKeywordBox-keyword", _vm._getKeywordClasses(keyword, keyword_index)) + ">" + (_vm._showInsideSeparatorBefore(keyword_index) ? "<span class=\"ImsKeywordBox-separator-inside\">" + _vm._ssrEscape(_vm._s(keyword_index === 0 ? _vm.separatorComp.first : _vm.separatorComp.text)) + "</span>" : "<!---->") + _vm._ssrEscape(_vm._s(keyword)) + (_vm._showInsideSeparatorAfter(keyword_index) ? "<span class=\"ImsKeywordBox-separator-inside\">" + _vm._ssrEscape(_vm._s(keyword_index === 0 ? _vm.separatorComp.first : _vm.separatorComp.text)) + "</span>" : "<!---->") + (_vm.showDeleteButton ? "<span class=\"ImsKeywordBox-keyword-delete\"></span>" : "<!---->") + "</span></span>" : "<!---->") + (_vm._showBetweenSeparatorAfter(keyword_index) ? "<span" + _vm._ssrAttr("data-kwd-ind", keyword_index) + " class=\"ImsKeywordBox-separator\">" + _vm._ssrEscape(_vm._s(keyword_index === 0 && !_vm.separatorComp.inside && _vm.editorPosition !== keyword_index ? _vm.separatorComp.first : _vm.separatorComp.between)) + "</span>" : "<!---->"))], 2)];
  })], 2)] : _vm._ssrNode("<div" + _vm._ssrClass("ImsKeywordBox-stub", {
    'state-cursor-after': _vm.cursorPosition === 0 && _vm.focused || _vm.dragKeywordPosition === -1,
    'state-cursor-blink': _vm.cursorPosition === 0 && _vm.focused && _vm.dragKeywordPosition === null
  }) + "></div>"), _vm._ssrNode(" "), (!_vm.value || !_vm.value.length) && _vm.editorPosition === 0 || _vm.value && _vm.editorPosition === _vm.value.length ? _c('ims-keyword-box-editor', {
    ref: "editor",
    staticClass: "ImsKeywordBox-editor",
    on: {
      "blur": _vm._editorCommit,
      "command": _vm._editorCommand
    },
    model: {
      value: _vm.editorValue,
      callback: function callback($$v) {
        _vm.editorValue = $$v;
      },
      expression: "editorValue"
    }
  }) : _vm._e()], 2)])], 2);
};

var __vue_staticRenderFns__$1 = [];
/* style */

var __vue_inject_styles__$1 = function __vue_inject_styles__(inject) {
  if (!inject) return;
  inject("data-v-512d45a4_0", {
    source: ".ImsKeywordBox{border:1px solid #ccc;border-radius:4px;position:relative;cursor:text}.ImsKeywordBox-scroller{padding:0 6px;height:100%;max-height:inherit;min-height:inherit;border-radius:inherit;overflow:auto;overflow-x:hidden;position:relative}.ImsKeywordBox-canvas{display:block;padding:4px 4px 4px 4px;line-height:2em;position:relative;user-select:none;outline:0;min-height:100%;box-sizing:border-box}.ImsKeywordBox-keyword-wrapper{white-space:nowrap;display:inline-block}.ImsKeywordBox-keyword-wrapper.state-highlighted{position:relative}.ImsKeywordBox-keyword-wrapper.state-highlighted>.ImsKeywordBox-keyword{cursor:text}.ImsKeywordBox-keyword-wrapper.state-highlighted:before{content:\"\";position:absolute;width:100%;height:2em;background:#e9e9e9;left:-4px;top:0;padding-left:4px;padding-right:5px}.ImsKeywordBox.state-focus .ImsKeywordBox-scroller>.ImsKeywordBox-canvas .ImsKeywordBox-keyword-wrapper.state-highlighted:before{background:#d7d4f0}.ImsKeywordBox-keyword-wrapper.state-highlighted{background:#faa}.ImsKeywordBox-textarea{width:0;height:0;overflow:hidden;padding:0;display:block;resize:none;position:absolute;background:0 0;border:none;top:0;left:0;color:transparent;outline:0;opacity:.01;-webkit-text-size-adjust:none;text-size-adjust:none;font-size:1px}.ImsKeywordBox-textarea::-moz-selection,.ImsKeywordBox-textarea::selection{color:transparent}.ImsKeywordBox-keyword{padding:2px 7px;border:1px solid #ccc;border-radius:4px;line-height:1.4em;display:inline-block;white-space:nowrap;cursor:default;background-color:rgba(250,250,250,.7);position:relative}.ImsKeywordBox-keyword.state-cursor-after:after,.ImsKeywordBox-keyword.state-cursor-before:after,.ImsKeywordBox-stub.state-cursor-after:after,.ImsKeywordBox-stub.state-cursor-before:after{content:\"\";display:block;width:1px;height:29px;background:#000;position:absolute;top:-2px;pointer-events:none}.ImsKeywordBox-keyword.state-cursor-after.state-cursor-blink:after,.ImsKeywordBox-keyword.state-cursor-before.state-cursor-blink:after,.ImsKeywordBox-stub.state-cursor-after.state-cursor-blink:after,.ImsKeywordBox-stub.state-cursor-before.state-cursor-blink:after{animation:ImsKeywordBox-cursor-blink .5s infinite alternate}.ImsKeywordBox-keyword.state-cursor-before:after,.ImsKeywordBox-stub.state-cursor-before:after{left:-5px}.ImsKeywordBox-keyword.state-cursor-after:after{right:-6px}.ImsKeywordBox-keyword.state-duplicate{background-color:#ff9c9c}.ImsKeywordBox-keyword.state-confirm-delete .ImsKeywordBox-keyword-delete{animation:ImsKeywordBox-confirm-delete-blink .5s 2}.ImsKeywordBox-stub{display:inline-block;width:1px;height:1.4em;position:relative}.ImsKeywordBox-stub.state-cursor-after:after{right:0}.ImsKeywordBox-separator{position:relative;display:inline-block;white-space:pre}.ImsKeywordBox-separator:first-child,.ImsKeywordBox-separator:last-child{color:#aaa}.ImsKeywordBox-line{display:block}.ImsKeywordBox-keyword-delete{background:url(\"data:image/svg+xml,%3Csvg viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='m18.011 3.8674-6.0106 6.0106-6.0106-6.0106-2.1212 2.1212 6.0106 6.0106-6.0106 6.0106 2.1212 2.1212 6.0106-6.0106 6.0106 6.0106 2.1212-2.1212-6.0106-6.0106 6.0106-6.0106z'/%3E%3C/svg%3E%0A\") no-repeat right center;display:inline-block;width:12px;height:12px;cursor:pointer;background-size:contain;opacity:.5;position:relative;top:1px;margin-left:4px}.ImsKeywordBox-keyword-delete:hover{opacity:1}@keyframes ImsKeywordBox-cursor-blink{0%{opacity:1}49.9%{opacity:1}50%{opacity:0}100%{opacity:0}}@keyframes ImsKeywordBox-confirm-delete-blink{0%{opacity:1}50%{opacity:0}100%{opacity:1}}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


var __vue_scope_id__$1 = undefined;
/* module identifier */

var __vue_module_identifier__$1 = "data-v-512d45a4";
/* functional template */

var __vue_is_functional_template__$1 = false;
/* style inject shadow dom */

var __vue_component__$1 = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$1,
  staticRenderFns: __vue_staticRenderFns__$1
}, __vue_inject_styles__$1, __vue_script__$1, __vue_scope_id__$1, __vue_is_functional_template__$1, __vue_module_identifier__$1, false, undefined, createInjectorSSR, undefined);// Import vue component

var install = function installImsKeywordBox(Vue) {
  if (install.installed) return;
  install.installed = true;
  Vue.component('ImsKeywordBox', __vue_component__$1);
}; // Create module definition for Vue.use()


var plugin = {
  install: install
}; // To auto-install on non-es builds, when vue is found
// eslint-disable-next-line no-redeclare

/* global window, global */

{
  var GlobalVue = null;

  if (typeof window !== 'undefined') {
    GlobalVue = window.Vue;
  } else if (typeof global !== 'undefined') {
    GlobalVue = global.Vue;
  }

  if (GlobalVue) {
    GlobalVue.use(plugin);
  }
} // Inject install function into component - allows component
// to be registered via Vue.use() as well as Vue.component()


__vue_component__$1.install = install; // Export component by default
// also be used as directives, etc. - eg. import { RollupDemoDirective } from 'rollup-demo';
// export const RollupDemoDirective = component;
exports.default=__vue_component__$1;