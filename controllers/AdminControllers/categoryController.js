var categoryModel=require('../../models/category-model');


module.exports={

add:function(req, res) {
    res.render('admin/category/add');
},
view:function(req, res) {
    categoryModel.readData(function(data){
        console.log(data)
        res.render('admin/category/list', {fetchData:data}); 
    });
},

save:function(req, res) {
    const inputData= {
        name:req.body.name,
      };
      categoryModel.createData(inputData,function(data){
        res.redirect('/admin/view-category');
        console.log(data.affectedRows + " record created");
      });
},
edit:function(req,res){
    const editId=req.params.id;
    console.log(editId)
    categoryModel.editData(editId,function(data){
      res.render('admin/category/edit', { editData:data});
      console.log(data.affectedRows + " record fetched");
    });
   
},
update:function(req,res){
    const inputData= { 
     name: req.body.name, 
    }; 
    const updateId=req.params.id;
    categoryModel.updateData(inputData,updateId,function(data){
      res.redirect('/admin/view-category');
      console.log(data.affectedRows + " record(s) updated");
    }); 
  },
  delete:function(req,res){
   
    const deleteId=req.params.id;
    categoryModel.deleteData(deleteId,function(data){
      res.redirect('/admin/view-category');
      console.log(data.affectedRows + " record deleted");
    });
   
  }


}