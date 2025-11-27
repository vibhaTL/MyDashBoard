import { Component, OnInit } from '@angular/core';

interface Reminder {
  title: string;
  description: string;
  dateTime: string;
  done: boolean;
}

@Component({
  selector: 'app-reminders',
  templateUrl: './reminders.component.html',
  styleUrls: ['./reminders.component.css']
})
export class RemindersComponent implements OnInit {

  reminders: Reminder[] = [];

  newTitle: string = '';
  newDescription: string = '';
  newDateTime: string = '';

  editIndex: number | null = null;
  editedTitle: string = '';
  editedDescription: string = '';
  editedDateTime: string = '';

  ngOnInit(): void {
    this.loadReminders();
  }

  addReminder() {
    if(this.newTitle && this.newDateTime) {
      const reminder: Reminder = {
        title: this.newTitle,
        description: this.newDescription,
        dateTime: this.newDateTime,
        done: false
      };
      this.reminders.push(reminder);
      this.newTitle = '';
      this.newDescription = '';
      this.newDateTime = '';
      this.saveReminders();
    }
  }

  deleteReminder(index: number) {
    this.reminders.splice(index, 1);
    this.saveReminders();
  }

  toggleDone(index: number) {
    this.reminders[index].done = !this.reminders[index].done;
    this.saveReminders();
  }

  startEdit(index: number) {
    this.editIndex = index;
    this.editedTitle = this.reminders[index].title;
    this.editedDescription = this.reminders[index].description;
    this.editedDateTime = this.reminders[index].dateTime;
  }

  saveEdit(index: number) {
    if(this.editedTitle && this.editedDateTime) {
      this.reminders[index] = {
        title: this.editedTitle,
        description: this.editedDescription,
        dateTime: this.editedDateTime,
        done: this.reminders[index].done
      };
      this.editIndex = null;
      this.saveReminders();
    }
  }

  cancelEdit() {
    this.editIndex = null;
  }

  saveReminders() {
    localStorage.setItem('reminders', JSON.stringify(this.reminders));
  }

  loadReminders() {
    const saved = localStorage.getItem('reminders');
    this.reminders = saved ? JSON.parse(saved) : [];
  }

}
