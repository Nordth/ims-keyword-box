export default class SelectionContext{
    constructor(value) {
        this.selection = {};
        this.count = 0;
        this._lastActiveKeyword = null;
        this._lastActiveKeywordIndex = -1;
        this.value = [];
        this.setValue(value);
    }

    getIndexOfKeyword(keyword){
        return this.value.indexOf(keyword);
    }

    get lastActiveKeyword(){ return this._lastActiveKeyword; }
    set lastActiveKeyword(keyword){
        this._lastActiveKeyword = keyword;
        if (keyword) {
            this._lastActiveKeywordIndex = this.getIndexOfKeyword(keyword);
            if (this._lastActiveKeywordIndex < 0) this._lastActiveKeyword = null;
        }
        else this._lastActiveKeywordIndex = -1;
    }

    get lastActiveKeywordIndex(){ return this._lastActiveKeywordIndex; }
    set lastActiveKeywordIndex(index){
        if (this.value.length > 0){
            if (index < 0) index = 0;
            else if (index > this.value.length - 1) index = this.value.length - 1;

            this._lastActiveKeywordIndex = index;
            this._lastActiveKeyword = this.value[index];
        }
        else {
            this._lastActiveKeywordIndex = -1;
            this._lastActiveKeyword = null;
        }
    }

    getFirstSelectedIndex(){
        if (!this.value) return -1;
        for (let index = 0; index < this.value.length; index++){
            const v = this.value[index];
            if (this.selection.hasOwnProperty(v) && this.selection[v]) {
                return index;
            }
        }
        return -1;
    }

    getLastSelectedIndex(){
        if (!this.value) return -1;
        for (let index = this.value.length - 1; index >= 0; index--){
            const v = this.value[index];
            if (this.selection.hasOwnProperty(v) && this.selection[v]) {
                return index;
            }
        }
        return -1;
    }

    setValue(value){
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

    isSelected(title_keyword){
        return this.selection.hasOwnProperty(title_keyword) && this.selection[title_keyword];
    }

    isSelectedByIndex(index){
        if (index >= this.value.length || index < 0) return false;
        return this.isSelected(this.value[index]);
    }

    selectKeyword(title_keyword, append = false){
        if (!title_keyword) return;

        const new_selection = append ? { ... this.selection } : {};
        new_selection[title_keyword] = true;
        this.selection = new_selection;
        this.count = append ? this.count + 1 : 1;
    }

    selectKeywordsArray(keywords, append = false){
        if (keywords.length === 0) return;

        const new_selection = append ? { ... this.selection } : {};
        if (!append) this.count = 0;
        keywords.forEach(kwd => {
            if (!new_selection[kwd]) {
                new_selection[kwd] = true
                this.count++;
            }
        });
        this.selection = new_selection;
    }

    clear(){
        if (this.count === 0) return;

        this.selection = {};
        this.count = 0;
    }

    selectAll(){
        const new_selection = {};
        for (let v of this.value){
            new_selection[v] = true;
        }
        this.selection = new_selection;
        this.count = this.value.length;
    }

    deselectKeyword(title_keyword, append = false){
        if (!title_keyword) return;

        if (!append) {
            this.selection = {};
            this.count = 0;
        }
        else {
            if (this.selection.hasOwnProperty(title_keyword) && this.selection[title_keyword]){
                this.selection = {
                    ...this.selection,
                    [title_keyword]: false
                }
                this.count--;
            }
        }
    }

    setSelectedState(title_keyword, selected, append = false){
        if (selected) this.selectKeyword(title_keyword, append);
        else this.deselectKeyword(title_keyword, append);
    }

    setSelectedStateByIndex(index, selected, append = false){
        if (index >= this.value.length || index < 0) return;
        if (selected) this.selectKeyword(this.value[index], append);
        else this.deselectKeyword(this.value[index], append);
    }

    selectRangeByIndexes( start_index, end_index, append = false){
        if (start_index > end_index) {
            const tmp = start_index;
            start_index = end_index;
            end_index = tmp;
        }
        const new_selection = append ? { ... this.selection } : {};
        let new_count = append ? this.count : 0;
        for (let i = Math.max(start_index, 0); i <= Math.min(end_index, this.value.length - 1); i++){
            if (!new_selection.hasOwnProperty(this.value[i]) || !new_selection[this.value[i]]) {
                new_selection[this.value[i]] = true;
                new_count++;
            }
        }
        this.selection = new_selection;
        this.count = new_count;
    }

    getSiblingKeyword(index, dir){
        if (dir === 0) return index < this.value.length && index >= 0 ? this.value[index] : null;
        else if (dir > 0) return index < this.value.length - 1 ? this.value[index + 1] : null;
        else return index > 0 ? this.value[index - 1] : null;
    }

    getActiveSiblingKeyword(dir){
        return this.getSiblingKeyword(this.lastActiveKeywordIndex, dir);
    }

    getSelectionAsArray(){
        if (this.count === 0) return [];
        return this.value.filter((v) => {
            return this.selection.hasOwnProperty(v) && this.selection[v]
        });
    }
}
