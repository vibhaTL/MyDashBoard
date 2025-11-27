import { Component, OnInit } from '@angular/core';

interface Expense {
  category: string;
  amount: number;
  note: string;
  date: string; // ISO string
}

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.css']
})
export class ExpensesComponent implements OnInit {

  expenses: Expense[] = [];
  categories = ['Food', 'Transport', 'Shopping', 'Bills', 'Other'];

  newCategory: string = '';
  newAmount: number | null = null;
  newNote: string = '';

  editIndex: number | null = null;
  editedCategory: string = '';
  editedAmount: number | null = null;
  editedNote: string = '';

  ngOnInit(): void {
    this.loadExpenses();
  }

  // Add expense
  addExpense() {
    if(this.newCategory && this.newAmount !== null) {
      const expense: Expense = {
        category: this.newCategory,
        amount: this.newAmount,
        note: this.newNote,
        date: new Date().toISOString()
      };
      this.expenses.push(expense);
      this.newCategory = '';
      this.newAmount = null;
      this.newNote = '';
      this.saveExpenses();
    }
  }

  // Delete expense
  deleteExpense(index: number) {
    this.expenses.splice(index, 1);
    this.saveExpenses();
  }

  // Edit expense
  startEdit(index: number) {
    this.editIndex = index;
    this.editedCategory = this.expenses[index].category;
    this.editedAmount = this.expenses[index].amount;
    this.editedNote = this.expenses[index].note;
  }

  saveEdit(index: number) {
    if(this.editedCategory && this.editedAmount !== null) {
      this.expenses[index] = {
        category: this.editedCategory,
        amount: this.editedAmount,
        note: this.editedNote,
        date: this.expenses[index].date
      };
      this.editIndex = null;
      this.saveExpenses();
    }
  }

  cancelEdit() {
    this.editIndex = null;
  }

  // Save/load localStorage
  saveExpenses() {
    localStorage.setItem('expenses', JSON.stringify(this.expenses));
  }

  loadExpenses() {
    const saved = localStorage.getItem('expenses');
    this.expenses = saved ? JSON.parse(saved) : [];
  }

  // Total expense
  getTotal() {
    return this.expenses.reduce((sum, e) => sum + e.amount, 0);
  }

  // Total by day
  getTotalByDay(dateStr: string) {
    return this.expenses
      .filter(e => new Date(e.date).toDateString() === new Date(dateStr).toDateString())
      .reduce((sum, e) => sum + e.amount, 0);
  }

  // Total by month
  getTotalByMonth(year: number, month: number) {
    return this.expenses
      .filter(e => {
        const d = new Date(e.date);
        return d.getFullYear() === year && d.getMonth() === month;
      })
      .reduce((sum, e) => sum + e.amount, 0);
  }

  // Get unique days for daily totals
  getUniqueDays(): string[] {
    const days = this.expenses.map(e => new Date(e.date).toDateString());
    return Array.from(new Set(days));
  }

  // Get unique months for monthly totals
  getUniqueMonths(): { year: number, month: number }[] {
    const months = this.expenses.map(e => {
      const d = new Date(e.date);
      return `${d.getFullYear()}-${d.getMonth()}`;
    });
    return Array.from(new Set(months)).map(m => {
      const parts = m.split('-');
      return { year: +parts[0], month: +parts[1] };
    });
  }

}
