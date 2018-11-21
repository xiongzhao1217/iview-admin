<template>
  <div>
    <Form ref="form" :model="form" :rules="rules" :label-width="110">

      <FormItem label="应用英文名称" prop="appNameEn">
        <Input v-model="form.appNameEn" placeholder="请输入应用英文名称"></Input>
      </FormItem>
      <FormItem label="应用名称" prop="appName">
        <Input v-model="form.appName" placeholder="请输入应用名称"></Input>
      </FormItem>
      <FormItem label="负责人手机号码" prop="appSupportTelephone">
        <Input v-model="form.appSupportTelephone" placeholder="请输入负责人手机号"></Input>
      </FormItem>
      <FormItem label="应用描述" prop="appDesc">
        <Input v-model="form.appDesc" type="textarea" :rows="3" placeholder="请输入应用描述"></Input>
      </FormItem>
    </Form>
  </div>
</template>
<script>
// import * as consts from './index'
import * as utils from '@/libs/util'
export default {
  props: ['data'],
  data () {
    let form = JSON.parse(JSON.stringify(this.data))
    return {
      form,
      rules: {
        appNameEn: [
          {required: true, message: '请输入应用英文名称', trigger: 'blur'}
        ],
        appName: [
          { required: true, message: '请输入应用名称', trigger: 'blur' }
        ],
        appSupportTelephone: [
          {required: true, message: '请输入手机号码 ', trigger: 'blur'}
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
      let url = this.form.id && '/api/apps/update' || '/api/apps/add'
      let r = await utils.request(url, {data: this.form})
      close(r)
    }
  }
}
</script>
