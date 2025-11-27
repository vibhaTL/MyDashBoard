import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // ✅ Needed for ngModel

import { NotesRoutingModule } from './notes-routing.module';
import { NotesComponent } from './notes.component';

@NgModule({
  declarations: [
    NotesComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NotesRoutingModule
  ]
})
export class NotesModule { }
