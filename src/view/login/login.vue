<style lang="less">
  @import './login.less';
</style>

<template>
  <div class="login">
    <div class="login-con">
      <Card icon="log-in" title="欢迎登录" :bordered="false">
        <div class="form-con">
          <login-form @on-success-valid="handleSubmit"></login-form>
          <p class="login-tip">KIWI提供技术支持</p>
        </div>
      </Card>
    </div>
  </div>
</template>

<script>
import LoginForm from '_c/login-form'
import * as util from '@/libs/util'
import md5 from 'js-md5'
import { mapActions } from 'vuex'
export default {
  components: {
    LoginForm
  },
  methods: {
    ...mapActions([
      'handleLogin',
      'getUserInfo'
    ]),
    async handleSubmit ({ userName, password }) {
      let r = await util.request('api/user/dologin?returnUrl=http://wwww.baidu.com', {data: {email: userName, passwd: md5(password)}})
      console.log(r)
      let returnUrl = this.$route.query.returnUrl
      if (!returnUrl) {
        return this.$Message.error('returnUrl不能为空')
      }
      window.location.href = returnUrl
    }
  }
}
</script>

<style>

</style>
