
const express = require('express');
const router = express.Router();
const db = require('../../models').db;
const UserService = require('../userService')
const Common = require('../../../common/common')
var uuid = require('uuid');

// 添加用户
const operate = (req, res, next) => {
  // 获取接口参数
  const params = req.body;
  const userId = uuid.v1();
  db.transaction(transaction => {
    UserService.createUser({
      userName: params.userName,
      password: params.password,
      nickName: params.nickName,
      email: params.email,
      userId: userId
    }).then(data=>{
      res.send('添加成功！');
    }).catch(error =>{
      console.log(error)
      console.log(Common.handleError(error))
      res.send(Common.handleError(error))
    })
  })
}

router.post('/', operate);

module.exports = router;