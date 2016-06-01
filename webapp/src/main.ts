import { bootstrap } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { HTTP_PROVIDERS } from '@angular/http';
import { ROUTER_PROVIDERS } from '@angular/router';

import { FaradayAppComponent, environment } from './app/';

if (environment.production) {
  enableProdMode();
}

bootstrap(FaradayAppComponent, [
  HTTP_PROVIDERS,
  ROUTER_PROVIDERS,
]);
