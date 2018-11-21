<template>
  <div>
    <Form ref="form" :model="form" :rules="rules" :label-width="80">
      <FormItem label="所属应用:" prop="appName">
        {{appName}}
      </FormItem>
      <FormItem label="角色名称:" prop="roleName">
        <Input v-model="form.roleName" placeholder="请输入角色名称"></Input>
      </FormItem>
      <FormItem label="角色描述:" prop="roleDesc">
        <Input v-model="form.roleDesc" type="textarea" :rows="3" placeholder="请输入角色描述"></Input>
      </FormItem>
    </Form>
  </div>
</template>
<script>
import * as utils from '@/libs/util'
export default {
  props: ['data', 'appsId', 'appName'],
  data () {
    let form = JSON.parse(JSON.stringify(this.data))
    return {
      form,
      rules: {
        roleName: [
          {required: true, message: '请输入角色名称', trigger: 'blur'}
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
      let url = this.form.id && '/api/role/update' || '/api/role/add'
      let r = await utils.request(url, {data: {...this.form, appsId: this.appsId}})
      close(r)
    }
  }
}
</script>
