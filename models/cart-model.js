var db=require('../database');


module.exports={ 
    isExitProduct:function(pro_id,cus_id,callback){
      var sql = 'SELECT * FROM cart WHERE product_id=? AND customer_id = ?'; 
      db.query(sql, [pro_id,cus_id],function (err, data) {
      if (err) throw err;
        return callback(data);
      });
    },
    createData:function(inputData,callback){
        var sql = 'INSERT INTO cart SET ? '; 
        db.query(sql, inputData,function (err, data) {
        if (err) throw err;
          return callback(data);
        });
      },

      readCart:function(cus_id,callback){
        var sql = 'SELECT product.*,cart.id,cart.product_id,cart.qty FROM cart INNER JOIN product ON product.id = cart.product_id WHERE cart.customer_id = ?'; 
        db.query(sql,[cus_id],function (err, data) {
        if (err) throw err;
          return callback(data);
        });
      },
      removeCart:function(cus_id,pro_id,callback){
        var sql = 'DELETE FROM cart WHERE product_id=? AND customer_id = ?'; 
        db.query(sql,[pro_id,cus_id],function (err, data) {
        if (err) throw err;
          return callback(data);
        });
      },

      updateQty:function(cart_id,qty,callback){
        var sql = 'UPDATE cart SET qty = ? WHERE id= ?'; 
        db.query(sql,[qty,cart_id],function (err, data) {
        if (err) throw err;
          return callback(data);
        });
      },
      
}