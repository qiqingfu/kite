const models = require('../../../../../db/mysqldb/index')
const {
  checkEmail,
  checkPhoneNum,
  checkUrl,
  checkPwd
} = require('../../../utils/validators')
import moment from 'moment'
const { resClientJson } = require('../../../utils/resData')
const { sendVerifyCodeMail } = require('../../../utils/sendEmail')
const { random_number, tools } = require('../../../utils/index')
const config = require('../../../../../config')
const Op = require('sequelize').Op
const tokens = require('../../../utils/tokens')
const xss = require('xss')
const lowdb = require('../../../../../db/lowdb/index')
const clientWhere = require('../../../utils/clientWhere')
import {
  statusList,
  userMessageAction,
  userMessageActionText,
  modelAction,
  virtualInfo,
  virtualPlusLess,
  modelName,
  modelInfo
} from '../../../utils/constant'

const modelNameNum = Object.values(modelName)
import userVirtual from '../../../common/userVirtual'

class User {
  static async userSignIn(req: any, res: any, next: any) {
    const { no_login } = lowdb
      .read()
      .get('config')
      .value()

    let reqDate = req.body

    try {
      if (!reqDate.email) {
        throw new Error('请输入账户')
      }
      if (!reqDate.password) {
        throw new Error('请输入密码')
      }
      if (no_login === 'no') {
        throw new Error('登录功能关闭，请联系管理员开启')
      }

      if (reqDate.email) {
        /* 邮箱登录 */

        let oneUser = await models.user.findOne({
          where: {
            email: reqDate.email
          }
        })

        if (!oneUser) {
          throw new Error('账户不存在')
        }

        if (!oneUser.enable) {
          throw new Error('当前用户已被限制登录，请联系管理员修改')
        }

        if (oneUser) {
          if (
            tools.encrypt(reqDate.password, config.ENCRYPT_KEY) ===
            oneUser.dataValues.password
          ) {
            let token = tokens.ClientSetToken(60 * 60 * 24 * 7, {
              uid: oneUser.uid
            })

            let ip: any = ''
            if (req.headers['x-forwarded-for']) {
              ip = req.headers['x-forwarded-for'].toString().split(',')[0]
            } else {
              ip = req.connection.remoteAddress
            }
            const NowDate = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')

            await models.user.update(
              {
                last_sign_date: new Date(NowDate),
                last_sign_ip: ip || ''
              },
              {
                where: {
                  uid: oneUser.uid // 查询条件
                }
              }
            )

            await resClientJson(res, {
              state: 'success',
              message: '登录成功',
              data: {
                token
              }
            })
          } else {
            resClientJson(res, {
              state: 'error',
              message: '密码错误'
            })
          }
        } else {
          resClientJson(res, {
            state: 'error',
            message: '账户不存在'
          })
        }
      } else if (reqDate.phone) {
        /* 手机号码登录 */

        resClientJson(res, {
          state: 'error',
          message: '暂时未开放手机号码登录'
        })
      } else {
        /* 非手机号码非邮箱 */
        resClientJson(res, {
          state: 'error',
          message: '请输入正确的手机号码或者邮箱'
        })
      }
    } catch (err) {
      resClientJson(res, {
        state: 'error',
        message: '错误信息：' + err.message
      })
      return false
    }
  }

  // 注册验证码发送
  static async userSignUpCode(req: any, res: any, next: any) {
    let reqData = req.body
    try {
      const { on_register } = lowdb
        .read()
        .get('config')
        .value()
      if (reqData.email) {
        /* 邮箱注册验证码 */

        let oneUser = await models.user.findOne({
          where: {
            email: reqData.email
          }
        })
        if (on_register === 'no') {
          throw new Error('注册功能关闭，请联系管理员开启')
        }
        if (reqData.email) {
          if (!checkEmail(reqData.email)) {
            throw new Error('请输入正确的邮箱地址')
          }
        }
        if (reqData.phone) {
          if (!checkPhoneNum(reqData.phone)) {
            throw new Error('请输入正确的手机号码')
          }
        }

        if (!oneUser) {
          let random = random_number(true, 6, 6)
          await models.verify_code.create({
            email: reqData.email,
            verify_code: random,
            type: 'register'
          })
          await sendVerifyCodeMail(reqData.email, '注册验证码', random)
          resClientJson(res, {
            state: 'success',
            message: '验证码已发送到邮箱'
          })
        } else {
          resClientJson(res, {
            state: 'error',
            message: '邮箱已存在'
          })
        }
      } else if (reqData.phone) {
        /* 手机号码注册 */
        resClientJson(res, {
          state: 'error',
          message: '暂时未开放手机号码注册'
        })
      } else {
        /* 非手机号码非邮箱 */
        resClientJson(res, {
          state: 'error',
          message: '请输入正确的手机号码或者邮箱'
        })
      }
    } catch (err) {
      resClientJson(res, {
        state: 'error',
        message: '错误信息：' + err.message
      })
      return false
    }
  }

