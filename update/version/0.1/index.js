const sequelize = require('../../../db/mysqldb/init')
const models = require('../../../db/mysqldb/define')(sequelize)
const lowdb = require('../../../db/lowdb/index')
const CURRENT_VERSION = 0.1
class update0_1 {
  static update () {
    return new Promise(async (resolve, reject) => {
      try {
        console.log(`正在升级中，当前版本是${CURRENT_VERSION}....`)
        // await models.sequelize.query(
        //   'rename TABLE admin_system_log to system_log;'
        // )

        // await models.sequelize.query(
        //   'rename TABLE system_log to admin_system_log;'
        // )
        console.log(`${CURRENT_VERSION}版本升级完成`)
        await lowdb
          .get('config')
          .assign({ version: CURRENT_VERSION })
          .write()
        resolve(`${CURRENT_VERSION}版本升级完成`)
      } catch (err) {
        reject(err)
      }
    })
  }
}

module.exports = update0_1
