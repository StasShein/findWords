import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';

import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyAkHYcaHZE3jtIJhkewZR9PhNYkd0SQ0gw",
  authDomain: "find-words-be4e1.firebaseapp.com",
  projectId: "find-words-be4e1",
  storageBucket: "find-words-be4e1.appspot.com",
  messagingSenderId: "539871455606",
  appId: "1:539871455606:web:14cdf88a1e3c2ecef13257"
};

const app = initializeApp(firebaseConfig);

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes)]
};
