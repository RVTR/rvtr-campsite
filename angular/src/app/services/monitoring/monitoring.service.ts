import { ErrorHandler, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as Sentry from '@sentry/angular';
import { environment } from 'environment';

@Injectable({
  providedIn: 'root',
})
export class MonitoringService implements ErrorHandler {
  constructor(private readonly router: Router) {}

  handleError(error: unknown): void {
    const errorHandler = Sentry.createErrorHandler({
      logErrors: !environment.production,
      showDialog: false,
    });

    errorHandler.handleError(error);
    // this.router.navigate(['/error']); disabled error page in favor of toast notifications
  }
}
