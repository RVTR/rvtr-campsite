import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { scan, skip } from 'rxjs/operators';

@Injectable({
  providedIn: 'any',
})
/**
 * A lightweight state management class
 * Accumulates objects/releases on set conditions via pipes
 * Although its generic, T is best as a partial
 * This allows sub objects of initial objects to overwrite
 * state of the accumulator object
 */
export class GenericEditingService<T> {
  /**
   * Receiver and transmitter object
   */
  private readonly subject = new Subject<T>();

  /**
   * Pipe off of subject in this class
   * Accumulates objects passed to it
   * 1st pass complete model
   * 2nd send partials to build new state
   * Filter payload conditions below
   */
  editUpdates = this.subject.pipe(
    scan(
      (acc: T | null, curr: T | null) =>
        typeof curr === 'object' ? Object.assign({} as T, acc, curr) : null,
      // This seed value could be updated to reflect an initial state
      {} as T
    )
  );

  /**
   * Piped from the accumulating editUpdates stream
   * skip first emission to allow accumulator object to tak on inital state
   * Add pipes as needed for emission conditions
   */
  payloadEmitter = this.editUpdates.pipe(skip(1));
  /**
   * Call this to push updated state to payload
   */
  update(e: T): void {
    this.subject.next(e);
  }
  constructor() {}
}
