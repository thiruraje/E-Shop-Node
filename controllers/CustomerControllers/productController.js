
var categoryModel=require('../../models/category-model');
var productModel=require('../../models/product-model');

module.exports={


productListPage:function(req, res) {
    if(req.session.loggedin){
        categoryModel.readData(function(categoryData){
            productModel.readData(function(productList){
                res.render('customer/product-list', {categoryData:categoryData,productList:productList,auth:req.session.customer[0]}); 
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
            res.render('customer/product-list', {categoryData:categoryData, productList:productBycategory,auth:req.session.customer[0]});
        });
    });
    
},
productDetail:function(req, res) {
    const categoryName=req.params.name;
    productModel.productBtId(req.params.id,function(product){
        res.render('customer/product-detail', {product:product,auth:req.session.customer[0]});
    });
},


contact:function(req, res) {
    if(req.session.loggedin){
        res.render('customer/contact');
    }else{
        res.redirect('/customer/login')
    }
   
},


}