<template>
  <div class="m-user">
    <template v-if="user">
      欢迎您,<span class="username">{{user}}</span>
      [<nuxt-link to='/exit'>退出</nuxt-link>]
    </template>
    <template v-else>
      <nuxt-link to='/login' class="login">立即登陆</nuxt-link>
      <nuxt-link to='/register' class="regiser">注册</nuxt-link>
    </template>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      user: ''
    }
  },
  async mounted() {
    const {status, data: {user}} = await axios.get('/users/getUser')
    if(status === 200){
      this.user = user
    }else{
      console.log(status,user)      
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
