import { customElement, html } from 'lit-element';
import { View } from '../../views/view';
import {  translate } from "lit-translate";

@customElement('not-translated-view')
export class NotTranslatedView extends View {
    render() {
        return html`
    <div style="margin: var(--lumo-space-l);">
        ${translate('nottranslated.this-view-has-not-been-translated-message')}
    </div>
    `;
    }
}
