<style>
  .categoryDiv {
    height: 100px;
    width: 100px;
    background: #f8f8f9;
    margin: 0 auto;
    padding: 8px;
    overflow: scroll;
  }

  .name {
    display: block;
    margin-top: 5px;
  }
</style>
<template>
  <div>
    <badge :count="realMsgCount">
      <div class="categoryDiv" @click="showCategory = true">
        <row>
          <transition-group @enter="enter" @beforeEnter="beforeEnter">
            <Col span="8" v-for="app in appsInCategory" :key="app.id" v-model="apps">
            <icon :type="app.icon" size="25"></icon>
            </Col>
          </transition-group>
        </row>
      </div>
      <Modal v-model="showCategory" width="90%" :closable="false">
        <drag2 class="modal" :list="appsInCategory" @listMove="listMove" @listRemove="listRemove"></drag2>
        <div slot="footer">
        </div>
      </Modal>
    </badge>
    <br>
    <span class="name">{{name}}</span>
  </div>
</template>

<script type="text/ecmascript-6">
  import iView from 'iview'
  import draggable from 'vuedraggable'
  import Drag from './drag.vue'
  import Drag2 from './drag2.vue'
  import Velocity from 'velocity-animate'

  export default {
    name: 'category',
    components: {
      Drag2,
      Drag,
      iView,
      draggable
    },
    data () {
      return {
        showCategory: false,
        appsInCategory: this.apps
      }
    },
    props: ['apps', 'name', 'msgCount'],
    methods: {
      beforeEnter (el, done) {
        el.style.opacity = 0
      },
      enter (el, done) {
        Velocity(el, {opacity: 1}, {duration: 1500, delay: 1000})
      },
      listMove (list) {
        this.appsInCategory = list
      },
      listRemove (appOut) {
        let that = this
        setTimeout(function () {
          that.showCategory = false
        }, 1300)
        this.$emit('appInCategoryRemove', appOut)
      }
    },
    computed: {
      realMsgCount () {
        let realMsgCount = 0
        for (let i = 0; i < this.apps.length; i++) {
          realMsgCount += this.apps[i].msgCount
        }
        return realMsgCount
      }
    }
  }
</script>


