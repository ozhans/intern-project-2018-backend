var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
var User = require('./User');


router.post('/', function (req, res) {
    User.create({
            name : req.body.name,
            email : req.body.email,
            password : req.body.password,
            roles : req.body.roles
        }, 
        function (err, user) {
            if (err) return res.status(500).send("Server error");
            res.status(200).send(user);
        });
});


router.get('/', function (req, res) {
    User.find({}, function (err, users) {
        if (err) return res.status(500).send("Server error");
        res.status(200).send(users);
    });
});


router.get('/:id', function (req, res) {
    User.findById(req.params.id, function (err, user) {
        if (err) return res.status(500).send("Server error");
        if (!user) return res.status(404).send("Not found");
        res.status(200).send(user);
    });
});




module.exports = router;