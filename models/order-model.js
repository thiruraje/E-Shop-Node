var db=require('../database');


module.exports={ 

    createDelevery:function(inputData,callback){
        var sql = 'INSERT INTO delivery SET ?'; 
        db.query(sql, inputData,function (err, data) {
        if (err) throw err;
          return callback(data);
        });
      },

      createOrder:function(products,callback){
        var sql = 'INSERT INTO orders SET ?'; 
        db.query(sql, products,function (err, data) {
        if (err) throw err;
          return callback(data);
        });
      },

      getProducts:function(cus_id,callback){
        var sql='SELECT * FROM cart WHERE customer_id = ?';
        db.query(sql,[cus_id], function (err, data) {
          if (err) throw err;
          return callback(data);
        });
      },
      removeCartDatas:function(cus_id,callback){
        var sql = 'DELETE FROM cart WHERE  customer_id = ?'; 
        db.query(sql,[cus_id],function (err, data) {
        if (err) throw err;
          return callback(data);
        });
      },

      getOrderedDetail:function(cus_id,callback){
        var sql='SELECT * FROM delivery  WHERE customer_id = ?';
        db.query(sql,[cus_id], function (err, data) {
          if (err) throw err;
          return callback(data);
        });
      },
      getOrders:function(cus_id,order_id,callback){
        var sql='SELECT * FROM orders INNER JOIN product ON orders.product_id = product.id  WHERE orders.customer_id = ? AND orders.order_id = ?';
        db.query(sql,[cus_id,order_id], function (err, data) {
          if (err) throw err;
          return callback(data);
        });
      },
     
      
}