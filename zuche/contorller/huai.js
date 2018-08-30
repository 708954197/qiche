var url = require('url');
var zupinxinxi = require('../db/zupingxinxi');//租凭信息
var db = require('../db/db.js');


exports.showGuiHuanDengJi = function(req,res){
    res.render('guihuandengji');
}
exports.getZuPingXinXi = function(req,res){
    zupinxinxi.find({},function (err,result) {
        // console.log(result)
        res.json({"result":result});
    })
}

//返回次数
// exports.Newdelguihuan = function(req,res){
//     var name = url.parse(req.url,true).query.name;
//     // console.log(name);
//     db.find({"name":name},function (err,result) {
//         // console.log(result);
//         // result.guihuan = result.guihuan ? result.guihuan+ 1 : 1;
//     })
// }
exports.delZuPingXinXi = function(req,res){
    var name = url.parse(req.url,true).query.name;
    zupinxinxi.find({"qichemingchen":name},function (err,result) {
        // console.log(result);
        if(result.length == 1){
            // result.guihuan = result.guihuan ? result.guihuan+ 1 : 1;
            result[0].remove(function () {
                res.json({"result":1})
            })
        }

    })
}
