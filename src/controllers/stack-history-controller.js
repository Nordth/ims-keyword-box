import HistoryController from "./history-controller";

export default class StackHistoryController extends HistoryController{

    constructor() {
        super();
        this.history = [];
        this.pointer = 0
    }

    /**
     * Init
     * @param component
     * @param value
     */
    init(component, value){
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
    undo(){
        if (this.pointer < this.history.length - 1) {
            this.pointer++;
            this.component.emitValue(this.history[this.pointer], false);
        }
    }

    /**
     * Redo
     */
    redo(){
        if (this.pointer > 0){
            this.pointer--;
            this.component.emitValue(this.history[this.pointer], false);
        }
    }
}
