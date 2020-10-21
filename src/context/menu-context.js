const SHOW_TEXTBOX_TIME = 100;
const SELECT_ALL_DETECT_PERIOD = 500;
const SELECT_ALL_DETECT_TRIES = 10;

export default class MenuContext{
    constructor(component, event, destroyed) {
        this.component = component;
        this.destroyed = destroyed;
        this._moveTextareaToCursor(event);

        this.selectAllDetectTimeout = null;
        this.selectAllTry = 0;

        this._runHideTimeout();
    }

    _runHideTimeout(){
        this._hideTimeout = setTimeout(() => {
            this._hideTimeout = null;
            this._hideTextarea();
        }, SHOW_TEXTBOX_TIME);
    }

    _moveTextareaToCursor(e){
        if (!this.component.$refs['textArea']) return;

        const bounds = this.component.$el.getBoundingClientRect();
        this.component.$refs['textArea'].style.left = (e.clientX - bounds.left - 5) + 'px';
        this.component.$refs['textArea'].style.top = (e.clientY - bounds.top - 5) + 'px';
        this.component.$refs['textArea'].style.width = '10px';
        this.component.$refs['textArea'].style.height = '10px';
        this.component.$refs['textArea'].style.zIndex = 10000;

        this.component.$refs['textArea'].focus();
        this.component.$refs['textArea'].value = '';

        const kwds = this.component.getSelectionsAsJoinedString()
        this.component.$refs['textArea'].value = kwds + ' ';
        this.component.$refs['textArea'].setSelectionRange(0, kwds.length);

        this.selectAllTry = 0;
        this._detectSelectAll();
    }

    _detectSelectAll(){
        if (this.selectAllTry >= SELECT_ALL_DETECT_TRIES) return;
        this.selectAllTry++;
        setTimeout(() => {
            if (!this.component.$refs['textArea']) return;

            if (this.component.$refs['textArea'].selectionEnd === this.component.$refs['textArea'].value.length) {
                this.component.selectAll();
            } else this._detectSelectAll();
        } , SELECT_ALL_DETECT_PERIOD)
    }

    _hideTextarea(){
        if (!this.component.$refs['textArea']) return;

        this.component.$refs['textArea'].style.left = 0;
        this.component.$refs['textArea'].style.top = 0;
        this.component.$refs['textArea'].style.width = 0;
        this.component.$refs['textArea'].style.height = 0;
        this.component.$refs['textArea'].style.zIndex = -2;
    }

    destroy(){
        if (this._hideTimeout) clearTimeout(this._hideTimeout);
        if (this.selectAllDetectTimeout) clearTimeout(this.selectAllDetectTimeout);
        if (this.destroyed) this.destroyed();
        if (this.component.$refs['textArea']) this.component.$refs['textArea'].value = ''
    }
}
