
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
search:function(req, res) {
    console.log(req.body.search_data)
    productModel.productSearchData(req.body.search_data,function(products){
        console.log(products)
        if(products.length > 0)
        {
            res.send(products);
            // products.forEach(product => {
            //     output += '<div class="col-lg-4 col-md-6 col-12">'+
            //     '<div class="single-product">'+
            //         '<div class="product-img">'+
            //             '<a href="/customer/product-detail/<%=product.id%>">'+
            //                 '<img class="default-img" src="/<%=product.image %>" alt="#">'+
            //                 '<img class="hover-img" src="/<%=product.image %>" alt="#">'+
                          
            //             '</a>'+
            //             '<div class="button-head">'+
            //                 '<div class="product-action">'+
            //                     '<a title="Compare" href="+"/customer/add-cart/<%=product.id%>"+"><i'
            //                             'class="ti-bag"></i><span>Add to cart</span></a>'+
            //                 '</div>'+
            //                 '<div class="product-action-2">'+
            //                     '<a title="Add to cart" href="/customer/add-cart/<%=product.id%>">Add to'+
            //                         'cart</a>'+
            //                 '</div>'+
            //             '</div>'+
            //         '</div>'+
            //         '<div class="product-content">'+
            //             '<h3><a href="/customer/product-detail/<%=product.id%>">'+
            //                     '<%=product.name%>'+
            //                 '</a></h3>'+
            //             '<div class="product-price">'+
            //                 '<span>₹<%=product.rate%>.00</span>'+
            //             '</div>'+
            //         '</div>'+
            //     '</div>'+
            // '</div>';
            // });
        }
        else
        {
            res.send(products)
        }
        // res.send(output)
        // res.render('customer/product-detail', {product:product,auth:req.session.customer[0]});
    });
   
},


}