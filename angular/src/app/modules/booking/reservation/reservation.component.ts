import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Booking } from 'data/booking.model';
import { Observable } from 'rxjs';
import { BookingService } from 'services/booking/booking.service';


@Component({
  selector: 'uic-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.scss']
})
export class ReservationComponent implements OnInit {

  id?:string|null;
  confirmationNumb:string|any;
  Booking$: Observable<Booking[]>;
  constructor(private route:ActivatedRoute, bookingService:BookingService ) {
    this.id = this.route.snapshot.paramMap.get("id") ;
    //BUG1//
    //We were only able to create booking trough POSTMAN not Swagger
    this.Booking$ = bookingService.get(this.id?this.id:"1");//bug1? needs more testing
    this.Booking$.subscribe((res)=>{
      console.log("res on ID its using "+res[0].id);
      console.log(res[0].bookingNumber);
      this.confirmationNumb = res[0].bookingNumber;

    })
  }

  ngOnInit(): void {
  }



}
