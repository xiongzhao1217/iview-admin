<template>
  <div class="jd-btn-poptip">
    <Poptip v-if="needConfirm"
      confirm
      :title="prompt || '您确认进行该操作吗？'"
      :placement="placement || 'left'"
      @on-ok="click"
      :transfer="true"
      >
      <Button :loading="loading" :type="type" :size="size" :disabled="disabled"><slot></slot></Button>
    </Poptip>
    <Button v-if="!needConfirm" @click="click" :loading="loading" :type="type" :size="size" :disabled="disabled"><slot></slot></Button>
  </div>
</template>
<script>
import * as util from '../../libs/util'
export default {
  props: {
    load: Function,
    type: String,
    size: String,
    placement: String,
    prompt: String,
    disabled: Boolean
  },
  data () {
    return {
      loading: false
    }
  },
  computed: {
    needConfirm () {
      return ['warning', 'error'].indexOf(this.type) >= 0
    }
  },
  methods: {
    click () {
      let p = this.load()
      if (!p || !p.then) return
      util.updateLoading(p, v => { this.loading = v })
    }
  }
}
</script>
<style scope>
.jd-btn-poptip{
  display: inline-block;
  vertical-align: top;
  margin-right: 8px;
  margin-left: 8px;
}
</style>
