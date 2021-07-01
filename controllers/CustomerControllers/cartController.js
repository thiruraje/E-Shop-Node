
var cartModel=require('../../models/cart-model');

module.exports={

    cartList:function(req, res) {
        if(req.session.loggedin){
            var totalPrice = 0;
            cartModel.readCart(req.session.customer[0].id,function(allCartData){

                allCartData.forEach(cart => {
                    totalPrice = totalPrice +( parseInt(cart.rate) * cart.qty)
                });
                req.session.coupon  = false;
                res.render('customer/cart',{allCartData:allCartData,auth:req.session.customer[0],totalPrice :totalPrice});
            });
        }else{
            res.redirect('/customer/login')
        }
    },
    addCart:function(req, res) {
        if(req.session.loggedin){
            cartModel.isExitProduct(req.params.id,req.session.customer[0].id,function(exitData){
                if(exitData.length === 0){
                    const inputData ={
                        customer_id :req.session.customer[0].id,
                        product_id :req.params.id,
                        qty:1
                    }
                    cartModel.createData(inputData,function(data){
                        res.redirect('/customer/cart')
                    });
                }else{
                    res.redirect('/customer/cart')
                }
            });
        }else{
            res.redirect('/customer/login')
        }
    },
    removeCart:function(req, res) {
        if(req.session.loggedin){
            cartModel.removeCart(req.session.customer[0].id,req.params.id,function(data){
                res.redirect('/customer/cart')
            });
        }else{
            res.redirect('/customer/login')
        }
    },
    updateQty:function(req, res) {
        console.log(req.body.new_quantity)
        cartModel.updateQty(req.body.cart_id,req.body.new_quantity,function(data){
           res.send('success');
        });
    },
    addCoupon:function(req, res) {
        if( 1207 === parseInt(req.body.coupon_code)){
            req.session.coupon = true;
            res.send('success');
        }else{
            req.session.coupon = false;
            res.send('fail');
        }
    },
}