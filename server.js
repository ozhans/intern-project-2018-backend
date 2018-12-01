var express = require('express');
var app = express();
var mongoose = require('mongoose');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var cors = require('cors');
var AuthController = require('./auth/AuthController');
var requireAdmin = require('./roles/requireAdmin');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://127.0.0.1:27017/mydb',{useMongoClient: true,promiseLibrary: global.Promise});
app.use(morgan('dev'));                                         
app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(methodOverride());
app.use(cors());

app.use('/api/auth',AuthController);

app.use(function(req, res, next) {
   res.header("Access-Control-Allow-Origin", "*");
   res.header('Access-Control-Allow-Methods', 'DELETE, PUT');
   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
   next();
});
 

var Person = mongoose.model('Data', {
    name: String,
    surname: String,
    birthday: Date,
    gender: String,
    number: Number,
    phone: Number,
    phone2: Number,
    address: String,
});

var Doctor = mongoose.model('doctor', {
    name: String,
    surname: String,
    salary: Number,
    birthday: Date,
    phone: Number,
    address: String,
    comment: String,
    title: String
});

var Appointment = mongoose.model('appointment', {
    person : String,
    doctor : String,
    date : Date,
    hour: Number,
    minute: Number,
});

var Record = mongoose.model('record', {
    h_id : String,
    date : Date,
    start : Date,
    end : Date,
    type : String,
    illness : String,
    doctor : String,
    state : String,
});

var Product = mongoose.model('product', {
    product_code : String,
    name : String,
    stock : Number,
    comment : String,
});

var Firm = mongoose.model('firm', {
    name : String,
    phone : Number,
    address : String,
    comment : String,
    account_number: Number,
    balance : Number
});

var FirmProduct = mongoose.model('firm_product', {
    f_id:String,
    product : String,
    date : Date,
    quantity : Number,
    quantity_type : String,
    tax : Number,
    discount : Number,
    price : Number,
    total_price : Number,
    currency : String
});

var FirmPayment = mongoose.model('firm_payment', {
    f_id:String,
    deadline : Date,
    amount : Number,
    currency : String,
    instalment : Number,
    comment : String,
});

app.get('/api/data', function(req, res) {
    console.log("fetching person");
    Person.find(function(err, data) {
        if (err)
            res.send(err)
        res.json(data); 
    });
});

app.get('/api/doctors', function(req, res) {
    console.log("fetching doctor");
    Doctor.find(function(err, data) {
        if (err)
            res.send(err)
        res.json(data); 
    });
});

app.get('/api/appointments', function(req, res) {
    console.log("fetching appointments");
    Appointment.find(function(err, data) {
        if (err)
            res.send(err)
        res.json(data); 
    });
});

app.get('/api/records', function(req, res) {
    console.log("fetching records");
    Record.find(function(err, data) {
        if (err)
            res.send(err)
        res.json(data); 
    });
});

app.get('/api/products', function(req, res) {
    console.log("fetching products");
    Product.find(function(err, data) {
        if (err)
            res.send(err)
        res.json(data); 
    });
});

app.get('/api/firms', function(req, res) {
    console.log("fetching firms");
    Firm.find(function(err, data) {
        if (err)
            res.send(err)
        res.json(data); 
    });
});

app.get('/api/firm-products', function(req, res) {
    console.log("fetching firm products");
    FirmProduct.find(function(err, data) {
        if (err)
            res.send(err)
        res.json(data); 
    });
});

app.get('/api/firm-payments', function(req, res) {
    console.log("fetching firm payments");
    FirmPayment.find(function(err, data) {
        if (err)
            res.send(err)
        res.json(data); 
    });
});

app.post('/api/data',requireAdmin, function(req, res) {
    console.log("creating person");
    Person.create({
        name: req.body.name,
        surname: req.body.surname,
        birthday: req.body.birthday,
        gender: req.body.gender,
        number: req.body.number,
        phone: req.body.phone,
        phone2: req.body.phone2,
        address: req.body.address,
        done : false
    }, function(err, data) {
        if (err)
            res.send(err);
        Person.find(function(err, data) {
            if (err)
                res.send(err)
            res.json(data);
        });
    });

});

app.post('/api/doctors',requireAdmin, function(req, res) {
    console.log("creating doctor");
    Doctor.create({
        name: req.body.name,
        surname: req.body.surname,
        salary: req.body.salary,
        birthday: req.body.birthday,
        phone: req.body.phone,
        address: req.body.address,
        comment: req.body.comment,
        title: req.body.title,
        done : false
    }, function(err, data) {
        if (err)
            res.send(err);
        Doctor.find(function(err, data) {
            if (err)
                res.send(err)
            res.json(data);
        });
    });

});

