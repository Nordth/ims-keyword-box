<template>
  <span class="ImsKeywordBoxEditor">
    <input
        class="ImsKeywordBoxEditor-input"
        type="text"
        ref="input"
        :value="rawVal"
        @keydown="_onKeyDown"
        @blur="_onBlur"
        @input="_setValue($event.target.value)"
    >
    <span
      class="ImsKeywordBoxEditor-hidden"
      ref="hidden"
    ></span>
  </span>
</template>

<script type="text/ecmascript-6">

export default {
  name: "ImsKeywordBoxEditor",
  props: {
    value: {},
  },
  data(){
    return {
      rawVal: this.value
    }
  },
  methods:{
    _updateSize(){
      if (!this.$refs['hidden'] || !this.$refs['input']) return;
      this.$refs['hidden'].textContent = this.rawVal;
      const bounds = this.$refs['hidden'].getBoundingClientRect()
      this.$refs['input'].style.width = bounds.width + "px";
    },
    _setValue(val){
      if (this.rawVal !== val) {
        this.rawVal = val;
        this._updateSize();
        this.$emit('input', val);
      }
    },
    _onBlur(){
      this.$emit('blur');
    },
    setCursor(pos){
      if (!this.$refs['input']) return;
      this.$refs['input'].setSelectionRange(pos, pos);
    },
    focus(){
      if (!this.$refs['input']) return;
      this.$refs['input'].focus();
    },
    blur(){
      if (!this.$refs['blur']) return;
      this.$refs['blur'].blur();
    },
    isSelectionAtFirst(){
      return this.$refs['input'].selectionStart === this.$refs['input'].selectionEnd &&
             this.$refs['input'].selectionStart === 0;
    },
    isSelectionAtEnd(){
      return this.$refs['input'].selectionStart === this.$refs['input'].selectionEnd &&
          this.$refs['input'].selectionStart === this.rawVal.length;
    },
    _onKeyDown(event){
      if (!this.$refs['input']) return;
      switch (event.key){
        case 'Enter':
        case 'Escape':
          event.preventDefault();
          this.$emit('command', { command: 'commit' } );
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
        case 'ArrowRight':{
          const check_left = event.key === 'ArrowLeft' && this.isSelectionAtFirst();
          const check_right = event.key === 'ArrowRight' && this.isSelectionAtEnd();
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
        case 'Delete':{
          const check_left = event.key === 'Backspace' && this.isSelectionAtFirst();
          const check_right = event.key === 'Delete' && this.isSelectionAtEnd();
          if (check_left || check_right) {
            event.preventDefault();
            this.$emit('command', {
              command: 'delSep',
              dir: check_left ? -1 : 1
            });
          }
          break;
        }
      }
    }
  },
  mounted(){
    this._updateSize();
  },
  watch:{
    value(){
      if (this.rawVal !== this.value){
        this.rawVal = this.value;
        this._updateSize();
      }
    }
  }
}
</script>

<style>

.ImsKeywordBoxEditor{
  position: relative;
  display: inline-block;
}

.ImsKeywordBoxEditor-input,
.ImsKeywordBoxEditor-hidden{
  outline: none;
  border:none;
  font-size: inherit;
  font-family: inherit;
  line-height: inherit;
  white-space: pre;
  display: block;
  padding: 0;
  background: transparent;
  -webkit-text-size-adjust: none;
  text-size-adjust: none;
}

.ImsKeywordBoxEditor-hidden{
  position: absolute;
  top:0;
  left:0;
  visibility: hidden;
  box-sizing: content-box;
  padding-right: 5px;
}

</style>
