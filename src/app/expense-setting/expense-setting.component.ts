import { Component, OnInit } from '@angular/core';
import { ExpenseService } from '../services/expense.service';

@Component({
  selector: 'app-expense-setting',
  templateUrl: './expense-setting.component.html',
  styleUrls: ['./expense-setting.component.css'],
  providers: [ExpenseService]
})
export class ExpenseSettingComponent implements OnInit {
  Budget: Object;
  budget: any;
  updateStatus: Object;
  categoryStatus: Object;
  cName: string;
  categoryList: Object;

  constructor(private myService: ExpenseService) { }

  ngOnInit() {
    this.getBudget();
    this.getCategories();
  }

  getBudget() {
    this.myService.findBudget().subscribe(result => {
      this.Budget = result;
      this.budget = this.Budget[0].Budget;

    })
  }

  getCategories() {
    this.myService.getCategory().subscribe(res => {
      this.categoryList = res;
    })
  }

  addCategory(name) {

    if (name == undefined || name == '') {
      alert("please enter the category name to add")
    } else {
      this.myService.addCategory(name).subscribe(result => {
        this.categoryStatus = result;
        if (this.categoryStatus == 'Pass') {
          this.getCategories()
          alert("category successfully added");
          this.cName = '';

        } else {
          alert("Duplicates are not allowed");
          this.cName = '';
        }
      })
    }
  }

  updateBudget(total) {
    if (total == undefined || total == null) {
      alert("please enter the valid budget");
    } else {
      this.myService.editBudget(total, this.Budget).subscribe(result => {
        this.updateStatus = result;
        alert("Budget updated Successfully");
      });
    }
  }

  deleteCategory(data, i) {

    var permision = confirm("Category will be deleted permanently");
    if (permision == true) {
      this.myService.deleteCategory(data).subscribe(res => {
        var deleted = res;
        this.getCategories()
      });
    } else {
      console.log("ok");
    }
  }

}
