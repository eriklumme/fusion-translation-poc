import { RouterLocation } from '@vaadin/router';
import { makeAutoObservable } from 'mobx';
import { use } from 'lit-translate';

export class AppStore {
  applicationName = 'Fusion Translations';

  // The location, relative to the base path, e.g. "hello" when viewing "/hello"
  location = '';

  currentViewTitleKey = '';

  language = '';

  constructor() {
    makeAutoObservable(this);
  }

  setLocation(location: RouterLocation) {
    if (location.route) {
      this.location = location.route.path;
    } else if (location.pathname.startsWith(location.baseUrl)) {
      this.location = location.pathname.substr(location.baseUrl.length);
    } else {
      this.location = location.pathname;
    }
    this.currentViewTitleKey = (location?.route as any)?.titleKey || '';
  }

  async setLanguage(language: string) {
    await use(language);
    this.language = language;
  }
}
export const appStore = new AppStore();
