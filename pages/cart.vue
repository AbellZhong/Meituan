<template>
  <div class="page-cart">
    <el-row>
      <el-col v-if="cart.length" :span="24" class="m-cart">
        <List :cart-data="cart"></List>
        <p>
          应付金额:<em class="money">¥{{total}}</em>
        </p>
        <div class="post">
          <el-button type="primary" @click="handleClick">提交订单</el-button>
        </div>
      </el-col>
      <el-col v-else :span="24" class="empty">购物车为空</el-col>
    </el-row>
  </div>
</template>

<script>
import List from '@/components/cart/list'
export default {
  data(){
    return{
      cart: []
    }
  },
  components: {
    List
  },
  computed: {
    total(){
      let total = 0
      this.cart.forEach(item => {
        total += item.price * item.count
      })
      return total
    }
  },
  methods: {
    handleClick: function(){
      window.location.href = '/order'
    }
  },
  async asyncData(ctx){
    let {status, data: {code, data: {name, price}}} = await ctx.$axios.post('/cart/getCart',{
        id: ctx.query.id
    })
    if(status === 200 && code === 0 && name ){ 
      return{
        cart: [{
          name,
          price,
          count: 1,
        }],
          cartNo: ctx.query.id
      }
    }
  }
}
</script>

<style lang="scss">
@import '@/assets/css/cart/index.scss';
</style>
