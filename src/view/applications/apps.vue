<template>
  <div>
    <!--<Row class='mgtb20'><Button type='primary' @click='clickEdit()'>增加联系人</Button></Row>-->
    <Row>
      <card dis-hover>
        <h4>内容筛选</h4><br>
        <Form :model="form" label-position="right" :label-width="60">
          <Row type="flex" justify="space-between">
            <Col span="5" offset="1">
              <FormItem label="应用简称" prop="passwd">
                <Input v-model="form.passwd"></Input>
              </FormItem>
            </Col>
            <Col span="5" offset="1">
              <FormItem label="应用名称">
                <Input v-model="form.input1"></Input>
              </FormItem>
            </Col>
            <Col span="5" offset="1">
              <FormItem label="AppID">
                <Input v-model="form.input1"></Input>
              </FormItem>
            </Col>
            <Col span="5" offset="1">
              <FormItem label="应用状态">
                <Input v-model="form.input1"></Input>
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col offset="1">
              <Button>重置</Button>
              <Button type="primary" style="margin-left: 15px;">查询</Button>
            </Col>
          </Row>
        </Form>
      </card>
    </Row>
    <br/>
    <card dis-hover>
      <p slot="title">
        应用列表
      </p>
      <Button slot="extra" type="primary" size="small" @click="clickEdit">新增</Button>
      <AutoTable ref='table' v-bind='table'></AutoTable>
    </card>
  </div>
</template>

<script>
import {showModal} from '_c/_comps/modals'
import AppsEditModal from './appsEditModal'
import * as consts from './index'

export default {
  data () {
    return {
      consts,
      form: {},
      table: {
        uri: '/api/apps/list',
        params: {
          order: '+id'
        },
        defaultWidth: 150,
        columns: [
          {
            title: 'ID',
            key: 'id',
            fixed: 'left',
            width: 60
          },
          {
            title: '应用简称',
            key: 'appNameEn',
            fixed: 'left',
            width: 100
          },
          {
            title: '应用名称',
            key: 'appName'
          }, {
            title: 'AppID',
            key: 'appId'
          }, {
            title: 'APP密钥',
            key: 'appSecret'
          }, {
            title: '应用状态',
            mapper: consts.appStatus,
            type: 'tag',
            key: 'status'
          }, {
            title: '应用负责人手机号',
            key: 'appSupportTelephone',
            width: 160
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
      let r = await showModal(AppsEditModal, {data: row}, {title: row.id ? '编辑应用' : '新增应用', width: 30})
      if (r) {
        await this.$refs.table.reload()
      }
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
