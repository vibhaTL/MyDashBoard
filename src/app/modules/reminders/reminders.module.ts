import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { RemindersRoutingModule } from './reminders-routing.module';
import { RemindersComponent } from './reminders.component';

@NgModule({
  declarations: [
    RemindersComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RemindersRoutingModule
  ]
})
export class RemindersModule { }
