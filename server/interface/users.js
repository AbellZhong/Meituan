import Router from 'koa-router'
import Redis from 'koa-redis'
import nodeMailer from 'nodemailer'
import User from '../dbs/models/users'
import Passport from './utils/passport'
import Email from '../dbs/config'
import axios from './utils/axios'

let router = new Router({
  prefix:'/users'
})

let Store = new Redis().client

router.post('/signup', async (ctx) => {
  const {username, password, email, code} = ctx.request.body;

  if (code) {
    const saveCode = await Store.hget(`nodemail:${username}`, 'code')
    const saveExpire = await Store.hget(`nodemail:${username}`, 'expire')
    if (code === saveCode) {
      if (new Date().getTime() - saveExpire > 0) {
        ctx.body = {
          code: -1,
          msg: '验证码已过期，请重新尝试'
        }
        return false
      }
    } else {
      ctx.body = {
        code: -1,
        msg: '请填写正确的验证码'
      }
    }
  } else {
    ctx.body = {
      code: -1,
      msg: '请填写验证码'
    }
  }
  let user = await User.find({username})
  if (user.length) {
    ctx.body = {
      code: -1,
      msg: '已被注册'
    }
    return
  }
  let nuser = await User.create({username, password, email})
  if (nuser) {
    let res = await axios.post('/users/signin', {username, password})
    if (res.data && res.data.code === 0) {
      ctx.body = {
        code: 0,
        msg: '注册成功',
        user: res.data.user
      }
    } else {
      ctx.body = {
        code: -1,
        msg: 'error'
      }
    }
  } else {
    ctx.body = {
      code: -1,
      msg: '注册失败'
    }
  }
})

router.post('/signin', async (ctx, next) => {
  return Passport.authenticate('local', function(err, user, info, status) {
    if (err) {
      ctx.body = {
        code: -1,
        msg: err
      }
    } else {
      if (user) {
        ctx.body = {
          code: 0,
          msg: '登录成功',
          user
        }
        return ctx.login(user)
      } else {
        ctx.body = {
          code: 1,
          msg: info
        }
      }
    }
  })(ctx, next)
})

router.post('/verify',async (ctx,next) => {
  let {username} = ctx.request.body
  console.log (username)
  const saveExpire = await Store.hget(`nodemail:${username}`,'expire')
  if(saveExpire && new Date().getTime() - saveExpire < 0){
    console.log('1')
    ctx.body = {
      code: -1,
      msg: '你请求你妈呢,一分钟内一次就够了,服务器顶不住啊'
    }
    return false
  }
  let transport = nodeMailer.createTransport({
    host: Email.smtp.host,
    port: 587,
    secure: false,
    auth: {
      user: Email.smtp.user,
      pass: Email.smtp.pass
    }
  })

  let ko = {
    code: Email.smtp.code(),
    expire: Email.smtp.expire(),
    email: ctx.request.body.email,
    user: ctx.request.body.username
  }

  let mailOptions = {
    from: `'黑工程学生app验证邮件',<${Email.smtp.user}>`,
    to: ko.email,
    subject: '<Abell个人美团全栈项目>注册码',
    html: `收到了您的验证请求，你的邀请码为${ko.code}`
  }

  await transport.sendMail(mailOptions, (err,info) => {
    if(err){
      return console.log('err')
    }else{
      Store.hmset(`nodemail:${ko.user}`,'code',ko.code,'expire',ko.expire,'email',ko.email)
    }
  })

  ctx.body = {
    code: 0,
    msg: '验证码已发送,有效时期一分钟,请到邮箱中查看'
  }
})

router.get('/exit',async (ctx,next) => {
  await ctx.logout()
  if(!ctx.isAuthenticated()){
    ctx.body = {
      code: 0,
      msg: '退出成功'
    }
  }else{
    ctx.body = {
      code: -1,
      msg: '退出失败'
    }
  }
})

router.get('/getUser',async (ctx,next) => {
  if(ctx.isAuthenticated()){
    const {username, email} = ctx.session.passport.user
    ctx.body = {
      user:username,
      email
    }
  }else{
    ctx.body = {
      user: '',
      email: ''
    }
  }
})

export default router