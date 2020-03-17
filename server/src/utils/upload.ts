const multer = require('multer') // 加载nodemailer模块

// 文件上传

// 加载配置
module.exports = (type: any) => {
  const date = new Date()
  const year = date.getFullYear()
  const month = date.getMonth() + 1

  let destination_url: any = {
    avatarImg: `static/upload/avatar-img-service/${year}/${month}`,
    articleImg: `static/upload/article-img-service/${year}/${month}`,
    booksImg: `static/upload/books-img-service/${year}/${month}`,
    bookImg: `static/upload/book-img-service/${year}/${month}`,
    admin: `static/upload/admin-img-service/${year}/${month}`,
    dynamic: `static/upload/dynamic-img-service/${year}/${month}`,
    articleBlogImg: `static/upload/blog-img-service/${year}/${month}`
  }

  let fileFilter = (req: any, file: any, cb: any) => {
    // 过滤文件
    let ImgLimitType = ['image/jpeg', 'image/jpg', 'image/gif', 'image/png']
    if (~ImgLimitType.indexOf(file.mimetype)) {
      cb(null, true)
    } else {
      cb(null, false)
    }
  }

  let storage = multer.diskStorage({
    // 文件保存路径
    destination: destination_url[type],
    // 修改文件名称
    filename: function (req: any, file: any, callback: any) {
      let fileFormat = file.mimetype.split('/')
      callback(null, Date.now() + '.' + fileFormat[fileFormat.length - 1])
    }
  })

  let limits = {
    fileSize: 1 * 1024 * 1024
  }

  return multer({
    storage,
    fileFilter,
    limits
  })
}
