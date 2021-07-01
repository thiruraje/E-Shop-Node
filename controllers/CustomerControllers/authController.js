
var customerModel=require('../../models/customer-model');

module.exports={

    register:function(req, res) {
          customerModel.isExit(req.body.mobile,function(isExit){
              if(isExit.length === 0){
                const inputData= {
                    name:req.body.name,
                    email:req.body.email,
                    mobile:req.body.mobile,
                    password:req.body.password,
                  };
                  customerModel.createData(inputData,function(data){
                    customerModel.getById(data.insertId,function(lstIsertedData){
                        req.session.loggedin = true;
                        req.session.customer = lstIsertedData;
                        res.redirect('/customer/home');            
                      });
                  });
              }else{
                res.send('Already exit!');
              }
          });
    },
    login:function(req, res) {
        var mobile =  req.body.mobile;
        var password = req.body.password;
        if (mobile && password) {
            customerModel.login(mobile,password,function(data){
                if (data.length > 0) {
                    req.session.loggedin = true;
				    req.session.customer = data;
                    // console.log(req.session.customer[0].id)
                    res.redirect('/customer/home');
                } else {
                    res.send('Incorrect Username and/or Password!');
                }
                res.end();
          });
        }else {
            res.send('Please enter Username and Password!');
            res.end();
        }
    },
    logout:function(req, res) {
        req.session.loggedin = false;
        req.session.coupon = false;
        res.redirect('/customer/login');
    },
}