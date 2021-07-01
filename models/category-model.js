var db=require('../database');


module.exports={ 
  createData:function(inputData,callback){

    var sql = 'INSERT INTO category SET ?'; 

    db.query(sql, inputData,function (err, data) {
    if (err) throw err;
      return callback(data);
    });
  },
  readData:function(callback){
    var sql='SELECT * FROM category';
    db.query(sql, function (err, data, fields) {
    if (err) throw err;
    return callback(data);
    });  
  },
  editData:function(editId, callback){
    
    var sql=`SELECT * FROM category WHERE id=${editId}`;
    db.query(sql, function (err, data) {
      if (err) throw err;
      return callback(data[0]);
    });
  },
  updateData:function(inputData,updateId,callback){
    
    var sql = `UPDATE category SET ? WHERE id= ?`;
    db.query(sql, [inputData, updateId], function (err, data) {
    if (err) throw err;
     return callback(data);
  });
  },
  deleteData:function(deleteId,callback){
    var sql = 'DELETE FROM category WHERE id = ?';
    db.query(sql, [deleteId], function (err, data) {
    if (err) throw err;
     return callback(data);
  });
  },

 



}