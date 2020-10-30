import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Lodging } from 'src/app/data/lodging.model';
import { LodgingService } from 'src/app/services/lodging/lodging.service';
import { ToastrService } from 'ngx-toastr'; // adding ngx-toastr for api service error notifications
import { toastrError } from '../../../utils/toastr/toastrError';

@Component({
  selector: 'uic-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss'],
})
export class BookingComponent {
  lodgings$: Observable<Lodging[]>;
  searchResults: Lodging[] = [];
  searchQuery!: string;
  isSearched = false;

  constructor(lodgingService: LodgingService, private readonly toastrService: ToastrService) {
    this.lodgings$ = lodgingService.get();
    this.lodgings$.subscribe(
      (res) => console.log(res),
      (err) => {
        console.log(err);
        toastrError(err, 'Service Error', this.toastrService);
      }
    );
  }
}
