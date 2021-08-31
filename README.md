# Fusion Translations PoC
This is a project for testing approaches to translating strings in Vaadin Fusion. The approach here uses [`lit-translate`](https://github.com/andreasbm/lit-translate).

The reasoning behind this choice is that it's easy to customize how the strings are loaded, and it integrates well with Lit.

This project stores translations in a standard resource bundle (`src/main/resources/messages_<lang>.properties`). The translations are converted to a JSON object and served to the client
through the `TranslationEndpoint`.

On the client, the `translate` directive from `lit-translate` is used, in order for components to be updated once the language changes.

The language is set in the `main-layout.ts` through the `app-store.ts`. The choice is currently not persisted across browser reloads.

## Running the application
The project is a standard Maven project. To run it from the command line,
type `mvnw` (Windows), or `./mvnw` (Mac & Linux), then open
http://localhost:8080 in your browser.

You can also import the project to your IDE of choice as you would with any 
Maven project. Read more on [how to set up a development environment for 
Vaadin projects](https://vaadin.com/docs/latest/guide/install) (Windows, Linux, macOS).

## Project structure

<table style="width:100%; text-align: left;">
  <tr><th>Directory</th><th>Description</th></tr>
  <tr><td><code>frontend/</code></td><td>Client-side source directory</td></tr>
  <tr><td>&nbsp;&nbsp;&nbsp;&nbsp;<code>index.html</code></td><td>HTML template</td></tr>
  <tr><td>&nbsp;&nbsp;&nbsp;&nbsp;<code>index.ts</code></td><td>Frontend entrypoint, contains the client-side routing setup using <a href="https://vaadin.com/router">Vaadin Router</a></td></tr>
  <tr><td>&nbsp;&nbsp;&nbsp;&nbsp;<code>main-layout.ts</code></td><td>Main layout Web Component, contains the navigation menu, uses <a href="https://vaadin.com/components/vaadin-app-layout">App Layout</a></td></tr>
  <tr><td>&nbsp;&nbsp;&nbsp;&nbsp;<code>views/</code></td><td>UI views Web Components (TypeScript)</td></tr>
  <tr><td>&nbsp;&nbsp;&nbsp;&nbsp;<code>themes/</code></td><td>Custom  
CSS styles</td></tr>
  <tr><td><code>src/main/java/&lt;groupId&gt;/</code></td><td>Server-side 
source directory, contains the server-side Java views</td></tr>
  <tr><td>&nbsp;&nbsp;&nbsp;&nbsp;<code>Application.java</code></td><td>Server entry-point</td></tr>
</table>