app.post('/api/appointments',requireAdmin, function(req, res) {
    console.log("creating appointment");
    Appointment.create({
        person : req.body.person,
        doctor : req.body.doctor,
        date : req.body.date,
        hour : req.body.hour,
        minute: req.body.minute,
        done : false
    }, function(err, data) {
        if (err)
            res.send(err);
        Appointment.find(function(err, data) {
            if (err)
                res.send(err)
            res.json(data);
        });
    });

});

app.post('/api/records',requireAdmin, function(req, res) {
    console.log("creating record");
    Record.create({
        h_id : req.body.h_id,
        date : req.body.date,
        start : req.body.start,
        end : req.body.end,
        type : req.body.type,
        illness : req.body.illness,
        doctor : req.body.doctor,
        state : req.body.state,
        done : false
    }, function(err, data) {
        if (err)
            res.send(err);
        Record.find(function(err, data) {
            if (err)
                res.send(err)
            res.json(data);
        });
    });

});

app.post('/api/products',requireAdmin, function(req, res) {
    console.log("creating product");
    Product.create({
        product_code : req.body.product_code,
        name : req.body.name,
        stock : req.body.stock,
        comment : req.body.comment,
        done : false
    }, function(err, data) {
        if (err)
            res.send(err);
        Product.find(function(err, data) {
            if (err)
                res.send(err)
            res.json(data);
        });
    });

});

app.post('/api/firms',requireAdmin, function(req, res) {
 
    console.log("creating firm");
    Firm.create({
        name : req.body.name,
        phone : req.body.phone,
        address : req.body.address,
        comment : req.body.comment,
        account_number: req.body.account_number,
        balance : req.body.balance,
        done : false
    }, function(err, data) {
        if (err)
            res.send(err);

        Firm.find(function(err, data) {
            if (err)
                res.send(err)
            res.json(data);
        });
    });
});

app.post('/api/firm-products',requireAdmin, function(req, res) {
 
    console.log("creating firm product");
    FirmProduct.create({
        f_id: req.body.f_id,
        product :req.body.product,
        date :req.body.date,
        quantity :req.body.quantity,
        quantity_type :req.body.quantity_type,
        tax :req.body.tax,
        discount :req.body.discount,
        price :req.body.price,
        total_price :req.body.total_price,
        currency :req.body.currency,
        done : false
    }, function(err, data) {
        if (err)
            res.send(err);

        FirmProduct.find(function(err, data) {
            if (err)
                res.send(err)
            res.json(data);
        });
    });
});

app.post('/api/firm-payments',requireAdmin, function(req, res) {
    console.log("creating firm payment");
    FirmPayment.create({
        f_id:req.body.f_id,
        deadline :req.body.deadline,
        amount :req.body.amount,
        currency :req.body.currency,
        instalment :req.body.instalment,
        comment :req.body.comment,
        done : false
    }, function(err, data) {
        if (err)
            res.send(err);
        FirmPayment.find(function(err, data) {
            if (err)
                res.send(err)
            res.json(data);
        });
    });

});

app.put('/api/data/:data_id',requireAdmin,function(req,res){
    Person.findById(req.params.data_id, function(err,person){
        if(err) res.send(err);
        if(req.body.name) person.name = req.body.name;
        if(req.body.surname) person.surname = req.body.surname;
        if(req.body.birthday) person.birthday = req.body.birthday;
        if(req.body.gender) person.gender = req.body.gender;
        if(req.body.number) person.number = req.body.number;
        if(req.body.phone) person.phone = req.body.phone;
        if(req.body.phone2) person.phone2 = req.body.phone2;
        if(req.body.address) person.address = req.body.address;

        person.save( function (err,data) {
            if (err) res.send(err);
            res.json(data);
          });
          
    });

});

app.put('/api/doctors/:doctor_id',requireAdmin,function(req,res){
    Doctor.findById(req.params.doctor_id, function(err,doctor){
        if(err) res.send(err);
        if(req.body.name) doctor.name = req.body.name;
        if(req.body.surname) doctor.surname = req.body.surname;
        if(req.body.salary) doctor.salary = req.body.salary;
        if(req.body.birthday) doctor.birthday = req.body.birthday;
        if(req.body.phone) doctor.phone = req.body.phone;
        if(req.body.address) doctor.address = req.body.address;
        if(req.body.comment) doctor.comment = req.body.comment;
        if(req.body.title) doctor.title = req.body.title;
        
        doctor.save( function (err,data) {
            if (err) res.send(err);
            res.json(data);
          });
          
    });

});

app.put('/api/appointments/:appointment_id',requireAdmin,function(req,res){
    Appointment.findById(req.params.appointment_id, function(err,appointment){
        if(err) res.send(err);
        if(req.body.person) appointment.person = req.body.person;
        if(req.body.doctor) appointment.doctor = req.body.doctor;
        if(req.body.date) appointment.date = req.body.date;
        if(req.body.hour) appointment.hour = req.body.hour;
        if(req.body.minute) appointment.minute = req.body.minute;

        appointment.save( function (err,data) {
            if (err) res.send(err);
            res.json(data);
          });
          
    });

});

