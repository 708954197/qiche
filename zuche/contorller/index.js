var user = require("../db/user.js");//负责注册部分
var url = require("url");
var formidable = require("formidable");

//加密模块
var crypto = require('crypto');

exports.shozulin = function(req,res){
    res.render("zulin")
}

exports.showLogin = function(req,res,next){
    res.render("login");
}
exports.showReg = function(req,res,next){
    res.render("reg");
}
exports.showzhu = function(req,res){
    res.render("guihuan")
}
//验证用户名是否存在
exports.checkuserexist = function(req,res,next){
    var queryobj = url.parse(req.url,true).query;
    if(!queryobj.yonghuming){
        res.send("请提供yonghuming参数！");
        return;
    }
    //查询数据库中，用户是否存在，如果存在输出-1，不存在输出0
    user.findUserByName(queryobj.yonghuming,function(err,doc){
        if(doc){
            res.json({"result" : -1});
        }else{
            res.json({"result" : 0});
        }
    });
}

//执行注册，在真正执行注册的时候也要后台验证一下用户名是否占用
exports.doreg = function(req,res,next){
    var form = new formidable.IncomingForm();

    form.parse(req, function(err, fields, files) {
        var yonghuming = fields.yonghuming;
        var mima = fields.mima;
        //在提交的时候再次检查用户名是否重复了
        user.findUserByName(yonghuming,function(err,doc){
            if(doc){
                //-1就是用户名存在
                res.json({"result" : -1});
                return;
            }
            //在数据库中添加一个user
            user.adduser(yonghuming,mima,function(err,doc){
                if(err){
                    //-2就是服务器错误
                    res.json({"result" : -2})
                    return;
                }
                //注册成功！！
                req.session.login = 1;
                req.session.yonghuming = yonghuming;

                res.json({"result" : 1})
            });
        });
    });
}

//检查用户登陆用户名、密码是否正确
exports.checklogin = function(req,res,next){
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {
        var yonghuming = fields.yonghuming;
        var mima = fields.mima;
        //先来检查用户名是否存在
        user.findUserByName(yonghuming,function(err,doc){
            if(!doc){
                //-1用户名不存在！！！
                res.json({"result":-1});
                return;
            }
            //密码和密码进行加密比对
            if(crypto.createHmac('sha256', mima).digest('hex') === doc.mima){
                //写session
                req.session.login = 1;
                req.session.yonghuming = yonghuming;
                //比较密码的正确性，加密的和加密的比较
                res.json({"result":1});
                //跳转
                return;
            }else{
                res.json({"result":-2});
                return;
            }
        });
    });
}
exports.showInd = function (req, res) {
    res.render('index');
}

//退出登录
exports.tuichu = function (req, res) {
    req.session.login = null;
    res.json({"resul": 1})
}