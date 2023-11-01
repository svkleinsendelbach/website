import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { NewsletterModule } from './app/modules/newsletter/newsletter.module';

platformBrowserDynamic()
    .bootstrapModule(NewsletterModule)
    .catch(error => {
        console.error(error);
    });
