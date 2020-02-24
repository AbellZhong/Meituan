import Router from 'koa-router'
import axios from './utils/axios'
import CartSchema from '../dbs/models/cart'
import OrderShema from '../dbs/models/order'
import md5 from 'crypto-js/md5'
let router = new Router({
    prefix: '/order'
})

router.post('/createOrder', async (ctx, next) => {
    let { id, price, count } = ctx.request.body
    let time = Date()
    let orderID = md5(Math.random() * 1000 + time).toString()
    if (!ctx.isAuthenticated()) {
        ctx.body = {
            code: -1,
            msg: '请先登录'
        }
    } else {
        let findCart = await CartSchema.findOne({
            cartNo: id
        })
        let order = new OrderShema({
            id: orderID,
            count,
            total: price * count,
            time,
            user: ctx.session.passport.user,
            name: findCart.detail[0].name,
            imgs: findCart.detail[0].imgs,
            status: 0
        })
        try {
            let result = await order.save()
            if (result) {
                await findCart.remove()
                ctx.body = {
                    code: 0,
                    id: orderID
                }
            } else {
                ctx.body = {
                    code: -1,
                    msg: '失败'
                }
            }
        } catch (e) {
            console.log(22)
            ctx.body = {
                code: -1,
                msg: '失败'
            }
        }
    }
})

router.get('/getOrders', async (ctx, next) => {
    if (!ctx.isAuthenticated()) {
        ctx.body = {
            code: -1,
            msg: '请先登录哦亲',
            list: []
        }
    } else {
        try {
            let result = await OrderShema.find()
            if (result) {
                ctx.body = {
                    code: 0,
                    list: result
                }
            } else {
                ctx.body = {
                    code: -1,
                    list: []
                }
            }
        } catch (e) {
            console.log(11)
            ctx.body = {
                code: -1,
                list: []
            }
        }
    }
})
export default router