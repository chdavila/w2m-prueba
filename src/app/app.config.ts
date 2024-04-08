import { ApplicationConfig } from '@angular/core';
import { provideRouter, withViewTransitions } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { routes } from './app.routes';
import { loaderInterceptor } from './core/interceptors';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(
      withInterceptors([loaderInterceptor])
    ),
    provideRouter(routes, withViewTransitions()),
    provideAnimationsAsync(),
  ]
};
