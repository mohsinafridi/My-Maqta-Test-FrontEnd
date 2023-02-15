import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NotemanagementRoutingModule } from './notemanagement-routing.module';

import { NoteListComponent } from './components/note-list/note-list.component';
import { AddNoteComponent } from './components/add-note/add-note.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DatetimeFormatPipe } from 'src/app/core/pipes/datetime.pipe';

@NgModule({
  declarations: [AddNoteComponent, NoteListComponent, DatetimeFormatPipe],
  imports: [
    CommonModule,
    NotemanagementRoutingModule,
    RouterModule,
    ReactiveFormsModule,
  ],
})
export class NotemanagementModule {}
