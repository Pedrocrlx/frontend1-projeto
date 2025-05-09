// Web Component for the App Name
export class AppName extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
        <h1 class="header-title">Ticky.</h1>
        `;
    }
}

customElements.define("app-name", AppName);