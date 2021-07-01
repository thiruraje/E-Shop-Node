
var cartModel=require('../../models/cart-model');

module.exports={

    view:function(req, res) {
        if(req.session.loggedin){
            var totalPrice = 0;
            var isCoupon = false ;
            cartModel.readCart(req.session.customer[0].id,function(allCartData){
                allCartData.forEach(cart => {
                    totalPrice = totalPrice +( parseInt(cart.rate) * cart.qty)
                });
                if(req.session.coupon){
                    isCoupon = true;
                    totalPrice = totalPrice - (totalPrice*20/100);
                }
                res.render('customer/checkout',{allCartData:allCartData,auth:req.session.customer[0],cartPrice :totalPrice,isCoupon:isCoupon});
            });
        }else{
            res.redirect('/customer/login')
        }
    },
    
}