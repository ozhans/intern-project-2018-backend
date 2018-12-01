var jwt = require('jsonwebtoken');
var config = require('../config');
var User = require('../user/User');

function requireAdmin(req,res,next) {
    var token = req.headers['x-access-token'];

    if(!token) return res.status(403).send({auth:false,message:'No token provided'});

    jwt.verify(token,config.secret,function(err,decoded){
        if(err) return res.status(500).send({auth:false,message:'Error'});
        User.findById(decoded.id,{password:0},function(err,user){
            if(err) return res.status(500).send({auth:false,message:'Error'});
            if(user.roles.indexOf('admin') > -1) next();
            else return res.status(401).send({auth:false,message:'Not authorized'});
        })
    })
}

module.exports = requireAdmin;