"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const models = require('../../../../../db/mysqldb/index');
const moment_1 = __importDefault(require("moment"));
const { resClientJson } = require('../../../utils/resData');
const Op = require('sequelize').Op;
const cheerio = require('cheerio');
const clientWhere = require('../../../utils/clientWhere');
const xss = require('xss');
const config = require('../../../../../config');
const lowdb = require('../../../../../db/lowdb/index');
const { TimeNow, TimeDistance } = require('../../../utils/time');
const constant_1 = require("../../../utils/constant");
const { reviewSuccess, freeReview, pendingReview, reviewFail } = constant_1.statusList;
const userVirtual_1 = __importDefault(require("../../../common/userVirtual"));
const attention_1 = __importDefault(require("../../../common/attention"));
class dynamic {
    static createDynamic(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let reqData = req.body;
            console.log('reqData', req);
            let { user = '' } = req;
            try {
                if (!reqData.content) {
                    throw new Error('请输入片刻内容');
                }
                if (reqData.content.length > 600) {
                    throw new Error('动态内容过长，请小于600个字符');
                }
                let date = new Date();
                let currDate = moment_1.default(date.setHours(date.getHours())).format('YYYY-MM-DD HH:mm:ss');
                if (new Date(currDate).getTime() < new Date(user.ban_dt).getTime()) {
                    throw new Error(`当前用户因违规已被管理员禁用发布片刻，时间到：${moment_1.default(user.ban_dt).format('YYYY年MM月DD日 HH时mm分ss秒')},如有疑问请联系网站管理员`);
                }
                // 虚拟币判断是否可以进行继续的操作
                const isVirtual = yield userVirtual_1.default.isVirtual({
                    uid: user.uid,
                    type: constant_1.modelName.dynamic,
                    action: constant_1.modelAction.create
                });
                if (!isVirtual) {
                    throw new Error('贝壳余额不足！');
                }
                let oneDynamicTopic = yield models.dynamic_topic.findOne({
                    where: {
                        topic_id: config.DYNAMIC.dfOfficialTopic
                    }
                });
                const website = lowdb
                    .read()
                    .get('website')
                    .value();
                if (reqData.topic_ids &&
                    ~reqData.topic_ids.indexOf(config.DYNAMIC.dfOfficialTopic)) {
                    // 判断使用的是否是官方才能使用的动态话题
                    if (!~user.user_role_ids.indexOf(config.USER_ROLE.dfManagementTeam)) {
                        // 是的话再判断是否有权限，否则就弹出提示
                        throw new Error(`${oneDynamicTopic.name}只有${website.website_name}管理团队才能发布`);
                    }
                }
                let userRoleALL = yield models.user_role.findAll({
                    where: {
                        user_role_id: {
                            [Op.or]: user.user_role_ids.split(',')
                        },
                        user_role_type: 1 // 用户角色类型1是默认角色
                    }
                });
                let userAuthorityIds = '';
                userRoleALL.map((roleItem) => {
                    userAuthorityIds += roleItem.user_authority_ids + ',';
                });
                let status = ~userAuthorityIds.indexOf(config.USER_AUTHORITY.dfNoReviewDynamicId) // 4无需审核， 1审核中
                    ? freeReview // 免审核
                    : pendingReview; // 待审核
                const createDynamic = yield models.dynamic.create({
                    uid: user.uid,
                    content: xss(reqData.content) /* 主内容 */,
                    origin_content: reqData.content /* 源内容 */,
                    attach: reqData.attach,
                    status,
                    type: reqData.type,
                    topic_ids: reqData.topic_ids
                });
                yield attention_1.default.attentionMessage({
                    uid: user.uid,
                    type: constant_1.modelName.dynamic,
                    action: constant_1.modelAction.create,
                    associate_id: createDynamic.id
                });
                yield userVirtual_1.default.setVirtual({
                    uid: user.uid,
                    associate: createDynamic.id,
                    type: constant_1.modelName.dynamic,
                    action: constant_1.modelAction.create
                });
                resClientJson(res, {
                    state: 'success',
                    message: '动态创建成功'
                });
            }
            catch (err) {
                resClientJson(res, {
                    state: 'error',
                    message: '错误信息：' + err.message
                });
                return false;
            }
        });
    }
    static getDynamicView(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let id = req.query.id || '';
            let whereParams = {}; // 查询参数
            try {
                // sort
                // hottest 全部热门:
                whereParams = {
                    id: id,
                    status: {
                        [Op.or]: [reviewSuccess, freeReview, pendingReview, reviewFail] // 审核成功、免审核
                    }
                };
                let oneDynamic = yield models.dynamic.findOne({
                    where: whereParams // 为空，获取全部，也可以自己添加条件
                });
                if (oneDynamic) {
                    oneDynamic.setDataValue('create_dt', yield TimeDistance(oneDynamic.create_date));
                    oneDynamic.setDataValue('topic', oneDynamic.topic_ids
                        ? yield models.dynamic_topic.findOne({
                            where: { topic_id: oneDynamic.topic_ids }
                        })
                        : '');
                    oneDynamic.setDataValue('thumbCount', yield models.thumb.count({
                        where: {
                            associate_id: oneDynamic.id,
                            type: constant_1.modelName.dynamic,
                            is_associate: true
                        }
                    }));
                    if (oneDynamic.topic_ids &&
                        config.DYNAMIC.dfTreeHole === oneDynamic.topic_ids) {
                        // 判断是不是树洞
                        oneDynamic.setDataValue('user', {
                            uid: 'tree',
                            avatar: config.DF_ARTICLE_TAG_IMG,
                            nickname: '树洞',
                            sex: '',
                            introduction: '树洞'
                        });
                    }
                    else {
                        oneDynamic.setDataValue('user', yield models.user.findOne({
                            where: { uid: oneDynamic.uid },
                            attributes: ['uid', 'avatar', 'nickname', 'sex', 'introduction']
                        }));
                    }
                }
                if (oneDynamic) {
                    resClientJson(res, {
                        state: 'success',
                        message: '数据返回成功',
                        data: {
                            dynamic: oneDynamic
                        }
                    });
                }
                else {
                    resClientJson(res, {
                        state: 'error',
                        message: '数据返回错误，请再次刷新尝试'
                    });
                }
            }
            catch (err) {
                resClientJson(res, {
                    state: 'error',
                    message: '错误信息：' + err.message
                });
                return false;
            }
        });
    }
    static getDynamicList(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('req.query', req.query);
            let page = req.query.page || 1;
            let pageSize = req.query.pageSize || 10;
            let topic_id = req.query.topic_id || '';
            let sort = req.query.sort || ''; // 排序
            let whereDynamicParams = {}; // 查询参数
            let orderParams = []; // 排序参数
            try {
                // sort
                // hottest 全部热门:
                whereDynamicParams = {
                    status: {
                        [Op.or]: [reviewSuccess, freeReview]
                    }
                };
                console.log('sort', sort);
                if (!~['hot', 'newest'].indexOf(sort)) {
                    whereDynamicParams['topic_ids'] = topic_id;
                }
                else {
                    // 属于最热或者推荐
                    let allDynamicTopicId = []; // 全部禁止某些动态话题推送的id
                    let allDynamicTopic = yield models.dynamic_topic.findAll({
                        where: {
                            is_push: false
                        } // 为空，获取全部，也可以自己添加条件
                    });
                    console.log('allDynamicTopic', allDynamicTopic);
                    if (allDynamicTopic && allDynamicTopic.length > 0) {
                        for (let item in allDynamicTopic) {
                            allDynamicTopicId.push(allDynamicTopic[item].topic_id);
                        }
                        whereDynamicParams['topic_ids'] = {
                            [Op.or]: {
                                [Op.notIn]: allDynamicTopicId,
                                [Op.is]: null
                            }
                        };
                    }
                }
                sort === 'newest' && orderParams.push(['create_date', 'DESC']);
                sort === 'hot' && orderParams.push(['thumb_count', 'DESC']);
                // newest 最新推荐:
                if (!sort || sort === 'new') {
                    orderParams.push(['create_date', 'DESC']);
                }
                console.log('whereDynamicParams', whereDynamicParams);
                let { count, rows } = yield models.dynamic.findAndCountAll({
                    where: whereDynamicParams,
                    offset: (page - 1) * pageSize,
                    limit: pageSize,
                    order: orderParams
                });
                for (let i in rows) {
                    let topic = rows[i].topic_ids
                        ? yield models.dynamic_topic.findOne({
                            where: { topic_id: rows[i].topic_ids }
                        })
                        : '';
                    rows[i].setDataValue('create_dt', yield TimeDistance(rows[i].create_date));
                    rows[i].setDataValue('topic', topic);
                    rows[i].setDataValue('thumbCount', yield models.thumb.count({
                        where: {
                            associate_id: rows[i].id,
                            type: constant_1.modelName.dynamic,
                            is_associate: true
                        }
                    }));
                    if (rows[i].topic_ids &&
                        config.DYNAMIC.dfTreeHole === rows[i].topic_ids) {
                        // 判断是不是树洞
                        rows[i].setDataValue('user', {
                            uid: 'tree',
                            avatar: config.DF_ARTICLE_TAG_IMG,
                            nickname: '树洞',
                            sex: '',
                            introduction: '树洞'
                        });
                    }
                    else {
                        rows[i].setDataValue('user', yield models.user.findOne({
                            where: { uid: rows[i].uid },
                            attributes: ['uid', 'avatar', 'nickname', 'sex', 'introduction']
                        }));
                    }
                }
                if (rows) {
                    resClientJson(res, {
                        state: 'success',
                        message: '数据返回成功',
                        data: {
                            count,
                            page,
                            pageSize,
                            list: rows
                        }
                    });
                }
                else {
                    resClientJson(res, {
                        state: 'error',
                        message: '数据返回错误，请再次刷新尝试'
                    });
                }
            }
            catch (err) {
                resClientJson(res, {
                    state: 'error',
                    message: '错误信息：' + err.message
                });
                return false;
            }
        });
    }
    static getDynamicListMe(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let page = req.query.page || 1;
            let pageSize = req.query.pageSize || 10;
            let whereParams = {}; // 查询参数
            let orderParams = [['create_date', 'DESC']]; // 排序参数
            let { user = '' } = req;
            try {
                // sort
                // hottest 全部热门:
                whereParams = {
                    uid: user.uid,
                    status: {
                        [Op.or]: [reviewSuccess, freeReview, pendingReview, reviewFail]
                    }
                };
                let { count, rows } = yield models.dynamic.findAndCountAll({
                    where: whereParams,
                    offset: (page - 1) * pageSize,
                    limit: pageSize,
                    order: orderParams
                });
                for (let i in rows) {
                    rows[i].setDataValue('create_dt', yield TimeDistance(rows[i].create_date));
                    rows[i].setDataValue('topic', rows[i].topic_ids
                        ? yield models.dynamic_topic.findOne({
                            where: { topic_id: rows[i].topic_ids }
                        })
                        : '');
                    rows[i].setDataValue('thumbCount', yield models.thumb.count({
                        where: {
                            associate_id: rows[i].id,
                            type: constant_1.modelName.dynamic,
                            is_associate: true
                        }
                    }));
                    if (rows[i].topic_ids &&
                        config.DYNAMIC.dfTreeHole === rows[i].topic_ids) {
                        // 判断是不是树洞
                        rows[i].setDataValue('user', {
                            uid: 'tree',
                            avatar: config.DF_ARTICLE_TAG_IMG,
                            nickname: '树洞',
                            sex: '',
                            introduction: '树洞'
                        });
                    }
                    else {
                        rows[i].setDataValue('user', yield models.user.findOne({
                            where: { uid: rows[i].uid },
                            attributes: ['uid', 'avatar', 'nickname', 'sex', 'introduction']
                        }));
                    }
                }
                if (rows) {
                    resClientJson(res, {
                        state: 'success',
                        message: '数据返回成功',
                        data: {
                            count,
                            page,
                            pageSize,
                            list: rows
                        }
                    });
                }
                else {
                    resClientJson(res, {
                        state: 'error',
                        message: '数据返回错误，请再次刷新尝试'
                    });
                }
            }
            catch (err) {
                resClientJson(res, {
                    state: 'error',
                    message: '错误信息：' + err.message
                });
                return false;
            }
        });
    }
    // 推荐动态
    static recommendDynamicList(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let type = req.query.type || 'recommend';
            let whereParams = {}; // 查询参数
            let orderParams = []; // 排序参数
            if (type === 'recommend') {
                orderParams = [
                    ['create_date', 'DESC'],
                    ['comment_count', 'DESC']
                ];
                // sort
                // hottest 全部热门:
                whereParams = {
                    status: {
                        [Op.or]: [reviewSuccess, freeReview]
                    },
                    create_date: {
                        [Op.between]: [
                            new Date(TimeNow.showMonthFirstDay()),
                            new Date(TimeNow.showMonthLastDay())
                        ]
                    }
                };
            }
            else {
                orderParams = [['create_date', 'DESC']];
            }
            try {
                let allDynamic = yield models.dynamic.findAll({
                    where: whereParams,
                    limit: 5,
                    order: orderParams
                });
                for (let i in allDynamic) {
                    allDynamic[i].setDataValue('create_dt', yield TimeDistance(allDynamic[i].create_date));
                    allDynamic[i].setDataValue('topic', allDynamic[i].topic_ids
                        ? yield models.dynamic_topic.findOne({
                            where: { topic_id: allDynamic[i].topic_ids }
                        })
                        : '');
                    if (allDynamic[i].topic_ids &&
                        config.DYNAMIC.dfTreeHole === allDynamic[i].topic_ids) {
                        // 判断是不是树洞
                        allDynamic[i].setDataValue('user', {
                            uid: 'tree',
                            avatar: config.DF_ARTICLE_TAG_IMG,
                            nickname: '树洞',
                            sex: '',
                            introduction: '树洞'
                        });
                    }
                    else {
                        allDynamic[i].setDataValue('user', yield models.user.findOne({
                            where: { uid: allDynamic[i].uid },
                            attributes: ['uid', 'avatar', 'nickname', 'sex', 'introduction']
                        }));
                    }
                }
                if (allDynamic) {
                    resClientJson(res, {
                        state: 'success',
                        message: '数据返回成功',
                        data: {
                            list: allDynamic
                        }
                    });
                }
                else {
                    resClientJson(res, {
                        state: 'error',
                        message: '数据返回错误，请再次刷新尝试'
                    });
                }
            }
            catch (err) {
                resClientJson(res, {
                    state: 'error',
                    message: '错误信息：' + err.message
                });
                return false;
            }
        });
    }
    static dynamicTopicIndex(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            // 获取首页侧栏动态列表
            try {
                let allDynamicTopic = yield models.dynamic_topic.findAll({
                    where: { enable: 1, is_show: 1 },
                    order: [
                        ['sort', 'ASC'] // asc
                    ]
                });
                resClientJson(res, {
                    state: 'success',
                    message: '返回成功',
                    data: {
                        list: allDynamicTopic
                    }
                });
            }
            catch (err) {
                resClientJson(res, {
                    state: 'error',
                    message: '错误信息：' + err.message
                });
                return false;
            }
        });
    }
    static dynamicTopicList(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            // 获取所有动态列表
            try {
                let allDynamicTopic = yield models.dynamic_topic.findAll({
                    where: { enable: 1 },
                    order: [
                        ['sort', 'ASC'] // asc
                    ]
                });
                for (let i in allDynamicTopic) {
                    allDynamicTopic[i].setDataValue('dynamicCount', yield models.dynamic.count({
                        where: { topic_ids: allDynamicTopic[i].topic_id }
                    }));
                    allDynamicTopic[i].setDataValue('attention_count', yield models.attention.count({
                        where: {
                            associate_id: allDynamicTopic[i].id,
                            is_associate: true,
                            type: constant_1.modelName.dynamic_topic
                        }
                    }));
                }
                resClientJson(res, {
                    state: 'success',
                    message: '返回成功',
                    data: {
                        list: allDynamicTopic
                    }
                });
            }
            catch (err) {
                resClientJson(res, {
                    state: 'error',
                    message: '错误信息：' + err.message
                });
                return false;
            }
        });
    }
    static getDynamicTopicInfo(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { topic_id } = req.query;
            try {
                const oneDynamicTopic = yield models.dynamic_topic.findOne({
                    where: {
                        topic_id
                    }
                });
                oneDynamicTopic.setDataValue('dynamic_count', yield models.dynamic.count({
                    where: { topic_ids: oneDynamicTopic.topic_id }
                }));
                oneDynamicTopic.setDataValue('attention_count', yield models.attention.count({
                    where: {
                        associate_id: oneDynamicTopic.id,
                        is_associate: true,
                        type: constant_1.modelName.dynamic_topic
                    }
                }));
                resClientJson(res, {
                    state: 'success',
                    data: {
                        info: oneDynamicTopic
                    },
                    message: '动态专题详情获取成功'
                });
            }
            catch (err) {
                resClientJson(res, {
                    state: 'error',
                    message: '错误信息：' + err.message
                });
                return false;
            }
        });
    }
    /**
     * 删除动态
     * @param   {object} ctx 上下文对象
     * 删除动态判断是否有动态
     * 无关联则直接删除动态，有关联则开启事务同时删除与动态的关联
     */
    static deleteDynamic(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.query;
            let { islogin = '', user = '' } = req;
            try {
                let oneDynamic = yield models.dynamic.findOne({
                    where: {
                        id,
                        uid: user.uid // 查询条件
                    }
                });
                if (!oneDynamic) {
                    throw new Error('动态不存在');
                }
                if (!islogin) {
                    throw new Error('请登录后尝试');
                }
                if (user.uid !== oneDynamic.uid) {
                    throw new Error('非法操作已禁止');
                }
                yield models.dynamic.destroy({ where: { id } });
                resClientJson(res, {
                    state: 'success',
                    message: '删除动态成功'
                });
            }
            catch (err) {
                resClientJson(res, {
                    state: 'error',
                    message: '错误信息：' + err.message
                });
                return false;
            }
        });
    }
}
exports.default = dynamic;
