var db=require('../database');


module.exports={ 


  createData:function(inputData,callback){
    var sql = 'INSERT INTO product SET ?'; 
    db.query(sql, inputData,function (err, data) {
    if (err) throw err;
      return callback(data);
    });
  },
  readData:function(callback){
    var sql='SELECT * FROM product';
    db.query(sql, function (err, data, fields) {
    if (err) throw err;
    return callback(data);
    });  
  },
  
  editData:function(editId, callback){
    
    var sql=`SELECT * FROM product WHERE id=${editId}`;
    db.query(sql, function (err, data) {
      if (err) throw err;
      return callback(data[0]);
    });
  },
  updateData:function(inputData,updateId,callback){
    
    var sql = `UPDATE product SET ? WHERE id= ?`;
    db.query(sql, [inputData, updateId], function (err, data) {
    if (err) throw err;
     return callback(data);
  });
  },
  deleteData:function(deleteId,callback){
    var sql = 'DELETE FROM product WHERE id = ?';
    db.query(sql, [deleteId], function (err, data) {
    if (err) throw err;
     return callback(data);
  });
  },

  productBycategory:function(categoryName,callback){
    var sql='SELECT * FROM product WHERE category = ?';
    db.query(sql,[categoryName], function (err, data, fields) {
    if (err) throw err;
    return callback(data);
    });  
  },

  productBtId:function(proId,callback){
    var sql='SELECT * FROM product WHERE id = ?';
    db.query(sql,[proId], function (err, data, fields) {
    if (err) throw err;
    return callback(data);
    });  
  },
}