  /**
   * 用户注册post
   * @param   {object} ctx 上下文对象
   */
  static async userSignUp(req: any, res: any, next: any) {
    // post 数据
    let reqData = req.body
    let date = new Date()
    try {
      const { on_register } = lowdb
        .read()
        .get('config')
        .value()
      if (on_register === 'no') {
        throw new Error('注册功能关闭，请联系管理员开启')
      }
      if (!reqData.nickname) {
        throw new Error('昵称不存在')
      }
      if (reqData.nickname.length > 20) {
        throw new Error('昵称过长')
      }

      let testNickname = /^[\u4E00-\u9FA5A-Za-z0-9]+$/

      if (!testNickname.test(reqData.nickname)) {
        throw new Error('用户名只能中文、字母和数字,不能包含特殊字符')
      }
      if (reqData.email) {
        if (!checkEmail(reqData.email)) {
          throw new Error('请输入正确的邮箱地址')
        }
      }
      if (reqData.phone) {
        if (!checkPhoneNum(reqData.phone)) {
          throw new Error('请输入正确的手机号码')
        }
      }
      if (!reqData.password) {
        throw new Error('密码不存在')
      }
      if (!checkPwd(reqData.password)) {
        throw new Error(
          '密码格式输入有误，请输入字母与数字的组合,长度为最小为6个字符!'
        )
      }
      if (reqData.password !== reqData.double_password) {
        throw new Error('两次输入密码不一致')
      }
      if (!reqData.code) {
        throw new Error('验证码不存在')
      }

      if (reqData.email) {
        /* 邮箱注册 */

        let oneUserNickname = await models.user.findOne({
          where: {
            nickname: reqData.nickname
          }
        })

        if (oneUserNickname) {
          resClientJson(res, {
            state: 'error',
            message: '用户昵称已存在，请重新输入'
          })
          return false
        }

        let oneUserEmail = await models.user.findOne({
          where: {
            email: reqData.email
          }
        })

        if (!oneUserEmail) {
          await models.verify_code
            .findOne({
              where: {
                email: reqData.email
              },
              limit: 1,
              order: [['id', 'DESC']]
            })
            .then((data: { verify_code: any; create_timestamp: any }) => {
              /* 注册验证码验证 */
              if (data) {
                let time_num = moment(date.setHours(date.getHours())).format(
                  'X'
                )
                if (reqData.code === data.verify_code) {
                  if (
                    Number(time_num) - Number(data.create_timestamp) >
                    30 * 60
                  ) {
                    throw new Error('验证码已过时，请再次发送')
                  }
                } else {
                  throw new Error('验证码错误')
                }
              } else {
                throw new Error('请发送验证码')
              }
            })

          let ip: any = ''
          if (req.headers['x-forwarded-for']) {
            ip = req.headers['x-forwarded-for'].toString().split(',')[0]
          } else {
            ip = req.connection.remoteAddress
          }

          await models.sequelize.transaction((t: any) => {
            // 在事务中执行操作
            return models.user
              .create(
                {
                  /* 注册写入数据库操作 */
                  avatar: config.default_avatar,
                  nickname: xss(reqData.nickname),
                  password: tools.encrypt(reqData.password, config.ENCRYPT_KEY),
                  email: reqData.email,
                  user_role_ids: config.USER_ROLE.dfId,
                  sex: 0,
                  reg_ip: ip,
                  enable: true
                },
                { transaction: t }
              )
              .then((user: any) => {
                return models.user_info.create(
                  {
                    /* 注册写入数据库操作 */
                    uid: user.uid,
                    avatar_review_status: 2,
                    shell_balance:
                      virtualInfo[modelAction.registered][modelName.system]
                  },
                  { transaction: t }
                )
              })
              .then((user_info: any) => {
                return models.virtual.create({
                  // 用户虚拟币消息记录
                  plus_less: virtualInfo[modelAction.registered].plusLess,
                  balance:
                    virtualInfo[modelAction.registered][modelName.system],
                  amount: virtualInfo[modelAction.registered][modelName.system],
                  income: virtualInfo[modelAction.registered][modelName.system],
                  expenses: 0,
                  uid: user_info.uid,
                  type: modelName.system,
                  action: modelAction.registered
                })
              })
          })

          resClientJson(res, {
            state: 'success',
            message: '注册成功，跳往登录页'
          })
        } else {
          throw new Error('邮箱已存在')
        }
      } else if (reqData.phone) {
        /* 手机号码注册 */
        throw new Error('暂时未开放手机号码注册')
      } else {
        /* 非手机号码非邮箱 */
        throw new Error('请输入正确的手机号码或者邮箱')
      }
    } catch (err) {
      resClientJson(res, {
        state: 'error',
        message: '错误信息：' + err.message
      })
      return false
    }
  }

