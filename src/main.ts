import { AppModule } from './app/app.module';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

platformBrowserDynamic()
    .bootstrapModule(AppModule)
    .catch(error => {
        // eslint-disable-next-line no-console
        console.error(error);
    });
