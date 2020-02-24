import Router from 'koa-router'
import axios from './utils/axios'
import CategroySchema from '../dbs/models/categroy'
let router = new Router({
    prefix:'/categroy'
})

router.get('/crumbs', async (ctx,next) => {
  let {status, data: {areas, types}} = await axios.get(`http://cp-tools.cn/categroy/crumbs`,{
    params: {
      city: ctx.query.city.replace('市','') || '杭州'
    }
  })
  ctx.body = {
    areas: status === 200 ? areas : [],
    types: status === 200 ? types : []
  }
//   let result = await CategroySchema.findOne({city: ctx.query.city.replace('市', '') || '北京'})
//   if (result) {
//     ctx.body = {
//       areas: result.areas,
//       types: result.types
//     }
//   } else {
//     ctx.body = {
//       areas: [],
//       types: []
//     }
//   }
})


export default router