  /**
   * 获取个人信息get 并且知道用户是否登录，不需要任何参数
   */
  static async userPersonalInfo(req: any, res: any, next: any) {
    let { islogin = '', user = '' } = req
    try {
      if (!islogin) {
        await resClientJson(res, {
          state: 'success',
          message: '获取成功',
          data: {
            islogin: false,
            user: {}
          }
        })
      }
      let oneUser = await models.user.findOne({
        where: { uid: user.uid },
        attributes: [
          'uid',
          'avatar',
          'nickname',
          'sex',
          'introduction',
          'user_role_ids'
        ]
      })

      let oneUserInfo = await models.user_info.findOne({
        where: { uid: user.uid }
      })

      let bindType = []
      let oneUserAuth = await models.user_auth.findAll({
        where: { uid: user.uid }
      })

      for (let i in oneUserAuth) {
        bindType.push(oneUserAuth[i].identity_type)
      }

      await resClientJson(res, {
        state: 'success',
        message: '获取成功',
        data: {
          islogin,
          user: oneUser,
          user_info: oneUserInfo,
          bindType
        }
      })
    } catch (err) {
      resClientJson(res, {
        state: 'error',
        message: '错误信息：' + err.message
      })
      return false
    }
  }

  /**
   * 获取用户信息get 不需要登录
   * @param   {object} ctx 上下文对象
   */
  static async getUserInfo(req: any, res: any, next: any) {
    let uid = req.query.uid

    try {
      if (!uid) {
        throw new Error('uid为空')
      }

      let oneUser = await models.user.findOne({
        // 获取用户信息
        where: { uid },
        attributes: [
          'uid',
          'avatar',
          'nickname',
          'sex',
          'introduction',
          'user_role_ids'
        ]
      })

      let oneUserInfo = await models.user_info.findOne({
        // 获取用户信息
        where: { uid }
      })

      oneUser.setDataValue(
        // 我关注了哪些用户的信息
        'attentionUserIds',
        await models.attention.findAll({
          where: { uid: oneUser.uid, is_associate: true, type: modelName.user }
        })
      )

      oneUser.setDataValue(
        // 哪些用户关注了我
        'userAttentionIds',
        await models.attention.findAll({
          where: {
            associate_id: oneUser.uid,
            is_associate: true,
            type: modelName.user
          }
        })
      )

      let userAttentionCount = await models.attention.count({
        // 关注了多少人
        where: {
          uid,
          is_associate: true,
          type: modelName.user
        }
      })

      let allLikeDynaicId = await models.thumb
        .findAll({
          where: { uid, type: modelName.dynamic, is_associate: true }
        })
        .then((res: any) => {
          return res.map((item: any, key: any) => {
            return item.associate_id
          })
        })

      let allRssDynamicTopicId = await models.attention
        .findAll({
          where: { uid, type: modelName.dynamic_topic, is_associate: true }
        })
        .then((res: any) => {
          return res.map((item: any, key: any) => {
            return item.associate_id
          })
        })

      let otherUserAttentionCount = await models.attention.count({
        // 多少人关注了
        where: {
          associate_id: uid,
          is_associate: true,
          type: modelName.user
        }
      })

      let articleCount = await models.article.count({
        // 他有多少文章
        where: {
          uid,
          ...clientWhere.article.me
        }
      })

      let dynamicCount = await models.dynamic.count({
        // 他有多少文章
        where: {
          uid,
          ...clientWhere.dynamic.myQuery
        }
      })

      resClientJson(res, {
        state: 'success',
        message: '获取用户所有信息成功',
        data: {
          user: oneUser,
          user_info: oneUserInfo,
          otherUserAttentionCount: otherUserAttentionCount,
          userAttentionCount: userAttentionCount,
          userArticleCount: articleCount,
          dynamicCount,
          allLikeDynaicId,
          allRssDynamicTopicId
        }
      })
    } catch (err) {
      resClientJson(res, {
        state: 'error',
        message: '错误信息：' + err.message
      })
      return false
    }
  }

