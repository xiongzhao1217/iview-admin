<template>
  <div>
    <!--<Row class='mgtb20'><Button type='primary' @click='clickEdit()'>增加联系人</Button></Row>-->
    <Row>
      <card dis-hover>
        <h4>内容筛选</h4><br>
        <Form :model="form" label-position="right" :label-width="60">
          <Row type="flex" justify="space-between">
            <Col span="5" offset="1">
              <FormItem label="手机号" prop="appNameEn">
                <Input v-model="form.telephone" clearable></Input>
              </FormItem>
            </Col>
            <Col span="5" offset="1">
              <FormItem label="邮箱">
                <Input v-model="form.email" clearable></Input>
              </FormItem>
            </Col>
            <Col span="5" offset="1">
              <FormItem label="昵称">
                <Input v-model="form.nickName" clearable></Input>
              </FormItem>
            </Col>
            <Col span="5" offset="1">
              <FormItem label="性别" prop="sex">
                <AutoSelect v-model="form.sex" :mapper="consts.sexMapper" number clearable/>
              </FormItem>
            </Col>
          </Row>
          <Row type="flex" justify="space-between">
            <Col span="5" offset="1">
              <FormItem label="状态" prop="sex">
                <AutoSelect v-model="form.status" :mapper="consts.userStatusMapper" number clearable/>
              </FormItem>
            </Col>
            <Col offset="1">
              <Button @click="reset">重置</Button>
              <Button type="primary" @click="queryCondition" style="margin-left: 15px;">查询</Button>
            </Col>
          </Row>
        </Form>
      </card>
    </Row>
    <br/>
    <card dis-hover>
      <p slot="title">
        用户列表
      </p>
      <Button slot="extra" type="primary" size="small" @click="clickEdit">新增</Button>
      <AutoTable ref='table' v-bind='table' :params="form"></AutoTable>
    </card>
  </div>
</template>

<script>
import {showModal} from '_c/_comps/modals'
// import UserEditModal from './userEditModal'
import * as consts from './index'
import * as util from '@/libs/util'

export default {
  data () {
    return {
      consts,
      form: {},
      table: {
        uri: '/api/user/list',
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
            title: '创建时间',
            key: 'createTime',
            sortable: 'custom'
          }, {
            title: '更新时间',
            key: 'updateTime',
            sortable: 'custom'
          }, {
            title: '用户状态',
            mapper: consts.userStatusMapper,
            key: 'status',
            fixed: 'right',
            renderComp: {
              type: 'switch',
              slotTitle: ['有效', '无效'],
              size: 'large',
              click: this.clickSwith
            }
          }, {
            title: '操作',
            fixed: 'right',
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
          }]
      }
    }
  },
  methods: {
    async clickEdit (row = {}) {
      // let r = await showModal(UserEditModal, {data: row}, {title: row.id ? '编辑用户' : '新增用户', width: 25})
      // if (r) {
      //   await this.$refs.table.reload()
      // }
    },
    async clickSwith (row = {}, isOpen) {
      await util.request('/api/user/update', {data: {id: row.id, status: isOpen}})
    },
    async queryCondition () {
      await this.$refs.table.reload()
    },
    async reset () {
      this.form = {}
      await this.$nextTick()
      this.$refs.table.reload()
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
