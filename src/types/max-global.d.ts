import { MaxWebApp } from './index';

declare global {
  interface Window {
    WebApp: MaxWebApp;
  }
}

export {};
