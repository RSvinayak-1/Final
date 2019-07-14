import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
@Injectable({
  providedIn: 'root'
})
export class ExpenseService {

  exsistingData: any;

  constructor(private http: HttpClient) { }

  enteredExpenses(data) {

    return this.http.post('http://localhost:4444/insertExpense', data);
  }

  getExistingExpenses() {
    return this.http.get('http://localhost:4444/getExpenses', {});
  }

  findBudget() {
    return this.http.get('http://localhost:4444/budget', {});
  }

  editBudget(enteredValue, Data) {
    var newData = {
      'newValue': enteredValue,
      'oldDetails': Data
    }
    return this.http.put('http://localhost:4444/updateBuget', newData, {});
  }

  addCategory(name) {
    return this.http.post('http://localhost:4444/insertCategory' + name, {});
  }

  getCategory() {
    return this.http.get('http://localhost:4444/getCategory', {});
  }

  deleteCategory(data) {
    return this.http.delete('http://localhost:4444/deleteCategory' + data._id, {});
  }

  sumAmount() {
    return this.http.get('http://localhost:4444/getTotal', {});
  }

  allExpenses() {
    return this.http.get('http://localhost:4444/allExpense', {});
  }

  updatedExpense(data) {
    return this.http.put('http://localhost:4444/updateExpenses', data, {});
  }
}
