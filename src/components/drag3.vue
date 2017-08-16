<style>
  .col {
    height: 200px;
  }

  .flip-list-move {
    transition: transform 0.5s;
  }

  .flip-list-leave-to {

  }

  .plus {
    background-color: #f8f8f9;
    width: 100px;
    height: 100px;
    margin: 0 auto;
    padding: 0;
  }
</style>
<template>
  <Row>
    <draggable v-model="appList" :options="dragOption"
               @choose="onChoose" @end="onEnd" :move="onMove" @sort="onSort">
      <transition-group type="transition" :name="'flip-list'" @leave="leave" tag="div">
        <Col span="4" v-for="app in appList" :key="app.id" :class="[app.isCategory ? noDragClass : dragClass]"
             class="col">
        <template v-if="!app.isCategory">
          <app-launcher :name="app.name" :icon="app.icon" :msgCount="app.msgCount"></app-launcher>
        </template>
        <template v-else>
          <category :name="app.name" :msgCount="app.msgCount" :apps="app.apps" ref="category"
                    @appInCategoryRemove="appInCategoryRemove"></category>
        </template>
        </Col>
      </transition-group>
    </draggable>
    <Col span="4">
    <Tooltip content="新增文件夹">
      <Button class="plus" @click="showModal">
        <Icon type="ios-plus-empty" size="100"></Icon>
      </Button>
    </Tooltip>
    <Modal v-model="plusCategory" title="请输入你要增加的文件夹的名称" @on-ok="addCategory">
      <Input placeholder="请输入你要增加的文件夹的名称" v-model="categoryName"></Input>
    </Modal>
    </Col>
  </Row>
</template>

