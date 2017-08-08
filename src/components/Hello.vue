<style>
  .small-col {
    height: 10px;
    width: 10px;
  }

  .modal {
    padding: 80px;
  }
</style>
<template>
  <div>
    <drag :appList="appList"></drag>
  </div>
</template>
<script>
  import Drag from './drag.vue'

  export default {
    components: {
      Drag
    },
    data () {
      return {
        appList: [
          {name: '微信', id: 0, icon: 'ios-bell-outline', msgCount: 99, isCategory: false, apps: []},
          {
            name: '购物',
            id: 12,
            icon: '',
            msgCount: 999,
            isCategory: true,
            apps: [
              {name: '携程', id: 5, icon: 'android-globe', msgCount: 9, isCategory: false, apps: []},
              {name: '去哪儿', id: 6, icon: 'android-subway', msgCount: 9, isCategory: false, apps: []},
              {name: '支付宝', id: 7, icon: 'android-bicycle', msgCount: 9, isCategory: false, apps: []},
              {name: '天猫', id: 8, icon: 'android-upload', msgCount: 9, isCategory: false, apps: []}
            ]
          },
          {name: 'QQ', id: 1, icon: 'xbox', msgCount: 10, isCategory: false, apps: []},
          {name: '淘宝', id: 2, icon: 'headphone', msgCount: 9, isCategory: false, apps: []},
          {name: '陌陌', id: 3, icon: 'social-chrome', msgCount: 8, isCategory: false, apps: []},
          {name: '58同城', id: 4, icon: 'social-octocat', msgCount: 1, isCategory: false, apps: []},
          {name: '京东', id: 9, icon: 'ios-flower', msgCount: 9, isCategory: false, apps: []},
          {name: '唯品会', id: 10, icon: 'ios-flame', msgCount: 11, isCategory: false, apps: []},
          {
            name: '社交网络',
            id: 11,
            icon: '',
            msgCount: 999,
            isCategory: true,
            apps: [
              {name: '携程', id: 5, icon: 'social-github', msgCount: 9, isCategory: false, apps: []},
              {name: '去哪儿', id: 6, icon: 'social-twitter', msgCount: 9, isCategory: false, apps: []},
              {name: '支付宝', id: 7, icon: 'social-linkedin-outline', msgCount: 9, isCategory: false, apps: []},
              {name: '天猫', id: 8, icon: 'disc', msgCount: 9, isCategory: false, apps: []}
            ]
          },
          {name: '唯品会', id: 13, icon: 'videocamera', msgCount: 11, isCategory: false, apps: []},
          {
            name: '美颜',
            id: 14,
            icon: '',
            msgCount: 999,
            isCategory: true,
            apps: [
              {name: '携程', id: 5, icon: 'android-camera', msgCount: 9, isCategory: false, apps: []},
              {name: '去哪儿', id: 6, icon: 'android-image', msgCount: 9, isCategory: false, apps: []},
              {name: '支付宝', id: 7, icon: 'android-print', msgCount: 9, isCategory: false, apps: []},
              {name: '天猫', id: 8, icon: 'social-instagram', msgCount: 9, isCategory: false, apps: []}
            ]
          }
        ],
        isDragging: false,
        delayedDragging: false
      }
    }
  }

</script>
