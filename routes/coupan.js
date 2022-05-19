var express = require('express')
var router = express.Router()
var pool = require('./pool')
var upload = require("./multer")



router.post("/savecoupan",upload.any(), function(req, res, next) {
    console.log(req.body)
    console.log(req.files)
    var q="insert into coupan(coupanstatus,coupanpicture)values ?"
    pool.query(q,[req.files.map((item)=> [req.body.coupanstatus,item.filename])],function(error,result){
    
    if (error)
    {
       console.log(error)
       res.status(500).json({result:false});
    }
    else
    {
     
      res.status(200).json({result:true});
    }
  })
})




router.get('/displayallcoupan',function(req,res){
  pool.query("select * from coupan",function(error,result){
    if(error)
    {
      res.status(500).json({result:[]})
    }
    else
    {
      res.status(200).json({result:result})
    
    }
    
      })
    
  })

  router.post('/deletecoupan', function(req, res, next) {

    pool.query("delete from  coupan  where coupanid=?",[req.body.coupanid],function(error,result){
  
      if(error)
      { console.log(error)
        res.status(500).json({result:false,msg:'Server Error'})
      }
      else
      {
       res.status(200).json({result:true,msg:'Deleted'})
       
      }
   
    })
  
  })


module.exports=router;


















module.exports=router;