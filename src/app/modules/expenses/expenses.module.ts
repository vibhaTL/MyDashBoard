import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';  // ✅ Add this

import { ExpensesRoutingModule } from './expenses-routing.module';
import { ExpensesComponent } from './expenses.component';

@NgModule({
  declarations: [
    ExpensesComponent
  ],
  imports: [
    CommonModule,
    FormsModule,  // ✅ Make sure this is here
    ExpensesRoutingModule
  ]
})
export class ExpensesModule { }
