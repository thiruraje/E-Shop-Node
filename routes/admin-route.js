var express = require('express');
var router = express.Router();
var categoryController=require('../controllers/AdminControllers/categoryController');
var productController=require('../controllers/AdminControllers/productController');
var customerController=require('../controllers/AdminControllers/customerController');




router.get('/home',function (req, res) {
    res.render('admin/index')
});
router.get('/login',function (req, res) {
    res.render('admin/index')
});

router.get('/add-category',categoryController.add);
router.post('/save-category',categoryController.save);
router.get('/view-category',categoryController.view);
router.get('/edit-category/:id',categoryController.edit);
router.post('/update-category/:id',categoryController.update);
router.get('/delete-category/:id',categoryController.delete);


router.get('/add-product',productController.add);
router.post('/save-product',productController.save);
router.get('/view-product',productController.view);
router.get('/edit-product/:id',productController.edit);
router.post('/update-product/:id',productController.update);
router.get('/delete-product/:id',productController.delete);

router.get('/view-customer',customerController.view);
router.get('/detail-customer/:id',customerController.detail);



module.exports = router;