var express = require('express');
var mongojs = require('mongojs');
var bodyparser = require('body-parser');
var mongo = require('mongodb');
var app = express();
app.use(bodyparser());
app.use(bodyparser.json({ limit: '5mb' }));
app.use(bodyparser.urlencoded({ extended: true }));
var db = mongojs('Expense', []);

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "POST, PUT, GET,DELETE, OPTIONS");
    next();
});

app.post('/insertExpense', function (req, res) {

    db.expenses.insert({
        'Category': req.body.Category, "itemName": req.body.itemName, "Amount": req.body.Amount,
        "expenseDate": req.body.expenseDate
    }, function (err, doc) {
        if (err) {
            console.log(err);
        } else {
            res.json(doc);
        }
    })
})

app.get('/getExpenses', function (req, res) {
    db.expenses.aggregate([{
        $group: {
            _id: "$Category", sum: { $sum: "$Amount" }
        }
    }], function (err, doc) {
        if (err) {
            console.log(err)
        } else {
            res.json(doc);
        }
    })
})

app.get('/budget', function (req, res) {
    db.TotalBudget.find({}, function (err, doc) {
        if (err) {
            console.log(err);
        }
        else {
            res.json(doc);
        }
    })
})

app.put('/updateBuget', function (req, res) {

    var Id = req.body.oldDetails[0]._id;
    db.TotalBudget.update({ '_id': mongojs.ObjectID(Id) }, { $set: { 'Budget': req.body.newValue } }, function (err, doc) {
        if (err) {
            console.log(err)
        } else {
            res.json(doc);
        }
    })

})

app.post('/insertCategory:name', function (req, res) {
    var categoryName = req.params.name;
    var status;
    db.Categories.find({ "categoryName": { $exists: true, $eq: categoryName } }, function (err, doc) {
        if (doc.length == 0) {
            db.Categories.insert({ 'categoryName': categoryName }, function (err, doc1) {
                if (err) {
                    console.log(err)
                }
                else {
                    status = 'Pass';
                    res.json(status);
                }
            })
        } else {
            status = 'Fail';
            res.json(status);
        }
    })
})

app.get('/getCategory', function (req, res) {
    db.Categories.find({}, function (err, doc) {
        res.json(doc);
    })
})

app.delete('/deleteCategory:id', function (req, res) {

    var Id = req.params.id;
    db.Categories.remove({ '_id': mongojs.ObjectID(Id) }, function (err, doc) {
        if (err) {
            console.log(err)
        } else {
            res.json(doc);
        }
    })
})

app.get('/getTotal', function (req, res) {
    db.expenses.aggregate([{
        $group: {
            _id: "", sum: { $sum: "$Amount" }
        }
    }], function (err, doc) {
        if (err) {
            console.log(err)
        } else {
            res.json(doc);
        }
    })

})

app.get('/allExpense', function (req, res) {
    db.expenses.find({}, function (err, doc) {
        res.json(doc);
    })
})

app.put('/updateExpenses', function (req, res) {
    db.expenses.update({ '_id': mongojs.ObjectID(req.body.id) },
        { $set: { 'Category': req.body.Category, 'itemName': req.body.itemName, 'Amount': req.body.Amount, 'expenseDate': req.body.expenseDate } },
        function (err, doc) {
            if (err) {

            } else {
                res.json(doc);
            }
        })
})

//for inserting the totalBudget at the beging
require('./servers/defaultDBs')(app)

const port = 4444;
app.listen(port, function () {
    console.log("port is running on " + port);
})