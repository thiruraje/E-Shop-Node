
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
    const categoryName=req.params.name;
    categoryModel.readData(function(categoryData){
        productModel.productBycategory(categoryName,function(productBycategory){
            res.render('customer/index', {categoryData:categoryData, productList:productBycategory,auth:req.session.customer[0]});
        });
    });
    
},

}