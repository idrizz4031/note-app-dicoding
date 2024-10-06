class HeaderBar extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open'});
    }

    connectedCallback() {
        this.render();
    }

    render() {
        const link = document.createElement('link');
        link.setAttribute('rel', 'stylesheet');
        link.setAttribute('href', 'style/style.css');

        this.shadowRoot.appendChild(link);

        this.shadowRoot.innerHTML += `
            <div class="header">
                <h1>Notes App</h1>
            </div>
        `;
    }
}

customElements.define('header-bar', HeaderBar);