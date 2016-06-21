import { bootstrap } from '@angular/platform-browser-dynamic';
import { enableProdMode, Injectable, provide } from '@angular/core';
import { HTTP_PROVIDERS, BrowserXhr } from '@angular/http';

import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/retry';

import { FARADAY_ROUTER_PROVIDERS } from './app/faraday.routes';
import { FaradayAppComponent, environment } from './app';

import "angular2-materialize";

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
  FARADAY_ROUTER_PROVIDERS,
]);
