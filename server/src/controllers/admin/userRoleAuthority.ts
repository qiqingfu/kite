const models = require('../../../../db/mysqldb/index')
const { resAdminJson } = require('../../utils/resData')
const config = require('../../../../config')
import adminSystemLog from './adminSystemLog'
const Op = require('sequelize').Op

class UserRole {
  /**
   * -----------------------------------权限操作--------------------------------
   * 创建角色
   * @param   {object} ctx 上下文对象
   */
  static async createUserRole(req: any, res: any, next: any) {
    const reqData = req.body

    try {
      let oneUserRole = await models.user_role.findOne({
        where: { user_role_name: reqData.user_role_name }
      })
      if (oneUserRole) {
        throw new Error('用户角色名已存在!')
      }

      await models.user_role.create({
        user_role_name: reqData.user_role_name,
        user_role_description: reqData.user_role_description,
        user_role_icon: reqData.user_role_icon,
        user_role_type: reqData.user_role_type,
        is_show: reqData.is_show,
        enable: reqData.enable
      })
      await adminSystemLog.createAdminSystemLog({
        // 写入日志
        uid: req.userInfo.uid,
        type: 3,
        content: `成功创建了‘${reqData.user_role_name}’用户角色`
      })

      resAdminJson(res, {
        state: 'success',
        message: '角色创建成功'
      })
    } catch (err) {
      resAdminJson(res, {
        state: 'error',
        message: '错误信息：' + err.message
      })
    }
  }

  /**
   * 获取所有角色操作
   * @param   {object} ctx 上下文对象
   */
  static async getUserRoleAll(req: any, res: any, next: any) {
    try {
      let userRoleAll = await models.user_role.findAll({
        attributes: [
          'user_role_id',
          'user_role_name',
          'user_role_type',
          'user_role_description',
          'is_show',
          'user_role_icon',
          'user_authority_ids'
        ],
        where: { enable: 1 } // 为空，获取全部，也可以自己添加条件
      })
      resAdminJson(res, {
        state: 'success',
        message: '返回成功',
        data: {
          user_role_all: userRoleAll
        }
      })
    } catch (err) {
      resAdminJson(res, {
        state: 'error',
        message: '错误信息：' + err.message
      })
    }
  }

  /**
   * 获取角色列表操作
   * @param   {object} ctx 上下文对象
   */
  static async getUserRoleList(req: any, res: any, next: any) {
    const { page = 1, pageSize = 10 } = req.query
    try {
      let { count, rows } = await models.user_role.findAndCountAll({
        attributes: [
          'user_role_id',
          'user_role_name',
          'user_role_description',
          'user_role_icon',
          'user_role_type',
          'is_show',
          'user_authority_ids',
          'enable'
        ],
        where: '', // 为空，获取全部，也可以自己添加条件
        offset: (page - 1) * Number(pageSize), // 开始的数据索引，比如当page=2 时offset=10 ，而pagesize我们定义为10，则现在为索引为10，也就是从第11条开始返回数据条目
        limit: Number(pageSize) // 每页限制返回的数据条数
      })
      resAdminJson(res, {
        state: 'success',
        message: '返回成功',
        data: {
          count: count,
          list: rows
        }
      })
    } catch (err) {
      resAdminJson(res, {
        state: 'error',
        message: '错误信息：' + err.message
      })
    }
  }

  /**
   * 更新角色
   * @param   {object} ctx 上下文对象
   */
  static async updateUserRole(req: any, res: any, next: any) {
    const reqData = req.body
    try {
      await models.user_role.update(
        {
          user_role_name: reqData.user_role_name,
          user_role_description: reqData.user_role_description,
          user_role_icon: reqData.user_role_icon,
          user_role_type: reqData.user_role_type,
          is_show: reqData.is_show,
          enable: reqData.enable
        },
        {
          where: {
            user_role_id: reqData.user_role_id // 查询条件
          }
        }
      )
      resAdminJson(res, {
        state: 'success',
        message: '更新用户角色成功'
      })
    } catch (err) {
      resAdminJson(res, {
        state: 'error',
        message: '错误信息：' + err.message
      })
    }
  }

