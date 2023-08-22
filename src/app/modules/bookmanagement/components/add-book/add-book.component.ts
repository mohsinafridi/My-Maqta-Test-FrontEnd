import { InterpolatedAttributeToken } from '@angular/compiler/src/ml_parser/tokens';
import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, first } from 'rxjs';
import { RegexpPattern } from 'src/app/modules/shared/constant/constants';
import { NotificationService } from 'src/app/modules/shared/services/notification.service';
import { IBook } from '../../models/book';
import { BookService } from '../../services/book.service';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css'],
})
export class AddBookComponent implements OnInit {
  id: number;
  isAddMode: boolean;
  submitted = false;
  subscription: Subscription | undefined;
  AddBookForm: FormGroup;
  AddOrUpdateBook: string = 'Add Book';
  book: IBook;

  constructor(
    private fb: FormBuilder,
    private bookService: BookService,
    private notifyService: NotificationService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.isAddMode = !this.id;
    if (!this.isAddMode) {
      this.bookService
        .getBookById(this.id)
        .pipe(first())
        .subscribe({
          next: (result) => {
            this.AddBookForm.patchValue(result);
            this.AddOrUpdateBook = 'Update book';
          },
          error: (error) => {
            this.notifyService.showError('Error occur while getting notes.');
          },
        });
    }

    this.AddBookForm = this.fb.group({
      id: new FormControl(),
      name: new FormControl([
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(30),
      ]),

      author: new FormControl([
        Validators.required,
        Validators.pattern(new RegExp(RegexpPattern.FirstLastName)),
      ]),

      price: new FormControl([Validators.required]),
      category: new FormControl([
        Validators.required,
        Validators.pattern(new RegExp(RegexpPattern.FirstLastName)),
      ]),
    });
  }

  navigateBack() {
    this.router.navigate(['/book/list']);
  }

  onAddBook() {
    this.submitted = true;
    const addBook = this.AddBookForm.value;
    let model: IBook = {
      id: 0,
      name: addBook.Name,
      author: addBook.Author,
      price: addBook.Price,
      category: addBook.Category,
    };

    if (this.isAddMode) {
      this.addBook(model);
    } else {
      model.id = this.id;
      this.updateBook(model);
    }
  }

  addBook(request: IBook) {
    this.bookService.addBook(request).subscribe({
      next: () => {
        this.notifyService.showSuccess('Book saved successfully.');
        this.router.navigate(['/book/list']);
      },
      error: () => {
        this.notifyService.showError('Error occur while saving Book.');
      },
    });
  }

  updateBook(request: IBook) {
    debugger;
    this.bookService.updateBook(this.AddBookForm.value).subscribe({
      next: () => {
        this.notifyService.showSuccess('Book updated successfully.');
        this.router.navigate(['/book/list']);
      },
      error: () => {
        this.notifyService.showError('Error occur while updating Book.');
      },
    });
  }

  formReset() {
    this.AddBookForm.reset();
    this.submitted = false;
  }

  get f(): { [key: string]: AbstractControl } {
    return this.AddBookForm.controls;
  }
}
