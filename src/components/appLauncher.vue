<style>
  .app-launcher{
    text-align: center;
  }
  .name{
    display: block;
    margin-top: 5px;
  }
</style>
<template>
  <div class="app-launcher">
    <badge :count="msgCount">
      <icon :type="icon" size="100"></icon>
    </badge>
    <br>
    <span class="name">{{name}}</span>
  </div>
</template>

<script type="text/ecmascript-6">
  import iview from 'iview'

  export default {
    name: 'appLauncher',
    props: ['name', 'icon', 'msgCount'],
    components: {
      iview
    }
  }
</script>
