var db=require('../database');


module.exports={ 
    isExit:function(mobile,callback){
      var sql = 'SELECT * FROM customer WHERE mobile = ? '; 
      db.query(sql, [mobile],function (err, data) {
      if (err) throw err;
        return callback(data);
      });
    },
    createData:function(inputData,callback){
        var sql = 'INSERT INTO customer SET ?'; 
        db.query(sql, inputData,function (err, data) {
        if (err) throw err;
          return callback(data);
        });
      },
      getById:function(id,callback){
        var sql = 'SELECT * FROM customer WHERE id=?'; 
        db.query(sql,[id],function (err, data) {
        if (err) throw err;
          return callback(data);
        });
      },
      login:function(mobile,password,callback){
        var sql = 'SELECT * FROM customer WHERE mobile = ? AND password = ?'; 
        db.query(sql, [mobile,password],function (err, data) {
        if (err) throw err;
          return callback(data);
        });
      },

      readData:function(callback){
        var sql='SELECT * FROM customer';
        db.query(sql, function (err, data, fields) {
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