<template>
  <div>
    <!-- <h2 class="mg20">树节点</h2> -->
    <Row>
      <Col>
        <div class="card-item-box">
          <Ztree
            ref="ztree"
            :data="treeData"
            :setting="setting"
          ></Ztree>
          <Spin size="large" fix v-if="spinShow"></Spin>
        </div>
      </Col>
    </Row>
  </div>
</template>
<script>
import * as utils from '@/libs/util'
import { showModal } from '_c/_comps/modals'

export default {
  props: ['appsId', 'roleId'],
  data () {
    return {
      spinShow: true,
      treeData: [],
      // 以下setting如果填写会覆盖默认的setting，请参考ztree官方文档选择性覆盖
      setting: {
        data: {
          simpleData: {
            enable: true,
            pIdKey: 'pid' // 指定父id的字段key，默认为pId
          }
        },
        check: {
          enable: true,
          chkboxType: {'Y': 'ps', 'N': 'ps'} // 表示当勾选/取消勾选时，关联父节点和子节点
        }
      }
    }
  },
  async mounted () {
    let r = await utils.request('/api/roleAccessRela/roleAccessList', {params: {appsId: this.appsId, roleId: this.roleId}})
    r = r.data.map(rm => {
      rm.checked = !!(rm.roleId)
      return rm
    })
    r.push({id: 0, name: '权限资源根节点'})
    this.treeData = r
    this.spinShow = false
  },
  methods: {
    async onOk (close) {
      let ztree = this.$refs.ztree.getZTreeObj()
      let checkedNodes = ztree.getCheckedNodes(true)
      // 更新角色权限
      let roleAccesses = checkedNodes.map(node => ({roleId: this.roleId, accessId: node.id}))
      await utils.requestJson(`/api/roleAccessRela/batchAdd?roleId=${this.roleId}`, {data: roleAccesses})
      // close调用后,会被最终返回到showModal
      close()
    }
  }
}
</script>
