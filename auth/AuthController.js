var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
var User = require('../user/User');

var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var config = require('../config');
var verifyToken = require('./VerifyToken')

router.post('/register',function(req,res){
    User.findOne({ email:req.body.email }, function(err,user){
        if(user) return res.status(409).send("Email exist");
        var hashedPassword = bcrypt.hashSync(req.body.password,8);
        User.create({
            name : req.body.name,
            password : hashedPassword,
            email : req.body.email,
            roles : []
        },
        function(err,user){
            if(err) return res.send(err);
            
            var token = jwt.sign({id:user._id },config.secret,{
                expiresIn:86400
            });

            res.status(200).send({auth:true,token:token});
        });
    })
});

router.get('/me',verifyToken,function(req,res){
    User.findById(req.userId,{password:0},function(err,user){
        if(err) return res.status(500).send('Error');
        if(!user) return res.status(404).send('Not found');
        res.status(200).send(user);
    });
});

router.post('/login',function(req,res){
    User.findOne({ email:req.body.email },function(err,user){
        if(err) return res.status(500).send('error');
        if(!user) return res.status(404).send('Not found');

        var passwordIsValid = bcrypt.compareSync(req.body.password,user.password);
        if(!passwordIsValid) return res.status(401).send({auth:false, token:null});

        var token = jwt.sign({id:user._id},config.secret,{
            expiresIn:86400
        });

        res.status(200).send({auth:true,token:token});
    });
});



module.exports = router;

