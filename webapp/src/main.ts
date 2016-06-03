import { bootstrap } from '@angular/platform-browser-dynamic';
import { enableProdMode, Injectable, provide } from '@angular/core';
import { HTTP_PROVIDERS, BrowserXhr } from '@angular/http';
import { ROUTER_PROVIDERS } from '@angular/router';

import { FaradayAppComponent, environment } from './app/';

@Injectable()
class CORSBrowserXhr extends BrowserXhr {
  build() {
    let xhr = super.build();
    xhr.withCredentials = true;
    return xhr;
  }
}

if (environment.production) {
  enableProdMode();
}

bootstrap(FaradayAppComponent, [
  HTTP_PROVIDERS,
  provide(BrowserXhr, {useClass: CORSBrowserXhr}),
  ROUTER_PROVIDERS,
]);
