var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    sid:Number,
    yonghuming: String,
    dianhua:String,
    dizhi:String,
    shenfengzheng:String,
    jiazhao:String
})

userSchema.static.checkSid = function (sid,callback) {
    this.find({"sid":sid},function (err,results) {
        callback(results.length == 0)
    })
}

userSchema.static.addStudent = function (json,callback) {
    Userna.checkSid(json.sid,function (torf) {
        if(torf){
            var s = new Userna(json);
            s.save(function (err) {
                if(err){
                    callback(-2)
                }
                callback(1)
            })
        }else{
            callback(-1)
        }
    })
}

var userna = mongoose.model("userna",userSchema);
module.exports = userna

