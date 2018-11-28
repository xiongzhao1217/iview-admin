<template>
  <div>
    <Form ref="form" :model="form" :rules="rules" :label-width="80">
      <FormItem label="所属应用:" prop="appName">
        {{form.appName}}
      </FormItem>
      <FormItem label="权限类型:" prop="type">
        <AutoSelect v-model="form.type" :mapper="consts.accessTypeMapper" number/>
      </FormItem>
      <FormItem label="权限名称:" prop="name">
        <Input v-model="form.name" placeholder="请输入权限名称"></Input>
      </FormItem>
      <FormItem v-if="form.type === 1" label="菜单url:" prop="url">
        <Input v-model="form.url" placeholder="请输入菜单url"></Input>
      </FormItem>
      <FormItem v-if="form.type === 1" label="菜单图标:" prop="menuIcon">
        <Input v-model="form.menuIcon" placeholder="请输入菜单图标">
          <Icon slot="append" :type="form.menuIcon"/>
        </Input>
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
        type: [
          {required: true, type: 'number', message: '请选择权限类型', trigger: 'blur'}
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
      if (this.form.type !== 1) {
        this.form.url = null
        this.form.menuIcon = null
      }
      let url = this.form.id && '/api/menu/update' || '/api/menu/add'
      let r = await utils.request(url, {data: this.form})
      close(r.data)
    }
  }
}
</script>
