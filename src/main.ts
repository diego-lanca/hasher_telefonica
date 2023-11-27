import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { AuthService } from './app/home/services/auth.service';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));