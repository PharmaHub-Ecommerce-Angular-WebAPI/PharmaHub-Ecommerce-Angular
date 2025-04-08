import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

// main.ts
import { defineElement } from 'lord-icon-element';
import lottie from 'lottie-web';

// Initialize before bootstrap
defineElement(lottie.loadAnimation);

// Then bootstrap your app as normal
bootstrapApplication(AppComponent, appConfig)
  .catch(err => console.error(err));



  

