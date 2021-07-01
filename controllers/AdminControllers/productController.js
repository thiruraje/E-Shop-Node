var productModel=require('../../models/product-model');
var categoryModel=require('../../models/category-model');
const multer = require("multer")
const path = require("path")


module.exports={

add:function(req, res) {
    categoryModel.readData(function(data){
        console.log(data)
        res.render('admin/product/add', {fetchData:data}); 
    });
},
view:function(req, res) {
    productModel.readData(function(data){
        console.log(data)
        res.render('admin/product/view', {fetchData:data}); 
    });
},

save:function(req, res) {
    var storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, "uploads")
        },
        filename: function (req, file, cb) {
            cb(null,Date.now()+path.extname(file.originalname));
        }
    })
    var upload = multer({
        storage: storage,
    }).any();  
    
    upload(req,res,function(err) {
		if(err) {
			res.send(err)
		}
		else {
            var filename=  req.files[0].filename;

            const inputData= {
                name:req.body.name,
                rate:req.body.rate,
                category:req.body.category,
                color:req.body.color,
                description:req.body.description,
                image:filename,
                isoffer:req.body.isoffer,
              };
            productModel.createData(inputData,function(data){
                res.redirect('/admin/view-product');
                console.log(data.affectedRows + " record created");
            });
		}
	});
    
   
},
edit:function(req,res){
    const editId=req.params.id;
    productModel.editData(editId,function(productData){
        categoryModel.readData(function(categoryData){
                res.render('admin/product/edit',{ productData : productData, categoryData: categoryData });  

        });
       
    });
   
    
},
update:function(req,res){
    const updateId=req.params.id;
    var storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, "uploads")
        },
        filename: function (req, file, cb) {
            cb(null,Date.now()+path.extname(file.originalname));
        }
    })
    var upload = multer({
        storage: storage,
    }).any();  
    
    upload(req,res,function(err) {
		if(err) {
			res.send(err)
		}
		else {
            var filename=  req.files[0].filename;

            const inputData= {
                name:req.body.name,
                rate:req.body.rate,
                category:req.body.category,
                color:req.body.color,
                description:req.body.description,
                image:filename,
                isoffer:req.body.isoffer,
              };
            productModel.updateData(inputData,updateId,function(data){
                res.redirect('/admin/view-product');
                console.log(data.affectedRows + " record created");
            });
		}
	});
    
  },
  delete:function(req,res){
   
    const deleteId=req.params.id;
    productModel.deleteData(deleteId,function(data){
      res.redirect('/admin/view-product');
      console.log(data.affectedRows + " record deleted");
    });
   
  }


}