const inspect = require('util').inspect;
const path = require('path');
const os = require('os');
const fs = require('fs');
const Busboy = require('busboy');

/**
 * @function 同步创建文件目录
 * @param {string} dirname 目录绝对地址
 * @return {boolean}
 */
function mkdirSync(dirname) {
    if (fs.existsSync(dirname)) {
        return true;
    } else {
        if (mkdirSync(path.dirname(dirname))) {
            fs.mkdirSync(dirname);
            return true;
        }
    }
}
/**
 * @function 获取上传文件的后缀名
 * @param {string} filename 获取上传文件的后缀名
 * @return {string} 文件后缀名 
 */
function getSuffixName(filename) {
    let namelist = filename.split('.');
    return namelist[namelist.length - 1];
}

/**
 * @function 上传文件
 * @param {object} ctx  koa 上下文
 * @param {object} options 文件上传参数 fileType文件类型 path文件存放路径
 * @return {promise}
 */
function uploadImg(ctx, options) {
    let req = ctx.req,
        res = ctx.res,
        busboy = new Busboy({
            headers: req.headers
        });
    let fileType = options.fileType || 'common';
    let filePath = path.join(options.path, fileType);
    let mkdirResult = mkdirSync(filePath);
    return new Promise((resolve, reject) => {
        console.log('文件上传中');
        let result = {
            success: false,
            formData: {},
        }

        // 解析请求文件事件
        busboy.on('file', function (fieldname, file, filename, encoding, mimetype) {
            let fileName = Math.random().toString(16).substr(2) + '.' + getSuffixName(filename)
            let _uploadFilePath = path.join(filePath, fileName)
            let saveTo = path.join(_uploadFilePath)

            // 文件保存到制定路径
            file.pipe(fs.createWriteStream(saveTo))

            // 文件写入事件结束
            file.on('end', function () {
                result.success = true
                result.message = '文件上传成功'
                result.data = {
                    pictureUrl: `//${ctx.host}/image/${fileType}/${fileName}`
                }
                console.log('文件上传成功！')
                resolve(result)
            })
        })

        // 解析表单中其他字段信息
        busboy.on('field', function (fieldname, val, fieldnameTruncated, valTruncated, encoding, mimetype) {
            console.log('表单字段数据 [' + fieldname + ']: value: ' + inspect(val));
            result.formData[fieldname] = inspect(val);
        });

        // 解析结束事件
        busboy.on('finish', function () {
            console.log('文件上结束')
            resolve(result)
        })

        // 解析错误事件
        busboy.on('error', function (err) {
            console.log('文件上出错')
            reject(result)
        })

        req.pipe(busboy)
    })
};


module.exports = {
    uploadImg
}