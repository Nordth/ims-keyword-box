import {getClosestNodeByClass, nodeHasClass, removeNodeFromDOM} from "../utils/dom-element-utils";
import { isPlatformCtrlClick } from "../utils/platform-utils";

export default class InteractionContext{
    constructor(component, event, destroyed, is_dragging) {
        if (!component.$el) throw new Error('ImsKeywordBox interaction context: Master component is not mounted')

        this.isDragging = is_dragging;
        this.component = component;
        this.startTime = Date.now();
        this.startElement = event.target;
        this.destroyed = destroyed;
        this.draggingMyKeywords = [];
        this.draggingCanvas = null;

        this.invalidateCache();
        this.resetEventHandlers(this.isDragging, false)

        this.startPoint = this.getMousePointInfo(event);
        this.curPoint = this.startPoint;
    }

    invalidateCache(){
        this._cacheKeywordsElems = null;
        this._cacheKeywordsBounds = {};
    }

    onMouseEnd(e){
        this.curPoint = this.getMousePointInfo(e);
        if (this.isDragging){
         if (e.dataTransfer.dropEffect === 'move'){
            this.deleteDraggingMyKeywords();
         }
        }
        else {
            if (this.startElement === e.target) {
                this.keywordClick(this.curPoint, e);
            }
        }
        this.destroy();
    }

    onMouseUpdate(e){
        const is_ctrl = isPlatformCtrlClick(e);

        this.curPoint = this.getMousePointInfo(e);
        if (this.isDragging){
            const isText = e.dataTransfer.types.includes("text/plain");
            if (isText) e.preventDefault();

            this.component.dragKeywordPosition = this.curPoint.kwdIndex;
            this.component.dragKeywordIsBegin = false;

            if (this.curPoint.hoverKwdElement){
                const kwd_bounds = this._getKeywordBounds(this.curPoint.kwdIndex);
                if (kwd_bounds && kwd_bounds.left + kwd_bounds.width / 2 > e.clientX){
                    this.component.dragKeywordIsBegin = true;
                }
            }
        }
        else {
            if (!this.startPoint.hoverKwdElement){
                let start_index = this.startPoint.kwdIndex + this.startPoint.offset;
                if (this.startPoint.kwdIndex === this.curPoint.kwdIndex){
                    if (!is_ctrl) {
                        if (this.component.selectedKeywords.count > 0) this.component.selectedKeywords.clear();
                        this.component.cursorPosition = start_index;
                    }
                }
                else {
                    this.component.cursorPosition = -1;
                    if (start_index > this.curPoint.kwdIndex) start_index--;
                    let end_index = this.curPoint.kwdIndex;
                    if (this.curPoint.outside !== 0) end_index++;
                    this.component.selectedKeywords.lastActiveKeywordIndex = start_index;
                    this.component.selectedKeywords.selectRangeByIndexes(
                        start_index,
                        end_index,
                        is_ctrl
                    );
                }
            }
        }
    }


