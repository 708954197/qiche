var express = require("express");
var app = express();
var router = require("./contorller/router")
var rout = require("./contorller/index");
var mainctrl = require("./contorller/mainctrl");
var main = require("./contorller/main");
var zhu = require("./contorller/zu")
var huai = require("./contorller/huai")
var mongoose = require('mongoose');
var session = require('express-session');
mongoose.connect('mongodb://localhost/car');

//----------------------------------------------映射-------------------------------------------------
app.use(express.static("public"));
app.set("view engine","ejs");
//使用session中间件
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}));
//------------------------------------------车类添-加----------------------------------------------
app.get('/chelei'				, router.showIndex1);	//呈递首页
app.propfind('/student/:sid'	, router.check1);		//Ajax接口检查用户名是否被占用
app.post('/student/:sid'	    , router.updateStudent1);	//Ajax接口，更改学生4
app.delete  ('/student/:sid'	, router.deleteStudent1);
app.get     ('/student/:sid'	, router.showUpdate1);		//呈递更改学生表单
app.post    ('/student'			, router.doAddStudent1);	//Ajax接口保存表单
app.get     ('/student'			, router .getAllStudent1);	//Ajax接口得到所有学生

//---------------------------------------------类别添加------------------------------------------
app.get('/leibie'				, main.showIndex);	//呈递首页
app.propfind('/studente/:sid'	, main.check);		//Ajax接口检查用户名是否被占用
app.delete  ('/studente/:id'	    , main.deleteStudent);
app.post    ('/studente'			, main.doAddStudent);	//Ajax接口保存表单
app.get     ('/studente'			, main.getAllStudent);	//Ajax接口得到所有学生

//--------------------------------------------登录-----------------------------------------------------------------
app.get("/login",rout.showLogin);//显示登录页
app.get('/ind',rout.showInd);
app.post("/checklogin",rout.checklogin);//10校验登录是否成功

//-----------------------------------------------验证用户名是否被占用------------------------------------
app.get("/",rout.showReg);//
app.get("/checkuserexist",rout.checkuserexist);//4 是不是能使用
app.post("/doreg",rout.doreg);//5；用户名注册

//------------------------------汽车管理页--客人查询-----------------------------------------------------------------------
app.get('/kerenchaxun',mainctrl.showCarm2);
app.get('/studentc', mainctrl.getAllStudent2);	//Ajax接口得到所有学生
app.get('/add', mainctrl.showAdd2);	//呈递表单
app.post('/studentc', mainctrl.doAddStudent2);	//Ajax接口保存表单
app.delete  ('/studentc/:sid'	, mainctrl.deleteStudent2);
app.get     ('/studentc/:sid'	, mainctrl.showUpdate2);		//呈递更改学生表单
app.post    ('/studentc/:sid'	, mainctrl.updateStudent2);

//--------------------租赁q汽车----------------------------------------------------------------------------
app.get("/zulin"    ,rout.shozulin)
app.get('/getleibie', zhu.getLeiBie);
app.get('/qicheleibie',zhu.getQiCheLeiBie);
app.get('/userall',zhu.getUserLeiBie);
app.post('/zupingdengji',zhu.tijiaoZuPing);
app.get('/checkzuchu',zhu.checkzuchu);
app.get("/zule"      ,zhu.jia);

//-----------------------归还汽车-------------------------------------------------------------------
//----------------------------------------------归还登记接口----------------------------------------
app.get('/guihuandengji',huai.showGuiHuanDengJi);
app.get('/getzupinxinxi',huai.getZuPingXinXi);
app.get('/delguihuan',huai.delZuPingXinXi);
app.get('/Newdelguihuan',zhu.Newdelguihuan);

//-----------------------统计分析-------------------------------------------------------------------
//----------------------------------------------统计分析接口----------------------------------------
app.get("/tongji",router.tongji)
app.get("/rentCar",router.rentCar);
app.get("/checkType",router.checkType);
app.get("/guihuansuoyou",router.guihuansuoyou);
//-------------------退出登录------------------------------------------------------------------------
app.get("/tui"    ,rout.tuichu);//退出登录

app.listen(3300);