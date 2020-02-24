<template>
  <el-container class="layout-default">
    <el-header height="194px">
      <MyHeader></MyHeader>
    </el-header>
    <el-main>
      <nuxt></nuxt>
    </el-main>
    <el-footer>
      <MyFooter></MyFooter>
    </el-footer>
  </el-container>
</template>

<script>
import MyHeader from '@/components/public/header/index'
import MyFooter from '@/components/public/footer/index'
export default {
  components: {
    MyHeader,MyFooter
  }
}
</script>

<style lang="scss" scoped>

</style>
