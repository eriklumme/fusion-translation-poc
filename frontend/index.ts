import { Router } from '@vaadin/router';
import { routes } from './routes';
import { appStore } from './stores/app-store';
import {use, registerTranslateConfig, Strings} from "lit-translate";
import * as TranslationEndpoint from 'generated/TranslationEndpoint';
export const router = new Router(document.querySelector('#outlet'));

router.setRoutes(routes);

window.addEventListener('vaadin-router-location-changed', (e) => {
  appStore.setLocation((e as CustomEvent).detail.location);
  const title = appStore.currentViewTitleKey;
  if (title) {
    document.title = title + ' | ' + appStore.applicationName;
  } else {
    document.title = appStore.applicationName;
  }
});

registerTranslateConfig({
  loader: async lang => {
    return <Promise<Strings>>TranslationEndpoint.loadTranslations(lang)
        .then(res => (<any>res).object);
  }
});
