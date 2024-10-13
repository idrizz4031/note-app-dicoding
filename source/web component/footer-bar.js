class FooterBar extends HTMLElement {
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
        <div class="footer">
            <p>&copy; 2024 - Syekh's Notes app</p>
        </div>
        `;
    }
}

customElements.define('footer-bar', FooterBar);