    keywordClick(point_info, e){
        const is_ctrl = isPlatformCtrlClick(e);

        let clicked_keyword_index = point_info.kwdIndex;
        let clicked_separator_pos = -1;
        let last_active_index = this.component.cursorPosition === -1 ? this.component.selectedKeywords.lastActiveKeywordIndex : this.component.cursorPosition;

        if (!point_info.hoverKwdElement){
            if (!e.shiftKey && is_ctrl){
                return; // ignore
            }
            if (e.shiftKey){
                if (last_active_index > point_info.kwdIndex) {
                    clicked_keyword_index++;
                }
            }
            else {
                clicked_keyword_index = -1;
                clicked_separator_pos = point_info.kwdIndex + point_info.offset;
            }
        }

        let button_allowed = e.button === 0;
        if (e.button === 2) button_allowed = this.component.selectedKeywords.count > 0;

        if (clicked_keyword_index >= 0 && button_allowed){

            if (e.shiftKey){
                if (this.component.cursorPosition !== -1){
                    if (clicked_keyword_index < last_active_index) last_active_index--;
                    this.component.selectedKeywords.lastActiveKeywordIndex = last_active_index;
                }
                this.component.selectedKeywords.selectRangeByIndexes(last_active_index, clicked_keyword_index, is_ctrl);
            }
            else {
                const already_selected = this.component.selectedKeywords.isSelectedByIndex(clicked_keyword_index);

                if (is_ctrl){
                    this.component.selectedKeywords.setSelectedStateByIndex(clicked_keyword_index, !already_selected, true);
                }
                else {
                    if (!already_selected){
                        this.component.selectedKeywords.setSelectedStateByIndex(clicked_keyword_index, true);
                    }
                    else if (e.button === 0 ){
                        const click_info = {
                            x: e.clientX,
                            y: e.clientY,
                            kwdIndex: this.curPoint ? this.curPoint.kwdIndex : null,
                            kwdElement: null,
                            kwdBounds: null
                        };
                        if (click_info.kwdIndex >= 0){
                            click_info.kwdElement = this._getHoverKwdElement(click_info.kwdIndex);
                            click_info.kwdBounds = this._getKeywordBounds(click_info.kwdIndex);
                        }
                        this.component.openEditor({
                            click: click_info
                        })
                    }
                }
                this.component.selectedKeywords.lastActiveKeywordIndex = clicked_keyword_index;
            }
            this.component.cursorPosition = -1;
        }
        else if (clicked_separator_pos !== -1) {
            this.component.setCursorPosition(clicked_separator_pos, point_info.outside === 1);
            this.component.selectedKeywords.clear();
        }
    }

    getMousePointInfo(e){
        const res = {
            kwdIndex: -1,
            offset: 1,
            hoverKwdElement: null,
            outside: 0
        };
        if (this.component.value.length === 0) return res;

        let target = e.target;
        if (nodeHasClass(target, 'ImsKeywordBox-keyword-delete')){
            target = getClosestNodeByClass(target, 'ImsKeywordBox-keyword');
            if (!target) target = e.target;
        }
        if (nodeHasClass(target, 'ImsKeywordBox-keyword')){
            target = getClosestNodeByClass(target, 'ImsKeywordBox-keyword-wrapper');
            if (!target) target = e.target;
        }

        const target_is_kwd = nodeHasClass(target, 'ImsKeywordBox-keyword-wrapper');
        const target_is_separartor = nodeHasClass(target, 'ImsKeywordBox-separator');
        if (target_is_kwd || target_is_separartor){
            res.kwdIndex = parseInt(target.dataset.kwdInd);
            if (target_is_kwd) {
                res.hoverKwdElement = target_is_kwd;
                res.offset = 0;
            }
            else {
                res.offset = 1;
            }
            return res;
        }

        // Поиск элемента по позиции клика
        return this._findMousePointInfoByCoords(e.clientX, e.clientY);
    }

