import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/modules/shared/services/notification.service';
import { BookService } from '../../services/book.service';

@Component({
  selector: 'app-get-books',
  templateUrl: './get-books.component.html',
  styleUrls: ['./get-books.component.css'],
})
export class GetBooksComponent implements OnInit {
  books: any;
  constructor(
    private bookService: BookService,
    private notifyService: NotificationService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getBooks();
  }

  getBooks() {
    return this.bookService.getBooks().subscribe(
      (data) => {
        this.books = data.body;
      },
      (error) => {
        this.notifyService.showError('Error occur while getting books.');
      }
    );
  }

  onDeleteEmployee(id: string) {debugger
    return this.bookService.deleteBookById(id).subscribe(
      () => {
        debugger
        this.router.navigate(['/book/list']);
      },
      (error) => {
        debugger
        this.router.navigate(['/book/list']);
        this.notifyService.showError('Error occur while deleting a book.');
      }
    );
  }
}
