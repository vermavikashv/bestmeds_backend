var express = require('express');
var router = express.Router();
var pool = require('./pool')
var upload = require('./multer')

router.post('/savebrand',upload.single('brandicon') ,function(req, res, next) {
    console.log(req.body)
    console.log(req.file)
    pool.query("insert into brand(categoryid,subcategoryid,brandname,brandicon,status) values(?,?,?,?,?)",[req.body.categoryid,req.body.subcategoryid,req.body.brandname,req.myfilename,req.body.status],function(error,result){
        if(error){
            console.log(error)
            res.status(500).json({result:false})
        }
        else{
            res.status(200).json({result:true})
        }
    })
  
});


router.post('/displaybrand',function(req, res, next) {
    console.log(req.body)
    console.log(req.file)
    pool.query("select * from brand where subcategoryid=?",[req.body.subcategoryid],function(error,result){
        if(error){
            console.log(error)
            res.status(500).json({result:[]})
        }
        else{
            // console.log(result)
            res.status(200).json({result:result})
        }
    })
  
});


router.post('/displaybrands',function(req, res, next) {
    console.log(req.body)
    console.log(req.file)
    pool.query("select * from brand",function(error,result){
        if(error){
            // console.log(error)
            res.status(500).json({result:[]})
        }
        else{
            // console.log(result)
            res.status(200).json({result:result})
        }
    })
});


router.post('/displaybrandsbystatus',function(req, res, next) {
    console.log(req.body)
    console.log(req.file)
    pool.query("select * from brand where status=? group by brandname",[req.body.status],function(error,result){
        if(error){
            // console.log(error)
            res.status(500).json({result:[]})
        }
        else{
            // console.log(result)
            res.status(200).json({result:result})
        }
    })
});

router.post('/editbrandicon',upload.single('icon') ,function(req, res, next) {
    console.log(req.body)
    console.log(req.file)
    pool.query("update brand set brandicon=? where brandid=?",[req.myfilename,req.body.brandid],function(error,result){
        if(error){
            console.log(error)
            res.status(500).json({result:false})
        }
        else{
            res.status(200).json({result:true})
        }
    })
  
});


router.post('/deletebrand' ,function(req, res, next) {
    console.log(req.body)
    
    pool.query("delete from brand  where brandid=?",[req.body.brandid],function(error,result){
        if(error){
            console.log(error)
            res.status(500).json({result:false})
        }
        else{
            res.status(200).json({result:true})
        }
    })
  
});

router.post('/editbranddata',function(req, res, next) {
    console.log(req.body.brandid)
    console.log(req.body.brandname)
    console.log(req.body.categoryid)
    console.log(req.body.subcategoryid)
    console.log(req.body.status)
    console.log(req.body)
   
    pool.query("update brand set categoryid=?,subcategoryid=?,brandname=?,status=? where brandid=?",[req.body.categoryid,req.body.subcategoryid,req.body.brandname,req.body.status,req.body.brandid],function(error,result){
        if(error){
            console.log(error)
            res.status(500).json({result:false})
        }
        else{
            console.log(result)
            res.status(200).json({result:true})
        }
    })
  
});

router.post('/displayallbrands',function(req, res, next) {
    console.log(req.body)
    console.log(req.file)
    pool.query("select B.*,(select C.categoryname from categories C where C.categoryid=B.categoryid) as categoryname,(select S.subcategoryname from subcategories S where S.subcategoryid=B.subcategoryid)as subcategoryname from brand B",function(error,result){
        if(error){
            // console.log(error)
            res.status(500).json({result:[]})
        }
        else{
            // console.log(result)
            res.status(200).json({result:result})
        }
    })
});






module.exports = router;