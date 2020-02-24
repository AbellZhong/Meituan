<template>
  <div class="exit"></div>
</template>

<script>
import axios from 'axios'
export default {
  layout: 'blank',
  middleware: async (ctx) => {
    let {status, data} =await axios.get('/users/exit')
    if(status === 200 && data.code === 0){
      window.location.href = '/'
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
