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
import { Subscription } from 'rxjs';
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
    debugger;
    this.id = this.route.snapshot.params['id'];
    this.isAddMode = !this.id;

    if (!this.isAddMode) {
      this.AddOrUpdateBook = 'Update Book';
      this.bookService.getBookById(this.id).subscribe((result) => {
        this.AddBookForm.patchValue({
          name: result.name,
          author: result.author,
          price: result.price,
          category: result.category,
        });
      });
    }

    this.AddBookForm = this.fb.group({
      Name: new FormControl(this.book.name, [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(30),
      ]),

      Author: new FormControl(this.book.author, [
        Validators.required,
        Validators.pattern(new RegExp(RegexpPattern.FirstLastName)),
      ]),

      Price: new FormControl(this.book.price, [Validators.required]),
      Category: new FormControl(this.book.category, [
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
    this.bookService.updateBook(request).subscribe({
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
