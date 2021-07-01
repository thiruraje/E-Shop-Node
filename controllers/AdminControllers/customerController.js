var customerModel=require('../../models/customer-model');
var moment = require('moment');


module.exports={

view:function(req, res) {
    customerModel.readData(function(data){
        res.render('admin/customer/view', {customerData:data}); 
    });
},

detail:function(req, res) {
    const cus_id=req.params.id;
    var allInfo =[];
    customerModel.getOrderedDetail(cus_id,function(orders){
        orders.forEach(order => {
            customerModel.getOrders(cus_id,order.order_id,function(data){
                var orderedProductsArr = [];
                for (var i = 0; i < data.length; i++) {
                    orderedProductsArr.push(data[i]);
                };
                var obj = {};
                obj['order'] = order;
                obj['orderedProducts'] = orderedProductsArr;
                allInfo.push(obj)
                if (allInfo.length === orders.length) {
                    res.render('admin/customer/detail',{allOrdersInfo:allInfo,moment: moment})
                }
            });
        });
    });
},

}