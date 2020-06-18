import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { getTranslations, ParsedTranslationBundle } from '@locl/core';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { loadTranslations } from '@angular/localize';

if (environment.production) {
  enableProdMode();
}

// TODO: find a way to switch languages (eg. browser language or token in session storage)
const messages = '/assets/messages.de.json';
// const messages = '/assets/messages.en.json';

// VORHER:
// platformBrowserDynamic().bootstrapModule(AppModule)
//   .catch(err => console.error(err));

// NEU:
getTranslations(messages).then(
  (data: ParsedTranslationBundle) => {
    loadTranslations(data.translations); // <-- this happens before bootstrap!
    platformBrowserDynamic()
      .bootstrapModule(AppModule)
      .catch(err => console.error(err));
  }
);