    _findMousePointInfoByCoords(x, y){
        const res = {
            kwdIndex: this.component.value.length - 1,
            offset: 1,
            hoverKwdElement: null,
            outside: 1
        };

        const last_bound = this._getLastKeywordBounds();
        if (!last_bound) return res;

        if (y > last_bound.bottom || y > last_bound.top && x > last_bound.right){
            return res;
        }

        const first_bound = this._getFirstKeywordBounds();
        if (!first_bound) return res;

        const is_begin_line = x < last_bound.left;
        if (y < first_bound.bottom && is_begin_line){
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

    _findKeywordEdgeIndex(line, which, canvas_top, line_height){
        let begin = 0;
        let end = this.component.value.length - 1;
        while (begin <= end){
            const middle = Math.floor((end + begin) / 2);
            const middle_bound = this._getKeywordBounds(middle);
            const middle_line = middle_bound ? Math.round((middle_bound.top - canvas_top) / line_height) : 0;
            const shift_bound = this._getKeywordBounds(middle + which);
            const shift_line = shift_bound ? Math.round((shift_bound.top - canvas_top) / line_height) : middle_line + which;
            if (middle_line === line && shift_line === line + which){
                return middle;
            }
            else if (line < middle_line || line === middle_line && which === -1){
                end = middle - 1;
            }
            else {
                begin = middle + 1;
            }
        }
        return begin;
    }

    _getHoverKwdElement(keyword_index){
        if (!this._cacheKeywordsElems){
            if (!this.component.$refs['canvas']) return null;
            this._cacheKeywordsElems = this.component.$refs['canvas'].querySelectorAll('.ImsKeywordBox-keyword-wrapper')
        }
        if (keyword_index < 0 || keyword_index >= this._cacheKeywordsElems.length) return null;
        return this._cacheKeywordsElems[keyword_index];
    }

    _getKeywordBounds(keyword_index){
        if (!this._cacheKeywordsBounds.hasOwnProperty(keyword_index)){
            const element = this._getHoverKwdElement(keyword_index);
            if (!element) return null;
            this._cacheKeywordsBounds[keyword_index] = element.getBoundingClientRect();
        }
        return this._cacheKeywordsBounds[keyword_index];
    }

    _getLastKeywordBounds(){
        return this._getKeywordBounds(this.component.value.length - 1);
    }

    _getFirstKeywordBounds(){
        return this._getKeywordBounds(0);
    }

    destroy(){
        this.component.dragKeywordPosition = null;
        this.component.dragKeywordIsBegin = false;
        this.resetEventHandlers(this.isDragging, true);
        removeNodeFromDOM(this.draggingCanvas);
        if (this.destroyed) this.destroyed();
    }

    makeDragging(){
        if (this.isDragging) return;
        this.isDragging = true;
        this.resetEventHandlers(false, false)
    }

    onDragLeave(){
        this.component.dragKeywordPosition = null;
        this.component.dragKeywordIsBegin = false;
    }

    resetEventHandlers(was_dragging, remove_only){
        if (this._onMouseEndHandler) {
            window.removeEventListener(was_dragging ? 'dragend' : 'mouseup', this._onMouseEndHandler);
            this._onMouseEndHandler = null;
        }
        if (this._onMouseUpdateHandler) {
            if (this.component.$el) this.component.$el.removeEventListener(was_dragging ? 'dragover' : 'mousemove', this._onMouseUpdateHandler);
            this._onMouseUpdateHandler = null;
        }
        if (this._invalidateCacheHandler) {
            window.removeEventListener('resize', this._invalidateCacheHandler, {passive: true});
            window.removeEventListener('scroll', this._invalidateCacheHandler, {passive: true});
            if (this.component.$refs['scroller']) this.component.$refs['scroller'].removeEventListener('scroll', this._invalidateCacheHandler);
            this._invalidateCacheHandler = null;
        }
        if (was_dragging) {
            this.component.$el.removeEventListener('dragleave', this._onDragLeaveHandler);
            this._onDragLeaveHandler = null
        }

        if (!remove_only) {
            this._onMouseEndHandler = (e) => this.onMouseEnd(e);
            this._onMouseUpdateHandler = (e) => this.onMouseUpdate(e);
            this._invalidateCacheHandler = (e) => this.invalidateCache();

            window.addEventListener(this.isDragging ? 'dragend' : 'mouseup', this._onMouseEndHandler);
            this.component.$el.addEventListener(this.isDragging ? 'dragover' : 'mousemove', this._onMouseUpdateHandler);
            window.addEventListener('resize', this._invalidateCacheHandler, {passive: true});
            window.addEventListener('scroll', this._invalidateCacheHandler, {passive: true});
            this.component.$refs['scroller'].addEventListener('scroll', this._invalidateCacheHandler);
            if (this.isDragging) {
                this._onDragLeaveHandler = (e) => this.onDragLeave(e);
                this.component.$el.addEventListener('dragleave', this._onDragLeaveHandler);
            }
        }
    }

    deleteDraggingMyKeywords(emit = true, cur_value = undefined){
        let new_value = cur_value !== undefined ? cur_value: this.component.value;
        if (this.draggingMyKeywords.length > 0){
            let first_selected_index = -1;
            new_value = [];
            for (let index = 0; index < this.component.value.length; index++){
                const v = this.component.value[index];
                if (this.draggingMyKeywords.indexOf(v) >= 0) {
                    if (first_selected_index === -1) first_selected_index = index;
                }
                else new_value.push(v);
            }
            this.draggingMyKeywords = [];
            this.component.cursorPosition = first_selected_index;
            if (emit) this.component.$emit('change', new_value);
        }
        return new_value;
    }
}
