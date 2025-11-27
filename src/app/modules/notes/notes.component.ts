import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {

  notes: { text: string, date: string }[] = [];
  newNote: string = '';

  editIndex: number | null = null; // tracks note being edited
  editedText: string = '';

  ngOnInit(): void {
    this.loadNotes();
  }

  // Add a new note
  addNote() {
    if (this.newNote.trim()) {
      const note = {
        text: this.newNote,
        date: new Date().toLocaleString()
      };
      this.notes.push(note);
      this.newNote = '';
      this.saveNotes();
    }
  }

  // Delete a note
  deleteNote(index: number) {
    this.notes.splice(index, 1);
    this.saveNotes();
  }

  // Start editing a note
  startEdit(index: number) {
    this.editIndex = index;
    this.editedText = this.notes[index].text;
  }

  // Save edited note
  saveEdit(index: number) {
    if (this.editedText.trim()) {
      this.notes[index].text = this.editedText;
      this.editIndex = null;
      this.editedText = '';
      this.saveNotes();
    }
  }

  // Cancel edit
  cancelEdit() {
    this.editIndex = null;
    this.editedText = '';
  }

  // Save notes in localStorage
  saveNotes() {
    localStorage.setItem('notes', JSON.stringify(this.notes));
  }

  // Load notes from localStorage
  loadNotes() {
    const saved = localStorage.getItem('notes');
    this.notes = saved ? JSON.parse(saved) : [];
  }

}
