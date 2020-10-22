class SelectionContext {
  constructor(value) {
    this.selection = {};
    this.count = 0;
    this._lastActiveKeyword = null;
    this._lastActiveKeywordIndex = -1;
    this.value = [];
    this.setValue(value);
  }

  getIndexOfKeyword(keyword) {
    return this.value.indexOf(keyword);
  }

  get lastActiveKeyword() {
    return this._lastActiveKeyword;
  }

  set lastActiveKeyword(keyword) {
    this._lastActiveKeyword = keyword;

    if (keyword) {
      this._lastActiveKeywordIndex = this.getIndexOfKeyword(keyword);
      if (this._lastActiveKeywordIndex < 0) this._lastActiveKeyword = null;
    } else this._lastActiveKeywordIndex = -1;
  }

  get lastActiveKeywordIndex() {
    return this._lastActiveKeywordIndex;
  }

  set lastActiveKeywordIndex(index) {
    if (this.value.length > 0) {
      if (index < 0) index = 0;else if (index > this.value.length - 1) index = this.value.length - 1;
      this._lastActiveKeywordIndex = index;
      this._lastActiveKeyword = this.value[index];
    } else {
      this._lastActiveKeywordIndex = -1;
      this._lastActiveKeyword = null;
    }
  }

  getFirstSelectedIndex() {
    if (!this.value) return -1;

    for (let index = 0; index < this.value.length; index++) {
      const v = this.value[index];

      if (this.selection.hasOwnProperty(v) && this.selection[v]) {
        return index;
      }
    }

    return -1;
  }

  getLastSelectedIndex() {
    if (!this.value) return -1;

    for (let index = this.value.length - 1; index >= 0; index--) {
      const v = this.value[index];

      if (this.selection.hasOwnProperty(v) && this.selection[v]) {
        return index;
      }
    }

    return -1;
  }

  setValue(value) {
    this.value = value ? value : [];
    if (!value) return;
    const new_selection = {};
    let new_count = 0;
    value.forEach((v, i) => {
      if (this.selection.hasOwnProperty(v) && this.selection[v]) {
        new_selection[v] = true;
        new_count++;
      }
    });
    this.selection = new_selection;
    this.count = new_count;
  }

  isSelected(title_keyword) {
    return this.selection.hasOwnProperty(title_keyword) && this.selection[title_keyword];
  }

  isSelectedByIndex(index) {
    if (index >= this.value.length || index < 0) return false;
    return this.isSelected(this.value[index]);
  }

  selectKeyword(title_keyword, append = false) {
    if (!title_keyword) return;
    const new_selection = append ? { ...this.selection
    } : {};
    new_selection[title_keyword] = true;
    this.selection = new_selection;
    this.count = append ? this.count + 1 : 1;
  }

  selectKeywordsArray(keywords, append = false) {
    if (keywords.length === 0) return;
    const new_selection = append ? { ...this.selection
    } : {};
    if (!append) this.count = 0;
    keywords.forEach(kwd => {
      if (!new_selection[kwd]) {
        new_selection[kwd] = true;
        this.count++;
      }
    });
    this.selection = new_selection;
  }

  clear() {
    if (this.count === 0) return;
    this.selection = {};
    this.count = 0;
  }

  selectAll() {
    const new_selection = {};

    for (let v of this.value) {
      new_selection[v] = true;
    }

    this.selection = new_selection;
    this.count = this.value.length;
  }

  deselectKeyword(title_keyword, append = false) {
    if (!title_keyword) return;

    if (!append) {
      this.selection = {};
      this.count = 0;
    } else {
      if (this.selection.hasOwnProperty(title_keyword) && this.selection[title_keyword]) {
        this.selection = { ...this.selection,
          [title_keyword]: false
        };
        this.count--;
      }
    }
  }

  setSelectedState(title_keyword, selected, append = false) {
    if (selected) this.selectKeyword(title_keyword, append);else this.deselectKeyword(title_keyword, append);
  }

  setSelectedStateByIndex(index, selected, append = false) {
    if (index >= this.value.length || index < 0) return;
    if (selected) this.selectKeyword(this.value[index], append);else this.deselectKeyword(this.value[index], append);
  }

  selectRangeByIndexes(start_index, end_index, append = false) {
    if (start_index > end_index) {
      const tmp = start_index;
      start_index = end_index;
      end_index = tmp;
    }

    const new_selection = append ? { ...this.selection
    } : {};
    let new_count = append ? this.count : 0;

    for (let i = Math.max(start_index, 0); i <= Math.min(end_index, this.value.length - 1); i++) {
      if (!new_selection.hasOwnProperty(this.value[i]) || !new_selection[this.value[i]]) {
        new_selection[this.value[i]] = true;
        new_count++;
      }
    }

    this.selection = new_selection;
    this.count = new_count;
  }

  getSiblingKeyword(index, dir) {
    if (dir === 0) return index < this.value.length && index >= 0 ? this.value[index] : null;else if (dir > 0) return index < this.value.length - 1 ? this.value[index + 1] : null;else return index > 0 ? this.value[index - 1] : null;
  }

  getActiveSiblingKeyword(dir) {
    return this.getSiblingKeyword(this.lastActiveKeywordIndex, dir);
  }

  getSelectionAsArray() {
    if (this.count === 0) return [];
    return this.value.filter(v => {
      return this.selection.hasOwnProperty(v) && this.selection[v];
    });
  }

}

