<template>
  <div class="ImsKeywordBox"
       :class="{'state-focus': focused}"
       @mousedown="_onMouseDown"
       @dragstart="_onDragStart"
       @dragenter="_onDragEnter"
       @drop="_onDrop"
       @contextmenu="_onContextMenu"
  >
      <textarea
          class="ImsKeywordBox-textarea"
          ref="textArea"
          @keydown="_onTextareaKeyDown"
          @blur="_onTextareaBlur"
          @focus="_onTextareaFocus"
          @paste="_onTextareaPaste"
          @copy="_onTextareaCopy"
          @cut="_onTextareaCut"
          @input="_onTextareaInput"
          autocorrect="off"
          autocapitalize="off"
          spellcheck="false"
      ></textarea>
    <div
        class="ImsKeywordBox-scroller"
        ref="scroller"
        @scroll.passive="emitScroll"
    >
      <div
          class="ImsKeywordBox-canvas"
          ref="canvas"
      >
        <template v-if="value && value.length > 0">
            <span style="padding-right: 0.1px">
                <template v-for="(keyword, keyword_index) in value">
                  <span
                      :class="separatorIsNewLine ? 'ImsKeywordBox-line' : 'ImsKeywordBox-inline'"
                    ><template
                      v-if="editorPosition === keyword_index"
                      ><ims-keyword-box-editor
                          class="ImsKeywordBox-editor"
                          v-model="editorValue"
                          @blur="_editorCommit"
                          @command="_editorCommand"
                          ref="editor"
                      ></ims-keyword-box-editor
                      ><span
                          v-if="!separatorIsNewLine && !editorInstead"
                          class="ImsKeywordBox-separator"
                          :data-kwd-ind="keyword_index"
                      >{{ separatorCharacter }}</span
                    ></template
                    ><span
                        v-if="editorPosition !== keyword_index || !editorInstead"
                        draggable
                        class="ImsKeywordBox-keyword-wrapper"
                        :class="{'state-highlighted': selectedKeywords.isSelected(keyword)}"
                        :data-kwd-ind="keyword_index"
                        ><span
                          class="ImsKeywordBox-keyword"
                          :class="_getKeywordClasses(keyword, keyword_index)"
                        >{{ keyword }}<span
                            v-if="showDeleteButton"
                            class="ImsKeywordBox-keyword-delete"
                            @click="deleteKeywordByIndex(keyword_index)"
                          ></span
                        ></span
                    ></span
                    ><span
                          v-if="(keyword_index < value.length - 1 || editorPosition === value.length) && !separatorIsNewLine"
                          class="ImsKeywordBox-separator"
                          :data-kwd-ind="keyword_index"
                    >{{ separatorCharacter }}</span
                ></span>
                </template>
            </span>
        </template>
        <template v-else>
          <div class="ImsKeywordBox-stub" :class="{
                  'state-cursor-after': cursorPosition === 0 && focused || dragKeywordPosition === -1,
                  'state-cursor-blink': cursorPosition === 0 && focused && dragKeywordPosition === null
              }"></div>
        </template>
        <ims-keyword-box-editor
            v-if="(!value || !value.length) && editorPosition === 0 || (value && editorPosition === value.length)"
            class="ImsKeywordBox-editor"
            v-model="editorValue"
            @blur="_editorCommit"
            @command="_editorCommand"
            ref="editor"
        ></ims-keyword-box-editor>
      </div>
    </div>
  </div>

</template>

<script type="text/ecmascript-6">

import SelectionContext from "./context/selection-context";
import InteractionContext from "./context/interaction-context";
import MenuContext from "./context/menu-context";
import {isPlatform, isPlatformCtrlClick} from "./utils/platform-utils";
import {getCharacterFromKeyboardEvent, getCodeFromKeyboardEvent} from "./utils/keyboard-utils";
import {clipboardCopyPlainText} from "./utils/clipboard-utils";
import {getClosestNodeByClass, removeNodeFromDOM} from "./utils/dom-element-utils";
import ImsKeywordBoxEditor from "./ims-keyword-box-editor.vue";
import StackHistoryController from "./controllers/stack-history-controller";

const MUTE_NATIVE_EVENTS_DELAY = 100;
const DUPLICATE_REMOVE_HIGHLIGHT_TIME = 600;
const DUPLICATE_REMOVE_HIGHLIGHT_CHECK = 200;