  /**
   * 修改用户信息post
   * @param   {object} ctx 上下文对象
   */

  static async updateUserInfo(req: any, res: any, next: any) {
    let reqData = req.body
    let { user = '' } = req
    let oneUser = await models.user.findOne({
      where: {
        nickname: reqData.nickname,
        uid: {
          [Op.ne]: user.uid
        }
      }
    })

    try {
      if (reqData.nickname && reqData.nickname.length > 20) {
        throw new Error('昵称过长')
      }

      let testNickname = /^[\u4E00-\u9FA5A-Za-z0-9]+$/

      if (!testNickname.test(reqData.nickname)) {
        throw new Error('用户名只能中文、字母和数字,不能包含特殊字符')
      }

      if (oneUser) {
        throw new Error('用户昵称已存在，请重新输入')
      }

      if (reqData.introduction && reqData.introduction.length > 50) {
        throw new Error('个人介绍过长')
      }

      if (reqData.profession && reqData.profession.length > 20) {
        throw new Error('职位名输入过长')
      }

      if (reqData.company && reqData.company.length > 20) {
        throw new Error('公司名字输入过长')
      }

      if (reqData.home_page && !checkUrl(reqData.home_page)) {
        throw new Error('请输入正确的个人网址')
      }

      const NowDate = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')

      await models.user.update(
        {
          sex: reqData.sex || 0,
          nickname: reqData.nickname || '',
          introduction: reqData.introduction || '',
          update_date: new Date(NowDate),
          update_date_timestamp: moment(
            new Date().setHours(new Date().getHours())
          ).format('X')
        },
        {
          where: {
            uid: user.uid // 查询条件
          }
        }
      )

      await models.user_info.update(
        {
          profession: reqData.profession || '',
          company: reqData.company || '',
          home_page: reqData.home_page || '',
          is_msg_push: reqData.is_msg_push
        },
        {
          where: {
            uid: user.uid // 查询条件
          }
        }
      )

      resClientJson(res, {
        state: 'success',
        message: '修改用户信息成功'
      })
    } catch (err) {
      resClientJson(res, {
        state: 'error',
        message: '错误信息：' + err.message
      })
      return false
    }
  }

  /**
   * 修改用户密码
   * @param   {object} ctx 上下文对象
   */

  static async updateUserPassword(req: any, res: any, next: any) {
    let reqData = req.body
    let { user = '' } = req
    try {
      let oneUser = await models.user.findOne({
        where: {
          uid: user.uid
        }
      })

      if (
        tools.encrypt(reqData.old_password, config.ENCRYPT_KEY) ===
        oneUser.password
      ) {
        if (!reqData.old_password) {
          throw new Error('请输入旧密码')
        }

        if (!reqData.new_password) {
          throw new Error('请输入新密码')
        }

        if (!checkPwd(reqData.new_password)) {
          throw new Error('密码格式输入有误!')
        }

        if (!reqData.repeat_new_password) {
          throw new Error('请重复输入新密码')
        }

        if (reqData.repeat_new_password !== reqData.new_password) {
          throw new Error('两次输入密码不相同')
        }

        await models.user.update(
          {
            password: tools.encrypt(reqData.new_password, config.ENCRYPT_KEY)
          },
          {
            where: {
              uid: user.uid // 查询条件
            }
          }
        )
        resClientJson(res, {
          state: 'success',
          message: '修改用户密码成功'
        })
      } else {
        resClientJson(res, {
          state: 'error',
          message: '旧密码错误，请重新输入'
        })
      }
    } catch (err) {
      resClientJson(res, {
        state: 'error',
        message: '错误信息：' + err.message
      })
      return false
    }
  }

