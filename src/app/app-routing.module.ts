import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { ExpenseHomeComponent } from './expense-home/expense-home.component';
import { ExpenseSettingComponent } from './expense-setting/expense-setting.component';


const routes: Routes = [

  {path:'home',component:ExpenseHomeComponent},
  {path:'setting',component:ExpenseSettingComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
