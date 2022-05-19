var express = require('express');
var router = express.Router();
var pool = require('./pool')
var upload = require('./multer')

/* GET home page. */
router.post('/savecategory',upload.single('icon') ,function(req, res, next) {
    console.log(req.body)
    console.log(req.file)
    pool.query("insert into categories(categoryname,icon) values(?,?)",[req.body.categoryname,req.myfilename],function(error,result){
        if(error){
            console.log(error)
            res.status(500).json({result:false})
        }
        else{
            res.status(200).json({result:true})
        }
    })
  
});

router.post('/savesubcategory',upload.single('subicon') ,function(req, res, next) {
    console.log(req.body)
    console.log(req.file)
    pool.query("insert into subcategories(categoryid,subcategoryname,subcategoryicon,subcategorydesc) values(?,?,?,?)",[req.body.categoryid,req.body.subcategoryname,req.myfilename,req.body.subcategorydesc],function(error,result){
        if(error){
            console.log(error)
            res.status(500).json({result:false})
        }
        else{
            res.status(200).json({result:true})
        }
    })
  
});

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

router.get('/displaycategory',function(req, res, next) {
    console.log(req.query)
    console.log(req.file)
    pool.query("select * from categories",function(error,result){
        if(error){
            console.log(error)
            res.status(500).json({result:[]})
        }
        else{
            console.log(result)
            res.status(200).json({result:result})
        }
    })
  
});


router.post('/editcategoryicon',upload.single('icon') ,function(req, res, next) {
    console.log(req.body)
    console.log(req.file)
    pool.query("update categories set icon=? where categoryid=?",[req.myfilename,req.body.categoryid],function(error,result){
        if(error){
            console.log(error)
            res.status(500).json({result:false})
        }
        else{
            res.status(200).json({result:true})
        }
    })
  
});

router.post('/deletecategory' ,function(req, res, next) {
    console.log(req.body)
    
    pool.query("delete from categories  where categoryid=?",[req.body.categoryid],function(error,result){
        if(error){
            console.log(error)
            res.status(500).json({result:false})
        }
        else{
            res.status(200).json({result:true})
        }
    })
  
});
router.post('/editcategorydata',function(req, res, next) {
    console.log(req.body.categoryid)
    console.log(req.body.categoryname)
   
    pool.query("update categories set categoryname=? where categoryid=?",[req.body.categoryname,req.body.categoryid],function(error,result){
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

router.get('/displayallcategories' ,function(req, res, next) {
    console.log(req.query)
    pool.query("select * from categories",function(error,result){
   if(error)
   {
    res.status(500).json({result:[]})
   
   }
   else
   {    
       res.status(200).json({result:result})
   }
   
   
   
    })
   
   
   });



module.exports = router;