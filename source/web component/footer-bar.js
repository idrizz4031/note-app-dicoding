class FooterBar extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
  }

  render() {
    const style = document.createElement("style");
    style.textContent = `
            .footer {
                display: flex;
                position: relative;
                height: 60px;
                width: 100%;
                bottom: 0;
                margin-top: auto;
                padding: 15px;
                align-items: center;
                font-size: 12px;
                justify-content: center;
                background-color: #5c78f5;
            }

            .footer p {
                font-size: 1rem;
            }
        `;

    const wrapper = document.createElement("div");
    wrapper.classList.add("footer");
    wrapper.innerHTML = `<p>&copy; 2024 - Syekh's Notes app</p>`;

    this.shadowRoot.appendChild(style);
    this.shadowRoot.appendChild(wrapper);
  }
}

customElements.define("footer-bar", FooterBar);
