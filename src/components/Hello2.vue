<style>
  .flip-list-move {
    transition: transform 0.5s;
  }
</style>
<template>
  <div>
    <Row>
      <draggable class="list-group" element="ul" v-model="appList" :options="dragOptions" :move="onMove"
                 @start="isDragging=true" @end="isDragging=false">
        <transition-group type="transition" :name="'flip-list'">
          <Col span="4" v-for="app in appList" :key="app.id" class="col">
          <div class="badge">
            <badge :count="app.msgCount">
              <icon :type="app.icon" size="90"></icon>
            </badge>
            <br>
            <span>{{app.name}}</span>
          </div>
          </Col>
        </transition-group>
      </draggable>
    </Row>
    <div class="list-group col-md-3">
      <pre>{{listString}}</pre>
    </div>
  </div>
</template>
<script>
  import draggable from 'vuedraggable'
  import iview from 'iview'

  export default {
    components: {
      draggable,
      iview
    },
    data () {
      return {
        appList: [
          {name: '微信', id: 0, icon: 'ios-bell-outline', msgCount: 99},
          {name: 'QQ', id: 1, icon: 'xbox', msgCount: 10},
          {name: '淘宝', id: 2, icon: 'headphone', msgCount: 9},
          {name: '陌陌', id: 3, icon: 'social-chrome', msgCount: 8},
          {name: '58同城', id: 4, icon: 'social-octocat', msgCount: 1},
          {name: '携程', id: 5, icon: 'android-globe', msgCount: 9},
          {name: '去哪儿', id: 6, icon: 'android-subway', msgCount: 9},
          {name: '支付宝', id: 7, icon: 'android-bicycle', msgCount: 9},
          {name: '天猫', id: 8, icon: 'android-upload', msgCount: 9},
          {name: '京东', id: 9, icon: 'ios-flower', msgCount: 9},
          {name: '唯品会', id: 10, icon: 'ios-flame', msgCount: 11}
        ],
        isDragging: false,
        delayedDragging: false
      }
    },
    methods: {
      onMove ({relatedContext, draggedContext}) {
        const relatedElement = relatedContext.element
        const draggedElement = draggedContext.element
        return (!relatedElement || !relatedElement.fixed) && !draggedElement.fixed
      }
    },
    computed: {
      dragOptions () {
        return {
          animation: 0,
          group: 'description',
          ghostClass: 'ghost'
        }
      },
      listString () {
        return JSON.stringify(this.appList, null, 2)
      }
    },
    watch: {
      isDragging (newValue) {
        if (newValue) {
          this.delayedDragging = true
          return
        }
        this.$nextTick(() => {
          this.delayedDragging = false
        })
      }
    }
  }
</script>

