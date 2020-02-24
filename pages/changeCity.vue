<template>
  <div class="page-changeCity">
    <el-row>
      <el-col :span="24">
        <iSelect></iSelect>
      </el-col>
    </el-row>
    <el-row>
        <el-col :span="24">
          <Hot></Hot>
        </el-col>
    </el-row>
    <el-row>
        <el-col :span="24">
          <cateGroy></cateGroy>
        </el-col>
    </el-row>
  </div>
</template>

<script>
import axios from 'axios'
import iSelect from '@/components/changeCity/iselect'
import Hot from '@/components/changeCity/hot'
import cateGroy from '@/components/changeCity/cateGroy'
export default {
  components: {
    iSelect,Hot,cateGroy
  }
}
</script>

<style lang="scss" scoped>

</style>
