var express = require('express');
var router = express.Router();
var pool = require('./pool')
var upload = require('./multer')

router.post('/saveproduct',upload.single('picture') ,function(req, res, next) {
    console.log(req.body)
console.log(req.myfilename);
    pool.query("insert into products(categoryid,subcategoryid,brandid,productname,description,price,offerprice,offertype,stock,status,salestatus,rating,picture) values(?,?,?,?,?,?,?,?,?,?,?,?,?)",[req.body.categoryid,req.body.subcategoryid,req.body.brandid,req.body.productname,req.body.description,req.body.price,req.body.offerprice,req.body.offertype,req.body.stock,req.body.status,req.body.salestatus,req.body.rating,req.myfilename],function(error,result){
        if(error){
            console.log(error)
            res.status(500).json({result:false})
        }
        else{
            res.status(200).json({result:true})
        }
    })
  
});

//

router.get('/displayproduct',function(req, res, next) {
    console.log(req.query)
    console.log(req.file)
    pool.query("select * from products",function(error,result){
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


router.post('/displayproductbystatus',function(req, res, next) {
  console.log(req.body)
  console.log(req.file)
  pool.query("select * from products where salestatus=? and categoryid=? group by productname",[req.body.status,req.body.categoryid],function(error,result){
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

router.post('/displayproductbycategoryid',function(req, res, next) {
  console.log(req.body)
  console.log(req.file)
  pool.query("select P.*,(select C.categoryname from categories C where C.categoryid=P.categoryid)as categoryname,(select S.subcategoryname from subcategories S where S.subcategoryid=P.subcategoryid)as subcategoryname,(select B.brandname from brand B where B.brandid=P.brandid)as brandname from products P where  P.categoryid=?",[req.body.categoryid],function(error,result){
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


router.post('/displayproductbysubcategoryid',function(req, res, next) {
  console.log(req.body)
  console.log(req.file)
  pool.query("select * from products where salestatus=? group by productname",[req.body.salestatus],function(error,result){
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

//// Update Product Data Route
router.post("/editdata", function (req, res, next) {
    console.log(req.body);
    pool.query(
      "update products set categoryid=?,subcategoryid=?,brandid=?,productname=?,description=?,price=?,offerprice=?,offertype=?,stock=?,status=?,salestatus=? where productid=?",
      [
        req.body.categoryid,
        req.body.subcategoryid,
        req.body.brandid,
        req.body.productname,
        req.body.description,
        req.body.price,
        req.body.offerprice,
        req.body.offertype,
        req.body.stock,
        req.body.status,
        req.body.salestatus,
        req.body.productid,
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
    
    pool.query("update products set picture=? where productid=?",[req.myfilename,req.body.productid],function(error,result){

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

    pool.query("delete from products where productid=?",[req.body.productid],function(error,result){

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

  
  router.get("/displayallproducts", function (req, res, next) {
    pool.query(
      "select P.*,(select C.categoryname from categories C where C.categoryid=P.categoryid)as categoryname,(select S.subcategoryname from subcategories S where S.subcategoryid=P.subcategoryid)as subcategoryname,(select B.brandname from brand B where B.brandid=P.brandid)as brandname from products P",
      function (error, result) {
        if (error) {
          res.status(500).json({ result: [] });
        } else {
          res.status(200).json({ result: result });
        }
      }
    );
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

  router.post("/fetchproductdetails", function (req, res, next) {
    pool.query(
      "select P.*,(select C.categoryname from categories C where C.categoryid=P.categoryid)as categoryname,(select S.subcategoryname from subcategories S where S.subcategoryid=P.subcategoryid)as subcategoryname,(select B.brandname from brand B where B.brandid=P.brandid)as brandname from products P where P.productid=? ",[req.body.productid],
      function (error, result) {
        if (error) {
          res.status(500).json({ result: [] });
        } else {
          res.status(200).json({ result: result });
        }
      }
    );
  });








module.exports = router;