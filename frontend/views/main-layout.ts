import '@vaadin/vaadin-app-layout';
import { AppLayoutElement } from '@vaadin/vaadin-app-layout';
import '@vaadin/vaadin-app-layout/vaadin-drawer-toggle';
import '@vaadin/vaadin-avatar/vaadin-avatar';
import '@vaadin/vaadin-context-menu';
import '@vaadin/vaadin-tabs';
import '@vaadin/vaadin-tabs/vaadin-tab';
import '@vaadin/vaadin-button';
import { customElement, html } from 'lit-element';
import { router } from '../index';
import { views } from '../routes';
import { appStore } from '../stores/app-store';
import { Layout } from './view';
import {PropertyValues} from "lit-element/ts3.4/lib/updating-element";
import {translate} from 'lit-translate';

interface RouteInfo {
  path: string;
  titleKey: string;
  icon: string;
}

@customElement('main-layout')
export class MainLayout extends Layout {
  render() {
    return html`
      <vaadin-app-layout primary-section="drawer">
        <header class="bg-base border-b border-contrast-10 box-border flex h-xl items-center w-full" slot="navbar">
          <vaadin-drawer-toggle aria-label="Menu toggle" class="text-secondary" theme="contrast"></vaadin-drawer-toggle>
          <h1 class="m-0 text-l">${translate(appStore.currentViewTitleKey)}</h1>
          <div style="margin-left: auto; margin-right: var(--lumo-space-l);">
            <vaadin-button theme="tertiary" 
                           style="${appStore.language === 'en' ? 'font-weight: bold;' : ''}"
                           @click="${() => appStore.setLanguage('en')}">
              English
            </vaadin-button>
            <vaadin-button theme="tertiary"
                           style="${appStore.language === 'sv' ? 'font-weight: bold;' : ''}"
                            @click="${() => appStore.setLanguage('sv')}">
              Swedish
            </vaadin-button>
          </div>
        </header>
        <section class="flex flex-col items-stretch max-h-full min-h-full" slot="drawer">
          <h2 class="flex items-center h-xl m-0 px-m text-m">${appStore.applicationName}</h2>
          <nav aria-labelledby="views-title" class="border-b border-contrast-10 flex-grow overflow-auto">
            <h3 class="flex items-center h-m mx-m my-0 text-s text-tertiary" id="views-title">Views</h3>
            ${this.getMenuRoutes().map(
              (viewRoute) => html`
                <a
                  ?highlight=${viewRoute.path == appStore.location}
                  class="flex mx-s p-s relative text-secondary"
                  href=${router.urlForPath(viewRoute.path)}
                >
                  <span class="${viewRoute.icon} me-s text-l"></span>
                  <span class="font-medium text-s">${translate(viewRoute.titleKey)}</span>
                </a>
              `
            )}
          </nav>
          <footer class="flex items-center my-s px-m py-xs"></footer>
        </section>
        <slot></slot>
      </vaadin-app-layout>
    `;
  }

  private hasLoadedTranslations: boolean = false;

  async connectedCallback() {
    super.connectedCallback();

    await appStore.setLanguage("en");
    this.hasLoadedTranslations = true;
    this.requestUpdate();

    this.classList.add('block', 'h-full');
    this.reaction(
      () => appStore.location,
      () => {
        AppLayoutElement.dispatchCloseOverlayDrawerEvent();
      }
    );
  }

  protected shouldUpdate(changedProperties: PropertyValues): boolean {
    return this.hasLoadedTranslations && super.shouldUpdate(changedProperties);
  }

  private getMenuRoutes(): RouteInfo[] {
    return views.filter((route) => route.titleKey) as RouteInfo[];
  }
}
