!function(e){function t(t){for(var a,r,l=t[0],c=t[1],s=t[2],u=0,d=[];u<l.length;u++)r=l[u],Object.prototype.hasOwnProperty.call(i,r)&&i[r]&&d.push(i[r][0]),i[r]=0;for(a in c)Object.prototype.hasOwnProperty.call(c,a)&&(e[a]=c[a]);for(m&&m(t);d.length;)d.shift()();return o.push.apply(o,s||[]),n()}function n(){for(var e,t=0;t<o.length;t++){for(var n=o[t],a=!0,r=1;r<n.length;r++){var c=n[r];0!==i[c]&&(a=!1)}a&&(o.splice(t--,1),e=l(l.s=n[0]))}return e}var a={},r={5:0},i={5:0},o=[];function l(t){if(a[t])return a[t].exports;var n=a[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,l),n.l=!0,n.exports}l.e=function(e){var t=[];r[e]?t.push(r[e]):0!==r[e]&&{0:1,1:1,2:1,3:1,4:1,7:1,8:1,9:1,10:1,11:1,12:1,13:1,14:1,15:1,16:1,17:1,18:1,19:1,20:1,21:1,22:1,23:1,24:1,25:1,26:1,27:1,28:1,29:1,30:1,31:1,32:1}[e]&&t.push(r[e]=new Promise((function(t,n){for(var a="css/"+({}[e]||e)+"."+{0:"d2b3a",1:"51606",2:"e1c80",3:"129bd",4:"b9c5b",7:"13258",8:"bac33",9:"15866",10:"62617",11:"41df7",12:"6c5e3",13:"0280d",14:"6c5e3",15:"69a6d",16:"13813",17:"31c23",18:"c3f07",19:"a5e62",20:"a5e62",21:"a5e62",22:"a5e62",23:"d3b78",24:"94707",25:"2ac6d",26:"c0f0e",27:"97859",28:"97859",29:"58b5d",30:"e9249",31:"5702c",32:"1f41e"}[e]+".css",i=l.p+a,o=document.getElementsByTagName("link"),c=0;c<o.length;c++){var s=(m=o[c]).getAttribute("data-href")||m.getAttribute("href");if("stylesheet"===m.rel&&(s===a||s===i))return t()}var u=document.getElementsByTagName("style");for(c=0;c<u.length;c++){var m;if((s=(m=u[c]).getAttribute("data-href"))===a||s===i)return t()}var d=document.createElement("link");d.rel="stylesheet",d.type="text/css",d.onload=t,d.onerror=function(t){var a=t&&t.target&&t.target.src||i,o=new Error("Loading CSS chunk "+e+" failed.\n("+a+")");o.request=a,delete r[e],d.parentNode.removeChild(d),n(o)},d.href=i,document.getElementsByTagName("head")[0].appendChild(d)})).then((function(){r[e]=0})));var n=i[e];if(0!==n)if(n)t.push(n[2]);else{var a=new Promise((function(t,a){n=i[e]=[t,a]}));t.push(n[2]=a);var o,c=document.createElement("script");c.charset="utf-8",c.timeout=120,l.nc&&c.setAttribute("nonce",l.nc),c.src=function(e){return l.p+"js/"+({}[e]||e)+"."+{0:"6ec02",1:"1c1a9",2:"b169c",3:"37809",4:"b237a",7:"383ba",8:"58484",9:"274a0",10:"23a4c",11:"7fd08",12:"c279a",13:"b9dd8",14:"a5651",15:"93f54",16:"5d713",17:"17092",18:"68aea",19:"67c82",20:"e18e8",21:"41494",22:"64bbb",23:"b3eba",24:"8a6b4",25:"e3e73",26:"37f13",27:"3e343",28:"1c4f5",29:"bf121",30:"b4a61",31:"02861",32:"c646e"}[e]+".js"}(e);var s=new Error;o=function(t){c.onerror=c.onload=null,clearTimeout(u);var n=i[e];if(0!==n){if(n){var a=t&&("load"===t.type?"missing":t.type),r=t&&t.target&&t.target.src;s.message="Loading chunk "+e+" failed.\n("+a+": "+r+")",s.name="ChunkLoadError",s.type=a,s.request=r,n[1](s)}i[e]=void 0}};var u=setTimeout((function(){o({type:"timeout",target:c})}),12e4);c.onerror=c.onload=o,document.head.appendChild(c)}return Promise.all(t)},l.m=e,l.c=a,l.d=function(e,t,n){l.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},l.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},l.t=function(e,t){if(1&t&&(e=l(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(l.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)l.d(n,a,function(t){return e[t]}.bind(null,a));return n},l.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return l.d(t,"a",t),t},l.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},l.p="/_admin/",l.oe=function(e){throw console.error(e),e};var c=window.webpackJsonp=window.webpackJsonp||[],s=c.push.bind(c);c.push=t,c=c.slice();for(var u=0;u<c.length;u++)t(c[u]);var m=s;o.push([277,6]),n()}({100:function(e,t,n){"use strict";var a=n(138),r=n.n(a),i=(n(484),n(101)),o=r.a.create({baseURL:"/api-admin/v1",headers:{"x-requested-with":"XMLHttpRequest"}});o.interceptors.request.use((function(e){return localStorage.box_tokens&&(e.headers["x-access-token"]=localStorage.box_tokens),e})),o.interceptors.response.use((function(e){var t=e.data;return e.config.direct?t:t.is_login?"error"===t.state?(i.a.message_warning(t.message),Promise.reject(new Error(t.message))):t.data:(i.a.message_warning(t.message),location.replace("#/sign_in"),!1)}),(function(e){return console.warn(e),i.a.message_warning("服务器正忙，请稍后重试!"),Promise.reject(new Error("服务器正忙!"))})),t.a=o},101:function(e,t,n){"use strict";n(487);var a=n(129),r=n.n(a);t.a={message_success:function(e){r.a.success(e)},message_error:function(e){r.a.error(e)},message_warning:function(e){r.a.warning(e)}}},229:function(e,t,n){"use strict";var a={articleBlogCount:{},articleCommentCount:{},articleCount:{},count:{},dynamicCommentCount:{},dynamicCount:{},new_article:[],new_comment:[],new_user:[]};t.a=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:a,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"SET_ADMIN_COUNT":return Object.assign({},e,{},t.data);default:return e}}},274:function(e,t,n){"use strict";n.d(t,"a",(function(){return r}));var a=n(100),r=function(e,t){return function(n){a.a.get("/admin-index/statistics",e).then((function(e){return t&&t(e),n({type:"SET_ADMIN_COUNT",data:e})}))}}},277:function(e,t,n){n(278),e.exports=n(567)},457:function(e,t,n){},458:function(e,t,n){},539:function(e,t,n){},565:function(e,t,n){},566:function(e,t,n){},567:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),i=n(3),o=n.n(i),l=n(75),c=n(253),s=n(254),u=n(54),m=n(255),d=n(256),_={title:""};var g=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:_,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"TITLE":return Object.assign({},e,{title:t.title});default:return e}},h={asideList:"",user:{},website:{}};var f=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:h,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"SET_ASIDE_LIST":return Object.assign({},e,{asideList:t.all_authority_name_id});case"SET_CURRENT_USER_INFO":return Object.assign({},e,{user:t.admin_user_info,website:t.website});default:return e}},p={isLoading:!1,isAppLogin:!1};var y=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:p,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"LOADING":return Object.assign({},e,{},t.payload);default:return e}},b=n(229),v={user_list:[],count:"",current_user_info:{}};var E=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:v,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"GET_USER_LIST":return Object.assign({},e,{},t.data);case"SET_CURRENT_USER_INFO":return Object.assign({},e,{current_user_info:t.data});default:return e}},O={list:[],count:"",current_info:{},current_role_info:{},role_authority_list_all:[]};var T=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:O,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"GET_USER_ROLE_LIST":return Object.assign({},e,{},t.data);case"SET_USER_ROLE_INFO":return Object.assign({},e,{current_info:t.data});case"SET_CURRENT_USER_ROLE_INFO":return Object.assign({},e,{current_role_info:t.data});case"SET_USER_ROLE_AUTHORITY_LIST_ALL":return Object.assign({},e,{role_authority_list_all:t.data});default:return e}},k={user_authority_list:[],user_authority_source_list:[],count:"",current_authority_info:{}};function S(e,t){var n=[];for(var a in e)e[a].authority_parent_id===t&&(e[a].children=S(e,e[a].authority_id),n.push(e[a]));return n}var C=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:k,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"GET_USER_AUTHORITY_LIST":return Object.assign({},e,{user_authority_list:S(t.data,""),user_authority_source_list:t.data});case"SET_CURRENT_USER_AUTHORITY_INFO":return Object.assign({},e,{current_authority_info:t.data});default:return e}},I={list:[],count:"",current_info:{}};var N=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:I,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"GET_AVATAR_REVIEW_LIST":return Object.assign({},e,{},t.data);case"AVATAR_REVIEW_SET_CURRENT_INFO":return Object.assign({},e,{current_info:t.data});default:return e}},w={list:[],count:"",current_info:{}};var j=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:w,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"GET_ARTICLE_LIST":return Object.assign({},e,{},t.data);case"ARTICLE_SET_CURRENT_INFO":return Object.assign({},e,{current_info:t.data});default:return e}},R={list:[],count:"",current_info:{}};var A=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:R,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"GET_COMMENT_LIST":return Object.assign({},e,{},t.data);case"SET_COMMENT_INFO":return Object.assign({},e,{current_info:t.data});default:return e}},L={list:[],count:"",current_info:{}};var M=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:L,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"GET_ARTICLE_TAGS_LIST":return Object.assign({},e,{},t.data);case"SET_ARTICLE_TAG_INFO":return Object.assign({},e,{current_info:t.data});default:return e}},U={list:[],count:"",current_info:{}};var P=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:U,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"GET_ARTICLE_BLOG_LIST":return Object.assign({},e,{},t.data);case"SET_ARTICLE_BLOG_INFO":return Object.assign({},e,{current_info:t.data});default:return e}},G={list:[],count:"",current_info:{}};var x=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:G,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"GET_ARTICLE_COLUMN_LIST":return Object.assign({},e,{},t.data);case"SET_ARTICLE_COLUMN_INFO":return Object.assign({},e,{current_info:t.data});default:return e}},F={list:[],count:"",current_info:{}};var D=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:F,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"GET_PICTURE_LIST":return Object.assign({},e,{},t.data);case"SET_PICTURE_INFO":return Object.assign({},e,{current_info:t.data});default:return e}},B={admin_user_list:[],count:"",current_user_info:{},admin_role_all:[]};var K=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:B,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"GET_ADMIN_USER_LIST":return Object.assign({},e,{},t.data);case"SET_ADMIN_CURRENT_USER_INFO":return Object.assign({},e,{current_user_info:t.data});case"SET_ADMIN_ROlE_ALL":return Object.assign({},e,{admin_role_all:t.data});default:return e}},Y={info:{email:{},website:{}}};var H=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:Y,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"SET_SYSTEM_CONFIG_INFO":return Object.assign({},e,{info:t.data});default:return e}},q={admin_role_list:[],role_authority_list_all:[],count:"",current_role_info:{}};var W=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:q,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"GET_ADMIN_ROLE_LIST":return Object.assign({},e,{},t.data);case"SET_CURRENT_ADMIN_ROLE_INFO":return Object.assign({},e,{current_role_info:t.data});case"SET_ADMIN_ROLE_AUTHORITY_LIST_ALL":return Object.assign({},e,{role_authority_list_all:t.data});default:return e}},V={admin_authority_list:[],admin_authority_source_list:[],count:"",current_authority_info:{}};function z(e,t){var n=[];for(var a in e)e[a].authority_parent_id===t&&(e[a].children=z(e,e[a].authority_id),n.push(e[a]));return n}var J=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:V,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"GET_ADMIN_AUTHORITY_LIST":return Object.assign({},e,{admin_authority_list:z(t.data,""),admin_authority_source_list:t.data});case"SET_CURRENT_AUTHORITY_INFO":return Object.assign({},e,{current_authority_info:t.data});default:return e}},X={list:[],count:"",current_info:{}};var Q=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:X,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"GET_ADMIN_SYSTEM_LOG_LIST":return Object.assign({},e,{},t.data);case"SET_ADMIN_SYSTEM_LOG_INFO":return Object.assign({},e,{current_info:t.data});default:return e}},Z={notice:[],advertise:[]};var $=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:Z,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"SET_WEBSITE_CONFIG_NOTICE":return Object.assign({},e,{notice:t.data});case"SET_WEBSITE_CONFIG_ADVERTISE":return Object.assign({},e,{advertise:t.data});default:return e}},ee={list:[],count:"",current_info:{}};var te=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:ee,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"GET_DYNAMIC_TOPICS_LIST":return Object.assign({},e,{},t.data);case"SET_DYNAMIC_TOPIC_INFO":return Object.assign({},e,{current_info:t.data});default:return e}},ne={list:[],count:"",current_info:{}};var ae=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:ne,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"GET_DYNAMIC_COMMENT_LIST":return Object.assign({},e,{},t.data);case"SET_DYNAMIC_COMMENT_INFO":return Object.assign({},e,{current_info:t.data});default:return e}},re={list:[],count:"",current_info:{}};var ie=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:re,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"GET_DYNAMIC_LIST":return Object.assign({},e,{},t.data);case"DYNAMIC_SET_CURRENT_INFO":return Object.assign({},e,{current_info:t.data});default:return e}},oe={list:[],count:"",current_info:{}};var le=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:oe,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"GET_BOOK_LIST":return Object.assign({},e,{},t.data);case"BOOK_SET_CURRENT_INFO":return Object.assign({},e,{current_info:t.data});default:return e}},ce={list:[],count:"",current_info:{}};var se=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:ce,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"GET_BOOKS_LIST":return Object.assign({},e,{},t.data);case"BOOKS_SET_CURRENT_INFO":return Object.assign({},e,{current_info:t.data});default:return e}},ue={list:[],count:"",current_info:{}};var me=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:ue,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"GET_BOOK_COMMENT_LIST":return Object.assign({},e,{},t.data);case"SET_BOOK_COMMENT_INFO":return Object.assign({},e,{current_info:t.data});default:return e}},de={list:[],count:"",current_info:{}};var _e=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:de,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"GET_BOOKS_COMMENT_LIST":return Object.assign({},e,{},t.data);case"SET_BOOKS_COMMENT_INFO":return Object.assign({},e,{current_info:t.data});default:return e}},ge={stateTitle:g,stateMange:f,stateLoading:y,stateIndex:b.a,stateUser:E,stateUserRole:T,stateUserAuthority:C,stateUserAvatarReview:N,stateArticle:j,stateArticleComment:A,stateArticleTag:M,stateArticleBlog:P,stateArticleColumn:x,statePicture:D,stateAdminUser:K,stateAdminRole:W,stateAdminAuthority:J,stateAdminSystemLog:Q,stateSystemConfig:H,stateWebsiteConfig:$,stateDynamic:ie,stateDynamicTopic:te,stateDynamicComment:ae,stateBook:le,stateBooks:se,stateBookComment:me,stateBooksComment:_e},he=n(102),fe=n.n(he),pe=(n(456),n(457),n(458),n(49)),ye=n.n(pe),be=n(50),ve=n.n(be),Ee=n(51),Oe=n.n(Ee),Te=n(52),ke=n.n(Te),Se=n(53),Ce=n.n(Se),Ie=n(576),Ne=n(574),we=n(575),je=n(184),Re=n.n(je),Ae=[{path:"/sign_in",title:"登录",component:function(){return Promise.all([n.e(0),n.e(1),n.e(3),n.e(32)]).then(n.bind(null,1215))}},{path:"/manager",component:n(568).default,authority:["admin","user"],routes:[{path:"/manager/index",name:"index",title:"首页",component:function(){return Promise.all([n.e(0),n.e(2),n.e(4),n.e(30),n.e(31)]).then(n.bind(null,1191))}},{path:"/manager/user",name:"user",title:"前台用户管理",component:function(){return Promise.all([n.e(0),n.e(2),n.e(1),n.e(3),n.e(7)]).then(n.bind(null,1209))}},{path:"/manager/article",name:"article",title:"文章汇总",component:function(){return Promise.all([n.e(0),n.e(2),n.e(1),n.e(3),n.e(12)]).then(n.bind(null,1208))}},{path:"/manager/article-tag",name:"articleTag",title:"文章标签",component:function(){return Promise.all([n.e(0),n.e(2),n.e(1),n.e(3),n.e(24)]).then(n.bind(null,1205))}},{path:"/manager/article-column",name:"articleColumn",title:"文章专栏",component:function(){return Promise.all([n.e(0),n.e(2),n.e(1),n.e(3),n.e(10)]).then(n.bind(null,1204))}},{path:"/manager/article-blog",name:"articleBlog",title:"个人专栏",component:function(){return Promise.all([n.e(0),n.e(2),n.e(1),n.e(3),n.e(18)]).then(n.bind(null,1202))}},{path:"/manager/user-role",name:"userRole",title:"用户角色",component:function(){return Promise.all([n.e(0),n.e(2),n.e(1),n.e(3),n.e(9)]).then(n.bind(null,1192))}},{path:"/manager/user-authority",name:"userAuthority",title:"用户权限",component:function(){return Promise.all([n.e(0),n.e(2),n.e(1),n.e(3),n.e(28)]).then(n.bind(null,1193))}},{path:"/manager/user-avatar-review",name:"userAvatarReview",title:"用户头像审核",component:function(){return Promise.all([n.e(0),n.e(2),n.e(1),n.e(4),n.e(26)]).then(n.bind(null,1201))}},{path:"/manager/picture",name:"picture",title:"图片管理",component:function(){return Promise.all([n.e(0),n.e(2),n.e(1),n.e(3),n.e(8)]).then(n.bind(null,1214))}},{path:"/manager/article-comment",name:"articleComment",title:"评论管理",component:function(){return Promise.all([n.e(0),n.e(2),n.e(1),n.e(3),n.e(19)]).then(n.bind(null,1197))}},{path:"/manager/admin-user",name:"adminUser",title:"后台管理员管理",component:function(){return Promise.all([n.e(0),n.e(2),n.e(1),n.e(3),n.e(16)]).then(n.bind(null,1213))}},{path:"/manager/admin-role",name:"adminRole",title:"后台角色",component:function(){return Promise.all([n.e(0),n.e(2),n.e(1),n.e(3),n.e(11)]).then(n.bind(null,1212))}},{path:"/manager/admin-authority",name:"adminAuthority",title:"后台权限",component:function(){return Promise.all([n.e(0),n.e(2),n.e(1),n.e(3),n.e(27)]).then(n.bind(null,1194))}},{path:"/manager/system-config",name:"systemConfig",title:"系统配置",component:function(){return Promise.all([n.e(0),n.e(2),n.e(1),n.e(3),n.e(29)]).then(n.bind(null,1195))}},{path:"/manager/admin-system-log",name:"adminSystemLog",title:"后台系统日志",component:function(){return Promise.all([n.e(0),n.e(2),n.e(1),n.e(3),n.e(25)]).then(n.bind(null,1203))}},{path:"/manager/website-config",name:"websiteConfig",title:"网站配置",component:function(){return Promise.all([n.e(0),n.e(2),n.e(1),n.e(3),n.e(23)]).then(n.bind(null,1196))}},{path:"/manager/dynamic",name:"dynamic",title:"动态",component:function(){return Promise.all([n.e(0),n.e(2),n.e(1),n.e(3),n.e(15)]).then(n.bind(null,1206))}},{path:"/manager/dynamic-topic",name:"dynamicTopic",title:"动态的话题",component:function(){return Promise.all([n.e(0),n.e(2),n.e(1),n.e(3),n.e(17)]).then(n.bind(null,1207))}},{path:"/manager/dynamic-comment",name:"dynamicComment",title:"动态的评论管理",component:function(){return Promise.all([n.e(0),n.e(2),n.e(1),n.e(3),n.e(22)]).then(n.bind(null,1198))}},{path:"/manager/books",name:"books",title:"小书章节",component:function(){return Promise.all([n.e(0),n.e(2),n.e(1),n.e(3),n.e(14)]).then(n.bind(null,1210))}},{path:"/manager/book",name:"book",title:"小书章节",component:function(){return Promise.all([n.e(0),n.e(2),n.e(1),n.e(3),n.e(13)]).then(n.bind(null,1211))}},{path:"/manager/books-comment",name:"booksComment",title:"小书评价",component:function(){return Promise.all([n.e(0),n.e(2),n.e(1),n.e(3),n.e(21)]).then(n.bind(null,1199))}},{path:"/manager/book-comment",name:"bookComment",title:"小书评价",component:function(){return Promise.all([n.e(0),n.e(2),n.e(1),n.e(3),n.e(20)]).then(n.bind(null,1200))}}]}],Le=function(e){var t=e.isLoading,n=e.error;return t?r.a.createElement("div",null,"Loading..."):n?r.a.createElement("div",null,"Sorry, there was a problem loading the page."):null},Me=function(e){function t(){return ye()(this,t),Oe()(this,ke()(t).apply(this,arguments))}return Ce()(t,e),ve()(t,[{key:"render",value:function(){return r.a.createElement(Ie.a,null,r.a.createElement(a.Fragment,null,Ae.map((function(e,t){return e.routes?r.a.createElement(Ne.a,{render:function(){return r.a.createElement(e.component,null,e.routes.map((function(e,t){return r.a.createElement(Ne.a,{component:Re()({loader:e.component,loading:Le}),key:t,path:e.path})})))},key:t,path:e.path}):r.a.createElement(Ne.a,{component:Re()({loader:e.component,loading:Le}),key:t,path:e.path})})),r.a.createElement(Ne.a,{exact:!0,path:"/",render:function(){return r.a.createElement(we.a,{to:"/manager/index"})}})))}}]),t}(a.PureComponent);fe.a.locale("zh-cn");var Ue,Pe=[m.a],Ge=Object(l.createStore)(Object(l.combineReducers)(Object.assign({routing:s.routerReducer},ge)),Object(c.composeWithDevTools)(l.applyMiddleware.apply(void 0,Pe)));Ue=Me,o.a.render(r.a.createElement(d.AppContainer,null,r.a.createElement(u.a,{store:Ge},r.a.createElement(Ue,null))),document.getElementById("app"))},568:function(e,t,n){"use strict";n.r(t);n(461);var a,r,i=n(259),o=n.n(i),l=n(49),c=n.n(l),s=n(50),u=n.n(s),m=n(51),d=n.n(m),_=n(52),g=n.n(_),h=n(53),f=n.n(h),p=(n(137),n(24)),y=n.n(p),b=n(0),v=n.n(b),E=n(54),O=n(89),T=n(100),k=(n(272),n(249)),S=n.n(k),C=(n(185),n(20)),I=n.n(C),N=(n(191),n(17)),w=n.n(N),j=n(577),R=(n(539),n(274),w.a.SubMenu),A=(w.a.ItemGroup,v.a.createElement(w.a,null,v.a.createElement(w.a.Item,null,v.a.createElement("a",{target:"_blank",rel:"noopener noreferrer",href:"http://www.alipay.com/"},"个人资料")),v.a.createElement(w.a.Item,null,v.a.createElement("a",{target:"_blank",rel:"noopener noreferrer",href:"http://www.tmall.com/"},"退出"))),a=Object(E.b)((function(e){return{stateTitle:e.stateTitle,stateMange:e.stateMange}})),Object(j.a)(r=a(r=function(e){function t(){var e,n;c()(this,t);for(var a=arguments.length,r=new Array(a),i=0;i<a;i++)r[i]=arguments[i];return(n=d()(this,(e=g()(t)).call.apply(e,[this].concat(r)))).state={current:""},n.topMenuClick=function(e){n.setState({current:e.key})},n._esc=function(){localStorage.box_tokens="",n.props.history.push("/sign_in")},n}return f()(t,e),u()(t,[{key:"render",value:function(){var e=this.props,t=e.collapsed,n=e.onCollapseChange,a=e.stateMange.user,r=void 0===a?{}:a;return v.a.createElement(y.a.Header,{className:{"k-header":!0,collapsed:t}},v.a.createElement("div",{className:"clearfix"},v.a.createElement("div",{className:"pull-left"},v.a.createElement(I.a,{className:"trigger",type:t?"menu-unfold":"menu-fold",onClick:function(){return n(!t)}})),v.a.createElement("div",{className:"pull-right"},v.a.createElement(w.a,{onClick:this.topMenuClick,selectedKeys:[this.state.current],mode:"horizontal"},v.a.createElement(w.a.Item,{key:"alipay"}),v.a.createElement(R,{title:v.a.createElement("div",{className:"personal"},v.a.createElement(S.a,{src:r.avatar}),v.a.createElement("div",{className:"personal-info"},v.a.createElement("span",{className:"name"},r.nickname),v.a.createElement("span",{className:"role"},r.account)))},v.a.createElement(w.a.Item,{key:"setting",onClick:this._esc},"退出"))))))}}]),t}(b.Component))||r)||r),L=n(573),M=(n(138),n(258)),U=n.n(M),P=(n(564),n(565),U.a),G=(n(566),y.a.Header,y.a.Content,y.a.Footer,y.a.Sider,w.a.SubMenu),x=(w.a.ItemGroup,function(e){function t(){var e,n;c()(this,t);for(var a=arguments.length,r=new Array(a),i=0;i<a;i++)r[i]=arguments[i];return(n=d()(this,(e=g()(t)).call.apply(e,[this].concat(r)))).state={openKeys:["web"],isMobile:!1,aside_list:[{title:"主页",key:"index",icon:"home",link:"/manager/index"},{title:"文章管理",key:"article_mange",icon:"file-text",children:[{title:"文章汇总",key:"article",link:"/manager/article"},{title:"个人专栏",key:"articleBlog",link:"/manager/article-blog"},{title:"文章标签",key:"article_tag",link:"/manager/article-tag"},{title:"文章专栏",key:"article_column",link:"/manager/article-column"},{title:"文章评论管理",key:"comment",link:"/manager/article-comment"}]},{title:"动态管理",key:"dynamic",icon:"message",children:[{title:"动态汇总",key:"dynamics",link:"/manager/dynamic"},{title:"动态话题",key:"dynamicTopic",link:"/manager/dynamic-topic"},{title:"动态评论",key:"dynamicComment",link:"/manager/dynamic-comment"}]},{title:"小书管理",key:"bookManager",icon:"book",children:[{title:"小书",key:"books",link:"/manager/books"},{title:"小书章节",key:"book",link:"/manager/book"},{title:"小书评论",key:"booksComment",link:"/manager/books-comment"},{title:"小书章节评论",key:"bookComment",link:"/manager/book-comment"}]},{title:"用户管理",key:"user_manger",icon:"user",children:[{title:"用户管理",key:"user",link:"/manager/user"},{title:"用户角色",key:"user_role",link:"/manager/user-role"},{title:"用户权限",key:"user_authority",link:"/manager/user-authority"},{title:"用户头像审核",key:"user_avatar_review",link:"/manager/user-avatar-review"}]},{title:"网站管理",key:"web",icon:"desktop",children:[{title:"网站配置",key:"website_config",link:"/manager/website-config"},{title:"图库",key:"picture",link:"/manager/picture"}]},{title:"系统管理",key:"admin",icon:"setting",children:[{title:"管理员管理",key:"admin_user",link:"/manager/admin-user"},{title:"角色管理",key:"admin_role",link:"/manager/admin-role"},{title:"权限菜单",key:"admin_authority",link:"/manager/admin-authority"},{title:"系统配置",key:"system_config",link:"/manager/system-config"},{title:"系统日志",key:"admin_system_log",link:"/manager/admin-system-log"}]}]},n.rootSubmenuKeys=["home","article_mange","bookManager","dynamic","user_manger","web","admin"],n.onOpenChange=function(e){var t=e.find((function(e){return-1===n.state.openKeys.indexOf(e)}));-1===n.rootSubmenuKeys.indexOf(t)?n.setState({openKeys:e}):n.setState({openKeys:t?[t]:[]})},n}return f()(t,e),u()(t,[{key:"componentDidMount",value:function(){var e=this;this.eHandler=Object(O.enquireScreen)((function(t){e.state.isMobile!==t&&e.setState({isMobile:t})}))}},{key:"componentWillUnmount",value:function(){Object(O.unenquireScreen)(this.eHandler)}},{key:"render",value:function(){var e=this.state,t=e.aside_list,n=void 0===t?[]:t,a=e.isMobile,r=this.props,i=r.collapsed,o=r.onCollapseChange,l=r.stateMange;return v.a.createElement(y.a.Sider,{breakpoint:"lg",trigger:null,width:a?200:256,collapsible:!0,collapsed:i,onCollapse:function(e,t){o(e)},className:"admin-aside-menu"},v.a.createElement("div",{className:"admin-aside-menu-view"},v.a.createElement("div",{className:"admin-aside-header"},v.a.createElement(L.a,{className:"admin-logo-view",to:"/manager/index"},v.a.createElement(I.a,{type:"heat-map",className:"login-icon"}),v.a.createElement("span",{className:"logo-text"},l.website&&l.website.website_name))),v.a.createElement("div",{className:"admin-aside-content clearfix"},v.a.createElement(P,{option:{suppressScrollX:!0}},v.a.createElement(w.a,{defaultOpenKeys:["web"],openKeys:this.state.openKeys,onOpenChange:this.onOpenChange,theme:"dark",mode:"inline"},v.a.createElement(w.a.Item,null,v.a.createElement(L.a,{to:"#"},v.a.createElement(I.a,{type:" "}),v.a.createElement("span",null,"NAVIGATION"))),v.a.createElement(w.a.Item,null,v.a.createElement(L.a,{to:"/manager/index"},v.a.createElement(I.a,{type:"dashboard"}),v.a.createElement("span",null,"仪表盘"))),n.map((function(e){return e.link&&l.asideList&&~l.asideList.indexOf(e.key)?v.a.createElement(w.a.Item,{key:e.key},v.a.createElement(L.a,{to:e.link},e.icon?v.a.createElement(I.a,{type:e.icon}):"",v.a.createElement("span",null,e.title))):l.asideList&&~l.asideList.indexOf(e.key)?v.a.createElement(G,{key:e.key,title:v.a.createElement("span",null,v.a.createElement(I.a,{type:e.icon}),v.a.createElement("span",null,e.title))},e.children.map((function(e){if(~l.asideList.indexOf(e.key))return v.a.createElement(w.a.Item,{key:e.key},v.a.createElement(L.a,{to:e.link},e.icon?v.a.createElement(I.a,{type:e.icon}):"",e.title))}))):void 0})))))))}}]),t}(b.Component)),F=Object(E.b)((function(e){return{stateMange:e.stateMange}}))(x),D=y.a.Content,B=y.a.Footer,K=(y.a.Sider,function(e){function t(){var e,n;c()(this,t);for(var a=arguments.length,r=new Array(a),i=0;i<a;i++)r[i]=arguments[i];return(n=d()(this,(e=g()(t)).call.apply(e,[this].concat(r)))).state={isMobile:!1,collapsed:!1},n.onCollapseChange=function(e){n.setState({collapsed:e})},n}return f()(t,e),u()(t,[{key:"componentDidMount",value:function(){var e,t,n=this;this.eHandler=Object(O.enquireScreen)((function(e){n.state.isMobile!==e&&n.setState({isMobile:e})})),this.props.dispatch((e={},t=function(e){console.log("result",e),e.website&&(document.title=e.website.website_name)},function(n){T.a.post("/admin-user/info",e).then((function(e){return t&&t(e),n({type:"SET_CURRENT_USER_INFO",admin_user_info:e.admin_user_info,website:e.website}),n({type:"SET_ASIDE_LIST",all_authority_name_id:e.all_authority_name_id})}))}))}},{key:"componentWillUnmount",value:function(){Object(O.unenquireScreen)(this.eHandler)}},{key:"render",value:function(){var e=this.state,t=e.collapsed,n=e.isMobile,a={collapsed:t,onCollapseChange:this.onCollapseChange},r={collapsed:t,onCollapseChange:this.onCollapseChange};return v.a.createElement(y.a,{className:"admin-manager"},n?v.a.createElement(o.a,{maskClosable:!0,placement:"left",closable:!1,onClose:this.onCollapseChange.bind(this,!t),visible:!t,width:200,style:{padding:0,height:"100vh"}},v.a.createElement(F,Object.assign({},a,{collapsed:!1,onCollapseChange:function(){}}))):v.a.createElement(F,a),v.a.createElement(y.a,{className:"admin-wrapper"},v.a.createElement(A,r),v.a.createElement(D,{className:"admin-content"},this.props.children,v.a.createElement(B,{style:{textAlign:"center"}},v.a.createElement("a",{href:"https://github.com/maoxiaoquan/kite",target:"_blank"},"Kite"),"©2019"))))}}]),t}(b.PureComponent));t.default=Object(E.b)((function(e){return{stateTitle:e.stateTitle}}))(K)}});