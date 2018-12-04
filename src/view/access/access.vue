<template>
  <div>
    <Row type="flex" justify="space-between">
      <Col>
        所属应用:
        <AutoSelect v-model="appsId" :mapper="appMapper" @on-change="appChange" number style="width: 243px"/>
      </Col>
    </Row>
    <br>
    <card dis-hover style="width:300px; height: 600px">
      <p slot="title">
        权限资源管理
      </p>
      <Ztree
        ref="ztree"
        :data="treeData"
        :setting="setting"
        :clickAddBtn="clickAddNode"
        :clickEditBtn="clickEditNode"
        :clickNode="clickNode"
        :drag="saveDrag"
        :clickDeleteBtn="deleteNode"/>
    </card>
  </div>
</template>

<script>
import {showModal} from '_c/_comps/modals'
import AccessEditModal from './accessEditModal'
import * as util from '@/libs/util'

export default {
  data () {
    return {
      appsId: '',
      appMapper: [],
      treeData: [],
      // 以下setting如果填写会覆盖默认的setting，请参考ztree官方文档选择性覆盖
      setting: {
        showEdit: true, // 是否显示增删改按钮，默认不显示
        data: {
          simpleData: {
            enable: true,
            pIdKey: 'pid' // 指定父id的字段key，默认为pId
          }
        },
        edit: {
          showRenameBtn: (treeId, treeNode) => {
            let b = treeNode.level !== 0
            return b
          }
        }
      }
    }
  },
  async mounted () {
    let r = await util.request('/api/apps/list')
    let mapper = {}
    r && r.data && r.data.forEach(a => mapper[a.id] = `${a.appName}(${a.appNameEn})`)
    this.appMapper = mapper
    this.appsId = +Object.keys(mapper)[0]
    // 载入ztree
    await this.loadTree()
  },
  methods: {
    // 点击添加节点按钮（若希望新增节点生效，需要return新增的节点数据）
    async clickAddNode (pNode) {
      let r = await showModal(AccessEditModal, { data: {pid: pNode.id, appsId: this.appsId, appName: this.appMapper[this.appsId]} }, {title: '新增节点', width: 23})
      return r // 若保存数据库失败，则不需要返回新增节点数据，这样树组件将不会动态加载新增节点数据
    },
    // 点击修改节点按钮（若希望修改节点生效，需要return修改后的节点数据）
    async clickEditNode (node) {
      let r = await showModal(AccessEditModal, { data: {...node, appsId: this.appsId, appName: this.appMapper[this.appsId]} }, {title: '修改节点', width: 23})
      return r
    },
    // 保存拖拽结果（若希望拖拽结果生效，需要return true）
    async saveDrag (node, targetNode, moveType, nodeIds) {
      await util.request('/api/access/accessMove', {data: {index: node.getIndex(), targetIndex: targetNode.getIndex(), nodeIds}})
      return true
    },
    // 点击节点
    async clickNode (node) {
      console.log('点击节点：', node)
    },
    // 删除节点（若希望删除结果生效，需要return true）
    async deleteNode (node) {
      await util.request('/api/access/delete', {data: {id: node.id}})
      return true
    },
    async appChange () {
      this.loadTree()
    },
    async loadTree () {
      let r = await util.request('/api/access/list', {params: {appsId: this.appsId}})
      r.data.push({id: 0, name: this.appMapper[this.appsId]})
      this.treeData = r.data
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
