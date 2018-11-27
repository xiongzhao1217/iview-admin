<template>
  <div>
    <row style="margin-bottom: 16px;">
      <Col span="6">
        <Input v-model="form.telephone" clearable>
          <span slot="prepend">手机号</span>
        </Input>
      </Col>
      <Col span="6" offset="1">
        <Input v-model="form.email" clearable>
          <span slot="prepend">邮箱</span>
        </Input>
      </Col>
      <Col span="6" offset="1">
        <Input v-model="form.nickName" clearable>
          <span slot="prepend">昵称</span>
        </Input>
      </Col>
      <Col span="3" offset="1" align="right">
        <Button type="primary" @click="clickSearch">搜索</Button>
      </Col>
    </row>
    <AutoTable ref='table' v-bind='table' :params="form" un-auto="true"></AutoTable>
  </div>
</template>
<script>
import * as utils from '@/libs/util'
import * as consts from '../user'
export default {
  props: ['roleId'],
  data () {
    return {
      consts,
      form: {},
      table: {
        uri: '/api/roleUserRela/list',
        params: this.form,
        defaultWidth: 150,
        columns: [
          {
            title: 'ID',
            key: 'id',
            fixed: 'left',
            width: 60
          },
          {
            title: '昵称',
            key: 'nickName',
            width: 150
          },
          {
            title: '手机号',
            key: 'telephone'
          }, {
            title: '邮箱',
            key: 'email',
            width: 200
          }, {
            title: '性别',
            mapper: consts.sexMapper,
            key: 'sex'
          }, {
            title: '用户状态',
            mapper: consts.userStatusMapper,
            key: 'status'
          }, {
            title: '操作',
            fixed: 'right',
            width: 150,
            renderButtons: row => [{
              title: '关联用户',
              type: 'primary',
              showbtn: !row.roleUserRelaId,
              click: this.bindUser
            }, {
              title: '取消关联',
              type: 'error',
              showbtn: !!(row.roleUserRelaId),
              click: this.unbindUser
            }]
          }]
      }
    }
  },
  async mounted () {
    this.$set(this.form, 'roleId', this.roleId)
    this.$refs.table.reload()
  },
  methods: {
    async onOk (close) {
      close(r.data)
    },
    async bindUser (row = {}) {
      await utils.request('/api/roleUserRela/add', {data: {roleId: this.roleId, userId: row.id}})
      this.$refs.table.reload()
    },
    async unbindUser (row = {}) {
      await utils.request('/api/roleUserRela/delete', {data: {id: row.roleUserRelaId}})
      this.$refs.table.reload()
    },
    async clickSearch () {
      this.$refs.table.reload()
    }
  }
}
</script>
