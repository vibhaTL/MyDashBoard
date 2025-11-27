import { Component, OnInit } from '@angular/core';

interface Task {
  text: string;
  completed: boolean;
  date: string;
}

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  tasks: Task[] = [];
  newTask: string = '';

  editIndex: number | null = null;
  editedText: string = '';

  ngOnInit(): void {
    this.loadTasks();
  }

  // Add new task
  addTask() {
    if(this.newTask.trim()) {
      const task: Task = {
        text: this.newTask,
        completed: false,
        date: new Date().toLocaleString()
      };
      this.tasks.push(task);
      this.newTask = '';
      this.saveTasks();
    }
  }

  // Delete task
  deleteTask(index: number) {
    this.tasks.splice(index, 1);
    this.saveTasks();
  }

  // Toggle completed status
  toggleComplete(index: number) {
    this.tasks[index].completed = !this.tasks[index].completed;
    this.saveTasks();
  }

  // Start editing a task
  startEdit(index: number) {
    this.editIndex = index;
    this.editedText = this.tasks[index].text;
  }

  // Save edited task
  saveEdit(index: number) {
    if(this.editedText.trim()) {
      this.tasks[index].text = this.editedText;
      this.editIndex = null;
      this.editedText = '';
      this.saveTasks();
    }
  }

  // Cancel edit
  cancelEdit() {
    this.editIndex = null;
    this.editedText = '';
  }

  // Save tasks to localStorage
  saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }

  // Load tasks from localStorage
  loadTasks() {
    const saved = localStorage.getItem('tasks');
    this.tasks = saved ? JSON.parse(saved) : [];
  }

}
