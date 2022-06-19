import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';


@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  constructor(private toastr: ToastrService) {
    this.initSettings();
  }

  toastrSetting: any;
  toastrTitle!: string;
  private initSettings() {
    this.toastrSetting = {
      enableHtml: true,
      timeOut: 4000,
      closeButton: true,
      preventDuplicates: true,
      position: 'toast-top-right',
      easing: 'ease-in',
      progressBar: 'true',
      progressAnimation: 'increasing'
    };
    this.toastrTitle = "Notification";
  }
  showSuccess(message: any) {
    this.toastr.success(message, this.toastrTitle, this.toastrSetting);
  }
  showWarning(message: any) {
    this.toastr.warning(message, this.toastrTitle, this.toastrSetting);
  }
  showError(message: any) {
    this.toastr.error(message, this.toastrTitle, this.toastrSetting);
  }
}
