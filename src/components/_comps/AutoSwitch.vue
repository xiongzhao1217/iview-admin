<template>
  <i-switch ref="switch" :size="size" :value="value" :loading="loading" :disabled="disabled"
          :true-value="trueValue || 1" :false-value="falseValue || 0"
          @on-change="onChange">
    <span slot="open">{{slotTitle && slotTitle[0] || '开'}}</span>
    <span slot="close">{{slotTitle && slotTitle[1] || '关'}}</span>
  </i-switch>
</template>
<script>
import * as util from '../../libs/util'
export default {
  props: {
    'size': String,
    'value': Number | Boolean | String,
    'trueValue': Number | Boolean | String,
    'falseValue': Number | Boolean | String,
    'disabled': Boolean,
    'slot-title': Array,
    'change': Function,
    'row': Object,
    'valueBind': Function // 值反向绑定，即组件值发生变化，父组件table中的数据行row中对应的key也发生变化
  },
  data () {
    return {
      openDesc: '开',
      closeDesc: '关',
      loading: false
    }
  },
  methods: {
    async onChange (value) {
      let p = this.change(this.row, value)
      // 数据反向绑定
      this.valueBind(value)
      if (!p || !p.then) return
      util.updateLoading(p, v => { this.loading = v })
    }
  }
}
</script>
