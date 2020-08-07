/**
 * importing the necessary modules, services and models.
 */
import { Component, OnInit } from '@angular/core';
import { LodgingService } from 'src/app/services/lodging/lodging.service';
import { Lodging } from 'src/app/data/lodging.model';
import { HttpErrorResponse } from '@angular/common/http';
import { Rental } from 'src/app/data/rental.model';

/**
 * Rental component metadata
 */
@Component({
  selector: 'uic-rental',
  templateUrl: './rental.component.html',
  styleUrls: ['./rental.component.scss'],
})

/**
 * This class represents the Rental component
 */
export class RentalComponent implements OnInit {
  /**
   * lodgings property
   * rentals property
   * setting familyRoomCount to 0
   * setting tripleRoomCount to 0
   * setting doubleRoomCount to 0
   */
  lodgings: Lodging[] | null = null;
  rentals: Rental[] | null = null;
  availabilityCount: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0];
  familyRoomCount = 0;
  tripleRoomCount = 0;
  doubleRoomCount = 0;

  /**
   * @param lodgingService
   * Constructor injects lodgingService
   */
  constructor(private readonly lodgingService: LodgingService) {}

  ngOnInit(): void {
    this.loadLodgings();
  }

  /**
   * uses a lodgingService to make a http get request to get
   * lodging information. It then sets the rentals variable to
   * the lodgings Rental property.
   */
  private loadLodgings(): void {
    this.lodgingService
      .get()
      .toPromise()
      .then((data) => (this.lodgings = data))
      .then(() => this.SetRentals())
      .catch((error) => this.handleError(error));
  }

  /**
   * sets the rentals property to the lodging's rentals property
   */
  public SetRentals(): void {
    if (this.lodgings) {
      this.rentals = this.lodgings[0].rentals;
      this.CountAvailableRooms();
    }
  }

  /**
   * Counts the available rooms based on the room type in each rental.
   */
  private CountAvailableRooms(): void {
    if (this.rentals) {
      this.rentals.forEach((element) => {
        if (element.status === 'available') {
          this.availabilityCount[element.rentalUnit.occupancy - 1]++;
        }
      });
    }
  }

  /**
   * @param error
   * Method handles error and converts the status code to string.
   */
  private handleError(error: HttpErrorResponse): void {
    let message: string;
    if (error.status === 0) {
      message = 'Unable to connect to server';
    } else {
      message = error.status.toString();
    }
  }
}