export default {
  name: "ImsKeywordBox",
  components: {
    ImsKeywordBoxEditor
  },
  props: {
    value: {},
    showDeleteButton: { type: Boolean, default: true },
    separator: {type: String, default: ', '},
    splittingRegexp: {type: RegExp, default: () => /[;,\r\n]/},
    preprocessKeyword: {type: Function, default: null},
    getKeywordClasses: {type: Function, default: null},
    scrollY: {type: Number, default: 0},
    handleExceptions: {type: Function, default: null},
    emitValueEvent: {type: String, default: 'input',},
    customizeMultiKeywordDraggingCanvas: { type: Function, default: null },
    historyController: { type: Object, default: () => new StackHistoryController()},
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
    }
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
    },
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
          await clipboardCopyPlainText(this.getSelectionsAsJoinedString())
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
     *  @param {string} text - pasting text
     *  @param {string[]} editor_value - current value before paste
     *  @param {function} emit_callback - if provided then this function called instead of emitting value
     */
    pasteCommand(text, cur_value = undefined, emit_callback = null) {

      cur_value = cur_value !== undefined ? cur_value : this.value;
      if (this.selectedKeywords.count > 0) {
        cur_value = this.deleteSelectedKeywords(false);
      }

      if (text) this._pasteCommandImpl(this.cursorPosition, cur_value, text, emit_callback);
      else {
        if (emit_callback) emit_callback(cur_value);
        else this.emitValue(cur_value);
      }
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
     * @param {function} emit_callback - if provided, call this function instead of emit
     * @returns {string[]} pasted keywords
     */
    _pasteCommandImpl(cursor, cur_value, text, emit_callback = null) {
      if (!text) return;
      if (cursor < 0) cursor = 0;
      if (!cur_value) cur_value = [];
      const original_value = cur_value;
      const split = this.splittingRegexp ? text.split(this.splittingRegexp) : [text];

      // Preprocess keywords
      let split_preproc = split;
      if (this.preprocessKeyword){
        split_preproc = [];
        for (let e = 0; e < split.length; e++) {
          const e_norm_val = this.preprocessKeyword(split[e]);
          if (e_norm_val) {
            if (Array.isArray(e_norm_val)) split_preproc = split_preproc.concat(e_norm_val);
            else split_preproc.push(e_norm_val);
          }
        }
      }

      // Check duplication
      const exist_set = new Set(original_value);
      const ins_repeat_check = new Set();
      const split_norm = [];
      let duplicated = null;
      for (let e = 0; e < split_preproc.length; e++) {
        const e_norm_val = split_preproc[e];
        if (!e_norm_val) continue;

        if (ins_repeat_check.has(e_norm_val)) continue;
        ins_repeat_check.add(e_norm_val);

        if (exist_set.has(e_norm_val)) {
          if (!duplicated) duplicated = {};
          duplicated[e_norm_val] = Date.now();

          const index_of_exist = cur_value.indexOf(e_norm_val);
          if (index_of_exist < cursor) continue;
          else {
            cur_value = cur_value !== original_value ? cur_value : [...cur_value];
            cur_value.splice(index_of_exist, 1);
          }
        }
        split_norm.push(e_norm_val);
      }

      // Set value
      this.selectedKeywords.clear();
      this.cursorPosition = cursor + split_norm.length;
      this.selectedKeywords.lastActiveKeywordIndex = this.cursorPosition;
      if (split_norm.length !== 0 || cur_value !== original_value) {
        const new_value = [...cur_value];
        new_value.splice(cursor, 0, ...split_norm);
        if (emit_callback) emit_callback(new_value)
        else this.emitValue(new_value);
      }

      // Highlight duplicated
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
            if (this.highlightDuplicated) setTimeout(remove_highlight, DUPLICATE_REMOVE_HIGHLIGHT_CHECK)
          }
          setTimeout(remove_highlight, DUPLICATE_REMOVE_HIGHLIGHT_CHECK);
        } else this.highlightDuplicated = {...this.highlightDuplicated, ...duplicated};
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
        if (!this.interactionContext.isDragging) this.interactionContext.makeDragging()
      } else this.interactionContext = new InteractionContext(this, e, () => this.interactionContext = null, true);
      this.interactionContext.draggingMyKeywords = this.selectedKeywords.getSelectionAsArray();

      if (this.selectedKeywords.count > 1) {
        const dragging_canvas = document.createElement('canvas');
        dragging_canvas.style.position = "absolute";
        dragging_canvas.style.left = '-100%';
        document.body.append(dragging_canvas);
        if (this.customizeMultiKeywordDraggingCanvas){
          this.customizeMultiKeywordDraggingCanvas(dragging_canvas, this.selectedKeywords);
        }
        else {
          const context = dragging_canvas.getContext('2d');

          dragging_canvas.width = 24;
          dragging_canvas.height = 15;

          context.fillStyle = '#d7d4f0';
          context.fillRect(0, 0, dragging_canvas.width, dragging_canvas.height);

          context.fillStyle = '#000';
          context.font = '12px ' + getComputedStyle(this.$el).fontFamily;
          context.textBaseline = 'top'
          context.textAlign = 'center';
          context.fillText(this.selectedKeywords.count, 12, 3);
        }
        e.dataTransfer.setDragImage(dragging_canvas, -20, -10);
        this.interactionContext.draggingCanvas = dragging_canvas;
      }
    },
    _onDragEnter(e) {
      if (getClosestNodeByClass(e.target, 'ImsKeywordBox-editor')){
        return;
      }

      const isText = e.dataTransfer.types.includes("text/plain");
      if (isText) e.preventDefault();

      if (this.interactionContext) {
        if (!this.interactionContext.isDragging) this.interactionContext.makeDragging()
      } else this.interactionContext = new InteractionContext(this, e, () => this.interactionContext = null, true);
    },
    _onDrop(e) {
      if (getClosestNodeByClass(e.target, 'ImsKeywordBox-editor')){
        return;
      }

      const text = e.dataTransfer.getData("text/plain");
      e.preventDefault();

      let cur_value = this.value ? this.value : [];
      let drop_anchor = cur_value[this.dragKeywordPosition];

      if (this.editorPosition >= 0){
        if (this.editorInstead){
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
          let cur_sect_front = null;
          let sect_count = 0;
          let sect_anchor_found = false;
          for (let i = 0; i < cur_value.length; i++) {
            if (dragging_keywords_set.has(cur_value[i])) {
              if (cur_sect_begin === null) {
                cur_sect_begin = i;
                sect_count++;
              }
              cur_sect_front = i;
              if (!sect_anchor_found && cur_value[i] === drop_anchor) {
                this.dragKeywordPosition = cur_sect_begin - 1;
                this.dragKeywordIsBegin = false;
                drop_anchor = this.dragKeywordPosition >= 0 ? this.value[this.dragKeywordPosition] : null
                sect_anchor_found = true;
              }
            } else {
              cur_sect_begin = null;
              cur_sect_front = null;
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

      const pasted_keywords = this._pasteCommandImpl(
          drop_anchor_index + (this.dragKeywordIsBegin ? 0 : 1),
          cur_value,
          text
      );
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
        case 'ArrowDown': {
          if (this.selectedKeywords.count > 0 && !e.shiftKey) {
            const dir = e.key === 'ArrowDown' ? 1 : -1;
            if (dir > 0) this.cursorPosition = this.selectedKeywords.getLastSelectedIndex() + 1;
            else this.cursorPosition = this.selectedKeywords.getFirstSelectedIndex()
            this.selectedKeywords.clear();
            handled = true;
          }
          break;
        }

        case 'ArrowLeft':
        case 'ArrowRight': {
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
              if (dir > 0) this.cursorPosition = this.selectedKeywords.getLastSelectedIndex() + 1;
              else this.cursorPosition = this.selectedKeywords.getFirstSelectedIndex()
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
              this.cursorPosition = Math.min(Math.max(this.cursorPosition + dir, 0), cur_value.length)
            }
            handled = true;
          } else {
            if (dir < 0 && this.cursorPosition === 0 ||
                dir > 0 && this.cursorPosition === cur_value.length) {
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
        case 'Home': {
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
          const kwd_elem = this.$el.querySelector('.ImsKeywordBox-keyword-wrapper[data-kwd-ind="' + act_ind + '"]')
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
          } else kwd_elem.scrollIntoView({block: "nearest"});
        })
      } else if (can_open_editor) {
        let cur_value = this.value ? this.value : [];
        if (print_key && this.selectedKeywords.count > 0) {
          cur_value = this.deleteSelectedKeywords();
        }
        const open_editor_args = {
          keyDownEvent: e
        }
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
        put: e.data,
      })
    },
    deleteKeywordByIndex(keyword_index){
      if (!this.value || this.value.length <= keyword_index) return;
      const new_val = [...this.value];
      new_val.splice(keyword_index, 1);
      this.emitValue(new_val);
    },
    openEditor(args) {
      this.editorPosition = this.cursorPosition;
      this.editorValue = null;
      this.editorInstead = !!args.instead;
      let set_cursor = args.cursorAt !== null && args.cursorAt !== undefined ? args.cursorAt : null;
      if (args.put) this.editorValue = args.put;
      if (args.keyDownEvent){
        switch (args.keyDownEvent.key){
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
      if (this.editorInstead && this.value && this.editorPosition < this.value.length){
        this.editorValue = this.value[this.editorPosition];
      }
      this.selectedKeywords.clear();

      this.$nextTick(() => {
        const editor = Array.isArray(this.$refs['editor']) ? this.$refs['editor'][0] : this.$refs['editor'];
        if (!editor) return;
        editor.focus();
        if (set_cursor !== null) editor.setCursor(set_cursor);
      })
    },
    _getClickedSymbolPos(click_info){
      if (!click_info.kwdElement) return 0;
      if (!click_info.kwdElement.cloneNode) return 0;
      if (!this.$refs['canvas']) return 0;
      const clone = click_info.kwdElement.cloneNode(true);
      const clone_kwd = clone.querySelector('.ImsKeywordBox-keyword')
      if (!clone_kwd) return 0;

      const rel_x = click_info.x - click_info.kwdBounds.left;

      const kwd_text_chars = clone_kwd.textContent.split('');
      clone_kwd.innerHTML = '';
      this.$refs['canvas'].appendChild(clone);
      const clone_bounds = clone.getBoundingClientRect();

      let res_pos = 0;
      for (let char of kwd_text_chars){
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
      const is_cursor_before = is_regular_cursor && (this.cursorPositionRaw === keyword_index && !this.cursorPositionAfter) ||
          this.dragKeywordPosition === keyword_index && this.dragKeywordIsBegin ||
          this.dragKeywordPosition === -1 && keyword_index === 0;
      const is_cursor_after = is_regular_cursor && this.cursorPositionRaw === keyword_index + 1 && (this.value && keyword_index === this.value.length - 1 || this.cursorPositionAfter) ||
          this.dragKeywordPosition === keyword_index && !this.dragKeywordIsBegin;
      const is_duplicated = this.highlightDuplicated && this.highlightDuplicated.hasOwnProperty(keyword);
      return {
        'state-cursor-before': is_cursor_before,
        'state-cursor-after': is_cursor_after,
        'state-cursor-blink': (is_cursor_before || is_cursor_after) && is_regular_cursor,
        'state-duplicate': is_duplicated,
        ...(this.getKeywordClasses ? this.getKeywordClasses(keyword, keyword_index) : {})
      }
    },
    emitValue(value, record = true) {
      if (record && this.historyController){
        this.historyController.push(value);
      }
      this.$emit(this.emitValueEvent, value);
    },
    _editorCommit(cur_value = undefined, emit_callback = null){
      if (this.editorPosition < 0) return;
      const editor_value = this.editorValue ? this.editorValue.trim() : '';
      this.cursorPosition = this.editorPosition;
      if (this.editorInstead) this.selectedKeywords.setSelectedStateByIndex(this.editorPosition, true, false);
      this.pasteCommand(editor_value, cur_value, emit_callback);
      this.focus();
      this.editorPosition = -1;
      return editor_value;
    },
    _editorCommand(cmd){
      switch (cmd.command){
        case 'commit':
          this._editorCommit();
          break;
        case 'move': {
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
          this.openEditor({instead: true, cursorAt: cmd.cursorAt})
          break;
        }
        case 'delSep': {
          if (!this.value) return;
          let new_cursor_position = this.editorPosition;
          if (cmd.dir < 0) {
            if (this.editorPosition <= 0) return;
            new_cursor_position--;
          } else {
            if (!this.value || this.editorPosition >= this.value.length) return;
          }
          let cur_value = this.value;
          const editor_val = this._editorCommit(cur_value, (val) => cur_value = val);
          const left_part = cur_value[new_cursor_position];
          const right_part = editor_val ? cur_value[new_cursor_position + 1] : '';
          const set_cursor = editor_val || cmd.dir < 0 ? left_part.length : 0;
          this.cursorPosition = new_cursor_position;
          const new_val = [...cur_value];
          if (editor_val) new_val.splice(new_cursor_position + 1, 1);
          new_val[new_cursor_position] = left_part + right_part;
          this.emitValue(new_val);
          this.$nextTick(() => {
            this.openEditor({instead: true, cursorAt: set_cursor}
          )});
          break;
        }

      }
    }

  },
  created(){
    if (this.historyController) this.historyController.init(this, this.value);
  },
  mounted() {
    if (this.$refs['scroller']) this.$refs['scroller'].scrollTop = this.scrollY;
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
    historyController(){
      if (this.historyController) this.historyController.init(this, this.value);
    }
  }
}
</script>

<style>

.ImsKeywordBox {
  border: 1px solid #CCC;
  border-radius: 4px;
  overflow: auto;
  position: relative;
  padding: 0 6px;
  cursor: text;
}

.ImsKeywordBox-scroller {
  height: 100%;
  overflow-x: hidden;
  position: relative;
}

.ImsKeywordBox-canvas {
  display: block;
  padding: 4px 4px 4px 4px;
  line-height: 2em;
  position: relative;
  user-select: none;
  outline: none;
  min-height: 100%;
  box-sizing: border-box;
}

.ImsKeywordBox-keyword-wrapper {
  white-space: nowrap;
  display: inline-block;
}

.ImsKeywordBox-keyword-wrapper.state-highlighted {
  position: relative;
}

.ImsKeywordBox-keyword-wrapper.state-highlighted > .ImsKeywordBox-keyword {
  cursor: text;
}

.ImsKeywordBox-keyword-wrapper.state-highlighted:before {
  content: "";
  position: absolute;
  width: 100%;
  height: 2em;
  background: #e9e9e9;
  left: -4px;
  top: 0;
  padding-left: 4px;
  padding-right: 5px;
}

.ImsKeywordBox.state-focus .ImsKeywordBox-scroller > .ImsKeywordBox-canvas .ImsKeywordBox-keyword-wrapper.state-highlighted:before {
  background: #d7d4f0;
}

.ImsKeywordBox-keyword-wrapper.state-highlighted {
  background: #FAA;
}

.ImsKeywordBox-textarea {
  width: 0;
  height: 0;
  overflow: hidden;
  padding: 0;
  display: block;
  resize: none;
  position: absolute;
  background: transparent;
  border: none;
  top: 0;
  left: 0;
  color: transparent;
  outline: none;
}

.ImsKeywordBox-textarea::-moz-selection,
.ImsKeywordBox-textarea::selection {
  color: transparent;
}

.ImsKeywordBox-keyword {
  padding: 2px 7px;
  border: 1px solid #ccc;
  border-radius: 4px;
  line-height: 1.4em;
  display: inline-block;
  white-space: nowrap;
  cursor: default;
  background-color: rgba(250, 250, 250, .7);
  position: relative;
}

.ImsKeywordBox-keyword.state-cursor-before:after,
.ImsKeywordBox-keyword.state-cursor-after:after,
.ImsKeywordBox-stub.state-cursor-before:after,
.ImsKeywordBox-stub.state-cursor-after:after {
  content: "";
  display: block;
  width: 1px;
  height: 29px;
  background: #000;
  position: absolute;
  top: -2px;
  pointer-events: none;
}

.ImsKeywordBox-keyword.state-cursor-before.state-cursor-blink:after,
.ImsKeywordBox-keyword.state-cursor-after.state-cursor-blink:after,
.ImsKeywordBox-stub.state-cursor-before.state-cursor-blink:after,
.ImsKeywordBox-stub.state-cursor-after.state-cursor-blink:after {
  animation: ImsKeywordBox-cursor-blink 0.5s infinite alternate;
}

.ImsKeywordBox-keyword.state-cursor-before:after,
.ImsKeywordBox-stub.state-cursor-before:after {
  left: -5px;
}

.ImsKeywordBox-keyword.state-cursor-after:after {
  right: -6px;
}

.ImsKeywordBox-keyword.state-duplicate{
  background-color: #ff9c9c;
}

.ImsKeywordBox-stub {
  display: inline-block;
  width: 1px;
  height: 1.4em;
  position: relative;
}

.ImsKeywordBox-stub.state-cursor-after:after {
  right: 0;
}

.ImsKeywordBox-separator {
  position: relative;
  display: inline-block;
  white-space: pre;
}

.ImsKeywordBox-separator:first-child,
.ImsKeywordBox-separator:last-child {
  color: #AAA;
}

.ImsKeywordBox-line {
  display: block;
}

.ImsKeywordBox-keyword-delete{
  background: url("data:image/svg+xml,%3Csvg viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='m18.011 3.8674-6.0106 6.0106-6.0106-6.0106-2.1212 2.1212 6.0106 6.0106-6.0106 6.0106 2.1212 2.1212 6.0106-6.0106 6.0106 6.0106 2.1212-2.1212-6.0106-6.0106 6.0106-6.0106z'/%3E%3C/svg%3E%0A")
              no-repeat right center;
  display: inline-block;
  width: 12px;
  height: 12px;
  cursor: pointer;
  background-size: contain;
  opacity: 0.5;
  position: relative;
  top: 1px;
  margin-left: 4px;
}

.ImsKeywordBox-keyword-delete:hover{
   opacity: 1;
}

@keyframes ImsKeywordBox-cursor-blink {
  0% {
    opacity: 1;
  }
  49.9% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
  100% {
    opacity: 0;
  }
}
</style>
