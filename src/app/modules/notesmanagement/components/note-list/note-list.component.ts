import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/modules/shared/services/notification.service';
import { Note } from '../../models/note';
import { NoteService } from '../../services/note.service';

@Component({
  selector: 'app-note-list',
  templateUrl: './note-list.component.html',
  styleUrls: ['./note-list.component.css'],
})
export class NoteListComponent implements OnInit {
  notes: Note[];

  constructor(
    private router: Router,
    private noteService: NoteService,
    private notifyService: NotificationService
  ) {}

  ngOnInit() {
    this.getNotes();
  }

  goToAddNote() {
    this.router.navigate(['/note/add']);
  }
  getNotes() {
    this.noteService.getNotes().subscribe({
      next: (data) => {
        this.notes = data;
      },
      error: (error) => {
        this.notifyService.showError('Error occur while getting notes.');
      },
    });
  }

  onDeleteNote(id: any) {
    this.router.navigate(['/note/list']);
  }
}