  /**
   * 获取用户消息
   * @param   {object} ctx 上下文对象
   */
  static async getUserMessageList(req: any, res: any, next: any) {
    let page = req.query.page || 1
    let pageSize = Number(req.query.pageSize) || 10
    let { user = '' } = req
    try {
      let allUserMessage = await models.user_message.findAll({
        // 获取所有未读消息id
        where: {
          is_read: false,
          uid: user.uid
        }
      })

      let { count, rows } = await models.user_message.findAndCountAll({
        where: {
          uid: user.uid
        }, // 为空，获取全部，也可以自己添加条件
        offset: (page - 1) * pageSize, // 开始的数据索引，比如当page=2 时offset=10 ，而pagesize我们定义为10，则现在为索引为10，也就是从第11条开始返回数据条目
        limit: pageSize, // 每页限制返回的数据条数
        order: [['create_timestamp', 'desc']]
      })

      for (let i in rows) {
        rows[i].setDataValue(
          'create_dt',
          await moment(rows[i].create_date).format('YYYY-MM-DD')
        )
        rows[i].setDataValue(
          'sender',
          await models.user.findOne({
            where: { uid: rows[i].sender_id },
            attributes: ['uid', 'avatar', 'nickname']
          })
        )
        rows[i].setDataValue(
          'actionText',
          userMessageActionText[rows[i].action]
        )

        if (
          rows[i].content &&
          rows[i].type !== modelName.user &&
          ~modelNameNum.indexOf(rows[i].type)
        ) {
          // 排除关注用户
          rows[i].setDataValue(
            modelInfo[rows[i].type].model,
            await models[modelInfo[rows[i].type].model].findOne({
              where: { [modelInfo[rows[i].type].idKey]: rows[i].content }
            })
          )
        }
      }

      if (allUserMessage.length > 0) {
        // 修改未读为已读
        await models.user_message.update(
          {
            is_read: true
          },
          {
            where: {
              is_read: false,
              uid: user.uid
            }
          }
        )
      }

      await resClientJson(res, {
        state: 'success',
        message: '数据返回成功',
        data: {
          count,
          list: rows,
          page,
          pageSize
        }
      })
    } catch (err) {
      resClientJson(res, {
        state: 'error',
        message: '错误信息：' + err.message
      })
      return false
    }
  }

  /**
   * 删除用户消息
   * @param   {object} ctx 上下文对象
   */
  static async deleteUserMessage(req: any, res: any, next: any) {
    let reqData = req.query
    let { user = '' } = req
    try {
      let oneUserMessage = await models.user_message.findOne({
        where: {
          id: reqData.user_message_id,
          uid: user.uid
        }
      })
      if (oneUserMessage) {
        await models.user_message.destroy({
          where: {
            id: reqData.user_message_id,
            uid: user.uid
          }
        })
      } else {
        throw new Error('非法操作')
      }
      resClientJson(res, {
        state: 'success',
        message: '删除用户消息成功'
      })
    } catch (err) {
      resClientJson(res, {
        state: 'error',
        message: '错误信息：' + err.message
      })
      return false
    }
  }

  /**
   * 重置密码code发送
   * @param   {object} ctx 上下文对象
   */

  static async sendResetPasswordCode(req: any, res: any, next: any) {
    let reqData = req.body
    try {
      if (reqData.type === 'email') {
        /* 邮箱注册验证码 */

        if (!reqData.email) {
          throw new Error('邮箱不存在')
        }
        if (!checkEmail(reqData.email)) {
          throw new Error('邮箱格式输入有误')
        }

        let email = await models.user.findOne({
          where: {
            email: reqData.email
          }
        })
        if (email) {
          let random = random_number(true, 6, 6)
          await models.verify_code.create({
            email: reqData.email,
            verify_code: random,
            type: 'reset_password'
          })
          sendVerifyCodeMail(reqData.email, '重置密码验证码', random)
          resClientJson(res, {
            state: 'success',
            message: '验证码已发送到邮箱'
          })
        } else {
          resClientJson(res, {
            state: 'error',
            message: '邮箱不存在'
          })
        }
      } else if (reqData.type === 'phone') {
        /* 手机号码 */
        resClientJson(res, {
          state: 'error',
          message: '暂时未开放手机号码修改密码'
        })
      } else {
        /* 非手机号码非邮箱 */
        resClientJson(res, {
          state: 'error',
          message: '请输入正确的手机号码或者邮箱'
        })
      }
    } catch (err) {
      resClientJson(res, {
        state: 'error',
        message: '错误信息：' + err.message
      })
      return false
    }
  }

  /**
   * 重置密码
   * @param   {object} ctx 上下文对象
   */

