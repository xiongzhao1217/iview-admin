<template>
  <div>
    <Form ref="form" :model="form" :rules="rules" :label-width="80">
      <FormItem label="所属应用:" prop="appName">
        {{form.appName}}
      </FormItem>
      <FormItem label="权限类型:" prop="type">
        <AutoSelect v-model="form.type" :mapper="consts.accessTypeMapper" clearable/>
      </FormItem>
      <FormItem label="权限名称:" prop="name">
        <Input v-model="form.name" placeholder="请输入权限名称"></Input>
      </FormItem>
      <FormItem v-if="form.type == 1" label="菜单url:" prop="url">
        <Input v-model="form.url" placeholder="请输入菜单url"></Input>
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
    return {
      consts,
      form,
      rules: {
        type: [
          {required: true, message: '请选择权限类型', trigger: 'blur'}
        ],
        name: [
          {required: true, message: '请输入权限名称', trigger: 'blur'}
        ],
        url: [
          {required: true, message: '请输入菜单地址', trigger: 'blur'}
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
      let url = this.form.id && '/api/access/update' || '/api/access/add'
      let r = await utils.request(url, {data: this.form})
      close(r.data)
    }
  }
}
</script>
