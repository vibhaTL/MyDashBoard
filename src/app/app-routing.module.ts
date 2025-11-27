import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'notes', loadChildren: () => import('./modules/notes/notes.module').then(m => m.NotesModule), canActivate: [AuthGuard] },
  { path: 'tasks', loadChildren: () => import('./modules/tasks/tasks.module').then(m => m.TasksModule), canActivate: [AuthGuard] },
  { path: 'expenses', loadChildren: () => import('./modules/expenses/expenses.module').then(m => m.ExpensesModule), canActivate: [AuthGuard] },
  { path: 'reminders', loadChildren: () => import('./modules/reminders/reminders.module').then(m => m.RemindersModule), canActivate: [AuthGuard] },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