<script type="text/ecmascript-6">
  import iView from 'iview'
  import draggable from 'vuedraggable'
  import Category from './category.vue'
  import AppLauncher from './appLauncher.vue'
  import Velocity from 'velocity-animate'
  import JQuery from 'jquery'
  //  import isOverlap from '../../static/isCover'

  export default {
    name: 'drag',
    components: {
      AppLauncher,
      Category,
      iView,
      draggable,
      JQuery,
      Velocity
    },
    data () {
      return {
        categoryName: '',
        name: '增加文件夹',
        icon: 'ios-plus-empty',
        plusCategory: false,
        dragClass: 'drag',
        noDragClass: 'noDrag',
        isDragging: false,
        delayedDragging: false,
        sortable: true,
        mouseX: 0,
        mouseY: 0,
        i: 1,
        startTime: 0,
        endTime: 0,
        isMove: false,
        itemIndex: 0,
        dragOption: {
          animation: 0,
          group: 'description',
          ghostClass: 'ghost',
          draggable: '.drag'
        },
        categoryIndex: 0
      }
    },
    mounted () {
      let categorys = JQuery('.noDrag')
      for (let i = 0; i < categorys.length; i++) {
        JQuery(categorys[i]).on('mouseenter', function () {
          JQuery('.noDrag').addClass('drag')
        })
        JQuery(categorys[i]).on('mouseleave', function () {
          JQuery('.noDrag').removeClass('drag')
        })
      }
      JQuery('.plus').parent().removeClass('noDrag')
//      JQuery('.plus').on('click', function () {
//        console.log(this.plusCategory)
//        this.plusCategory = true
//        alert('7777')
//      })
    },
    updated () {
      let categorys = JQuery('.noDrag')
      for (let i = 0; i < categorys.length; i++) {
        JQuery(categorys[i]).on('mouseenter', function () {
          JQuery('.noDrag').addClass('drag')
        })
        JQuery(categorys[i]).on('mouseleave', function () {
          JQuery('.noDrag').removeClass('drag')
        })
      }
      JQuery('.plus').parent().removeClass('noDrag')
//      JQuery('.plus').on('click', function () {
//        console.log(this.plusCategory)
//        this.plusCategory = true
//        alert('7777')
//      })
    },
    props: ['appList'],
    methods: {
      showModal () {
        this.plusCategory = true
      },
      addCategory () {
        this.appList.push({
          name: this.categoryName,
          id: 1,
          icon: '',
          msgCount: 0,
          isCategory: true,
          apps: []
        })
        this.categoryName = ''
      },
      appInCategoryRemove (appOut) {
        this.appList.push(appOut)
      },
      leave: function (el, done) {
        console.log(el)
//        console.log('offsetLeft', el.offsetHeight)
        let mousePosition = this.getMousePosition()
        let x = mousePosition.x
        let y = mousePosition.y
        let dragX = JQuery(el).offset().left
        let dragY = JQuery(el).offset().top
        let translateX = x - dragX - 120
        let translateY = y - dragY - 45 - 64.98
        let categoryDiv = JQuery('.categoryDiv')
//        console.log('padding', categoryDiv.css('padding'))
        Velocity(categoryDiv[this.categoryIndex], {
          opacity: 0.5,
          width: '+=5',
          height: '+=5',
          padding: '+=5'
        }, {duration: 500})
//        Velocity(JQuery('.categoryDiv'), 'reverse')
//        Velocity(JQuery('.categoryDiv'), {scale: 1})
        Velocity(categoryDiv[this.categoryIndex], {width: '-=5', height: '-=5', padding: '-=5'}, {duration: 500})
        Velocity(el, {translateX: translateX, translateY: translateY, scale: 0.278}, {
          duration: 1500,
          complete: done
        })
        Velocity(categoryDiv[this.categoryIndex], {opacity: 1}, {duration: 500})
//        Velocity(el, {scale: 0.278}, {duration: 2000, complete: done})
//        Velocity(el, {offsetLeft: '500px'}, {duration: 2000, complete: done})
//        Velocity(el, { rotateZ: '100deg' }, { loop: 2 })
//        Velocity(el, {
//          rotateZ: '45deg',
//          translateY: '30px',
//          translateX: '30px',
//          opacity: 0
//        }, { complete: done })
      },
      canDragInDiv () {
        console.log('canDragInDiv')
      },
      onChoose (evt, originalEvent) {
//        this.sortable = false
//        let mousePosition = this.getMousePosition(originalEvent)
//        console.log('mousePosition', mousePosition)
      },
      onMove (e) {
//        let mousePosition = this.getMousePosition(e)
//        console.log('move' + this.i)
        console.log('move')
//        console.log('mousePosition', mousePosition)
//        if (this.i === 1) {
//          this.startTime = (new Date()).valueOf()
//        } else {
//          console.log('startTime', this.startTime)
//          this.endTime = (new Date()).valueOf()
//          console.log('endTime', this.endTime)
//          if (this.endTime - this.startTime > 2000) {
//            alert('yes')
//          }
//        }
//        this.i++
//        console.log('888')
//        if (this.isOverlap('.ghost', '.categoryDiv')) {
//          console.log('拖进来了')
//        } else {
//          console.log('没拖进来')
//        }
//        JQuery('.categoryDiv').mouseenter(function () {
//          console.log('mouseenter')
//          JQuery('.categoryDiv').mouseup(function () {
//            console.log('mouseup')
//          })
//        })
      },
      onSort (e) {
//        this.isMove = true
//        console.log(e)
//        this.itemIndex = e.newIndex
//        console.log(e)
        console.log('sort')
      },
      onEnd (e) {
        console.log('end')
        let mousePosition = this.getMousePosition()
        let isMouseInCol = this.isMouseInDiv('.noDrag', mousePosition)
        if (isMouseInCol.isMouseInDiv) {
//          let index
//          if (e.oldIndex === e.newIndex) {
//            index = e.oldIndex
//          } else {
//            index = e.newIndex
//          }
//          console.log(e.oldIndex, e.newIndex)
//          let appList = this.appList
//          let appListWithoutCategory = appList.slice(0)
//          let count = 0
//          for (let i = 0; i < appList.length; i++) {
//            if (appList[i].isCategory) {
//              appListWithoutCategory.splice(i - count, 1)
//              count++
//            }
//          }
//          console.log('index', index)
//          console.log('appListWithoutCategory', appListWithoutCategory)
//          let appIn = appListWithoutCategory[index]
//          let result = this.isMouseInDiv('.categoryDiv', mousePosition)
//          if (result.isMouseInDiv) {
//            console.log('在文件夹内')
//            this.categoryIndex = result.categoryDivIndex
//            console.log('appIn', appIn)
//            console.log('appList', appList)
//            for (let i = 0; i < appList.length; i++) {
//              if (appList[i].id === appIn.id) {
//                this.appList.splice(i, 1)
//              }
//            }
//            let count2 = 0
//            for (let i = 0; i < appList.length; i++) {
//              if (appList[i].isCategory) {
//                if (count2 === this.categoryIndex) {
//                  console.log('this.categoryIndex', this.categoryIndex)
//                  this.appList[i].apps.push(appIn)
//                  this.isMove = false
//                  console.log(appList)
//                }
//                count2++
//              }
//            }
//          } else {
//            let count3 = 0
//            for (let i = 0; i < appList.length; i++) {
//              if (appList[i].isCategory) {
//                if (count3 === isMouseInCol.categoryDivIndex) {
//                  let categoryX = JQuery(JQuery('.categoryDiv')[isMouseInCol.categoryDivIndex]).offset().left
//                  if (mousePosition.x < categoryX) {
//                    console.log('在文件夹左边')
//                    for (let y = 0; y < appList.length; y++) {
//                      if (appList[y].id === appIn.id) {
//                        if (y < i) {
//                          this.appList.splice(i, 0, appIn)
//                          this.appList.splice(y, 1)
//                        } else {
//                          this.appList.splice(y, 1)
//                          this.appList.splice(i, 0, appIn)
//                        }
//                      }
//                    }
//                  } else {
//                    console.log('在文件夹右边')
//                    for (let y = 0; y < appList.length; y++) {
//                      if (appList[y].id === appIn.id) {
//                        if (y < i) {
//                          this.appList.splice(i + 1, 0, appIn)
//                          this.appList.splice(y, 1)
//                        } else {
//                          this.appList.splice(y, 1)
//                          this.appList.splice(i + 1, 0, appIn)
//                        }
//                      }
//                    }
//                  }
//                }
//                count3++
//              }
//            }
//          }
        } else {
          console.log('在col外')
        }

        this.i = 1
      },
      getMousePosition (ev) {
        ev = ev || window.event
        if (ev.pageX || ev.pageY) {
          return {x: ev.pageX, y: ev.pageY}
        }
        return {
          x: ev.clientX + document.body.scrollLeft - document.body.clientLeft,
          y: ev.clientY + document.body.scrollTop - document.body.clientTop
        }
      },
      isMouseInDiv (selecter, mousePosition) {
        let isMouseInDiv = false
        let categoryDivIndex = null
        let mouseX = mousePosition.x
        let mouseY = mousePosition.y
        let categoryDivs = JQuery(selecter)
        console.log(categoryDivs)
        for (let i = 0; i < categoryDivs.length; i++) {
          console.log(categoryDivs[i])
          let x = JQuery(categoryDivs[i]).offset().left
          let y = JQuery(categoryDivs[i]).offset().top
          let width = JQuery(categoryDivs[i]).width()
          let height = JQuery(categoryDivs[i]).height()
          if (x < mouseX && mouseX < x + width && y < mouseY && mouseY < y + height) {
            isMouseInDiv = true
            categoryDivIndex = i
          }
        }
        return {isMouseInDiv: isMouseInDiv, categoryDivIndex: categoryDivIndex}
      },
      isOverlap (idOne, idTwo) {
        let objOne = JQuery(idOne)
        let objTwo = JQuery(idTwo)
        let offsetOne = objOne.offset()
        let offsetTwo = objTwo.offset()
        let topOne = offsetOne.top
        let topTwo = offsetTwo.top
        let leftOne = offsetOne.left
        let leftTwo = offsetTwo.left
        let widthOne = objOne.width()
        let widthTwo = objTwo.width()
        let heightOne = objOne.height()
        let heightTwo = objTwo.height()
        let leftTop = leftTwo > leftOne && leftTwo < leftOne + widthOne && topTwo > topOne && topTwo < topOne + heightOne
        let rightTop = leftTwo + widthTwo > leftOne && leftTwo + widthTwo < leftOne + widthOne && topTwo > topOne && topTwo < topOne + heightOne
        let leftBottom = leftTwo > leftOne && leftTwo < leftOne + widthOne && topTwo + heightTwo > topOne && topTwo + heightTwo < topOne + heightOne
        let rightBottom = leftTwo + widthTwo > leftOne && leftTwo + widthTwo < leftOne + widthOne && topTwo + heightTwo > topOne && topTwo + heightTwo < topOne + heightOne
        return leftTop || rightTop || leftBottom || rightBottom
      },
      checkIfDragInCategory () {
//        console.log('666')
//        if (this.isOverlap('.ghost', '.categoryDiv')) {
//          console.log('拖进来了')
//        } else {
//          console.log('没拖进来')
//        }
//        this.ListenMousePosition()
//        let stratTime
//        let endTime
//        JQuery('.categoryDiv').hover(function () {
//          console.log('777')
//          stratTime = (new Date()).valueOf()
//          console.log('stratTime1', stratTime)
//          JQuery('.categoryDiv').mouseup(function () {
//            console.log('stratTime2', stratTime)
//            endTime = (new Date()).valueOf()
//            console.log('endTime', endTime)
//            if (endTime - stratTime > 2000) {
//              console.log('放进文件夹')
//            } else {
//              console.log('交换顺序')
//            }
//            JQuery('.categoryDiv').off()
//          })
//        })
      },
      removeEventInCategory () {
        console.log('7777')
      }
    },
    computed: {
      listString () {
        return JSON.stringify(this.appList, null, 2)
      }
    },
    watch: {}
  }

</script>


