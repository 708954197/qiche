var formidable = require('formidable');
var url = require('url');
var zupinxinxi = require('../db/zupingxinxi');//租凭信息
var db = require("../db/db")
var suerna = require("../db/userna")
var Student =require("../db/Student");//
var cun = require("../db/cun")
exports.showZuLinDengJi = function(req,res){
    res.render('zupindengji');
}
exports.getLeiBie = function(req,res){
    Student.find({}).exec(function(err,results){
        res.json({
            "results" : results
        });
    });
}
exports.getQiCheLeiBie = function(req,res){
    var leibie = url.parse(req.url,true).query.leibie;
    db.find({"pwd":leibie}).exec(function(err,results){
        res.json({
            "results" : results
        });
    });
}
exports.getUserLeiBie = function(req,res){
    suerna.find({}).exec(function(err,results){
        res.json({
            "results" : results
        });
    });
}
exports.tijiaoZuPing = function(req,res){
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {
        //数据库持久
        zupinxinxi.addStudent(fields,function(result){
            res.json({"result" : 1});
        });
        db.findOne({"name":fields.qichemingchen},function(err,results){
            results.cishu = results.cishu ? results.cishu+ 1 : 1;
            results.save();
        });
    });
}
//统计归还
exports.Newdelguihuan = function(req,res){
    var name = url.parse(req.url,true).query.name;
    db.findOne({"name":name},function(err,results){
        results.guihuan = results.guihuan ? results.guihuan+ 1 : 1;
        results.save();
        res.json({"results":results})
    });
}



exports.jia = function(req,res){
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {
        //数据库持久
        cun.addStudent(fields,function(result){
            res.json({"result" : 1});
        });
    });
}


exports.checkzuchu = function(req,res){
    var name = url.parse(req.url,true).query.name;
    zupinxinxi.find({"qichemingchen":name},function (err,result) {
        if(result.length == 1){
            res.json({'result':1});
            return;
        }else if(result.length == 0){
            res.json({'result':0});
            return;
        }
    })
}