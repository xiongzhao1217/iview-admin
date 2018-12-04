<template>
  <div>
    <Form ref="form" :model="form" :rules="rules" :label-width="80">
      <FormItem label="所属应用:" prop="appName">
        {{form.appName}}
      </FormItem>
      <FormItem label="资源名称:" prop="name">
        <Input v-model="form.name" placeholder="请输入资源名称"></Input>
      </FormItem>
      <FormItem label="资源编码:" prop="code">
        <Input v-model="form.code" placeholder="请输入资源编码"></Input>
      </FormItem>
      <FormItem label="资源URL:" prop="url">
        <Input v-model="form.url" placeholder="请输入资源URL"></Input>
      </FormItem>
    </Form>
  </div>
</template>
<script>
import * as utils from '@/libs/util'
import * as consts from './index'
export default {
  props: ['data'],
  data () {
    let form = JSON.parse(JSON.stringify(this.data))
    // 默认选中菜单
    if (!form.id) form.type = 1
    return {
      consts,
      form,
      rules: {
        name: [
          {required: true, message: '请输入资源名称', trigger: 'blur'}
        ],
        code: [
          {required: true, message: '请输入资源编码', trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    async onOk (close) {
      let valid = await utils.validateForm(this.$refs.form)
      if (!valid) {
        return this.$Message.error('表单验证失败')
      }
      if (this.form.type !== 1) {
        this.form.url = null
        this.form.menuIcon = null
      }
      let url = this.form.id && '/api/access/update' || '/api/access/add'
      let r = await utils.request(url, {data: this.form})
      close(r.data)
    }
  }
}
</script>
