var express = require('express');
var router = express.Router();
var pool = require('./pool')
var upload = require('./multer')

router.post('/saveproductimages',upload.any(),function(req, res, next) {
    console.log(req.body)
   console.log(req.files);
   var q="insert into productimages(categoryid,subcategoryid,brandid,productid,image)values ?"
   pool.query(q,[req.files.map((item)=> [req.body.categoryid,req.body.subcategoryid,req.body.brandid,req.body.productid,item.filename] )],function(error,result){

        if(error){
            console.log(error)
            res.status(500).json({result:false})
        }
        else{
            res.status(200).json({result:true})
        }
    })
  
});



router.post('/fetchproductimages',upload.any(),function(req, res, next) {
  console.log(req.body)
 console.log(req.files);
 
 pool.query("select * from productimages where productid=?",[req.body.productid],function(error,result){

      if(error){
          console.log(error)
          res.status(500).json({result:false})
      }
      else{
          res.status(200).json({result:result})
      }
  })

});

router.post("/displayallproductimages", function (req, res, next) {
    pool.query(
      "select P.*,(select C.categoryname from categories C where C.categoryid=P.categoryid)as categoryname,(select S.subcategoryname from subcategories S where S.subcategoryid=P.subcategoryid)as subcategoryname,(select B.brandname from brand B where B.brandid=P.brandid)as brandname from products P where P.brandid=? and P.subcategoryid=?",[req.body.brandid,req.body.subcategoryid],
      function (error, result) {
        if (error) {
          res.status(500).json({ result: [] });
        } else {
          res.status(200).json({ result: result });
        }
      }
    );
  });

  router.post("/editdata", function (req, res, next) {
    console.log(req.body);
    pool.query(
      "update productimages set categoryid=?,subcategoryid=?,brandid=?,productid=? where productimagesid=?",
      [
        req.body.categoryid,
        req.body.subcategoryid,
        req.body.brandid,
        req.body.productid,
        req.body.productimages
        
      ],
      function (error, result) {
        if (error) {
          console.log(error);
          res.status(500).json({ result: false });
        } else {
          res.status(200).json({ result: true });
        }
      }
    );
  });




//// Update Product Icon Route
router.post('/editicon',upload.single('icon'), function(req, res) {
    console.log(req.body);
    
    pool.query("update productimages set image=? where productimagesid=?",[req.myfilename,req.body.productimagesid],function(error,result){

        if(error){
            console.log(error)
            res.status(500).json({result:"false"})
        }else{
            res.status(200).json({result:"true"})
        }

    })

  });


/// Delete Products Route
router.post('/deletedata', function(req, res) {

    pool.query("delete from productimages where productimagesid=?",[req.body.productimagesid],function(error,result){

if(error){
    console.log(error);
res.status(500).json({result:[]})
}
else{
    // console.log(result)
    res.status(200).json({result:result})

}

})

  });

  router.get('/displayproductimages',function(req, res, next) {
    console.log(req.query)
    console.log(req.file)
    pool.query("select P.*,(select C.categoryname from categories C where C.categoryid=P.categoryid)as categoryname,(select S.subcategoryname from subcategories S where S.subcategoryid=P.subcategoryid)as subcategoryname,(select B.brandname from brand B where B.brandid=P.brandid)as brandname,(select Pr.productname from products Pr where Pr.productid=P.productid)as productname from productimages P",function(error,result){
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