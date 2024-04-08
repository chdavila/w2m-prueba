import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';

import { OverlayService } from '../services';

import { LoaderComponent } from '../../shared/components';
import { catchError, finalize, throwError } from 'rxjs';

let service_count = 0;

export const loaderInterceptor: HttpInterceptorFn = (req, next) => {
  const overlayService = inject(OverlayService);
  service_count++;
  if(service_count === 1) overlayService.openFromComponent(LoaderComponent);
  return next(req).pipe(
    finalize(() => {
      service_count--;
      if (service_count === 0) overlayService.closeOverlay();
    })
  );
};
