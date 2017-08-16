<style>
  .category-list-move {
    transition: transform 0.5s;
  }
</style>
<template>
  <Row>
    <draggable v-model="list" :options="dragOptions" :move="onMove"
               @start="" @end="end">
      <transition-group type="transition" :name="'category-list'" @leave="leave">
        <Col span="4" v-for="app in list" :key="app.id" class="col">
        <app-launcher :name="app.name" :icon="app.icon" :msgCount="app.msgCount"></app-launcher>
        </Col>
      </transition-group>
    </draggable>
  </Row>
</template>

<script type="text/ecmascript-6">
  import iView from 'iview'
  import draggable from 'vuedraggable'
  import AppLauncher from './appLauncher.vue'
  import JQuery from 'jquery'
  import Velocity from 'velocity-animate'

  export default {
    name: 'drag2',
    components: {
      AppLauncher,
      iView,
      draggable
    },
    data () {
      return {
        isDragging: false,
        delayedDragging: false
      }
    },
    props: ['list'],
    methods: {
      onMove ({relatedContext, draggedContext}) {
        const relatedElement = relatedContext.element
        const draggedElement = draggedContext.element
        return (!relatedElement || !relatedElement.fixed) && !draggedElement.fixed
      },
      end (ev) {
        var that = this
        JQuery('body').one('mouseup', function (e) {
          let mousePosition = {x: e.pageX, y: e.pageY}
          if (!that.isMouseInDiv('.ivu-modal', mousePosition)) {
            console.log('在模态框外')
            console.log('ev.oldIndex', ev.oldIndex)
            let index = ev.oldIndex === ev.newIndex ? ev.oldIndex : ev.newIndex
            console.log('index', index)
            let appOut = that.list[index]
            that.list.splice(index, 1)
            that.$emit('listRemove', appOut)
          } else {
            console.log('在模态框内')
          }
        })
      },
      getMousePosition (ev) {
        ev = ev || window.event
        if (ev.pageX || ev.pageY) {
          console.log('ev.pageX', ev.pageX)
          console.log('ev.pageY', ev.pageY)
          return {x: ev.pageX, y: ev.pageY}
        }
        return {
          x: ev.clientX + document.body.scrollLeft - document.body.clientLeft,
          y: ev.clientY + document.body.scrollTop - document.body.clientTop
        }
      },
      isMouseInDiv (selecter, mousePosition) {
        let mouseX = mousePosition.x
        let mouseY = mousePosition.y
        console.log('mouseX', mouseX)
        console.log('mouseY', mouseY)
        let x = JQuery(selecter).offset().left
        console.log('x', x)
        let y = JQuery(selecter).offset().top
        console.log('y', y)
        let width = JQuery(selecter).width()
        let height = JQuery(selecter).height()
        console.log('width', width)
        console.log('height', height)
        if (x < mouseX && mouseX < x + width && y < mouseY && mouseY < y + height) {
          return true
        } else {
          return false
        }
      },
      leave (el, done) {
        let mousePosition = this.getMousePosition()
        let x = mousePosition.x
        let y = mousePosition.y
        let dragX = JQuery(el).offset().left
        let dragY = JQuery(el).offset().top
        let translateX = x - dragX - 54
        let translateY = y - dragY - 37 - 90
        Velocity(el, {translateX: translateX, translateY: translateY, rotateZ: '1080deg', scale: 0.1}, {
          duration: 1000,
          complete: done
        })
      }
    },
    computed: {
      dragOptions () {
        return {
          animation: 0,
          group: 'description',
          ghostClass: 'ghost'
        }
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
      },
      list (newList) {
        this.$emit('listMove', newList)
      }
    }
  }

</script>


