import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { first, Subscription } from 'rxjs';
import { NotificationService } from 'src/app/modules/shared/services/notification.service';
import { Note } from '../../models/note';
import { NoteService } from '../../services/note.service';
import * as moment from 'moment';

@Component({
  selector: 'app-add-note',
  templateUrl: './add-note.component.html',
  styleUrls: ['./add-note.component.css'],
})
export class AddNoteComponent implements OnInit {
  isAddMode: boolean = true;
  submitted: boolean = false;
  NoteAddOrUpdate = 'Add Note';
  id: number;
  dateModel: Date = new Date();
  note: Note;

  subscription: Subscription | undefined;
  noteForm: FormGroup;
  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private noteService: NoteService,
    private notifyService: NotificationService
  ) {}

  ngOnInit() {
    debugger;
    this.id = this.route.snapshot.params['id'];
    //  this.route.params.subscribe((params: Params) => {
    // this.id = +params['id'];
    if (this.id > 0) {
      this.noteService
        .getNoteById(this.id)
        .pipe(first())
        .subscribe({
          next: (data) => {
            this.noteForm.patchValue(data);
          },
          error: (error) => {
            this.notifyService.showError('Error occur while getting notes.');
          },
        });
      this.isAddMode = false;
      this.NoteAddOrUpdate = 'Update note';
    }
    //  });

    this.noteForm = this.fb.group({
      id: new FormControl(this.getRandomInt(1000)),
      content: ['', [Validators.required, Validators.maxLength(256)]],
      createdAt: ['', [Validators.required]],
    });
  }

  onAddNote() {
    this.submitted = true;
    const addNote = this.noteForm.value;
    let model: Note = {
      id: addNote.id,
      content: addNote.note,
      createdAt: addNote.createdAt,
    };

    if (this.isAddMode) {
      this.addNote(model);
    } else {
      model.id = this.id;
      this.updateNote(model);
    }
  }

  addNote(obj: Note) {
    this.noteService.addNote(obj).subscribe({
      next: () => {
        this.notifyService.showSuccess('Note added successfully.');
        this.router.navigate(['/note/list']);
      },
      error: (error) => {
        this.notifyService.showError(error);
      },
    });
  }

  updateNote(obj: Note) {
    this.noteService
      .updateNote(this.noteForm.value)
      .pipe(first())
      .subscribe({
        next: () => {
          // this.alertService.success('Note updated', { keepAfterRouteChange: true });
          this.router.navigate(['../../'], { relativeTo: this.route });
        },
        error: (error) => {
          // this.alertService.error(error);
        },
      });
  }

  formReset() {
    this.noteForm.reset();
    this.submitted = false;
  }

  get f() {
    return this.noteForm.controls;
  }

  navigateBack() {
    this.router.navigate(['/note/list']);
  }

  getRandomInt(max: any) {
    return Math.floor(Math.random() * max);
  }
}

export const DateTimeValidator = (fc: FormControl) => {
  const date = new Date(fc.value);
  const isValid = !isNaN(date.valueOf());
  return isValid
    ? null
    : {
        isValid: {
          valid: false,
        },
      };
};
