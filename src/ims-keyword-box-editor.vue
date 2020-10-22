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
            cursorAtBegin: true
          });
          break;
        case 'ArrowLeft':
          if (this.$refs['input'].selectionStart === this.$refs['input'].selectionEnd){
            if (this.$refs['input'].selectionStart === 0){
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
          if (this.$refs['input'].selectionStart === this.$refs['input'].selectionEnd){
            if (this.$refs['input'].selectionStart === this.rawVal.length){
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
