import { Component, OnInit } from '@angular/core';
import { LodgingService } from '../../../services/lodging/lodging.service';
import { Lodging } from '../../../data/lodging.model';

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
  constructor(private readonly lodgingService: LodgingService) {}

  /**
   * gets all the lodging available with the help of
   * get() in lodging service component
   */
  ngOnInit(): void {
    this.lodgingService.get().subscribe((data) => (this.lodgings = data));
  }
}
