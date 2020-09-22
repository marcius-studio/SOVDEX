import Koa from 'koa'
import cors from '@koa/cors'
import router from './modules/router'

const app = new Koa()

import './config'
import './modules/db'
import './modules/cron'

app.use(cors())
app.use(router.routes()).use(router.allowedMethods())

app.listen(3000, (err) => {
  if (err) throw err
  console.log('Server ready at http://localhost:3000')
})

console.log('Process', process.env.NODE_ENV || 'development')