app.put('/api/records/:record_id',requireAdmin,function(req,res){
    Record.findById(req.params.record_id, function(err,record){
        if(err) res.send(err);
        if(req.body.h_id) record.h_id = req.body.h_id;
        if(req.body.date) record.date = req.body.date;
        if(req.body.start) record.start = req.body.start;
        if(req.body.end) record.end = req.body.end;
        if(req.body.type) record.type = req.body.type;
        if(req.body.illness) record.illness = req.body.illness;
        if(req.body.doctor) record.doctor = req.body.doctor;
        if(req.body.state) record.state = req.body.state;

        record.save( function (err,data) {
            if (err) res.send(err);
            res.json(data);
          });
          
    });

});

app.put('/api/firms/:firm_id',requireAdmin,function(req,res){
    Firm.findById(req.params.firm_id, function(err,firm){
        if(err) res.send(err);
        if(req.body.name) firm.name = req.body.name;
        if(req.body.phone) firm.phone = req.body.phone;
        if(req.body.address) firm.address = req.body.address;
        if(req.body.comment) firm.comment = req.body.comment;
        if(req.body.account_number) firm.account_number = req.body.account_number;
        if(req.body.balance) firm.balance = req.body.balance;

        firm.save( function (err,data) {
            if (err) res.send(err);
            res.json(data);
          });
          
    });

});

app.put('/api/firm-payments/:payment_id',requireAdmin,function(req,res){
    FirmPayment.findById(req.params.payment_id, function(err,payment){
        if(err) res.send(err);
        if(req.body.f_id) payment.f_id = req.body.f_id;
        if(req.body.deadline) payment.deadline = req.body.deadline;
        if(req.body.amount) payment.amount = req.body.amount;
        if(req.body.currency) payment.currency = req.body.currency;
        if(req.body.instalment) payment.instalment = req.body.instalment;
        if(req.body.comment) payment.comment = req.body.comment;

        payment.save( function (err,data) {
            if (err) res.send(err);
            res.json(data);
          });
          
    });

});

app.put('/api/firm-products/:product_id',requireAdmin,function(req,res){
    FirmProduct.findById(req.params.product_id, function(err,product){
        if(err) res.send(err);
        if(req.body.f_id) product.f_id = req.body.f_id;
        if(req.body.product) product.product = req.body.product;
        if(req.body.date) product.date = req.body.date;
        if(req.body.quantity) product.quantity = req.body.quantity;
        if(req.body.quantity_type) product.quantity_type = req.body.quantity_type;
        if(req.body.tax) product.tax = req.body.tax;
        if(req.body.discount) product.discount = req.body.discount;
        if(req.body.price) product.price = req.body.price;
        if(req.body.total_price) product.total_price = req.body.total_price;
        if(req.body.currency) product.currency = req.body.currency;

        product.save( function (err,data) {
            if (err) res.send(err);
            res.json(data);
          });
    });
});

app.put('/api/products/:product_id',requireAdmin,function(req,res){
    Product.findById(req.params.product_id, function(err,product){
        if(err) res.send(err);
        if(req.body.product_code) product.product_code = req.body.product_code;
        if(req.body.name) product.name = req.body.name;
        if(req.body.stock) product.stock = req.body.stock;
        if(req.body.comment) product.comment = req.body.comment;

        product.save( function (err,data) {
            if (err) res.send(err);
            res.json(data);
          });
    });
});

app.delete('/api/data/:data_id',requireAdmin, function(req, res) {
    Person.remove({
        _id : req.params.data_id
    }, function(err, data) {

    });
});

app.delete('/api/doctors/:doctor_id',requireAdmin, function(req, res) {
    Doctor.remove({
        _id : req.params.doctor_id
    }, function(err, data) {

    });
});

app.delete('/api/appointments/:appointment_id',requireAdmin, function(req, res) {
    Appointment.remove({
        _id : req.params.appointment_id
    }, function(err, data) {

    });
});

app.delete('/api/records/:record_id',requireAdmin, function(req, res) {
    Record.remove({
        _id : req.params.record_id
    }, function(err, data) {

    });
});

app.delete('/api/products/:product_id',requireAdmin, function(req, res) {
    Product.remove({
        _id : req.params.product_id
    }, function(err, data) {

    });
});

app.delete('/api/firms/:firm_id',requireAdmin, function(req, res) {
    
    Firm.remove({
        _id : req.params.firm_id
    }, function(err, data) {

    });
});

app.delete('/api/firm-products/:prod_id',requireAdmin, function(req, res) {
    FirmProduct.remove({
        _id : req.params.prod_id
    }, function(err, data) {

    });
});

app.delete('/api/firm-payments/:payment_id',requireAdmin, function(req, res) {
    FirmPayment.remove({
        _id : req.params.payment_id
    }, function(err, data) {

    });
});

app.listen(8080);
console.log("Listening port 8080");

module.exports = app;