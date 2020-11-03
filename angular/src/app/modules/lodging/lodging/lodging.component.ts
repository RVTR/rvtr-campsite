import { Component, OnInit } from '@angular/core';
import { LodgingService } from '../../../services/lodging/lodging.service';
import { Lodging } from '../../../data/lodging.model';
import { ToastrService } from 'ngx-toastr'; // adding ngx-toastr for api service error notifications

@Component({
  selector: 'uic-lodging',
  templateUrl: './lodging.component.html',
  styleUrls: ['./lodging.component.scss'],
})
export class LodgingComponent implements OnInit {
  /**
   * fields used in this component
   */
  lodgings: Lodging[] | null = null;

  /**
   * represents lodging component's constructor
   * @param lodgingService the lodging service
   */
  constructor(
    private readonly lodgingService: LodgingService,
    private readonly toastrService: ToastrService
  ) {}

  /**
   * gets all the lodging available with the help of
   * get() in lodging service component
   */
  ngOnInit(): void {
    this.lodgingService.get().subscribe(
      (data) => {
        this.lodgings = data;

        if (this.lodgings != null) {
          this.lodgings?.forEach((lodging) => {
            this.lodgingService
              .getImages(lodging.id.toString())
              .subscribe((urls) => (lodging.imageUrls = urls));
          });
        }
      },
      (err) => {
        console.log(err);
        this.toastrService.error(`${err.message}`, 'Service Error', {
          disableTimeOut: true,
          positionClass: 'toast-top-center',
        });
      }
    );
  }
}
