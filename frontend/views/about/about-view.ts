import { customElement, html } from 'lit-element';
import { View } from '../../views/view';
import {  translate } from "lit-translate";

@customElement('about-view')
export class AboutView extends View {
  render() {
    return html`
    <div style="margin: var(--lumo-space-l);">
      ${translate("about.message")}
    </div>
    `;
  }
}
