var Student = require("../db/Student.js");
var formidable = require("formidable");
var url = require("url");

exports.showIndex = function(req,res){
    res.render("leibie");
}


//执行添加
exports.doAddStudent = function(req,res){
    console.log("服务器收到了一个POST请求");
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {
        // console.log(fields);
        //数据库持久
        Student.addStudent(fields,function(result){
            res.json({"result" : result});
        });
    });
}

//检查用户名是否被占用
exports.check = function(req,res){
    var id = req.params.id;

    Student.checkSid(id,function(torf){
        res.json({"result" : torf});
    });
}




//删除学生
exports.deleteStudent = function(req,res){
    //拿到学号
    var id = req.params.id;

    //寻找这个学号的学生
    Student.find({"id" : id},function(err,results){
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
exports.getAllStudent = function(req,res){
    //读取page参数
    var page = url.parse(req.url,true).query.page - 1 || 0;
    var pagesize = 2;
    //寻找条目总数
    Student.count({},function(err,count){
        //分页的逻辑就是跳过（skip）多少条，读取（limit）多少条
        //比如每页两条
        //第1页： limit(2)  skip(0)
        //第2页： limit(2)  skip(2)
        //第3页： limit(2)  skip(4)
        //第4页： limit(2)  skip(6)
        //第5页： limit(2)  skip(8)
        //第6页： limit(2)  skip(10)
        Student.find({}).limit(pagesize).skip(pagesize * page).exec(function(err,results){
            res.json({
                "pageAmount" : Math.ceil(count / pagesize),
                "results" : results
            });
        });
    });

}
