import { Express, Request, Response, NextFunction } from 'express'
const lowdb = require('../../../db/lowdb')
const kiteConfig = require('../../../kite.config')
const internalConfig = require('../../../config')
const API_VERSION = 'v1' // 接口版本
import rateLimit from "express-rate-limit"

const cli = lowdb
  .read()
  .get('cli')
  .value()
const config = lowdb
  .read()
  .get('config')
  .value()


const apiLimiter = rateLimit({
  // [所有请求]限制每个ip，一小时最多1500次请求
  windowMs: 60 * 60 * 1000,
  max: 1500,
  skip: (req: any, res: any) => {
    // 获取客户端请求ip
    let ip;
    if (req.headers['x-forwarded-for']) {
      ip = req.headers['x-forwarded-for'].toString().split(",")[0];
    } else {
      ip = req.connection.remoteAddress;
    }
    return internalConfig.IPWhitelist.indexOf(ip) != -1 ? true : false;
  }
})

// only apply to requests that begin with /api/

export default (app: any) => {
  if (cli.is_success) {
    // 项目未进行初始化时 router 是无法载入需要连接数据库的配置的路由
    const apiClient = require('./apiClient')
    const apiAdmin = require('./apiAdmin')
    const client = require('./client')
    const admin = require('./admin')
    const oauth = require('./oauth')
    app.use("/api-client/", apiLimiter)
    app
      .use(`/api-client/${API_VERSION}`, apiClient)
      .use(`/api-client/${API_VERSION}/oauth`, oauth)
      .use(`/api-admin/${API_VERSION}`, apiAdmin)
      .use(`/${config.admin_url}`, admin)
      .use('/', client)
  } else {
    console.log('项目还未初始化，请初始化后再继续进行当前操作......')
    console.log(
      `运行npm run init 进入初始化，端口号为：${kiteConfig.server.ininProt}`
    )
    app.use('*', async (req: Request, res: Response, next: NextFunction) => {
      res.send(
        `项目还未初始化，请初始化后再进行继续操作,运行npm run init 进入初始化，端口号为：${kiteConfig.server.ininProt}`
      )
    })
  }
}
