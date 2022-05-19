var express = require('express');
var router = express.Router();
var pool = require('./pool')
//var upload = require('./multer')


router.post('/saveuser',function(req, res, next) {
    console.log(req.body)
    console.log(req.file)
    pool.query("insert into userreg(firstname,lastname,address,mobile,email,password) values(?,?,?,?,?,?)",[req.body.firstname,req.body.lastname,req.body.address,req.body.mobile,req.body.email,req.body.password],function(error,result){
        if(error){
            console.log(error)
            res.status(500).json({result:false})
        }
        else{
            res.status(200).json({result:true})
        }
    })
  
});


//login Route
router.post('/login', function(req, res) {
console.log(req.body.email);
console.log(req.body.password);
  pool.query("select * from userreg where email=? and password=?",[req.body.email,req.body.password],function(error,result){

      if(error){
          console.log(error)
          res.status(500).json({result:"false"})
      }else{
          res.status(200).json({result:result})
      }

  })


});






module.exports = router;