const { ApolloServer } = require('apollo-server-express')
const { makeExecutableSchema } = require('graphql-tools')
const { typeDefs, resolvers } = require('./graphql')
const jwt = require('jsonwebtoken')
const isProd = process.env.NODE_ENV === 'production'
const models = require('../../db/mysqldb')
/**
 * 中间件
 * 1 自定义context 可以传入ctx对象
 * 2 增加resolve执行的信息
 * 3 自定义日志输出
 * 4 错误处理统一处理
 * @param app
 */
function graphql (app) {
  const server = new ApolloServer({
    // 启用和禁用架构自省。默认情况下在生产中禁用
    introspection: !isProd,
    playground: !isProd,
    // 启用或禁用开发模式助手
    debug: !isProd,
    // 一个可执行的Graphql架构,它将覆盖提供的typeDefs和解析器
    // 如果您正在使用文件上传，则必须将 Upload 标量添加到模式中，因为在手动设置模式的情况下，不会自动添加 Upload 标量。
    // 通过 makeExecutableSchema 从Graphql模式语言创建 GraphqlSchema实例s
    schema: makeExecutableSchema({
      typeDefs,
      resolvers
    }),
    // rootValue

    // mocks <Object> | <Boolean>

    // 共享上下文
    // express
    // express.Request
    // express.Response
    context: async ({ req, res }) => {
      // console.log(req.body.query.indexOf('mutation{'));
      // 如果header中，包含access token，那么判断是否有效，无效则拒绝请求
      let user = null
      let islogin = false
      let token =
        req.body.accessToken ||
        req.query.accessToken ||
        req.headers['access-token'] ||
        req.cookies.accessToken
      // 存在token，解析token

      if (token) {
        await jwt.verify(token, 'client', async (err, decoded) => {
          if (err) {
            islogin = false
            user = {}
          } else {
            // SELECT * FROM user WHERE uid = decoded.id limit 0 1;
            let userInfo = await models.user.findOne({
              where: { uid: decoded.uid }
            })
            if (userInfo) {
              islogin = true
              user = userInfo
            } else {
              islogin = false
              user = {}
            }
          }
        })
      }
      // 获取客户端请求ip
      let ip
      if (req.headers['x-forwarded-for']) {
        ip = req.headers['x-forwarded-for'].toString().split(',')[0]
      } else {
        ip = req.connection.remoteAddress
      }

      return {
        token,
        user,
        islogin,
        ip,
        req,
        res
      }
    },
    // 该函数来格式化从服务器返回的错误或相应,以及graphql执行(runQuery)的参数
    formatError: error => ({
      code: error.extensions.code,
      message: error.message
    })
  })

  // 将apolloServer连接到一个特定的HTTP框架, 如 express, koa
  // app 服务器集成实例
  // path 指定自定义路径,如果没有指定路径, 默认为 /graphql
  server.applyMiddleware({ app, path: '/graphql' })
}

module.exports = graphql
