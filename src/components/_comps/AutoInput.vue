<template>
  <div>
    <Input ref="autoInput" :value="value" @on-blur="onBlur2" :placeholder="placeholder" :disabled="disabled" :size="size || 'small'" :readonly="readonly" :autofocus="true"/>
  </div>
</template>
<script>
let intReg = /^[0-9]*[1-9][0-9]*$/
let floatReg = /^\d+(\.\d+)?$/
export default {
  props: {
    placeholder: String,
    value: String | Number,
    disabled: Boolean,
    type: String,
    size: String,
    readonly: Boolean,
    index: Number,
    row: Object,
    onBlur: Function,
    title: String,
    required: Boolean
  },
  methods: {
    onBlur2 (event) {
      console.log('input-event: ', event.target.value)
      this.$emit('on-input-blur', event.target.value)
      // 非空校验
      if (this.required && !event.target.value) {
        // this.$refs.autoInput.focus()
        return this.$Message.error(`${this.title}不能为空`)
      }
      // 校验数字
      if (event.target.value && (this.type === 'Integer' || this.type === 'int' || this.type === 'integer') && !intReg.test(event.target.value)) {
        // this.$refs.autoInput.focus()
        return this.$Message.error(`${this.title}只能是正整数`)
      }
      if (event.target.value && (this.type === 'Float' || this.type === 'float') && !floatReg.test(event.target.value)) {
        // this.$refs.autoInput.focus()
        return this.$Message.error(`${this.title}只能是数字`)
      }
      this.onBlur && this.onBlur(this.index, this.row)
    }
  }
}
</script>
