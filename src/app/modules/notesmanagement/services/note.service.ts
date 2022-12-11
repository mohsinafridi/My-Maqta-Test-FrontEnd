import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { Note } from '../models/note';

const baseUrl = 'https://localhost:5000/Notes';

@Injectable({
  providedIn: 'root',
})
export class NoteService {
  constructor(private httpClient: HttpClient) {}

  getNotes(): Observable<any> {
    return this.httpClient.get<Note[]>(baseUrl);
  }

  addNote(obj: Note) {
    return this.httpClient.post(baseUrl, obj);
  }

  getNoteById(Id: any) {
    return this.httpClient.get(baseUrl + '/' + Id);
  }

  updateNote(obj: Note) {
    return this.httpClient.put(baseUrl, obj);
  }
}
