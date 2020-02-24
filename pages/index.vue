<template>
  <div class="page-index">
    <el-row>
      <el-col :span="5">
        <Emenu></Emenu>
      </el-col>
      <el-col :span="19">
        <Life></Life>
      </el-col>
    </el-row>
    <el-row :span='24'>
      <Artistic></Artistic>
    </el-row>
  </div>
</template>

<script>
import Emenu from '@/components/index/menu'
import Life from '@/components/index/life'
import Artistic from '@/components/index/artistic'
export default {
  components: {
    Emenu,Life,Artistic
  }
}
</script>

<style lang='scss'>
@import '@/assets/css/index/index.scss';
</style>
