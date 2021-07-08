
var categoryModel=require('../../models/category-model');
var productModel=require('../../models/product-model');

module.exports={

home:function(req, res) {
    if(req.session.loggedin){
        categoryModel.readData(function(categoryData){
            productModel.readData(function(productList){
                res.render('customer/index', {categoryData:categoryData,productList:productList,auth:req.session.customer[0]}); 
            });
        });
    }else{
        res.redirect('/customer/login')
    }  
},
productList:function(req, res) {
    const categoryName=req.body.category_name;
    if(categoryName != ""){
        productModel.productBycategory(categoryName,function(productBycategory){
            res.send(productBycategory);
        });
    }else{
        productModel.readData(function(productList){
            res.send(productList);
        });
    }
},

}