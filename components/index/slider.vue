<template>
  <div class="slide">
    <el-carousel height="240px">
      <el-carousel-item v-for="item in list" :key="item.id">
        <img :src="item.imgUrl" alt="">
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [{
        id: 1,
        imgUrl: 'http://p1.meituan.net/codeman/826a5ed09dab49af658c34624d75491861404.jpg'
      }, {
        id: 2,
        imgUrl: 'http://p0.meituan.net/codeman/a97baf515235f4c5a2b1323a741e577185048.jpg'
      }, {
        id: 3,
        imgUrl: 'https://p1.meituan.net/travelcube/01d2ab1efac6e2b7adcfcdf57b8cb5481085686.png'
      }, {
        id: 4,
        imgUrl: 'http://p1.meituan.net/codeman/826a5ed09dab49af658c34624d75491861404.jpg'
      }]
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
