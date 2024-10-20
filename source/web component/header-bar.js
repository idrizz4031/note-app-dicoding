class HeaderBar extends HTMLElement {
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
            .header {
                display: flex;
                position: fixed;
                top: 0;
                width: 100%;
                text-align: center;
                padding: 1.5rem;
                background-color: #ffeb3b;
                justify-content: center;
                box-shadow: 0 2px 5px rgb(0, 0, 0, 0.1);
                z-index: 10;
            }

            .header h1 {
                font-size: 2rem;
                color: #333;
            }
        `;

    const wrapper = document.createElement("div");
    wrapper.classList.add("header");
    wrapper.innerHTML = `<h1>Notes App</h1>`;

    this.shadowRoot.appendChild(style);
    this.shadowRoot.appendChild(wrapper);
  }
}

customElements.define("header-bar", HeaderBar);