  static async userResetPassword(req: any, res: any, next: any) {
    let reqData = req.body
    let date = new Date()
    try {
      if (!reqData.email) {
        throw new Error('邮箱不存在')
      }
      if (!checkEmail(reqData.email)) {
        throw new Error('邮箱格式输入有误')
      }
      if (!reqData.code) {
        throw new Error('验证码不存在')
      }
      if (!reqData.new_password) {
        throw new Error('密码不存在')
      }
      if (!checkPwd(reqData.new_password)) {
        throw new Error('密码格式输入有误!')
      }
      if (reqData.new_password !== reqData.repeat_new_password) {
        throw new Error('两次输入密码不一致')
      }

      if (reqData.type === 'email') {
        /* 邮箱注册 */

        let email = await models.user.findOne({
          where: {
            email: reqData.email
          }
        })

        if (email) {
          await models.verify_code
            .findOne({
              where: {
                email: reqData.email
              },
              limit: 1,
              order: [['id', 'DESC']]
            })
            .then((data: { verify_code: any; create_timestamp: any }) => {
              /* 注册验证码验证 */
              if (data) {
                let time_num = moment(date.setHours(date.getHours())).format(
                  'X'
                )
                if (reqData.code === data.verify_code) {
                  if (
                    Number(time_num) - Number(data.create_timestamp) >
                    30 * 60
                  ) {
                    throw new Error('验证码已过时，请再次发送')
                  }
                } else {
                  throw new Error('验证码错误')
                }
              } else {
                throw new Error('请发送验证码')
              }
            })

          await models.user.update(
            {
              password: tools.encrypt(reqData.new_password, config.ENCRYPT_KEY)
            },
            {
              where: {
                email: reqData.email // 查询条件
              }
            }
          )
          resClientJson(res, {
            state: 'success',
            message: '修改用户密码成功'
          })
        } else {
          resClientJson(res, {
            state: 'error',
            message: '邮箱不存在'
          })
        }
      } else if (reqData.type === 'phone') {
        // 手机号码重置密码

        resClientJson(res, {
          state: 'error',
          message: '暂时未开放手机号码重置密码'
        })
      } else {
        /* 非手机号码非邮箱 */
        resClientJson(res, {
          state: 'error',
          message: '请输入正确的手机号码或者邮箱'
        })
      }
    } catch (err) {
      resClientJson(res, {
        state: 'error',
        message: '错误信息：' + err.message
      })
      return false
    }
  }

  /**
   *  获取所有用户角色标签
   * @param   {object} ctx 上下文对象
   */
  static async getUserRoleAll(req: any, res: any, next: any) {
    // get 页面
    try {
      let allUserRole = await models.user_role.findAll({
        where: {
          enable: true,
          is_show: true
        }
      })
      resClientJson(res, {
        state: 'success',
        message: '获取成功',
        data: {
          user_role_all: allUserRole
        }
      })
    } catch (err) {
      resClientJson(res, {
        state: 'error',
        message: '错误信息：' + err.message
      })
      return false
    }
  }

  /**
   *  获取当前登录用户关联的一些信息
   * @param   {object} ctx 上下文对象
   */
  static async getUserAssociateinfo(req: any, res: any, next: any) {
    // get 页面
    try {
      let articleThumdId: any[] = [] // 文章点赞id
      let dynamicThumdId: any[] = [] // 动态点赞id
      let userAttentionId = [] // 用户关注id
      let { user = '', islogin } = req
      if (!islogin) {
        resClientJson(res, {
          state: 'success',
          message: '获取成功',
          data: {
            articleThumdId,
            dynamicThumdId
          }
        })
        return false
      }

      let allThumb = await models.thumb.findAll({
        where: {
          uid: user.uid,
          is_associate: true
        }
      })

      let allAttention = await models.attention.findAll({
        where: {
          uid: user.uid,
          is_associate: true
        }
      })

      for (let i in allThumb) {
        if (allThumb[i].type === modelName.article) {
          articleThumdId.push(allThumb[i].associate_id)
        } else if (allThumb[i].type === modelName.dynamic) {
          dynamicThumdId.push(allThumb[i].associate_id)
        }
      }

      for (let i in allAttention) {
        if (allAttention[i].type === modelName.user) {
          userAttentionId.push(allAttention[i].associate_id)
        }
      }

      resClientJson(res, {
        state: 'success',
        message: '获取成功',
        data: {
          articleThumdId,
          dynamicThumdId,
          userAttentionId
        }
      })
    } catch (err) {
      resClientJson(res, {
        state: 'error',
        message: '错误信息：' + err.message
      })
      return false
    }
  }
}

export default User