function nodeHasClass(node, class_name) {
  if (!node) return false;

  if (node.classList !== undefined) {
    if (node.classList.contains(class_name)) return true;
  } else if (node.className === undefined) return false;else if (node.className === class_name) return true;else {
    // check all classes
    const classes = node.className.split(/\s/);

    if (classes.some(c => c.trim() === class_name)) {
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
}

let computedPlatforms = null;
function isPlatform(name) {
  if (!window || !window.navigator) return false;

  if (!computedPlatforms) {
    const ua = window.navigator.userAgent;
    const ie = /Edge\/|Trident\/|MSIE /.test(ua);
    const ios = !ie && /AppleWebKit/.test(ua) && /Mobile\/\w+/.test(ua);
    const mac = ios || /mac/i.test(window.navigator.platform);
    const safari = /apple/i.test(window.navigator.vendor);
    computedPlatforms = {
      ie,
      mac,
      safari,
      ios
    };
  }

  return computedPlatforms[name];
}
function isPlatformCtrlClick(e) {
  let flip = isPlatform('mac');
  return flip ? e.metaKey : e.ctrlKey;
}

class InteractionContext {
  constructor(component, event, destroyed, is_dragging) {
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

  invalidateCache() {
    this._cacheKeywordsElems = null;
    this._cacheKeywordsBounds = {};
  }

  onMouseEnd(e) {
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

  onMouseUpdate(e) {
    const is_ctrl = isPlatformCtrlClick(e);
    this.curPoint = this.getMousePointInfo(e);

    if (this.isDragging) {
      const isText = e.dataTransfer.types.includes("text/plain");
      if (isText) e.preventDefault();
      this.component.dragKeywordPosition = this.curPoint.kwdIndex;
      this.component.dragKeywordIsBegin = false;

      if (this.curPoint.hoverKwdElement) {
        const kwd_bounds = this._getKeywordBounds(this.curPoint.kwdIndex);

        if (kwd_bounds && kwd_bounds.left + kwd_bounds.width / 2 > e.clientX) {
          this.component.dragKeywordIsBegin = true;
        }
      }
    } else {
      if (!this.startPoint.hoverKwdElement) {
        let start_index = this.startPoint.kwdIndex + this.startPoint.offset;

        if (this.startPoint.kwdIndex === this.curPoint.kwdIndex) {
          if (!is_ctrl) {
            if (this.component.selectedKeywords.count > 0) this.component.selectedKeywords.clear();
            this.component.cursorPosition = start_index;
          }
        } else {
          this.component.cursorPosition = -1;
          if (start_index > this.curPoint.kwdIndex) start_index--;
          let end_index = this.curPoint.kwdIndex;
          if (this.curPoint.outside !== 0) end_index++;
          this.component.selectedKeywords.lastActiveKeywordIndex = start_index;
          this.component.selectedKeywords.selectRangeByIndexes(start_index, end_index, is_ctrl);
        }
      }
    }
  }

  keywordClick(point_info, e) {
    if (point_info.delButton) return;
    const is_ctrl = isPlatformCtrlClick(e);
    let clicked_keyword_index = point_info.kwdIndex;
    let clicked_separator_pos = -1;
    let last_active_index = this.component.cursorPosition === -1 ? this.component.selectedKeywords.lastActiveKeywordIndex : this.component.cursorPosition;

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

    let button_allowed = e.button === 0;
    if (e.button === 2) button_allowed = this.component.selectedKeywords.count > 0;

    if (clicked_keyword_index >= 0 && button_allowed) {
      if (e.shiftKey) {
        if (this.component.cursorPosition !== -1) {
          if (clicked_keyword_index < last_active_index) last_active_index--;
          this.component.selectedKeywords.lastActiveKeywordIndex = last_active_index;
        }

        this.component.selectedKeywords.selectRangeByIndexes(last_active_index, clicked_keyword_index, is_ctrl);
      } else {
        const already_selected = this.component.selectedKeywords.isSelectedByIndex(clicked_keyword_index);

        if (is_ctrl) {
          this.component.selectedKeywords.setSelectedStateByIndex(clicked_keyword_index, !already_selected, true);
        } else {
          if (!already_selected) {
            this.component.selectedKeywords.setSelectedStateByIndex(clicked_keyword_index, true);
          } else if (e.button === 0) {
            const click_info = {
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

  getMousePointInfo(e) {
    const res = {
      kwdIndex: -1,
      offset: 1,
      hoverKwdElement: null,
      outside: 0,
      delButton: false
    };
    if (!this.component.value || this.component.value.length === 0) return res;
    let target = e.target;

    if (nodeHasClass(target, 'ImsKeywordBox-keyword-delete')) {
      res.delButton = true;
      target = getClosestNodeByClass(target, 'ImsKeywordBox-keyword');
      if (!target) target = e.target;
    }

    if (nodeHasClass(target, 'ImsKeywordBox-keyword')) {
      target = getClosestNodeByClass(target, 'ImsKeywordBox-keyword-wrapper');
      if (!target) target = e.target;
    }

    const target_is_kwd = nodeHasClass(target, 'ImsKeywordBox-keyword-wrapper');
    const target_is_separartor = nodeHasClass(target, 'ImsKeywordBox-separator');

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

  _findMousePointInfoByCoords(x, y) {
    const res = {
      kwdIndex: this.component.value ? this.component.value.length - 1 : -1,
      offset: 1,
      hoverKwdElement: null,
      outside: 1
    };

    const last_bound = this._getLastKeywordBounds();

    if (!last_bound) return res;

    if (y > last_bound.bottom || y > last_bound.top && x > last_bound.right) {
      return res;
    }

    const first_bound = this._getFirstKeywordBounds();

    if (!first_bound) return res;
    const is_begin_line = x < last_bound.left;

    if (y < first_bound.bottom && is_begin_line) {
      res.kwdIndex = -1;
      res.offset = 1;
      res.outside = -1;
      return res;
    }

    const rel_y = y - first_bound.top;
    const line = Math.floor(rel_y / first_bound.height);
    res.kwdIndex = this._findKeywordEdgeIndex(line, is_begin_line ? -1 : 1, first_bound.top, first_bound.height) + (is_begin_line ? -1 : 0);
    res.offset = 1;
    res.outside = is_begin_line ? -1 : 1;
    return res;
  }

  _findKeywordEdgeIndex(line, which, canvas_top, line_height) {
    let begin = 0;
    let end = this.component.value ? this.component.value.length - 1 : -1;

    while (begin <= end) {
      const middle = Math.floor((end + begin) / 2);

      const middle_bound = this._getKeywordBounds(middle);

      const middle_line = middle_bound ? Math.round((middle_bound.top - canvas_top) / line_height) : 0;

      const shift_bound = this._getKeywordBounds(middle + which);

      const shift_line = shift_bound ? Math.round((shift_bound.top - canvas_top) / line_height) : middle_line + which;

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

  _getHoverKwdElement(keyword_index) {
    if (!this._cacheKeywordsElems) {
      if (!this.component.$refs['canvas']) return null;
      this._cacheKeywordsElems = this.component.$refs['canvas'].querySelectorAll('.ImsKeywordBox-keyword-wrapper');
    }

    if (keyword_index < 0 || keyword_index >= this._cacheKeywordsElems.length) return null;
    return this._cacheKeywordsElems[keyword_index];
  }

  _getKeywordBounds(keyword_index) {
    if (!this._cacheKeywordsBounds.hasOwnProperty(keyword_index)) {
      const element = this._getHoverKwdElement(keyword_index);

      if (!element) return null;
      this._cacheKeywordsBounds[keyword_index] = element.getBoundingClientRect();
    }

    return this._cacheKeywordsBounds[keyword_index];
  }

  _getLastKeywordBounds() {
    return this._getKeywordBounds(this.component.value ? this.component.value.length - 1 : -1);
  }

  _getFirstKeywordBounds() {
    return this._getKeywordBounds(0);
  }

  destroy() {
    this.component.dragKeywordPosition = null;
    this.component.dragKeywordIsBegin = false;
    this.resetEventHandlers(this.isDragging, true);
    removeNodeFromDOM(this.draggingCanvas);
    if (this.destroyed) this.destroyed();
  }

  makeDragging() {
    if (this.isDragging) return;
    this.isDragging = true;
    this.resetEventHandlers(false, false);
  }

  onDragLeave() {
    this.component.dragKeywordPosition = null;
    this.component.dragKeywordIsBegin = false;
  }

  resetEventHandlers(was_dragging, remove_only) {
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
      this._onMouseEndHandler = e => this.onMouseEnd(e);

      this._onMouseUpdateHandler = e => this.onMouseUpdate(e);

      this._invalidateCacheHandler = e => this.invalidateCache();

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
        this._onDragLeaveHandler = e => this.onDragLeave(e);

        this.component.$el.addEventListener('dragleave', this._onDragLeaveHandler);
      }
    }
  }

  deleteDraggingMyKeywords(emit = true, cur_value = undefined) {
    cur_value = cur_value !== undefined ? cur_value : this.component.value;
    if (!cur_value) cur_value = [];
    let new_value = cur_value;

    if (this.draggingMyKeywords.length > 0) {
      let first_selected_index = -1;
      new_value = [];

      for (let index = 0; index < cur_value.length; index++) {
        const v = cur_value[index];

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

}

const SHOW_TEXTBOX_TIME = 100;
const SELECT_ALL_DETECT_PERIOD = 500;
const SELECT_ALL_DETECT_TRIES = 10;
class MenuContext {
  constructor(component, event, destroyed) {
    this.component = component;
    this.destroyed = destroyed;

    this._moveTextareaToCursor(event);

    this.selectAllDetectTimeout = null;
    this.selectAllTry = 0;

    this._runHideTimeout();
  }

  _runHideTimeout() {
    this._hideTimeout = setTimeout(() => {
      this._hideTimeout = null;

      this._hideTextarea();
    }, SHOW_TEXTBOX_TIME);
  }

  _moveTextareaToCursor(e) {
    if (!this.component.$refs['textArea']) return;
    const bounds = this.component.$el.getBoundingClientRect();
    this.component.$refs['textArea'].style.left = e.clientX - bounds.left - 5 + 'px';
    this.component.$refs['textArea'].style.top = e.clientY - bounds.top - 5 + 'px';
    this.component.$refs['textArea'].style.width = '10px';
    this.component.$refs['textArea'].style.height = '10px';
    this.component.$refs['textArea'].style.zIndex = 10000;
    this.component.$refs['textArea'].focus();
    this.component.$refs['textArea'].value = '';
    const kwds = this.component.getSelectionsAsJoinedString();
    this.component.$refs['textArea'].value = kwds + ' ';
    this.component.$refs['textArea'].setSelectionRange(0, kwds.length);
    this.selectAllTry = 0;

    this._detectSelectAll();
  }

  _detectSelectAll() {
    if (this.selectAllTry >= SELECT_ALL_DETECT_TRIES) return;
    this.selectAllTry++;
    setTimeout(() => {
      if (!this.component.$refs['textArea']) return;

      if (this.component.$refs['textArea'].selectionEnd === this.component.$refs['textArea'].value.length) {
        this.component.selectAll();
      } else this._detectSelectAll();
    }, SELECT_ALL_DETECT_PERIOD);
  }

  _hideTextarea() {
    if (!this.component.$refs['textArea']) return;
    this.component.$refs['textArea'].style.left = 0;
    this.component.$refs['textArea'].style.top = 0;
    this.component.$refs['textArea'].style.width = 0;
    this.component.$refs['textArea'].style.height = 0;
    this.component.$refs['textArea'].style.zIndex = -2;
  }

  destroy() {
    if (this._hideTimeout) clearTimeout(this._hideTimeout);
    if (this.selectAllDetectTimeout) clearTimeout(this.selectAllDetectTimeout);
    if (this.destroyed) this.destroyed();
    if (this.component.$refs['textArea']) this.component.$refs['textArea'].value = '';
  }

}

function getCharacterFromKeyboardEvent(event) {
  if (!event.key || event.altKey || event.ctrlKey || event.metaKey) return null;else if (event.key === 'Spacebar') return ' ';else if (event.key.length === 1 || event.key.length > 1 && /[^a-zA-Z0-9]/.test(event.key)) {
    return event.key;
  } else return null;
}
function getCodeFromKeyboardEvent(event) {
  if (event.code !== undefined) return event.code;
  const code_map = {
    65: 'KeyA',
    67: 'KeyC',
    86: 'KeyV',
    88: 'KeyX',
    89: 'KeyY',
    90: 'KeyZ'
  };
  return code_map.hasOwnProperty(event.which) ? code_map[event.which] : null;
}

async function clipboardCopyPlainText(str) {
  try {
    return await navigator.clipboard.writeText(str);
  } catch (err) {
    // Fallback method
    const fallback_area = document.createElement("textarea");
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
  }
}

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
var script = {
  name: "ImsKeywordBoxEditor",
  props: {
    value: {}
  },

  data() {
    return {
      rawVal: this.value
    };
  },

  methods: {
    _updateSize() {
      if (!this.$refs['hidden'] || !this.$refs['input']) return;
      this.$refs['hidden'].textContent = this.rawVal;
      const bounds = this.$refs['hidden'].getBoundingClientRect();
      this.$refs['input'].style.width = bounds.width + "px";
    },

    _setValue(val) {
      if (this.rawVal !== val) {
        this.rawVal = val;

        this._updateSize();

        this.$emit('input', val);
      }
    },

    _onBlur() {
      this.$emit('blur');
    },

    setCursor(pos) {
      if (!this.$refs['input']) return;
      this.$refs['input'].setSelectionRange(pos, pos);
    },

    focus() {
      if (!this.$refs['input']) return;
      this.$refs['input'].focus();
    },

    blur() {
      if (!this.$refs['blur']) return;
      this.$refs['blur'].blur();
    },

    _onKeyDown(event) {
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
            cursorAtBegin: true
          });
          break;

        case 'ArrowLeft':
          if (this.$refs['input'].selectionStart === this.$refs['input'].selectionEnd) {
            if (this.$refs['input'].selectionStart === 0) {
              event.preventDefault();
              this.$emit('command', {
                command: 'move',
                dir: -1,
                cursorAtBegin: false
              });
            }
          }

          break;

        case 'ArrowRight':
          if (this.$refs['input'].selectionStart === this.$refs['input'].selectionEnd) {
            if (this.$refs['input'].selectionStart === this.rawVal.length) {
              event.preventDefault();
              this.$emit('command', {
                command: 'move',
                dir: 1,
                cursorAtBegin: true
              });
            }
          }

          break;
      }
    }

  },

  mounted() {
    this._updateSize();
  },

  watch: {
    value() {
      if (this.rawVal !== this.value) {
        this.rawVal = this.value;

        this._updateSize();
      }
    }

  }
};

function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
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
}

const isOldIE = typeof navigator !== 'undefined' &&
    /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());
function createInjector(context) {
    return (id, style) => addStyle(id, style);
}
let HEAD;
const styles = {};
function addStyle(id, css) {
    const group = isOldIE ? css.media || 'default' : id;
    const style = styles[group] || (styles[group] = { ids: new Set(), styles: [] });
    if (!style.ids.has(id)) {
        style.ids.add(id);
        let code = css.source;
        if (css.map) {
            // https://developer.chrome.com/devtools/docs/javascript-debugging
            // this makes source maps inside style tags work properly in Chrome
            code += '\n/*# sourceURL=' + css.map.sources[0] + ' */';
            // http://stackoverflow.com/a/26603875
            code +=
                '\n/*# sourceMappingURL=data:application/json;base64,' +
                    btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) +
                    ' */';
        }
        if (!style.element) {
            style.element = document.createElement('style');
            style.element.type = 'text/css';
            if (css.media)
                style.element.setAttribute('media', css.media);
            if (HEAD === undefined) {
                HEAD = document.head || document.getElementsByTagName('head')[0];
            }
            HEAD.appendChild(style.element);
        }
        if ('styleSheet' in style.element) {
            style.styles.push(code);
            style.element.styleSheet.cssText = style.styles
                .filter(Boolean)
                .join('\n');
        }
        else {
            const index = style.ids.size - 1;
            const textNode = document.createTextNode(code);
            const nodes = style.element.childNodes;
            if (nodes[index])
                style.element.removeChild(nodes[index]);
            if (nodes.length)
                style.element.insertBefore(textNode, nodes[index]);
            else
                style.element.appendChild(textNode);
        }
    }
}

/* script */
const __vue_script__ = script;
/* template */

var __vue_render__ = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('span', {
    staticClass: "ImsKeywordBoxEditor"
  }, [_c('input', {
    ref: "input",
    staticClass: "ImsKeywordBoxEditor-input",
    attrs: {
      "type": "text"
    },
    domProps: {
      "value": _vm.rawVal
    },
    on: {
      "keydown": _vm._onKeyDown,
      "blur": _vm._onBlur,
      "input": function ($event) {
        return _vm._setValue($event.target.value);
      }
    }
  }), _vm._v(" "), _c('span', {
    ref: "hidden",
    staticClass: "ImsKeywordBoxEditor-hidden"
  })]);
};

var __vue_staticRenderFns__ = [];
/* style */

const __vue_inject_styles__ = function (inject) {
  if (!inject) return;
  inject("data-v-41cddd5f_0", {
    source: ".ImsKeywordBoxEditor{position:relative;display:inline-block}.ImsKeywordBoxEditor-hidden,.ImsKeywordBoxEditor-input{outline:0;border:none;font-size:inherit;font-family:inherit;line-height:inherit;white-space:pre;display:block;padding:0;background:0 0}.ImsKeywordBoxEditor-hidden{position:absolute;top:0;left:0;visibility:hidden;box-sizing:content-box;padding-right:5px}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


const __vue_scope_id__ = undefined;
/* module identifier */

const __vue_module_identifier__ = undefined;
/* functional template */

const __vue_is_functional_template__ = false;
/* style inject SSR */

/* style inject shadow dom */

const __vue_component__ = /*#__PURE__*/normalizeComponent({
  render: __vue_render__,
  staticRenderFns: __vue_staticRenderFns__
}, __vue_inject_styles__, __vue_script__, __vue_scope_id__, __vue_is_functional_template__, __vue_module_identifier__, false, createInjector, undefined, undefined);

class HistoryController {
  /**
   * Init
   * @param component
   * @param value
   */
  init(component, value) {}
  /***
   * Add new state to history
   * @param value - adding keywords
   */


  push(value) {}
  /**
   * Undo
   */


  undo() {}
  /**
   * Redo
   */


  redo() {}

}

class StackHistoryController extends HistoryController {
  constructor() {
    super();
    this.history = [];
    this.pointer = 0;
  }
  /**
   * Init
   * @param component
   * @param value
   */


  init(component, value) {
    this.component = component;
    this.history = [value];
  }
  /***
   * Add new state to history
   * @param value - adding keywords
   */


  push(value) {
    this.history = [value, ...this.history.slice(this.pointer)];
    this.pointer = 0;
  }
  /**
   * Undo
   */


  undo() {
    if (this.pointer < this.history.length - 1) {
      this.pointer++;
      this.component.emitValue(this.history[this.pointer], false);
    }
  }
  /**
   * Redo
   */


  redo() {
    if (this.pointer > 0) {
      this.pointer--;
      this.component.emitValue(this.history[this.pointer], false);
    }
  }

}

//
const MUTE_NATIVE_EVENTS_DELAY = 100;
const DUPLICATE_REMOVE_HIGHLIGHT_TIME = 600;
const DUPLICATE_REMOVE_HIGHLIGHT_CHECK = 200;
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
      type: String,
      default: ', '
    },
    preprocessKeyword: {
      type: Function,
      default: null
    },
    scrollY: {
      type: Number,
      default: 0
    },
    splittingRegexp: {
      type: RegExp,
      default: () => /[;,\r\n]/
    },
    getKeywordClasses: {
      type: Function,
      default: null
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
      default: () => new StackHistoryController()
    }
  },

  data() {
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
      editorValue: null
    };
  },

  computed: {
    cursorPosition: {
      get() {
        return this.cursorPositionRaw;
      },

      set(val) {
        this.cursorPositionRaw = val;
        this.cursorPositionAfter = false;
      }

    },

    separatorIsNewLine() {
      return this.separator === '\r\n';
    },

    separatorCharacter() {
      return this.separator;
    }

  },
  methods: {
    /**
     * Set position of cursor
     * @param {number} val - index of keyword
     * @param {boolean} after - show cursor after this keyword
     */
    setCursorPosition(val, after) {
      this.cursorPositionRaw = val;
      this.cursorPositionAfter = after;
    },

    /**
     * Delete keywords which are currently selected
     * @param {boolean} emit - if true, emit new value
     * @returns {string[]} - new value
     */
    deleteSelectedKeywords(emit = true, cur_value = undefined) {
      cur_value = cur_value !== undefined ? cur_value : this.value;
      if (!cur_value) cur_value = [];
      let new_value = cur_value;

      if (this.selectedKeywords.count > 0) {
        let first_selected_index = -1;
        new_value = [];

        for (let index = 0; index < cur_value.length; index++) {
          const v = cur_value[index];

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
    eraseEofCommand() {
      let remove_from = this.selectedKeywords.count > 0 ? this.selectedKeywords.getFirstSelectedIndex() : this.cursorPosition;
      if (remove_from < 0) remove_from = 0;
      const new_val = this.value ? this.value.slice(0, remove_from) : [];
      this.cursorPosition = new_val.length;
      this.selectedKeywords.clear();
      this.emitValue(new_val);
    },

    /**
     * Command "clear": Clear value
     */
    clearCommand() {
      this.selectedKeywords.clear();
      this.cursorPosition = -1;
      this.emitValue([]);
    },

    /**
     * Delete one word based on cursor position
     * @param {number} dir - additional offset for cursor position
     */
    deleteWordFromCursor(dir) {
      if (this.cursorPosition >= 0) {
        const new_val = this.value ? [...this.value] : [];
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
    getSelectionsAsJoinedString() {
      const sel_arr = this.selectedKeywords.getSelectionAsArray();
      return sel_arr.join(this.separatorCharacter);
    },

    /**
     *  Command "Copy": copies selected keywords to clipboard
     */
    async copyCommand() {
      try {
        if (this.selectedKeywords.count > 0) {
          await clipboardCopyPlainText(this.getSelectionsAsJoinedString());
        }
      } catch (err) {
        if (!this.handleExceptions || !this.handleExceptions(err)) {
          throw err;
        }
      }
    },

    /**
     *  Command "Cut": copies selected keywords to clipboard
     */
    async cutCommand() {
      if (this.selectedKeywords.count > 0) {
        await this.copyCommand();
        this.deleteSelectedKeywords();
      }
    },

    /**
     *  Command "Paste": paste text instead of selected keywords
     */
    pasteCommand(text) {
      if (!text) return;
      let cur_value = this.value;

      if (this.selectedKeywords.count > 0) {
        cur_value = this.deleteSelectedKeywords(false);
      }

      this._pasteCommandImpl(this.cursorPosition, cur_value, text);
    },

    /**
     * Select all keywords
     */
    selectAll() {
      this.cursorPosition = -1;
      this.selectedKeywords.selectAll();
    },

    /**
     * Make component focused
     */
    focus() {
      if (this.$refs['textArea']) this.$refs['textArea'].focus();
    },

    /**
     *  Notify about scrollY change
     */
    emitScroll() {
      if (this.$refs['scroller']) this.$emit('update:scrollY', this.$refs['scroller'].scrollTop);
    },

    /**
     * Implementation of "Paste" command
     * @param {number} cursor - where paste
     * @param {string[]} cur_value - current component's value before paste
     * @param {string} text - what paste
     * @returns {string[]} pasted keywords
     */
    _pasteCommandImpl(cursor, cur_value, text) {
      if (!text) return;
      if (cursor < 0) cursor = 0;
      const exist_set = new Set(cur_value);
      const ins_repeat_check = new Set();
      const split = text.split(this.splittingRegexp);
      const split_norm = [];
      let duplicated = null;

      for (let e = 0; e < split.length; e++) {
        const e_norm_val = this.preprocessKeyword ? this.preprocessKeyword(split[e]) : split[e];
        if (!e_norm_val) continue;
        if (ins_repeat_check.has(e_norm_val)) continue;
        ins_repeat_check.add(e_norm_val);

        if (exist_set.has(e_norm_val)) {
          if (!duplicated) duplicated = {};
          duplicated[e_norm_val] = Date.now();
          const index_of_exist = cur_value.indexOf(e_norm_val);
          if (index_of_exist < cursor) continue;else {
            cur_value = cur_value !== this.value ? cur_value : [...cur_value];
            cur_value.splice(index_of_exist, 1);
          }
        }

        split_norm.push(e_norm_val);
      }

      this.selectedKeywords.clear();
      this.cursorPosition = cursor + split_norm.length;
      this.selectedKeywords.lastActiveKeywordIndex = this.cursorPosition;

      if (split_norm.length !== 0 || cur_value !== this.value) {
        const new_value = [...cur_value];
        new_value.splice(cursor, 0, ...split_norm);
        this.emitValue(new_value);
      }

      if (duplicated) {
        if (!this.highlightDuplicated) {
          this.highlightDuplicated = duplicated;

          const remove_highlight = () => {
            if (!this.highlightDuplicated) return;
            let new_highlighting_duplicate = null;
            const delete_time = Date.now() - DUPLICATE_REMOVE_HIGHLIGHT_TIME;

            for (let kwd in this.highlightDuplicated) {
              if (!this.highlightDuplicated.hasOwnProperty(kwd)) continue;

              if (this.highlightDuplicated[kwd] > delete_time) {
                if (!new_highlighting_duplicate) new_highlighting_duplicate = {};
                new_highlighting_duplicate[kwd] = this.highlightDuplicated[kwd];
              }
            }

            this.highlightDuplicated = new_highlighting_duplicate;
            if (this.highlightDuplicated) setTimeout(remove_highlight, DUPLICATE_REMOVE_HIGHLIGHT_CHECK);
          };

          setTimeout(remove_highlight, DUPLICATE_REMOVE_HIGHLIGHT_CHECK);
        } else this.highlightDuplicated = { ...this.highlightDuplicated,
          ...duplicated
        };
      }

      return split_norm;
    },

    _onMouseDown(e) {
      const editor = getClosestNodeByClass(e.target, 'ImsKeywordBox-editor');
      if (editor) return;

      if (this.$refs['textArea']) {
        setTimeout(() => {
          if (this.$refs['textArea']) this.$refs['textArea'].focus();
        }, 10);
      }

      if (this.interactionContext) return;
      this.interactionContext = new InteractionContext(this, e, () => this.interactionContext = null, false);
    },

    _onTextareaFocus() {
      this.focused = true;
      setTimeout(() => {
        if (document.activeElement !== this.$refs['textArea']) return;
        if (!this.focused) this.$emit('focus');
      }, 100);
    },

    _onTextareaBlur() {
      this.focused = false;
      setTimeout(() => {
        if (document.activeElement === this.$refs['textArea']) return;
        if (this.focused) this.$emit('blur');
      }, 100);
    },

    _onDragStart(e) {
      const kwd_index = e.target.dataset.kwdInd;
      if (kwd_index === undefined) return;

      if (!this.selectedKeywords.isSelectedByIndex(kwd_index)) {
        this.cursorPosition = -1;
        this.selectedKeywords.setSelectedStateByIndex(kwd_index, true, false);
      }

      e.dataTransfer.setData("text/plain", this.getSelectionsAsJoinedString());

      if (this.interactionContext) {
        if (!this.interactionContext.isDragging) this.interactionContext.makeDragging();
      } else this.interactionContext = new InteractionContext(this, e, () => this.interactionContext = null, true);

      this.interactionContext.draggingMyKeywords = this.selectedKeywords.getSelectionAsArray();

      if (this.selectedKeywords.count > 1) {
        const dragging_canvas = document.createElement('canvas');
        dragging_canvas.style.position = "absolute";
        dragging_canvas.style.left = '-100%';
        document.body.append(dragging_canvas);

        if (this.customizeMultiKeywordDraggingCanvas) {
          this.customizeMultiKeywordDraggingCanvas(dragging_canvas, this.selectedKeywords);
        } else {
          const context = dragging_canvas.getContext('2d');
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

    _onDragEnter(e) {
      if (getClosestNodeByClass(e.target, 'ImsKeywordBox-editor')) {
        return;
      }

      const isText = e.dataTransfer.types.includes("text/plain");
      if (isText) e.preventDefault();

      if (this.interactionContext) {
        if (!this.interactionContext.isDragging) this.interactionContext.makeDragging();
      } else this.interactionContext = new InteractionContext(this, e, () => this.interactionContext = null, true);
    },

    _onDrop(e) {
      if (getClosestNodeByClass(e.target, 'ImsKeywordBox-editor')) {
        return;
      }

      const text = e.dataTransfer.getData("text/plain");
      e.preventDefault();
      let cur_value = this.value ? this.value : [];
      let drop_anchor = cur_value[this.dragKeywordPosition];

      if (this.editorPosition >= 0) {
        if (this.editorInstead) {
          cur_value = [...cur_value];
          cur_value.splice(this.editorPosition, 1);
        }

        this.editorPosition = -1;
      }

      if (this.interactionContext) {
        if (this.interactionContext.draggingMyKeywords.indexOf(drop_anchor) >= 0) {
          // Check if selected keywords are in different parts of field
          // If true - move elements to begining of section where cursor points to
          // If false- do nothing
          const dragging_keywords_set = new Set();
          this.interactionContext.draggingMyKeywords.forEach((kwd, kwd_index) => {
            dragging_keywords_set.add(kwd);
          });
          let cur_sect_begin = null;
          let sect_count = 0;
          let sect_anchor_found = false;

          for (let i = 0; i < cur_value.length; i++) {
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

      let drop_anchor_index = drop_anchor ? cur_value.indexOf(drop_anchor) : this.dragKeywordPosition;
      if (drop_anchor_index < 0) drop_anchor_index = this.dragKeywordPosition;

      const pasted_keywords = this._pasteCommandImpl(drop_anchor_index + (this.dragKeywordIsBegin ? 0 : 1), cur_value, text);

      this.cursorPosition = -1;
      this.selectedKeywords.selectKeywordsArray(pasted_keywords);
      if (this.interactionContext) this.interactionContext.destroy();
    },

    _onTextareaKeyDown(e) {
      let handled = false;
      const print_key = getCharacterFromKeyboardEvent(e);
      let can_open_editor = !!print_key;
      const is_ctrl = isPlatformCtrlClick(e);
      const cur_value = this.value ? this.value : [];

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
              const dir = e.key === 'ArrowDown' ? 1 : -1;
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
            const dir = e.key === 'ArrowRight' ? 1 : -1;

            if (this.selectedKeywords.count > 0) {
              if (is_ctrl || e.shiftKey) {
                const append = e.shiftKey;
                const sibling_keyword = this.selectedKeywords.getActiveSiblingKeyword(dir);

                if (sibling_keyword) {
                  if (append && this.selectedKeywords.isSelected(sibling_keyword)) {
                    this.selectedKeywords.deselectKeyword(this.selectedKeywords.lastActiveKeyword, true);
                  } else this.selectedKeywords.selectKeyword(sibling_keyword, append);

                  this.selectedKeywords.lastActiveKeywordIndex += dir;
                }
              } else {
                if (dir > 0) this.cursorPosition = this.selectedKeywords.getLastSelectedIndex() + 1;else this.cursorPosition = this.selectedKeywords.getFirstSelectedIndex();
                this.selectedKeywords.clear();
              }

              handled = true;
            } else if (is_ctrl) {
              if (e.shiftKey) {
                const sibling_keyword = this.selectedKeywords.getSiblingKeyword(this.cursorPosition, dir < 0 ? -1 : 0);

                if (sibling_keyword) {
                  this.selectedKeywords.selectKeyword(sibling_keyword);
                  this.selectedKeywords.lastActiveKeywordIndex = this.cursorPosition + (dir < 0 ? -1 : 0);
                  this.cursorPosition = -1;
                }
              } else {
                this.cursorPosition = Math.min(Math.max(this.cursorPosition + dir, 0), cur_value.length);
              }

              handled = true;
            } else {
              if (dir < 0 && this.cursorPosition === 0 || dir > 0 && this.cursorPosition === cur_value.length) {
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
            const to_pos = e.key === 'Home' ? 0 : cur_value.length;

            if (e.shiftKey) {
              let act_ind = this.selectedKeywords.count > 0 ? this.selectedKeywords.lastActiveKeywordIndex : this.cursorPosition;
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
          const e_code = getCodeFromKeyboardEvent(e);

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
        this.$nextTick(() => {
          const act_ind = this.selectedKeywords.count > 0 ? this.selectedKeywords.lastActiveKeywordIndex : this.cursorPosition;
          if (act_ind < 0 || !this.$el) return;
          const kwd_elem = this.$el.querySelector('.ImsKeywordBox-keyword-wrapper[data-kwd-ind="' + act_ind + '"]');
          if (!kwd_elem) return;

          if (isPlatform('ie') || isPlatform('safari') || isPlatform('ios')) {
            if (!this.$refs['scroller']) return;
            const scroller_bounds = this.$refs['scroller'].getBoundingClientRect();
            const kwd_bounds = kwd_elem.getBoundingClientRect();

            if (kwd_bounds.bottom < scroller_bounds.top + 10) {
              this.$refs['scroller'].scrollTop -= scroller_bounds.top - kwd_bounds.bottom + kwd_bounds.height;
              this.emitScroll();
            } else if (kwd_bounds.top > scroller_bounds.bottom - 10) {
              this.$refs['scroller'].scrollTop += kwd_bounds.top - scroller_bounds.bottom + kwd_bounds.height;
              this.emitScroll();
            }
          } else kwd_elem.scrollIntoView({
            block: "nearest"
          });
        });
      } else if (can_open_editor) {
        let cur_value = this.value ? this.value : [];

        if (print_key && this.selectedKeywords.count > 0) {
          cur_value = this.deleteSelectedKeywords();
        }

        const open_editor_args = {
          keyDownEvent: e
        };

        if (print_key && this.cursorPosition === cur_value.length && cur_value.length > 0) {
          if (!this.splittingRegexp || !this.splittingRegexp.test(print_key)) {
            open_editor_args.appendSeparator = this.separator;
          }
        }

        this.openEditor(open_editor_args);
      }
    },

    _onTextareaPaste(e) {
      e.preventDefault();

      if (this.muteNativeClipboardEventsTime + MUTE_NATIVE_EVENTS_DELAY > Date.now()) {
        return;
      }

      this.muteNativeClipboardEventsTime = Date.now(); // for Edge

      const text = (e.originalEvent || e).clipboardData.getData('text/plain');
      this.pasteCommand(text);
    },

    _onTextareaCopy(e) {
      e.preventDefault();

      if (this.muteNativeClipboardEventsTime + MUTE_NATIVE_EVENTS_DELAY > Date.now()) {
        return;
      }

      this.muteNativeClipboardEventsTime = Date.now(); // for Edge

      this.copyCommand();
    },

    _onTextareaCut(e) {
      e.preventDefault();

      if (this.muteNativeClipboardEventsTime + MUTE_NATIVE_EVENTS_DELAY > Date.now()) {
        return;
      }

      this.muteNativeClipboardEventsTime = Date.now(); // for Edge

      this.cutCommand();
    },

    _onTextareaInput(e) {
      e.preventDefault();

      if (this.selectedKeywords.count > 0) {
        this.deleteSelectedKeywords();
      }

      this.openEditor({
        put: e.data
      });
    },

    deleteKeywordByIndex(keyword_index) {
      if (!this.value || this.value.length <= keyword_index) return;
      const new_val = [...this.value];
      new_val.splice(keyword_index, 1);
      this.emitValue(new_val);
    },

    openEditor(args) {
      this.editorPosition = this.cursorPosition;
      this.editorValue = null;
      this.editorInstead = !!args.instead;
      let set_cursor = args.cursorAtBegin ? 0 : null;
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
      this.$nextTick(() => {
        const editor = Array.isArray(this.$refs['editor']) ? this.$refs['editor'][0] : this.$refs['editor'];
        if (!editor) return;
        editor.focus();
        if (set_cursor !== null) editor.setCursor(set_cursor);
      });
    },

    _getClickedSymbolPos(click_info) {
      if (!click_info.kwdElement) return 0;
      if (!click_info.kwdElement.cloneNode) return 0;
      if (!this.$refs['canvas']) return 0;
      const clone = click_info.kwdElement.cloneNode(true);
      const clone_kwd = clone.querySelector('.ImsKeywordBox-keyword');
      if (!clone_kwd) return 0;
      const rel_x = click_info.x - click_info.kwdBounds.left;
      const kwd_text_chars = clone_kwd.textContent.split('');
      clone_kwd.innerHTML = '';
      this.$refs['canvas'].appendChild(clone);
      const clone_bounds = clone.getBoundingClientRect();
      let res_pos = 0;

      for (let char of kwd_text_chars) {
        const span = window.document.createElement('span');
        span.textContent = char;
        clone_kwd.appendChild(span);
        const span_bounds = span.getBoundingClientRect();
        if (span_bounds.left + span_bounds.width / 2 - clone_bounds.left > rel_x) break;
        res_pos++;
      }

      removeNodeFromDOM(clone);
      return res_pos;
    },

    _onContextMenu(e) {
      if (this.contextMenuContext) this.contextMenuContext.destroy();
      this.contextMenuContext = new MenuContext(this, e, () => this.contextMenuContext = null);
    },

    /**
     * Get CSS-classes for specified keyword
     * @private
     */
    _getKeywordClasses(keyword, keyword_index) {
      const is_regular_cursor = this.dragKeywordPosition === null && this.focused;
      const is_cursor_before = is_regular_cursor && this.cursorPositionRaw === keyword_index && !this.cursorPositionAfter || this.dragKeywordPosition === keyword_index && this.dragKeywordIsBegin || this.dragKeywordPosition === -1 && keyword_index === 0;
      const is_cursor_after = is_regular_cursor && this.cursorPositionRaw === keyword_index + 1 && (this.value && keyword_index === this.value.length - 1 || this.cursorPositionAfter) || this.dragKeywordPosition === keyword_index && !this.dragKeywordIsBegin;
      const is_duplicated = this.highlightDuplicated && this.highlightDuplicated.hasOwnProperty(keyword);
      return {
        'state-cursor-before': is_cursor_before,
        'state-cursor-after': is_cursor_after,
        'state-cursor-blink': (is_cursor_before || is_cursor_after) && is_regular_cursor,
        'state-duplicate': is_duplicated,
        ...(this.getKeywordClasses ? this.getKeywordClasses(keyword, keyword_index) : {})
      };
    },

    emitValue(value, record = true) {
      if (record && this.historyController) {
        this.historyController.push(value);
      }

      this.$emit(this.emitValueEvent, value);
    },

    _editorCommit() {
      if (this.editorPosition < 0) return;
      const editor_value = this.editorValue ? this.editorValue.trim() : '';

      if (editor_value) {
        this.cursorPosition = this.editorPosition;
        if (this.editorInstead) this.selectedKeywords.setSelectedStateByIndex(this.editorPosition, true, false);
        this.pasteCommand(editor_value);
        this.focus();
      }

      this.editorPosition = -1;
    },

    _editorCommand(cmd) {
      switch (cmd.command) {
        case 'commit':
          this._editorCommit();

          break;

        case 'move':
          let new_cursor_position = this.editorPosition;

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
            cursorAtBegin: cmd.cursorAtBegin
          });
          break;
      }
    }

  },

  created() {
    if (this.historyController) this.historyController.init(this, this.value);
  },

  mounted() {
    this.$refs['scroller'].scrollTop = this.scrollY;
    this.cursorPosition = this.value ? this.value.length : 0;
  },

  destroyed() {
    if (this.interactionContext) this.interactionContext.destroy();
    if (this.contextMenuContext) this.contextMenuContext.destroy();
  },

  watch: {
    value() {
      this.selectedKeywords.setValue(this.value);
      if (this.interactionContext) this.interactionContext.invalidateCache();
    },

    historyController() {
      if (this.historyController) this.historyController.init(this, this.value);
    }

  }
};

/* script */
const __vue_script__$1 = script$1;
/* template */

var __vue_render__$1 = function () {
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
  }, [_c('textarea', {
    ref: "textArea",
    staticClass: "ImsKeywordBox-textarea",
    attrs: {
      "autocorrect": "off",
      "autocapitalize": "off",
      "spellcheck": "false"
    },
    on: {
      "keydown": _vm._onTextareaKeyDown,
      "blur": _vm._onTextareaBlur,
      "focus": _vm._onTextareaFocus,
      "paste": _vm._onTextareaPaste,
      "copy": _vm._onTextareaCopy,
      "cut": _vm._onTextareaCut,
      "input": _vm._onTextareaInput
    }
  }), _vm._v(" "), _c('div', {
    ref: "scroller",
    staticClass: "ImsKeywordBox-scroller",
    on: {
      "&scroll": function ($event) {
        return _vm.emitScroll($event);
      }
    }
  }, [_c('div', {
    ref: "canvas",
    staticClass: "ImsKeywordBox-canvas"
  }, [_vm.value && _vm.value.length > 0 ? [_c('span', {
    staticStyle: {
      "padding-right": "0.1px"
    }
  }, [_vm._l(_vm.value, function (keyword, keyword_index) {
    return [_c('span', {
      class: _vm.separatorIsNewLine ? 'ImsKeywordBox-line' : 'ImsKeywordBox-inline'
    }, [_vm.editorPosition === keyword_index ? [_c('ims-keyword-box-editor', {
      ref: "editor",
      refInFor: true,
      staticClass: "ImsKeywordBox-editor",
      on: {
        "blur": _vm._editorCommit,
        "command": _vm._editorCommand
      },
      model: {
        value: _vm.editorValue,
        callback: function ($$v) {
          _vm.editorValue = $$v;
        },
        expression: "editorValue"
      }
    }), !_vm.separatorIsNewLine && !_vm.editorInstead ? _c('span', {
      staticClass: "ImsKeywordBox-separator",
      attrs: {
        "data-kwd-ind": keyword_index
      }
    }, [_vm._v(_vm._s(_vm.separatorCharacter))]) : _vm._e()] : _vm._e(), _vm.editorPosition !== keyword_index || !_vm.editorInstead ? _c('span', {
      staticClass: "ImsKeywordBox-keyword-wrapper",
      class: {
        'state-highlighted': _vm.selectedKeywords.isSelected(keyword)
      },
      attrs: {
        "draggable": "",
        "data-kwd-ind": keyword_index
      }
    }, [_c('span', {
      staticClass: "ImsKeywordBox-keyword",
      class: _vm._getKeywordClasses(keyword, keyword_index)
    }, [_vm._v(_vm._s(keyword)), _vm.showDeleteButton ? _c('span', {
      staticClass: "ImsKeywordBox-keyword-delete",
      on: {
        "click": function ($event) {
          return _vm.deleteKeywordByIndex(keyword_index);
        }
      }
    }) : _vm._e()])]) : _vm._e(), (keyword_index < _vm.value.length - 1 || _vm.editorPosition === _vm.value.length) && !_vm.separatorIsNewLine ? _c('span', {
      staticClass: "ImsKeywordBox-separator",
      attrs: {
        "data-kwd-ind": keyword_index
      }
    }, [_vm._v(_vm._s(_vm.separatorCharacter))]) : _vm._e()], 2)];
  })], 2)] : [_c('div', {
    staticClass: "ImsKeywordBox-stub",
    class: {
      'state-cursor-after': _vm.cursorPosition === 0 && _vm.focused || _vm.dragKeywordPosition === -1,
      'state-cursor-blink': _vm.cursorPosition === 0 && _vm.focused && _vm.dragKeywordPosition === null
    }
  })], _vm._v(" "), !_vm.value.length && _vm.editorPosition === 0 || _vm.editorPosition === _vm.value.length ? _c('ims-keyword-box-editor', {
    ref: "editor",
    staticClass: "ImsKeywordBox-editor",
    on: {
      "blur": _vm._editorCommit,
      "command": _vm._editorCommand
    },
    model: {
      value: _vm.editorValue,
      callback: function ($$v) {
        _vm.editorValue = $$v;
      },
      expression: "editorValue"
    }
  }) : _vm._e()], 2)])]);
};

var __vue_staticRenderFns__$1 = [];
/* style */

const __vue_inject_styles__$1 = function (inject) {
  if (!inject) return;
  inject("data-v-7cdb378f_0", {
    source: ".ImsKeywordBox{border:1px solid #ccc;border-radius:4px;overflow:auto;position:relative;padding:0 6px;cursor:text}.ImsKeywordBox-scroller{height:100%;overflow-x:hidden;position:relative}.ImsKeywordBox-canvas{display:block;padding:4px 4px 4px 4px;line-height:2em;position:relative;user-select:none;outline:0;min-height:100%;box-sizing:border-box}.ImsKeywordBox-keyword-wrapper{white-space:nowrap;display:inline-block}.ImsKeywordBox-keyword-wrapper.state-highlighted{position:relative}.ImsKeywordBox-keyword-wrapper.state-highlighted>.ImsKeywordBox-keyword{cursor:text}.ImsKeywordBox-keyword-wrapper.state-highlighted:before{content:\"\";position:absolute;width:100%;height:2em;background:#e9e9e9;left:-4px;top:0;padding-left:4px;padding-right:5px}.ImsKeywordBox.state-focus .ImsKeywordBox-scroller>.ImsKeywordBox-canvas .ImsKeywordBox-keyword-wrapper.state-highlighted:before{background:#d7d4f0}.ImsKeywordBox-keyword-wrapper.state-highlighted{background:#faa}.ImsKeywordBox-textarea{width:0;height:0;overflow:hidden;padding:0;display:block;resize:none;position:absolute;background:0 0;border:none;top:0;left:0;color:transparent;outline:0}.ImsKeywordBox-textarea::-moz-selection,.ImsKeywordBox-textarea::selection{color:transparent}.ImsKeywordBox-keyword{padding:2px 7px;border:1px solid #ccc;border-radius:4px;line-height:1.4em;display:inline-block;white-space:nowrap;cursor:default;background-color:rgba(250,250,250,.7);position:relative}.ImsKeywordBox-keyword.state-cursor-after:after,.ImsKeywordBox-keyword.state-cursor-before:after,.ImsKeywordBox-stub.state-cursor-after:after,.ImsKeywordBox-stub.state-cursor-before:after{content:\"\";display:block;width:1px;height:29px;background:#000;position:absolute;top:-2px;pointer-events:none}.ImsKeywordBox-keyword.state-cursor-after.state-cursor-blink:after,.ImsKeywordBox-keyword.state-cursor-before.state-cursor-blink:after,.ImsKeywordBox-stub.state-cursor-after.state-cursor-blink:after,.ImsKeywordBox-stub.state-cursor-before.state-cursor-blink:after{animation:ImsKeywordBox-cursor-blink .5s infinite alternate}.ImsKeywordBox-keyword.state-cursor-before:after,.ImsKeywordBox-stub.state-cursor-before:after{left:-5px}.ImsKeywordBox-keyword.state-cursor-after:after{right:-6px}.ImsKeywordBox-keyword.state-duplicate{background-color:#ff9c9c}.ImsKeywordBox-stub{display:inline-block;width:1px;height:1.4em;position:relative}.ImsKeywordBox-stub.state-cursor-after:after{right:0}.ImsKeywordBox-separator{position:relative;display:inline-block;white-space:pre}.ImsKeywordBox-separator:first-child,.ImsKeywordBox-separator:last-child{color:#aaa}.ImsKeywordBox-line{display:block}.ImsKeywordBox-keyword-delete{background:url(\"data:image/svg+xml,%3Csvg viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='m18.011 3.8674-6.0106 6.0106-6.0106-6.0106-2.1212 2.1212 6.0106 6.0106-6.0106 6.0106 2.1212 2.1212 6.0106-6.0106 6.0106 6.0106 2.1212-2.1212-6.0106-6.0106 6.0106-6.0106z'/%3E%3C/svg%3E%0A\") no-repeat right center;display:inline-block;width:12px;height:12px;cursor:pointer;background-size:contain;opacity:.5;position:relative;top:1px;margin-left:4px}.ImsKeywordBox-keyword-delete:hover{opacity:1}@keyframes ImsKeywordBox-cursor-blink{0%{opacity:1}49.9%{opacity:1}50%{opacity:0}100%{opacity:0}}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


const __vue_scope_id__$1 = undefined;
/* module identifier */

const __vue_module_identifier__$1 = undefined;
/* functional template */

const __vue_is_functional_template__$1 = false;
/* style inject SSR */

/* style inject shadow dom */

const __vue_component__$1 = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$1,
  staticRenderFns: __vue_staticRenderFns__$1
}, __vue_inject_styles__$1, __vue_script__$1, __vue_scope_id__$1, __vue_is_functional_template__$1, __vue_module_identifier__$1, false, createInjector, undefined, undefined);

// Import vue component

const install = function installImsKeywordBox(Vue) {
  if (install.installed) return;
  install.installed = true;
  Vue.component('ImsKeywordBox', __vue_component__$1);
}; // Create module definition for Vue.use()
// to be registered via Vue.use() as well as Vue.component()


__vue_component__$1.install = install; // Export component by default
// also be used as directives, etc. - eg. import { RollupDemoDirective } from 'rollup-demo';
// export const RollupDemoDirective = component;

export default __vue_component__$1;
