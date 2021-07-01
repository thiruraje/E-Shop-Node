var express = require('express');
var router = express.Router();
var productController=require('../controllers/CustomerControllers/productController');
var categoryController=require('../controllers/CustomerControllers/categoryController');
var homeController=require('../controllers/CustomerControllers/homeController');
var authController=require('../controllers/CustomerControllers/authController');
var cartController=require('../controllers/CustomerControllers/cartController');
var checkoutController=require('../controllers/CustomerControllers/checkoutController');
var orderController=require('../controllers/CustomerControllers/orderController');


router.get('/login',function (req, res) {
    res.render('customer/auth/login')
});
router.get('/register',function (req, res) {
    res.render('customer/auth/register')
});
router.post('/save-form',authController.register);
router.post('/login-form',authController.login);
router.get('/logout',authController.logout);


router.get('/home',homeController.home);
router.get('/home-category/:name',homeController.productList);



router.get('/product-list',productController.productListPage);
router.get('/product-detail/:id',productController.productDetail);
router.get('/product-category/:name',productController.productList);


router.get('/cart',cartController.cartList);
router.get('/add-cart/:id',cartController.addCart);
router.get('/remove-product/:id',cartController.removeCart);
router.post('/update-qty',cartController.updateQty);
router.post('/add-coupon',cartController.addCoupon);

router.get('/checkout',checkoutController.view);

router.get('/view-order',orderController.view);
router.post('/save-order',orderController.save);


router.get('/contact',productController.contact);

module.exports = router;