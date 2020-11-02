import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  constructor(private toastrService: ToastrService) {}

  toastError(msg: string, title: string): void {
    this.toastrService.error(msg, title, {
      disableTimeOut: true,
      positionClass: 'toast-top-center',
    });
  }
}
