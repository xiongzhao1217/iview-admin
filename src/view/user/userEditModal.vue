<template>
  <div>
    <Form ref="form" :model="form" :rules="rules" :label-width="80">

      <FormItem label="昵称" prop="nickName">
        <Input v-model="form.nickName" placeholder="请输入昵称"></Input>
      </FormItem>
      <FormItem label="手机号" prop="telephone">
        <Input v-model="form.telephone" placeholder="请输入手机号"></Input>
      </FormItem>
      <FormItem label="邮箱" prop="email">
        <Input v-model="form.email" placeholder="请输入邮箱"></Input>
      </FormItem>
      <FormItem label="性别" prop="sex">
        <AutoSelect v-model="form.sex" :mapper="consts.sexMapper" number clearable/>
      </FormItem>
    </Form>
  </div>
</template>
<script>
import * as consts from './index'
import * as utils from '@/libs/util'
export default {
  props: ['data'],
  data () {
    let form = JSON.parse(JSON.stringify(this.data))
    form = {uid: '', email: '', sex: '', mobile: '', phone_num: '', birthday: '', nick_name: '', last_name: '', first_name: '', ...form}
    return {
      consts,
      form,
      rules: {
        nickName: [
          {required: true, message: '请输入昵称', trigger: 'blur'}
        ],
        telephone: [
          {required: true, message: '请输入手机号', trigger: 'blur'}
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' }
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
      let url = this.form.id && '/api/user/update' || '/api/user/adminAddUser'
      let r = await utils.request(url, {data: this.form})
      close(r)
    }
  }
}
</script>
