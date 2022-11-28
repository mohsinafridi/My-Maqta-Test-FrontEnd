import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { RegexpPattern } from 'src/app/modules/shared/constant/constants';
import { NotificationService } from 'src/app/modules/shared/services/notification.service';
import { UtilityService } from 'src/app/modules/shared/services/utility.service';
import { Book } from '../../models/book';
import { BookService } from '../../services/book.service';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent implements OnInit {

  id: number;
  isAddMode: boolean;
  submitted = false;
  subscription: Subscription | undefined;
  AddBookForm: FormGroup;
  AddOrUpdateBook : string = "Add Book";
  constructor(private fb: FormBuilder, private utilityService: UtilityService,
    private bookService: BookService, private notifyService: NotificationService,
    private route: ActivatedRoute, private router: Router) { }

    ngOnInit(): void {
      this.id = this.route.snapshot.params['id'];
      this.isAddMode = !this.id;
  
      if (!this.isAddMode) {
        this.AddOrUpdateBook = "Update Book"
        this.bookService.getBookById(this.id)
          .subscribe(
            result => {
              this.AddBookForm.patchValue({
                Name: result.name,
                Author: result.author,
                Price: result.price,
                Category: result.category
              });
            });
      }
  
      this.AddBookForm = this.fb.group({
        Name: [
          "",
          [
            Validators.required,
            Validators.pattern(new RegExp(RegexpPattern.FirstLastName)),
          ],
        ],
        Author: [
          "",
          [
            Validators.required,
            Validators.pattern(new RegExp(RegexpPattern.FirstLastName)),
          ],
        ],
        Price: [
          "",
          [
            Validators.required,        
          ],
        ],
        Category: [
          "",
          [
            Validators.required,
            Validators.pattern(new RegExp(RegexpPattern.FirstLastName)),
          ],
        ]
      });
    }
  

  navigateBack(){
    this.router.navigate(['/book/list']);
  }

  onAddBook() {
    this.submitted = true;
    const addBook = this.AddBookForm.value;
    let model: Book = {
      Id: 0,
      Name: addBook.Name,
      Author: addBook.Author,
      Price: addBook.Price,
      Category: addBook.Category
    };

    if (this.isAddMode) {
      this.addBook(model);
    } else {
      model.Id = this.id;
      this.updateBook(model);
    }
  }

  addBook(request: Book) {
    this.bookService.addBook(request)
      .subscribe({
        next: () => {
          this.notifyService.showSuccess('Book saved successfully.');
          this.router.navigate(['/book/list']);
        },
        error: () => {
          this.notifyService.showError("Error occur while saving Book.");
        }
      });
  }


  updateBook(request: Book) {
    this.bookService.updateBook(request)
      .subscribe({
        next: () => {
          this.notifyService.showSuccess('Book updated successfully.');
          this.router.navigate(['/book/list']);
        },
        error: () => {
          this.notifyService.showError("Error occur while updating Book.");
        }
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
