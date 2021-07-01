
var cartModel=require('../../models/cart-model');
var orderModel=require('../../models/order-model');
var moment = require('moment');

module.exports={
    view:function(req, res) {
        if(req.session.loggedin){
            var allInfo =[];
            orderModel.getOrderedDetail(req.session.customer[0].id,function(orders){
                if(orders.length === 0){
                    res.render('customer/orders',{auth:req.session.customer[0],allOrdersInfo:allInfo,moment: moment})
                }else{
                    orders.forEach(order => {
                        orderModel.getOrders(req.session.customer[0].id,order.order_id,function(data){
                            var orderedProductsArr = [];
                            for (var i = 0; i < data.length; i++) {
                                orderedProductsArr.push(data[i]);
                            };
                            var obj = {};
                            obj['order'] = order;
                            obj['orderedProducts'] = orderedProductsArr;
                            allInfo.push(obj)
                            if (allInfo.length === orders.length) {
                                res.render('customer/orders',{auth:req.session.customer[0],allOrdersInfo:allInfo,moment: moment})
                            }
                        });
                    });
                }
               
            });
        }else{
            res.redirect('/customer/login')
        }
    },

    save:function(req, res) {
        if(req.session.loggedin){
            var totalPrice = 0;
            var isDiscount = false;
            cartModel.readCart(req.session.customer[0].id,function(allCartData){
                allCartData.forEach(cart => {
                    totalPrice = totalPrice +( parseInt(cart.rate) * cart.qty)
                });
                if(req.session.coupon){
                    totalPrice = totalPrice - (totalPrice*20/100)
                    isDiscount = true;
                }
                var order_id = Math.floor(Math.random() * (50000 - 5000) + 5000);
                const inputData= {
                    order_id: order_id,
                    customer_id:req.session.customer[0].id,
                    final_amount:totalPrice + 50,
                    fname:req.body.fname,
                    lname:req.body.lname,
                    number:req.body.number,
                    country:req.body.country,
                    state:req.body.state,
                    address:req.body.address,
                    post_code:req.body.post,
                    payment_method:req.body.payment,
                    isDiscount : isDiscount,
                    created: new Date()
                };
                if(req.body.payment === "online"){
                    inputData.holder_name = req.body.holder_name;
                    inputData.card_number = req.body.card_number;
                    inputData.ex_date = req.body.ex_date;
                    inputData.cvv = req.body.cvv;
                }
                req.session.coupon = false;
                orderModel.createDelevery(inputData,function(data){
                    orderModel.getProducts(req.session.customer[0].id,function(products){
                        products.forEach(product => {
                            var pro ={
                                order_id:order_id,
                                customer_id :req.session.customer[0].id,
                                product_id : product.product_id,
                                qty :product.qty
                            }
                            orderModel.createOrder(pro,function(orderInsert){
                                console.log("Inserted Order")
                                
                            });
                        });
                        orderModel.removeCartDatas(req.session.customer[0].id,function(removeedDatas){
                            res.redirect('/customer/view-order')
                        });
                    });
                });
            });
        }else{
            res.redirect('/customer/login')
        }
    },
    
}