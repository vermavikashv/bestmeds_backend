var express = require('express');
var router = express.Router();
var pool = require('./pool')
var upload = require('./multer')

router.post('/savesubcategory',upload.single('subicon') ,function(req, res, next) {
    console.log(req.body)
    console.log(req.file)
    pool.query("insert into subcategories(categoryid,subcategoryname,icon,description) values(?,?,?,?)",[req.body.categoryid,req.body.subcategoryname,req.myfilename,req.body.description],function(error,result){
        if(error){
            console.log(error)
            res.status(500).json({result:false})
        }
        else{
            res.status(200).json({result:true})
        }
    })
  
});



// router.get('/displayallsubcategory',function(req, res, next) {
//     console.log(req.body)
//     console.log(req.file)
    
//     pool.query("select * from subcategories",function(error,result){
//         if(error){
//             console.log(error)
//             res.status(500).json({result:[]})
//         }
//         else{
//             // console.log(result)
//             res.status(200).json({result:result})
//         }
//     })
  
// });




// router.get('/displaysubcategory',function(req, res, next) {
//     console.log(req.query.categoryid);
    
//     // console.log(req.query)
//     // console.log(req.file)
//     pool.query("select * from subcategories ",function(error,result){
//         if(error){
//             console.log(error)
//             res.status(500).json({result:[]})
//         }
//         else{
//             // console.log(result)
//             res.status(200).json({result:result})
//         }
//     })
  
// });

router.post('/editsubcategoryicon',upload.single('icon') ,function(req, res, next) {
    console.log(req.body)
    console.log(req.file)
    pool.query("update subcategories set icon=? where subcategoryid=?",[req.myfilename,req.body.subcategoryid],function(error,result){
        if(error){
            console.log(error)
            res.status(500).json({result:false})
        }
        else{
            res.status(200).json({result:true})
        }
    })
  
});

router.post('/deletesubcategory' ,function(req, res, next) {
    console.log(req.body)
    
    pool.query("delete from subcategories  where subcategoryid=?",[req.body.subcategoryid],function(error,result){
        if(error){
            console.log(error)
            res.status(500).json({result:false})
        }
        else{
            res.status(200).json({result:true})
        }
    })
  
});

router.post('/editsubcategorydata',function(req, res, next) {
    console.log(req.body.subcategoryid)
    console.log(req.body.subcategoryname)
   
    pool.query("update subcategories set categoryid=?,subcategoryname=?,description=? where subcategoryid=?",[req.body.categoryid,req.body.subcategoryname,req.body.description,req.body.subcategoryid],function(error,result){
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

// display sub categories route for display all subcategories in table
router.get('/displayallsubcategory',function(req, res, next) {
    console.log(req.body)
    console.log(req.file)
    pool.query("select s.*,(select c.categoryname from categories c where c.categoryid=s.categoryid)as catname from subcategories s",function(error,result){
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


//display sub categories route for dropdown 
router.post('/displaysubcategory',function(req, res, next) {
    console.log(req.body)
    console.log(req.file)
    pool.query("select * from subcategories where categoryid=?",[req.body.categoryid],function(error,result){
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






module.exports = router;