  /**
   * 删除角色
   */
  static async deleteUserRole(req: any, res: any, next: any) {
    const { user_role_id } = req.body
    try {
      if (config.USER_ROLE.dfId === user_role_id) {
        resAdminJson(res, {
          state: 'error',
          message: '默认用户角色不可删除'
        })
        return false
      }

      if (config.USER_ROLE.dfLegalizeId === user_role_id) {
        resAdminJson(res, {
          state: 'error',
          message: '当前角色特殊原因不可删除'
        })
        return false
      }

      await models.user_role.destroy({ where: { user_role_id } })
      resAdminJson(res, {
        state: 'success',
        message: '删除用户角色成功'
      })
    } catch (err) {
      resAdminJson(res, {
        state: 'error',
        message: '错误信息：' + err.message
      })
    }
  }

  /**
   * -----------------------------------权限操作--------------------------------
   * 创建权限
   * @param   {object} ctx 上下文对象
   */
  static async createUserAuthority(req: any, res: any, next: any) {
    const reqData = req.body

    try {
      let oneUserAuthorityName = await models.user_authority.findOne({
        where: { authority_name: reqData.authority_name }
      })
      if (oneUserAuthorityName) {
        throw new Error('权限名已存在!')
      }
      let oneUserAuthorityUrl = await models.user_authority.findOne({
        where: { authority_url: reqData.authority_url }
      })
      if (oneUserAuthorityUrl) {
        throw new Error('权限路径已存在!')
      }
      await models.user_authority.create({
        ...reqData
      })
      resAdminJson(res, {
        state: 'success',
        message: '用户权限创建成功'
      })
    } catch (err) {
      resAdminJson(res, {
        state: 'error',
        message: '错误信息：' + err.message
      })
    }
  }

  /**
   * 获取权限列表
   * @param   {object} ctx 上下文对象
   */
  static async getUserAuthorityList(req: any, res: any, next: any) {
    try {
      let userAuthorityAll = await models.user_authority.findAll()

      resAdminJson(res, {
        state: 'success',
        message: '返回成功',
        data: userAuthorityAll
      })
    } catch (err) {
      resAdminJson(res, {
        state: 'error',
        message: '错误信息：' + err.message
      })
    }
  }

  /**
   * 修改权限
   * @param   {object} ctx 上下文对象
   */
  static async updateUserAuthority(req: any, res: any, next: any) {
    const reqData = req.body
    try {
      await models.user_authority.update(
        {
          authority_name: reqData.authority_name,
          authority_type: reqData.authority_type,
          authority_url: reqData.authority_url,
          authority_sort: reqData.authority_sort,
          authority_description: reqData.authority_description,
          enable: reqData.enable
        },
        {
          where: {
            authority_id: reqData.authority_id // 查询条件
          }
        }
      )
      resAdminJson(res, {
        state: 'success',
        message: '更新权限成功'
      })
    } catch (err) {
      resAdminJson(res, {
        state: 'error',
        message: '错误信息：' + err.message
      })
    }
  }

  /**
   * 删除权限列表
   * @param   {object} ctx 上下文对象
   */
  static async deleteUserAuthority(req: any, res: any, next: any) {
    const { authority_id_arr } = req.body
    try {
      await models.user_authority.destroy({
        where: { authority_id: { [Op.in]: authority_id_arr } }
      })
      resAdminJson(res, {
        state: 'success',
        message: '删除权限树成功'
      })
    } catch (err) {
      resAdminJson(res, {
        state: 'error',
        message: '错误信息：' + err.message
      })
    }
  }

  /**
   * 设置角色权限关联
   * @param   {object} ctx 上下文对象
   */

  static async setUserRoleAuthority(req: any, res: any, next: any) {
    const reqData = req.body
    try {
      await models.user_role.update(
        { user_authority_ids: reqData.role_authority_list_all.join(',') },
        {
          where: { user_role_id: reqData.user_role_id } // 查询条件
        }
      )
      resAdminJson(res, {
        state: 'success',
        message: '修改成功'
      })
    } catch (err) {
      resAdminJson(res, {
        state: 'error',
        message: '错误信息：' + err.message
      })
    }
  }
}

export default UserRole
