import Router from 'koa-router'
import axios from './utils/axios'
import ProvinceSchema from '../dbs/models/province'
import CitySchema from '../dbs/models/city'
let router = new Router({
    prefix:'/geo'
})

router.get('/getPosition', async (ctx,next) => {
  let {status, data: {province, city}} = await axios.get(`http://cp-tools.cn/geo/getPosition`)
  if(status === 200){
    ctx.body = {
      province,
      city
    }
  }else{
    ctx.body = {
      province: '',
      city: ''
    }
  }
})

router.get('/menu', async (ctx) => {
  let {status, data: {menu}} = await axios.get(`http://cp-tools.cn/geo/menu`)
  if(status === 200){
    ctx.body = {
      menu
    }
  }else{
    ctx.body = {
      menu: []
    }
  }
})

router.get('/province', async (ctx, next) => {
//   let province = await ProvinceSchema.find()
//   ctx.body = {
//     province: province.map(item => {
//       return {
//         id: item.id,
//         name: item.value[0]
//       }
//     })
//   }

//以上代码是用本地数据库的数据进行获取 不全
  let {status, data: {province}} = await axios.get(`http://cp-tools.cn/geo/province`)
  ctx.body = {
    province: status === 200 ? province : []
  }
})

router.get('/province/:id', async (ctx, next) => {
  let city = await CitySchema.findOne({id:ctx.params.id})
  ctx.body = {
    code: 0,
    city: city.value.map(item => {
      return {
        province: item.province,
        id: item.id,
        name: item.name
      }
    })
  }
})

router.get('/city', async(ctx, next) => {
  let city = []
  let result = await CitySchema.find()
  result.forEach(item => {
    city = city.concat(item.value)
  })
  ctx.body = {
    code: 0,
    city: city.map(item => {
      return {
        province: item.province,
        id: item.id,
        name: item.name === '市辖区' || item.name === '省直辖县级行政区划' ? item.province : item.name
      }
    })
  }
})

router.get('/hotCity', async (ctx) => {
  let {status, data: {hots}} = await axios.get(`http://cp-tools.cn/geo/hotCity`)
  ctx.body = {
    hots: status === 200 ? hots : []
  }
})
export default router