const lowdb = require('../db/lowdb/index')
const KiteConfig = require('../kite.config')
const config = lowdb.read().value()

module.exports = {
  // 密码盐
  ENCRYPT_KEY: 'kite',
  DF_ARTICLE_TAG_IMG: `/default/img/default_article_tag.png`, // 文章默认的标签
  DF_ICON: `/default/img/default_icon.png`, // 默认所有图标
  PUBLIC: {},
  USER: {
    dfUserAvatarNoReviewId: 'dfUserAvatarNoReviewId' // 用户头像免审核
  },
  USER_ROLE: {
    dfId: 'ordinary_role_100000', // 用户默认角色id
    dfLegalizeId: 'commission_100000', // 定制角色，认证作者ID
    dfManagementTeam: 'management_team'
  },
  USER_AUTHORITY: {
    dfNoReviewArticleId: 'no_review_article', // 发布文章无需审核的权限id
    dfNoReviewArticleCommentId: 'no_review_comment', // 无需审核评论的权限id
    dfNoReviewDynamicId: 'dfNoReviewDynamicId', // 无需审核动态的权限id
    dfNoReviewDynamicCommentId: 'dfNoReviewDynamicCommentId' // 无需审核动态评论的权限id
  },
  ARTICLE_TAG: {
    dfOfficialExclusive: 'dfOfficialExclusive' // 默认只能由官方使用的文章标签
  },
  DYNAMIC: {
    dfOfficialTopic: 'dfOfficialTopic', // 默认只能由官方使用的动态话题
    dfTreeHole: 'dfTreeHole' // 树洞话题
  },
  ARTICLE_BLOG: {
    dfNoReviewArticleBlogId: 'dfNoReviewArticleBlogId' // 发布个人专栏无需审核的权限id
  },
  BOOK: {
    dfNoReviewBookId: 'dfNoReviewBookId', // 发布小书章节无需审核,
    dfNoReviewBookCommentId: 'dfNoReviewBookCommentId' // 发布小书章节评论无需审核
  },
  BOOKS: {
    dfNoReviewBooksId: 'dfNoReviewBooksId', // 发布小书无需审核,
    dfNoReviewBooksCommentId: 'dfNoReviewBooksCommentId' // 发布小书评论无需审核
  },
  SUPER_ROLE_ID: '1000000', // 排除超管，超管无视所有，拥有最高权限 role = 1000000 为超管
  default_avatar: `${KiteConfig.server.default_avatar}`, // 所有使用的默认头像
  IPWhitelist: ['::1', '::ffff:127.0.0.1'],
  cacheable_list: ['/test'], // 需要缓存的页面
  database: {
    /* database set */
    DATABASE: config.mysql.database, // 使用哪个数据库
    USERNAME: config.mysql.username, // 用户名
    PASSWORD: config.mysql.password, // 口令
    SQL_TYPE: 'mysql', // 数据库类型
    HOST: config.mysql.host, // 主机名
    MYSQL_PORT: config.mysql.mysql_port // 端口号，MySQL默认3306
  }
}
