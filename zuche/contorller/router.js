var Stud = require("../db/db.js");
var formidable = require("formidable");
var url = require("url");

exports.showIndex1 = function(req,res){
    res.render("chelei");
}
//执行添加
exports.doAddStudent1 = function(req,res){
    console.log("服务器收到了一个POST请求");
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields) {
        //数据库持久
        Stud.addStudent(fields,function(result){
            res.json({"result" : result});
        });
    });
}

//检查用户名是否被占用
exports.check1 = function(req,res){
    var sid = req.params.sid;

    Stud.checkSid(sid,function(torf){
        res.json({"result" : torf});
    });
}


//更改学生的Ajax接口，是post请求接口
exports.updateStudent1 = function(req,res){
    var sid = req.params.sid;
     // console.log(sid)
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields) {
        //更改学生
        // console.log(fields);
        Stud.find({"id" :sid},function(err,results){
            var thestudent = results[0];
            // console.log(thestudent);
            //更改属性
            thestudent.id = fields.id;
            thestudent.name = fields.name;
            thestudent.pwd = fields.pwd;
            thestudent.price = fields.price;
            thestudent.flag = fields.flag;
            //持久化
            thestudent.save(function(err){
                if(err){
                    console.log(err);
                    res.json({"result" : -1});
                }else{
                    res.json({"result" : 1});
                }
            });
        });
    });
}


//删除学生
exports.deleteStudent1 = function(req,res){
    //拿到学号
    var sid = req.params.sid;
    // console.log(sid)
    //寻找这个学号的学生
    Stud.find({"id" : sid},function(err,results){
        if(err || results.length == 0){
            res.json({"result" : -1});
            return;
        }

        //删除
        results[0].remove(function(err){
            if(err){
                res.json({"result" : -1});
                return;
            }

            res.json({"result" : 1});
        });
    });
}


//Ajax接口，得到所有学生
exports.getAllStudent1 = function(req,res){
    //读取page参数
    var page = url.parse(req.url,true).query.page - 1 || 0;
    var pagesize = 5;
    //寻找条目总数
    Stud.count({},function(err,count){
        Stud.find({}).limit(pagesize).skip(pagesize * page).exec(function(err,results){
            res.json({
                "pageAmount" : Math.ceil(count / pagesize),
                "results" : results
            });
        });
    });

}

//呈递更改学生的表单
exports.showUpdate1 = function(req,res){
    //拿到学号
    var sid = req.params.sid;
    // console.log(sid);
    //直接用类名打点调用find，不需要再Student类里面增加一个findStudentBySid的方法。
    Stud.find({"id" : sid},function(err,results){
        // console.log(results);
        if(results.length == 0){
            res.send("查无此人，请检查网址");
            return;
        }
        //呈递页面
        res.json({info: results[0]});
    });
}


//开始统计分析
exports.tongji=function (req,res,next) {
    res.render("tongji")
}
//统计分析的租出
exports.rentCar=function (req,res,next) {
    Stud.find({},function(err,results){
        // console.log(results);
        res.json({"results":results})
    });
}
//开始搜索类型
exports.checkType=function (req,res,next) {
    var name = url.parse(req.url,true).query.name;
    // console.log(name);
    Stud.find({"pwd":name},function(err,results){
        // console.log(results);
        res.json({"results":results})
    });
}

exports.guihuansuoyou = function (req, res) {
    Stud.find({},function(err,results){
        // console.log(results);
        res.json({"results":results})
    });
}



