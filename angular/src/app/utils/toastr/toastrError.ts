import { ToastrService } from 'ngx-toastr';

export function toastrError(msg: string, title: string, toastrService: ToastrService): void {
  toastrService.error(msg, title, {
    disableTimeOut: true,
    positionClass: 'toast-top-center',
  });
}
