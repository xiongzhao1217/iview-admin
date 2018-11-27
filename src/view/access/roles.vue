<template>
  <div>
      <Row type="flex" justify="space-between">
        <Col>
            所属应用:
          <AutoSelect v-model="params.appsId" :mapper="appMapper" @on-change="appChange" number clearable style="width: 200px"/>
        </Col>
        <Col>
          <Button type="primary" @click="clickEdit">新增</Button>
        </Col>
      </Row>
    <br>
    <card dis-hover>
      <p slot="title">
        角色管理
      </p>
      <!--<Button slot="extra" type="primary" size="small" @click="clickEdit">新增</Button>-->
      <AutoTable ref='table' v-bind='table' :params="params" unAuto="true"></AutoTable>
    </card>
  </div>
</template>

<script>
import {showModal} from '_c/_comps/modals'
import RoleEditModal from './roleEditModal'
import RoleMenuEditModal from './roleMenuEditModal'
import RoleUserEditModal from './roleUserEditModal'
import * as util from '@/libs/util'

export default {
  data () {
    return {
      params: {},
      appMapper: [],
      table: {
        uri: '/api/role/list',
        params: this.params,
        columns: [
          {
            title: 'ID',
            key: 'id',
            width: 60
          },
          {
            title: '角色名称',
            key: 'roleName'
          },
          {
            title: '角色描述',
            key: 'roleDesc'
          }, {
            title: '创建时间',
            key: 'createTime',
            sortable: 'custom'
          }, {
            title: '更新时间',
            key: 'updateTime',
            sortable: 'custom'
          }, {
            title: '操作',
            width: 200,
            renderButtons: row => [{
              title: '编辑',
              type: 'primary',
              click: this.clickEdit
            }, {
              title: '删除',
              type: 'error',
              click: this.clickDelete
            }]
          }, {
            title: '高级操作',
            width: 220,
            renderButtons: row => [{
              title: '关联用户',
              type: 'info',
              click: this.bindUser
            }, {
              title: '关联菜单',
              type: 'success',
              click: this.bindMenu
            }]
          }]
      }
    }
  },
  async mounted () {
    let r = await util.request('/api/apps/list')
    let mapper = {}
    r && r.data && r.data.forEach(a => mapper[a.id] = `${a.appName}(${a.appNameEn})`)
    this.appMapper = mapper
    this.$set(this.params, 'appsId', +Object.keys(mapper)[0])
    await this.$refs.table.reload()
  },
  methods: {
    async clickEdit (row = {}) {
      let r = await showModal(RoleEditModal, {data: row, appsId: this.params.appsId, appName: this.appMapper[this.params.appsId]}, {title: row.id ? '编辑角色' : '新增角色', width: 25})
      if (r) {
        await this.$refs.table.reload()
      }
    },
    async appChange (value) {
      await this.$refs.table.reload()
    },
    async clickDelete (row = {}) {
      await util.request('/api/role/delete', {data: {id: row.id}})
      await this.$refs.table.reload()
    },
    async bindUser (row = {}) {
      await showModal(RoleUserEditModal, {roleId: row.id}, {title: '关联用户', width: 70})
    },
    async bindMenu (row = {}) {
      await showModal(RoleMenuEditModal, {appsId: this.params.appsId, roleId: row.id}, {title: '关联菜单', width: 30})
    }
  }
}
</script>

<style>
.intro-con{
  min-height: 140px;
}
.draggable-btn{
  margin-top: 20px;
}
.code-con{
  width: 400px;
  background: #F9F9F9;
  padding-top: 10px;
}
</style>
