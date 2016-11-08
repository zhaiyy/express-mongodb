var express = require('express');
var router = express.Router();

var UserEntity = require('../models/User').UserEntity;

var RestResult = require('../RestResult');


router.get('/', function(req, res, next) {
  res.render('index');
});

//登陆路由
router.post('/login',function(req,res,next){
  var restResult = new RestResult();
  var mobile = req.body.mobile;
  if (!/1\d{10}/.test(mobile)){//手机号码格式校验
    restResult.errorCode = RestResult.ILLEGAL_ARGUMENT_ERROR_CODE;
    restResult.errorReason = "请填写正确的手机格式";
    res.send(restResult);
    return;
  }
  var password = req.body.password;
  if(!password){
    restResult.errorCode = RestResult.ILLEGAL_ARGUMENT_ERROR_CODE;
    restResult.errorReason = "密码不能为空";
    res.send(restResult);
    return;
  }

  UserEntity.findOne({mobile:mobile,password:password},{password:0},function(err,user){
    if(err){
      restResult.errorCode = RestResult.SERVER_EXCEPTION_ERROR_CODE;
      restResult.errorReason = "服务器异常";
      res.send(restResult);
      return;
    }

    if(!user){
      restResult.errorCode = RestResult.BUSINESS_ERROR_CODE;
      restResult.errorReason = "用户名或密码错误";
      res.send(restResult);
      return;
    }

    restResult.returnValue = user;
    res.send(restResult);

    //更新最后登陆时间
    UserEntity.update({_id:user._id},{$set: {lastLoginTime: new Date()}}).exec();

  });

});

module.exports = router;
