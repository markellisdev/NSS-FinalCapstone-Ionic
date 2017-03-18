import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app.module';
import { Http } from 'angular2/http';
import { provide} from 'angular2/core';
import {AuthHttp, AuthConfig} from 'angular2-jwt';

platformBrowserDynamic().bootstrapModule(AppModule);
