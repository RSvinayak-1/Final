module.exports = function (app) {
  const express = require('express');
  var mongo = require('mongodb');
  const bodyParser = require('body-parser');
  var mongojs = require('mongojs');
  var db = mongojs('Expense', []);

  console.log("db server");
  function createDefaultCollections() {

    db.TotalBudget.find(function (err, total) {
      if (total.length == 0) {
        var obj2 = ({
          "Budget": 25000
        })

        db.TotalBudget.insert(obj2)
      } else {
        console.log(" not zero")
      }

    })

  }
  createDefaultCollections()

}