import { Component } from '@angular/core';
import { Quote } from '../models/quote';
import { Task } from '../models/task';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent {
  tasks: Task[] = [
    { title: '', completed: false } // Commence avec une tâche vide pour l'édition
  ];
  quotes: Quote[] = [
    { text: "Believe in yourself and all that you are." },
    { text: "The only way to do great work is to love what you do." },
    { text: "Don’t watch the clock; do what it does. Keep going." },
    { text: "Success is a journey, not a destination."},
    { text: "small progress is still progress."},
    { text: "Good things are coming."},
    { text: "One step at a time. You'll get there."},
    { text: "you are awesome"}
  ];
  dailyQuote: string = '';
  currentDate: string = ''; // Propriété pour la date
  notes: string = ''; // Propriété pour les notes
  localStorageKey = 'todoListData';

  ngOnInit(): void {
    this.loadTasksFromLocalStorage();
    this.setDailyQuote();
  }

  setDailyQuote(): void {
    const today = new Date().getDate();
    this.dailyQuote = this.quotes[(today - 1) % this.quotes.length].text;
  }

  addTask(): void {
    this.tasks.push({ title: '', completed: false }); // Ajoute une nouvelle tâche vide
    this.saveTasksToLocalStorage(); // Sauvegarde les tâches après l'ajout
  }

  saveTasksToLocalStorage(): void {
    const data = {
      tasks: this.tasks,
      date: this.currentDate,
      notes: this.notes,
      timestamp: new Date().getTime() // Enregistre le timestamp actuel
    };
    localStorage.setItem(this.localStorageKey, JSON.stringify(data));
  }

  loadTasksFromLocalStorage(): void {
    const dataString = localStorage.getItem(this.localStorageKey);
    if (dataString) {
      const data = JSON.parse(dataString);
      const now = new Date().getTime();
      const twentyFourHours = 24 * 60 * 60 * 1000; // 24 heures en millisecondes

      if (now - data.timestamp < twentyFourHours) {
        // Si les données sont encore valides (moins de 24 heures)
        this.tasks = data.tasks;
        this.currentDate = data.date;
        this.notes = data.notes;
      } else {
        // Si les données sont expirées, les supprimer
        localStorage.removeItem(this.localStorageKey);
      }
    }
  }

  updateTask(): void {
    this.saveTasksToLocalStorage(); // Sauvegarde les tâches après chaque modification
  }
}
