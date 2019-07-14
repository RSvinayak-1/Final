import { Component, OnInit } from '@angular/core';
import { ExpenseService } from '../services/expense.service';
import { HttpClient } from '@angular/common/http'

@Component({
  selector: 'app-expense-home',
  templateUrl: './expense-home.component.html',
  styleUrls: ['./expense-home.component.css'],
  providers: [ExpenseService]
})
export class ExpenseHomeComponent implements OnInit {
  expensesList = [];
  ActiveUpdate: Boolean = false;
  insertedResult: any;
  exsistingData: any;
  pieArray = [];
  p1Array: any;
  activatePie: number;
  activeTable: boolean;
  totalBudget: any;
  expenseTotal: any;
  seconPie = []
  activatePie2 = 0;
  divUp = 0;
  Category: string;
  itemName: string;
  Amount: any;
  expenseDate: any;
  AllExpenses: any;
  editingId: any;
  updateComplete: Object;
  constructor(private myService: ExpenseService) { }

  ngOnInit() {
    
    this.pieChart = Object.create(this.pieChart);
    this.myCharts();
    this.activeTable = false;
    this.getBudget();
    this.totalExpense();
    this.getAllExpenses();
  }

  public pieChart = {
    chartType: 'PieChart',
    dataTable: this.pieArray,
    options: {
      width: 500,
      height: 180,
      title: 'Category wise Split',
      legend: { position: 'bottom' },
      // slices: {
      //   0: {offset: 0.3},
      //   1: {offset: 0.2}
      // }
    }
  }

  public pieChart2 = {
    chartType: 'PieChart',
    dataTable: this.seconPie,
    options: {
      width: 240,
      height: 180,
      title: 'Budget Overview',
      legend: { position: 'bottom' },
      colors: ['green', 'red']
      // slices: {
      //   0: {offset: 0.3},
      //   1: {offset: 0.2}
      // }
    }
  }

  myCharts() {

    this.myService.getExistingExpenses().subscribe(
      result => {
        this.exsistingData = result;
        if (this.exsistingData.length != 0 && this.exsistingData.length <= 5) {
          this.activatePie = 1;
          this.Charts(this.exsistingData);
        } else {
          this.activeTable = true;
        }
      })
  }

  Charts(chartData) {

    this.pieArray = [];
    var pArray = ['Category', 'Total'];
    this.pieArray.push(pArray);

    for (let i = 0; i <= chartData.length - 1; i++) {
      var p1Array = [];
      p1Array.push(chartData[i]._id);
      p1Array.push(chartData[i].sum);
      this.pieArray.push(p1Array);

      if (this.pieArray.length != 0) {
        this.pieChart.dataTable = this.pieArray;
      }

    }
    
  }

  addExpenses() {

    this.divUp = 1;
    var expenseObject = {
      'Category': '',
      'itemName': '',
      'Amount': null,
      'expenseDate': undefined
    }
    this.expensesList.push(expenseObject);
  }


  saveExpense(Category, itemName, Amount, expenseDate) {

    if (Category == "" || Amount == null || itemName == "" || expenseDate == undefined) {
      alert("please Enter the data correctly before save");

    } else {
      var data = {
        'Category': Category,
        'itemName': itemName,
        'Amount': Amount,
        'expenseDate': expenseDate
      }
      this.myService.enteredExpenses(data).subscribe(
        result => {
          this.insertedResult = result;
          console.log(this.insertedResult);
          this.Category = '';
          this.itemName = '';
          this.Amount = null;
          this.expenseDate = undefined;
          this.divUp = 0;
          this.myCharts();
          this.getBudget();
          this.totalExpense();
          this.getAllExpenses();
        });
    }

  }

  editRow(data, index) {
    this.ActiveUpdate = true;
    this.Category = data.Category;
    this.itemName = data.itemName;
    this.Amount = data.Amount;
    this.expenseDate = data.expenseDate;
    this.editingId = data._id;
  }

  updateRow(Category, itemName, Amount, expenseDate) {
    var data = {
      'id': this.editingId,
      'Category': this.Category,
      'itemName': this.itemName,
      'Amount': this.Amount,
      'expenseDate': this.expenseDate
    }
    console.
      log(data);
    this.myService.updatedExpense(data).subscribe(result => {
      this.updateComplete = result;
      this.ngOnInit();
      console.log(this.updateComplete)
      this.myCharts();
          this.getBudget();
          this.totalExpense();
          this.getAllExpenses();
    });

  }

  getBudget() {
    this.myService.findBudget().subscribe(result => {
      this.totalBudget = result[0].Budget;

    })
  }

  totalExpense() {
    this.myService.sumAmount().subscribe(result => {
      this.expenseTotal = result[0].sum;
      // this.expenseTotal =0;
      var sarray = ['TotalBudget', 'TotalExpense'];
      var sarray2 = [];
      var sarray3 = [];
      sarray2.push('TotalBudget', this.totalBudget);
      sarray3.push('TotalExpense', this.expenseTotal);
      this.seconPie.push(sarray)
      this.seconPie.push(sarray2, sarray3)
      if (this.seconPie.length != 0) {
        this.activatePie2 = 1;
        this.pieChart2.dataTable = this.seconPie;
      }
    })
  }

  cancel() {
    this.divUp = 0;
  }

  getAllExpenses() {
    this.myService.allExpenses().subscribe(result => {
      this.AllExpenses = result;
    })
  }

  softDelete(data, index) {

    for (let i = 0; i <= this.AllExpenses.length - 1; i++) {
      if (i == index) {
        this.AllExpenses.splice(index, 1)

      }
    }

  }


}
