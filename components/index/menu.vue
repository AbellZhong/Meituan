<template>
  <div class="m-menu">
    <dl class="nav"  @mouseleave="handleMouseLeave" >
      <dt>全部分类</dt>
      <dd v-for="(item,index) in $store.state.home.menu" :key='index' @mouseenter="handleMouseEnter">
        <i :class="item.type"></i>{{item.name}}<span class="arrow"></span>
      </dd>
    </dl>
    <div class="detail" v-if="kind" @mouseenter="sover" @mouseleave="sout">
      <template v-for="(item,index) in curdetail.child" >
        <h4 :key="index">{{item.title}}</h4>
        <span v-for="v in item.child" :key="v">{{v}}</span>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      kind: ''
    }
  },
  computed: {
    curdetail() {
      return this.$store.state.home.menu.filter(item => item.type === this.kind)[0]
    }
  },
  methods: {
    handleMouseLeave() {
      this._timer = setTimeout(() => {
        this.kind =''
      }, 150)
    },
    handleMouseEnter(e) {
      this.kind = e.target.querySelector('i').className
    },
    sover() {
      clearTimeout(this._timer)
    },
    sout() {
      this.kind = ''
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
